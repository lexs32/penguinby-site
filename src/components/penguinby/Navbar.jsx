import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 65, behavior: "smooth" });
      setOpen(false);
    }
  };

  const links = [
    { label: "About", id: "about" },
    { label: "Features", id: "features" },
    { label: "Pricing", id: "pricing" },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-[1000] border-b border-white/10 bg-[#08090b]/90 shadow-[0_12px_38px_rgba(0,0,0,0.55)] backdrop-blur-[20px]">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-6 sm:px-12">
        <div className="flex items-center gap-8 lg:gap-11">
          <button
            onClick={() => scrollTo("home")}
            className="font-orbitron text-[1.55rem] font-extrabold italic tracking-normal text-primary transition-all hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.16)]"
          >
            PenguinBy
          </button>

          <ul className="hidden items-center gap-9 list-none lg:flex">
            {links.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`group relative font-orbitron text-[0.94rem] font-bold tracking-normal transition-colors ${
                    index === 0 ? "text-primary" : "text-[#8A9BB0] hover:text-primary"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-4 left-0 h-[2px] bg-primary transition-all ${
                      index === 0 ? "w-full bg-primary shadow-[0_0_12px_rgba(255,255,255,0.18)]" : "w-0 bg-primary group-hover:w-full"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button className="text-primary md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <ul className="border-t border-white/10 bg-[#08090b]/95 px-5 py-5 md:hidden">
          {links.map((item, index) => (
            <li key={`${item.label}-mobile-${index}`}>
              <button
                onClick={() => scrollTo(item.id)}
                className="block w-full py-3 text-left font-mono text-[0.76rem] uppercase tracking-[0.18em] text-slate-300 transition-colors hover:text-primary"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
