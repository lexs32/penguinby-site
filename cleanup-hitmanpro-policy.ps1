[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [switch]$DryRun,
    [string]$TargetExtensionId = 'eppiocemhmnlbhjplcgkofciiegomcon',
    [string]$BackupDirectory = (Join-Path -Path $PSScriptRoot -ChildPath 'registry-policy-backups')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Log {
    param(
        [Parameter(Mandatory)]
        [string]$Message
    )
    Write-Host $Message
}

function Test-IsAdministrator {
    $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = [Security.Principal.WindowsPrincipal]::new($identity)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Get-RegistryRoots {
    @(
        'HKLM:\SOFTWARE\Policies\Google\Chrome'
        'HKLM:\SOFTWARE\Policies\Chromium'
        'HKLM:\SOFTWARE\Policies\BraveSoftware\Brave'
        'HKLM:\SOFTWARE\Policies\Microsoft\Edge'
        'HKLM:\SOFTWARE\Policies\Vivaldi'
        'HKLM:\SOFTWARE\Policies\Opera Software'
        'HKCU:\SOFTWARE\Policies\Google\Chrome'
        'HKCU:\SOFTWARE\Policies\Chromium'
        'HKCU:\SOFTWARE\Policies\BraveSoftware\Brave'
        'HKCU:\SOFTWARE\Policies\Microsoft\Edge'
        'HKCU:\SOFTWARE\Policies\Vivaldi'
        'HKCU:\SOFTWARE\Policies\Opera Software'
        'HKLM:\SOFTWARE\WOW6432Node\Policies\Google\Chrome'
        'HKLM:\SOFTWARE\WOW6432Node\Policies\Chromium'
        'HKLM:\SOFTWARE\WOW6432Node\Policies\BraveSoftware\Brave'
        'HKLM:\SOFTWARE\WOW6432Node\Policies\Microsoft\Edge'
    )
}

function ConvertTo-HashtableFromJson {
    param([Parameter(Mandatory)]$InputObject)

    if ($null -eq $InputObject) { return @{} }
    if ($InputObject -is [hashtable]) { return $InputObject }

    $table = @{}
    foreach ($prop in $InputObject.PSObject.Properties) {
        $table[$prop.Name] = $prop.Value
    }
    return $table
}

function ConvertTo-JsonCompact {
    param([Parameter(Mandatory)]$InputObject)
    return ($InputObject | ConvertTo-Json -Depth 50 -Compress)
}

function Backup-RegistryKey {
    param(
        [Parameter(Mandatory)]
        [string]$RegistryPath,
        [Parameter(Mandatory)]
        [string]$BackupRoot
    )

    $drive, $subPath = $RegistryPath.Split(':', 2)
    $nativePath = "$drive$subPath"
    $safeName = ($nativePath -replace '[\\/:*?"<>|]', '_').Trim('_')
    $timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $backupFile = Join-Path $BackupRoot "$safeName-$timestamp.reg"

    if (-not (Test-Path $BackupRoot)) {
        New-Item -Path $BackupRoot -ItemType Directory -Force | Out-Null
    }

    & reg.exe export $nativePath $backupFile /y | Out-Null
    return $backupFile
}

function Get-ExtensionSettingsValue {
    param(
        [Parameter(Mandatory)]
        [string]$RegistryPath
    )

    try {
        $item = Get-ItemProperty -Path $RegistryPath -Name 'ExtensionSettings' -ErrorAction Stop
        return $item.ExtensionSettings
    } catch {
        return $null
    }
}

function Set-ExtensionSettingsValue {
    param(
        [Parameter(Mandatory)]
        [string]$RegistryPath,
        [Parameter(Mandatory)]
        [string]$JsonValue
    )

    New-ItemProperty -Path $RegistryPath -Name 'ExtensionSettings' -Value $JsonValue -PropertyType String -Force | Out-Null
}

function Remove-ExtensionSettingsValue {
    param(
        [Parameter(Mandatory)]
        [string]$RegistryPath
    )

    Remove-ItemProperty -Path $RegistryPath -Name 'ExtensionSettings' -ErrorAction Stop
}

if (-not (Test-IsAdministrator)) {
    throw 'This script must be run in an elevated Administrator PowerShell session.'
}

Write-Log "Personal PC / management check: this script assumes you are working on a personal device. If this is a school/work-managed PC, stop here."
Write-Log ""
Write-Log ("Mode: {0}" -f ($(if ($DryRun) { 'DRY RUN' } else { 'APPLY CHANGES' })))
Write-Log ("Target extension ID: {0}" -f $TargetExtensionId)
Write-Log ""

$roots = Get-RegistryRoots
$results = New-Object System.Collections.Generic.List[object]

foreach ($root in $roots) {
    if (-not (Test-Path $root)) {
        Write-Log "[SKIP] Missing key: $root"
        continue
    }

    $value = Get-ExtensionSettingsValue -RegistryPath $root
    if ($null -eq $value) {
        Write-Log "[OK] No ExtensionSettings value at $root"
        continue
    }

    $containsTarget = $false
    try {
        $parsed = $value | ConvertFrom-Json -ErrorAction Stop
        $map = ConvertTo-HashtableFromJson -InputObject $parsed
        $containsTarget = $map.ContainsKey($TargetExtensionId)
    } catch {
        $containsTarget = $value -match [regex]::Escape($TargetExtensionId)
    }

    if (-not $containsTarget) {
        Write-Log "[OK] ExtensionSettings at $root does not contain target ID"
        continue
    }

    $results.Add([pscustomobject]@{
        Path = $root
        Value = $value
    }) | Out-Null
}

if ($results.Count -eq 0) {
    Write-Log ""
    Write-Log "No matching ExtensionSettings entries were found."
    Write-Log "No registry changes were made."
    return
}

Write-Log ""
Write-Log "Matching entries:"
foreach ($entry in $results) {
    Write-Log ("- {0}" -f $entry.Path)
    Write-Log ("  Current value: {0}" -f $entry.Value)
}

if ($DryRun) {
    Write-Log ""
    Write-Log "Dry run only. No changes were made."
    Write-Log "If the preview looks correct, rerun without -DryRun to apply the cleanup."
    return
}

foreach ($entry in $results) {
    $path = $entry.Path
    $current = $entry.Value
    $backupFile = Backup-RegistryKey -RegistryPath $path -BackupRoot $BackupDirectory
    Write-Log ""
    Write-Log "[BACKUP] Exported $path to $backupFile"

    $parsed = $null
    $asText = [string]$current
    $removed = $false

    try {
        $parsed = $asText | ConvertFrom-Json -ErrorAction Stop
        $map = ConvertTo-HashtableFromJson -InputObject $parsed
        if ($map.ContainsKey($TargetExtensionId)) {
            if ($map.Count -le 1) {
                Write-Log "[CHANGE] Removing entire ExtensionSettings value at $path because it only contains the target entry."
                if ($PSCmdlet.ShouldProcess($path, 'Remove ExtensionSettings value')) {
                    Remove-ExtensionSettingsValue -RegistryPath $path
                }
                $removed = $true
            } else {
                Write-Log "[CHANGE] Removing only $TargetExtensionId from ExtensionSettings at $path."
                $map.Remove($TargetExtensionId)
                $newJson = ConvertTo-JsonCompact -InputObject $map
                if ($PSCmdlet.ShouldProcess($path, 'Update ExtensionSettings value')) {
                    Set-ExtensionSettingsValue -RegistryPath $path -JsonValue $newJson
                }
                Write-Log ("[NEW] {0}" -f $newJson)
                $removed = $true
            }
        }
    } catch {
        if ($asText -match [regex]::Escape($TargetExtensionId)) {
            Write-Log "[CHANGE] The value is not valid JSON but still references the target ID. Removing the entire ExtensionSettings value at $path."
            if ($PSCmdlet.ShouldProcess($path, 'Remove ExtensionSettings value')) {
                Remove-ExtensionSettingsValue -RegistryPath $path
            }
            $removed = $true
        } else {
            Write-Log "[WARN] Could not parse ExtensionSettings at $path, and the target ID was not found in the fallback text check. No change made."
        }
    }

    if ($removed) {
        Write-Log "[DONE] Updated $path"
    } else {
        Write-Log "[NOOP] No changes applied to $path"
    }
}

Write-Log ""
Write-Log "Cleanup complete."
Write-Log "Restart Windows, then open chrome://policy, brave://policy, and edge://policy, click 'Reload policies', and verify the leftover HitmanPro entry is gone."
