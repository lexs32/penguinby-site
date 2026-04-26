import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const products = [
  {
    id: "arc",
    name: "Arc Raiders Pro",
    shortName: "ARC PRO",
    thumbnail: "https://i.postimg.cc/wxsYgZbw/download.png",
    imagePosition: "center 22%",
    showcase: ["https://i.postimg.cc/cLQ8Ffs7/image.png", "https://i.postimg.cc/nVgjZ3rw/image.png", "https://i.postimg.cc/nVgjZ3rw/image.png"],
    desc: "Premium Arc Raiders access with ESP, aim control, clean setup, and fast delivery.",
    longDesc: "Full access to the Arc Raiders control suite with live updates, guided setup, and priority support.",
    pricing: [
      { label: "1 Day", price: "$7.99", period: "/ day", url: "https://penguinby.site/" },
      { label: "1 Week", price: "$24.99", period: "/ week", url: "https://penguinby.site/" },
      { label: "1 Month", price: "$49.99", period: "/ month", url: "https://penguinby.site/" },
    ],
    highlights: ["Player & Loot ESP", "Smart aim control", "Custom settings"],
  },
  {
    id: "r6",
    name: "R6 Pro",
    shortName: "R6 PRO",
    thumbnail: "https://i.postimg.cc/Y0W1SYvy/e2d36375-033d-40e2-8cdb-84d170ecd532.png",
    imagePosition: "center 18%",
    showcase: ["https://i.postimg.cc/cC8pQxQC/image.png", "https://i.postimg.cc/VsDgRQ7s/image.png", "https://i.postimg.cc/1XjpZSTt/image.png"],
    desc: "Premium R6 access with ESP, recoil control, profiles, and direct support.",
    longDesc: "A compact premium package built for fast fulfillment, clean setup, and reliable customer access.",
    pricing: [
      { label: "1 Day", price: "$6.99", period: "/ day", url: "https://penguinby.site/" },
      { label: "1 Week", price: "$24.99", period: "/ week", url: "https://penguinby.site/" },
      { label: "1 Month", price: "$49.99", period: "/ month", url: "https://penguinby.site/" },
    ],
    highlights: ["Advanced ESP & Aimbot", "No recoil spread", "Daily updates"],
  },
];

function ProductCard({ product, onPreview }) {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0c0e]/82 p-5 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-6"
    >
      <button
        type="button"
        onClick={() => onPreview(product.thumbnail)}
        className="group relative block h-[210px] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070809] text-left sm:h-[235px]"
        aria-label={`Open ${product.name} image`}
      >
        <img
          src={product.thumbnail}
          alt={`${product.name} preview`}
          style={{ objectPosition: product.imagePosition }}
          className="absolute inset-0 h-full w-full object-cover opacity-90 grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.12)_35%,rgba(0,0,0,0.9))]" />
      </button>

      <div className="mt-6">
        <h3 className="font-orbitron text-[2rem] font-black leading-none text-white">{product.name}</h3>
        <p className="mt-4 min-h-[58px] max-w-[520px] text-[0.98rem] leading-7 text-[#8A9BB0]">{product.desc}</p>
      </div>

      <div className="mt-6 grid gap-3">
        {product.highlights.map((feature) => (
          <div key={feature} className="flex items-center gap-3 text-[#c5ced8]">
            <Check size={16} className="text-white" />
            <span className="text-[0.95rem]">{feature}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate(`/product/${product.id}`)}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.12] px-5 py-4 font-orbitron text-[1rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/[0.18] hover:shadow-[0_0_30px_rgba(246,241,236,0.14)]"
      >
        Browse
        <ChevronRight size={18} />
      </button>
    </motion.article>
  );
}

export default function Store() {
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <>
      <section id="pricing" className="relative overflow-hidden bg-[#05070a]/92 px-6 py-28 sm:px-12">
        <div className="section-shell relative z-10">
          <div className="mb-14 text-center">
            <div className="mx-auto mb-4 w-fit border-l-2 border-primary pl-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">
              Pricing
            </div>
            <h2 className="mx-auto max-w-[760px] font-orbitron text-[2.4rem] font-black leading-[1.04] text-white md:text-[3.8rem]">
              Choose your product.
            </h2>
            <p className="mx-auto mt-5 max-w-[560px] text-[1rem] leading-[1.7] text-[#8A9BB0]">
              Browse a product, review the proof, then pick your duration on the product page.
            </p>
          </div>

          <div className="mx-auto grid max-w-[1040px] gap-7 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onPreview={setPreviewImage} />
            ))}
          </div>
        </div>
      </section>

      {previewImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm" onClick={() => setPreviewImage(null)}>
          <div className="relative w-full max-w-[1080px]" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute right-3 top-3 z-10 rounded-lg border border-white/15 bg-black/55 p-2 text-white/80 transition-colors hover:text-white"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
            <img src={previewImage} alt="Preview" className="max-h-[85vh] w-full rounded-2xl border border-white/10 object-contain shadow-[0_30px_100px_rgba(0,0,0,0.6)]" />
          </div>
        </div>
      )}
    </>
  );
}
