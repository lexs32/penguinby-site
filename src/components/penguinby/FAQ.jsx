import { useState } from "react";
import { BadgeCheck, ChevronDown, CircleHelp, CreditCard, Headphones, MonitorCog, RefreshCw, ShieldCheck } from "lucide-react";

const faqs = [
  {
    icon: ShieldCheck,
    question: "Is PenguinBy stable?",
    answer: "Yes. Releases are checked before going live, and product status is kept simple so you know what is ready.",
  },
  {
    icon: MonitorCog,
    question: "What features are included?",
    answer: "Visual ESP, aimbot tuning, loot radar, recoil controls, profile settings, and guided setup.",
  },
  {
    icon: CreditCard,
    question: "Is there a free version?",
    answer: "No. Access is sold by duration so delivery, updates, and support stay consistent.",
  },
  {
    icon: Headphones,
    question: "What support do you offer?",
    answer: "Discord, tickets, and email support are available for setup, delivery, and account questions.",
  },
  {
    icon: RefreshCw,
    question: "How often is it updated?",
    answer: "Updates are shipped when compatibility, safety, or product quality requires it.",
  },
  {
    icon: BadgeCheck,
    question: "How does setup work?",
    answer: "Choose a product, pick a duration, complete checkout, then follow the delivery instructions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden border-y border-white/[0.06] bg-[#050608] px-6 py-24 sm:px-12">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='900' height='900' viewBox='0 0 900 900' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-opacity='.45' stroke-width='1'%3E%3Cpath d='M30 120c92-52 163-47 213 15s119 72 207 31 157-32 207 28 119 70 209 31'/%3E%3Cpath d='M0 250c108-50 191-45 248 17s132 73 224 33 165-30 219 31 126 70 209 26'/%3E%3Cpath d='M20 392c99-48 177-42 235 16s132 67 223 28 168-28 229 33 124 68 191 25'/%3E%3Cpath d='M0 542c105-44 184-37 239 20s126 62 214 20 163-25 225 41 134 68 222 18'/%3E%3Cpath d='M26 690c97-44 176-39 238 15s136 59 222 16 160-28 221 28 124 61 193 18'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "720px 720px",
        }}
      />
      <div className="section-shell relative z-10">
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/70">
            <span className="h-5 w-px bg-white/70" />
            FAQ
          </div>
          <h2 className="max-w-[680px] font-orbitron text-[3.4rem] font-black leading-[0.95] tracking-normal text-white md:text-[4.8rem]">
            Everything you need to know.
          </h2>
        </div>

        <div className="grid max-w-[900px] gap-3">
          {faqs.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`rounded-2xl border bg-white/[0.028] backdrop-blur-xl transition-all duration-200 ${
                  isOpen ? "border-white/18 shadow-[0_22px_80px_rgba(0,0,0,0.34)]" : "border-white/[0.08] hover:border-white/16"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white/80">
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0 flex-1 font-orbitron text-[1rem] font-extrabold leading-snug text-white">
                    {item.question}
                  </span>
                  <span className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/70 transition-transform duration-200">
                    {isOpen ? <CircleHelp size={17} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="px-5 pb-6 pl-[4.75rem] pr-16 text-[0.98rem] font-semibold leading-7 text-[#8A9BB0]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
