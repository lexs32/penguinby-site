import { motion } from "framer-motion";
import { ArrowUpRight, Crosshair, Eye, Gauge, Radar } from "lucide-react";

const detailCards = [
  {
    icon: Eye,
    title: "Visual ESP",
    desc: "Target, distance, and scene overlays with a clean tactical presentation.",
    meta: "Overlay module",
    image: "https://i.postimg.cc/cLQ8Ffs7/image.png",
  },
  {
    icon: Crosshair,
    title: "Aimbot Tuning",
    desc: "Smoothing, FOV, and profile controls tuned for different play styles.",
    meta: "Precision module",
    image: "https://media.base44.com/images/public/69ea0b08270b554e05c74997/6bff98374_generated_image.png",
  },
  {
    icon: Radar,
    title: "Loot Radar",
    desc: "Item filters and priority reads surfaced without crowding the interface.",
    meta: "Intel module",
    image: "https://i.postimg.cc/nVgjZ3rw/image.png",
  },
  {
    icon: Gauge,
    title: "Recoil Control",
    desc: "Compact presets and live sliders built into the same control surface.",
    meta: "Control module",
    image: "https://i.postimg.cc/cLQ8Ffs7/image.png",
  },
];

export default function Details() {
  return (
    <section id="about" className="relative overflow-hidden border-y border-white/[0.06] bg-[#090909]/80 px-6 py-20 sm:px-12">
      <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="section-shell relative z-10">
        <div className="grid gap-5 md:grid-cols-2">
          {detailCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-h-[310px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0d0d0f] shadow-[0_26px_90px_rgba(0,0,0,0.38)]"
            >
              <img
                src={card.image}
                alt={`${card.title} cheat interface proof`}
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-[1.05] group-hover:opacity-78"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.10),transparent_30%),linear-gradient(110deg,rgba(0,0,0,0.88),rgba(0,0,0,0.38)_48%,rgba(0,0,0,0.82))]" />
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 [background:linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]" />

              <div className={`relative flex h-full min-h-[310px] items-center p-5 sm:p-7 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <div className="w-full max-w-[310px] rounded-2xl border border-white/[0.12] bg-black/45 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl transition duration-300 group-hover:-translate-y-1 group-hover:border-white/25 group-hover:bg-black/55">
                  <div className="mb-5 flex items-center justify-between gap-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] text-white shadow-[0_0_24px_rgba(255,255,255,0.06)]">
                      <card.icon size={21} />
                    </span>
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/45">{card.meta}</span>
                  </div>

                  <h3 className="font-orbitron text-[1.65rem] font-black tracking-normal text-white">{card.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-6 text-[#B1BBC8]">{card.desc}</p>

                  <button
                    type="button"
                    onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    className="details-button mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 font-mono text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.14]"
                  >
                    View pricing
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
