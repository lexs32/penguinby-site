export default function UserNotRegisteredError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="max-w-md w-full p-8 bg-card rounded-lg border border-border">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-accent text-2xl">!</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Access Restricted</h1>
          <p className="text-muted-foreground mb-6">
            You are not registered to use this application. Please contact the app administrator to request access.
          </p>
          <div className="p-4 bg-background rounded-md text-sm text-muted-foreground border border-border">
            <p className="font-medium text-foreground mb-2">If you believe this is an error:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Verify you are logged in with the correct account</li>
              <li>Contact the app administrator for access</li>
              <li>Try logging out and back in again</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

