import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "ShadowSniper", product: "R6 Pro", text: "Fast delivery, clean setup, and support replied quickly.", date: "Apr 2026" },
  { name: "VortexFPS", product: "Arc Raiders Pro", text: "The new flow feels straightforward and updates have been solid.", date: "Apr 2026" },
  { name: "NightHawk", product: "R6 Pro", text: "Purchased and received everything instantly. Great experience.", date: "Mar 2026" },
  { name: "CrimsonEdge", product: "Arc Raiders Pro", text: "Support was responsive, direct, and easy to reach.", date: "Mar 2026" },
  { name: "GhostTrigger", product: "R6 Pro", text: "Smooth checkout and quick fulfillment with no confusion.", date: "Feb 2026" },
  { name: "ZeroLatency", product: "Arc Raiders Pro", text: "Good value, reliable delivery, and the status panel helps.", date: "Feb 2026" },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative border-y border-white/5 bg-[#070707]/84 px-6 py-24 sm:px-12">
      <div className="absolute left-[-12rem] top-20 h-[28rem] w-[28rem] rounded-full bg-primary/8 blur-[120px]" />
      <div className="section-shell">
        <div className="mb-14 text-center">
          <div className="mx-auto mb-4 w-fit border-l-2 border-primary pl-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">
            Verified Customers
          </div>
          <h2 className="mx-auto max-w-[760px] font-orbitron text-[2.2rem] font-black leading-[1.04] tracking-normal text-white md:text-[3.4rem]">
            Proof points with the same premium treatment.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[1rem] leading-[1.7] text-[#8A9BB0]">
            Short, scannable feedback cards with warm highlights and product tags.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={`${review.name}-${review.date}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:bg-white/[0.055] hover:shadow-[0_0_28px_rgba(246,241,236,0.08)]"
            >
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={15} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="min-h-[78px] text-[0.98rem] leading-7 text-slate-300">&quot;{review.text}&quot;</p>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <div className="font-orbitron text-[0.95rem] font-bold tracking-normal text-white">{review.name}</div>
                  <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-500">{review.date}</div>
                </div>
                <span className="rounded border border-primary/25 bg-primary/5 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-primary">
                  {review.product}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
