import { Activity, Crosshair, ShieldCheck, Terminal, Zap } from "lucide-react";

function DashboardMockup() {
  const rows = ["Aimbot", "Visual ESP", "Loot Radar", "Recoil", "Config"];
  const toggles = ["ESP", "AIM", "LOOT", "FOV", "SYNC", "CFG"];
  const moduleStats = [
    ["Player ESP", 82],
    ["Loot ESP", 74],
    ["Recoil Control", 56],
    ["FOV Tuning", 68],
  ];

  return (
    <div className="glass-panel neon-border animate-float-panel relative aspect-[16/9] w-full overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_92%,rgba(255,255,255,0.08),transparent_20rem)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
      <div className="absolute inset-0 translate-y-[-100%] bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#05070a] to-transparent" />

      <div className="relative z-10 flex h-full gap-4 p-4 sm:p-6">
        <aside className="hidden w-[29%] flex-col gap-3 rounded-lg border border-white/5 bg-black/24 p-3 sm:flex">
          <div className="mb-2 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-primary">
            <Terminal size={14} />
            Penguin Menu
          </div>
          {rows.map((row, index) => (
            <div
              key={row}
              className={`rounded-md border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] ${
                index === 1
                  ? "border-primary/35 border-l-primary bg-primary/10 text-primary shadow-[inset_4px_0_0_rgba(246,241,236,0.55)]"
                  : "border-white/5 bg-white/[0.025] text-slate-500"
              }`}
            >
              {row}
            </div>
          ))}
        </aside>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 px-4 py-3">
            <div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone-500">Selected Product</div>
              <div className="mt-1 font-orbitron text-sm font-bold tracking-normal text-slate-200">Arc Raiders Pro</div>
            </div>
            <div className="flex items-center gap-2 rounded border border-red-300/25 bg-red-950/25 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-red-200">
              <span className="h-1.5 w-1.5 rounded-full bg-red-300 shadow-[0_0_14px_rgba(252,165,165,0.85)] animate-pulse-dot" />
              Live
            </div>
          </div>

          <div className="grid flex-1 grid-cols-[1.15fr_0.85fr] gap-4">
            <div className="rounded-lg border border-white/5 bg-black/20 p-4">
              <div className="mb-4 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-primary">
                <Crosshair size={14} />
                Tactical Layer
              </div>
              <div className="space-y-3">
                {moduleStats.map(([label, width]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between font-mono text-[0.58rem] uppercase tracking-[0.14em] text-stone-500">
                      <span>{label}</span>
                      <span>{width}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-gradient-to-r from-white to-[#777]" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-black/20 p-4">
              <div className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">Controls</div>
              <div className="grid grid-cols-2 gap-2">
                {toggles.map((toggle, index) => (
                  <div
                    key={toggle}
                    className={`rounded border px-2 py-2 text-center font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em] ${
                      index < 4 ? "border-primary/30 bg-primary/10 text-primary" : "border-white/10 bg-white/[0.03] text-slate-500"
                    }`}
                  >
                    {toggle}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-20 rounded border border-primary/25 bg-[#171515]/90 px-3 py-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-primary shadow-[0_0_20px_rgba(246,241,236,0.09)]">
        Status: Stable
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 74, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[780px] overflow-hidden px-6 pb-28 pt-[9rem] sm:px-12 lg:min-h-[820px] lg:pt-[10.5rem]">
      <div className="absolute inset-y-0 left-[5%] hidden w-px bg-gradient-to-b from-transparent via-primary/12 to-transparent lg:block" />
      <div className="absolute inset-y-0 right-[9%] hidden w-px bg-gradient-to-b from-transparent via-primary/8 to-transparent lg:block" />
      <div className="absolute left-[30%] top-40 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.055),transparent_68%)] opacity-80" />
      <div className="absolute left-1/2 top-[6.5rem] hidden -translate-x-1/2 select-none font-orbitron text-[20rem] font-black tracking-normal text-primary/[0.018] lg:block">
        P
      </div>

      <div className="mx-auto grid max-w-[1280px] items-center gap-16 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10 max-w-[720px] pl-0 lg:pl-8">
          <h1 className="animate-hero-1 font-orbitron text-[3rem] font-black leading-[0.98] tracking-normal text-white sm:text-[4.9rem] lg:text-[6rem]">
            Dominate
            <span className="mt-2 block bg-gradient-to-r from-white via-[#cfcfcf] to-[#747474] bg-clip-text text-transparent drop-shadow-[0_0_48px_rgba(255,255,255,0.12)]">
              Arc Raiders.
            </span>
          </h1>

          <p className="animate-hero-2 mt-8 max-w-[560px] text-[1.08rem] font-medium leading-[1.75] text-[#8A9BB0] sm:text-[1.18rem]">
            PenguinBy delivers premium, feature-rich software access with real-time updates, fast setup, and 24/7 support.
          </p>

          <div className="animate-hero-3 mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => scrollTo("pricing")}
              className="rounded-[10px] border border-white/25 bg-white/[0.08] px-8 py-4 font-mono text-[0.82rem] font-bold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:scale-[1.02] hover:bg-white/[0.14] hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
            >
              View Pricing
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="details-button rounded-[10px] border border-white/15 bg-transparent px-8 py-4 font-mono text-[0.82rem] font-bold uppercase tracking-[0.1em] text-white/70 transition-all duration-200 hover:scale-[1.02] hover:border-white/35 hover:text-white"
            >
              View Details
            </button>
          </div>

          <div className="animate-hero-4 mt-9 grid max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: ShieldCheck, label: "Kernel-aware updates" },
              { icon: Activity, label: "Live status sync" },
              { icon: Crosshair, label: "Precision toolkit" },
              { icon: Zap, label: "Instant delivery" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[#8A9BB0]">
                <Icon className="shrink-0 text-primary drop-shadow-[0_0_10px_rgba(246,241,236,0.22)]" size={18} />
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[680px] lg:mr-0">
          <div className="absolute inset-[-6rem] rounded-full bg-white/[0.045] blur-[100px]" />
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
