import { motion } from "framer-motion";
import { Headphones, RefreshCw, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Private Runtime",
    desc: "A hardened access flow with active status checks, guarded releases, and rollback-ready updates.",
    tag: "HARDENED",
  },
  {
    icon: Zap,
    title: "Instant Fulfillment",
    desc: "Checkout routes users straight into delivery with clear duration selection and email-backed order access.",
    tag: "AUTOMATED",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Updates",
    desc: "Compatibility updates, changelog rhythm, and product status are surfaced without hunting through Discord.",
    tag: "MAINTAINED",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Discord, tickets, and email are framed around fast response expectations and live operational visibility.",
    tag: "LIVE NOW",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden border-b border-white/5 bg-[#070707]/72 px-6 py-24 sm:px-12">
      <div className="section-shell">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 border-l-2 border-primary pl-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">
              Features
            </div>
            <h2 className="max-w-[720px] font-orbitron text-[2.2rem] font-black leading-[1.05] tracking-normal text-white md:text-[3.4rem]">
              Built for low-friction <span className="bg-gradient-to-r from-white via-[#cfcfcf] to-[#777] bg-clip-text text-transparent">access and clean control.</span>
            </h2>
          </div>
          <p className="max-w-[430px] text-[1rem] leading-[1.7] text-[#8A9BB0]">
            The redesign keeps the store direct and scannable while making every trust signal visible before checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative min-h-[275px] rounded-xl border border-white/[0.08] bg-white/[0.035] p-7 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:bg-white/[0.055] hover:shadow-[0_0_24px_rgba(246,241,236,0.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-white to-[#777] transition-transform duration-300 group-hover:scale-x-100" />
              <feature.icon className="mb-8 text-primary drop-shadow-[0_0_14px_rgba(246,241,236,0.18)]" size={34} />
              <h3 className="mb-4 font-orbitron text-[1.2rem] font-bold tracking-normal text-white">{feature.title}</h3>
              <p className="mb-7 text-[0.94rem] leading-7 text-[#8A9BB0]">{feature.desc}</p>
              <span className="rounded border border-primary/25 bg-primary/5 px-3 py-1.5 font-mono text-[0.63rem] uppercase tracking-[0.2em] text-primary">
                {feature.tag}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
