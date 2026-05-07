import React, { useState } from "react";
import { Headphones, Mail, MessageCircle } from "lucide-react";
import PolicyModal from "@/components/penguinby/PolicyModal";
import TosContent from "@/components/penguinby/TosContent";
import RefundContent from "@/components/penguinby/RefundContent";

export default function Footer() {
  const [tosOpen, setTosOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 74, behavior: "smooth" });
  };

  const navLinks = [
    ["About", "about"],
    ["Features", "features"],
    ["Pricing", "pricing"],
    ["FAQ", "faq"],
  ];

  const supportLinks = [
    {
      label: "Discord",
      detail: "Fastest replies",
      href: "#",
      icon: MessageCircle,
    },
    {
      label: "Email",
      detail: "Detailed help",
      href: "mailto:support.penguinby@gmail.com",
      icon: Mail,
    },
    {
      label: "Ticket",
      detail: "Order support",
      href: "#",
      icon: Headphones,
    },
  ];

  return (
    <>
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#050608] px-6 py-14 sm:px-12">
        <div className="section-shell">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl sm:p-8">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

            <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-start">
              <div>
                <button
                  type="button"
                  onClick={() => scrollTo("home")}
                  className="w-fit font-orbitron text-[1.45rem] font-extrabold italic tracking-normal text-white transition-colors hover:text-white/80"
                >
                  PenguinBy
                </button>
                <p className="mt-3 max-w-[330px] text-[0.9rem] leading-6 text-[#8A9BB0]">
                  Premium access with clear pricing, visible proof, and direct support.
                </p>

                <div className="mt-7 flex flex-wrap gap-5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em]">
                  {navLinks.map(([label, id]) => (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className="animated-link text-[#8A9BB0] transition-colors hover:text-white"
                    >
                      {label}
                    </button>
                  ))}
                  <button onClick={() => setTosOpen(true)} className="animated-link text-[#8A9BB0] transition-colors hover:text-white">
                    Terms
                  </button>
                  <button onClick={() => setRefundOpen(true)} className="animated-link text-[#8A9BB0] transition-colors hover:text-white">
                    Refunds
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/45">
                    Support
                  </p>
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-white/15 to-transparent sm:block" />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {supportLinks.map(({ label, detail, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      className="group rounded-2xl border border-white/[0.08] bg-black/20 p-4 no-underline transition-all duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.055]"
                    >
                      <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] text-white transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.09]">
                        <Icon size={18} />
                      </span>
                      <span className="block font-orbitron text-[1rem] font-bold text-white">{label}</span>
                      <span className="mt-1 block text-[0.82rem] text-[#8A9BB0]">{detail}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.07] pt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
              <span>© 2026 PenguinBy</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>

      <PolicyModal isOpen={tosOpen} onClose={() => setTosOpen(false)} title="Terms of Service">
        <TosContent />
      </PolicyModal>
      <PolicyModal isOpen={refundOpen} onClose={() => setRefundOpen(false)} title="Refund Policy">
        <RefundContent />
      </PolicyModal>
    </>
  );
}
