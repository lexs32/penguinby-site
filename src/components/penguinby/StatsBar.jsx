import { useEffect, useRef, useState } from "react";
import { Clock, Shield, Star, Users } from "lucide-react";

const stats = [
  { value: 12400, decimals: 0, suffix: "+", display: "12,400+", label: "Active Users", icon: Users },
  { value: 99.3, decimals: 1, suffix: "%", display: "99.3%", label: "Undetection Rate", icon: Shield },
  { value: 4.9, decimals: 1, suffix: "/5", display: "4.9/5", label: "User Rating", icon: Star },
  { value: 10, decimals: 0, prefix: "< ", suffix: "m", display: "< 10m", label: "Support Resp", icon: Clock },
];

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

function CountUp({ stat, active }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setCurrent(stat.value * easeOutExpo(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, stat.value]);

  if (!active) return stat.display;

  const value = stat.decimals === 0 ? Math.round(current).toLocaleString() : current.toFixed(stat.decimals);
  return `${stat.prefix ?? ""}${value}${stat.suffix ?? ""}`;
}

export default function StatsBar() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative border-y border-primary/[0.06] bg-primary/[0.02] px-6 py-16 sm:px-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-y-10 md:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="group relative rounded-lg px-4 py-2 text-center transition-colors hover:bg-primary/[0.035]">
              {index > 0 && (
                <div className="absolute left-0 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/15 to-transparent md:block" />
              )}
              <Icon className="mx-auto mb-4 text-primary drop-shadow-[0_0_12px_rgba(246,241,236,0.18)]" size={28} fill={stat.label === "User Rating" ? "currentColor" : "none"} />
              <div className="font-orbitron text-[2.4rem] font-black leading-none tracking-normal text-white md:text-[3rem]">
                <CountUp stat={stat} active={active} />
              </div>
              <div className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[#8A9BB0]">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
