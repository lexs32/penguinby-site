import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronRight, ShoppingCart, X } from "lucide-react";
import Navbar from "@/components/penguinby/Navbar";
import Footer from "@/components/penguinby/Footer";
import EmailGateModal from "@/components/penguinby/EmailGateModal";
import { products } from "@/components/penguinby/Store";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === id);
  const [tierIndex, setTierIndex] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [emailGate, setEmailGate] = useState(null);

  const tier = useMemo(() => product?.pricing[tierIndex], [product, tierIndex]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background px-6 py-24 text-center text-white">
        Product not found.
        <button className="ml-3 underline" onClick={() => navigate("/")}>
          Go home
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground font-rajdhani">
      <div className="fixed inset-0 site-grid animate-grid-pan opacity-55 pointer-events-none" />
      <div className="fixed inset-0 noise-overlay opacity-[0.045] pointer-events-none" />
      <Navbar />

      <main className="relative z-10 px-6 pb-24 pt-28 sm:px-12">
        <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <section>
            <button
              type="button"
              onClick={() => navigate("/#pricing")}
              className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[#8A9BB0] transition-colors hover:text-white"
            >
              Home / {product.name}
            </button>

            <button
              type="button"
              onClick={() => setPreviewImage(product.thumbnail)}
              className="relative block h-[320px] w-full overflow-hidden rounded-3xl border border-white/[0.09] bg-black/40 text-left shadow-[0_26px_90px_rgba(0,0,0,0.42)] sm:h-[370px]"
              aria-label={`Open ${product.name} preview`}
            >
              <img
                src={product.thumbnail}
                alt={`${product.name} preview`}
                style={{ objectPosition: product.imagePosition }}
                className="absolute inset-0 h-full w-full object-cover opacity-90 grayscale contrast-125 brightness-90"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.13),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.40),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.8))]" />
              <div className="absolute bottom-8 left-8 font-orbitron text-[2.8rem] font-black leading-[0.9] tracking-[-0.02em] text-white/85 sm:text-[4rem]">
                {product.shortName}
              </div>
            </button>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.showcase.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setPreviewImage(src)}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/30"
                  aria-label={`Open ${product.name} proof ${index + 1}`}
                >
                  <img src={src} alt={`${product.name} proof ${index + 1}`} className="h-[86px] w-full object-cover opacity-90 transition duration-200 hover:scale-105 sm:h-[108px]" />
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
              <h2 className="font-orbitron text-[1.15rem] font-bold text-white">Premium {product.name} Access</h2>
              <p className="mt-3 text-[0.98rem] leading-7 text-[#8A9BB0]">{product.longDesc}</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ["24/7", "Support"],
                  ["Fast", "Delivery"],
                  ["Live", "Updates"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-3 text-center">
                    <div className="font-orbitron text-[0.95rem] font-bold text-white">{value}</div>
                    <div className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#8A9BB0]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="pt-9 lg:pt-12">
            <h1 className="font-orbitron text-[3rem] font-black leading-none text-white md:text-[4rem]">{product.name}</h1>
            <div className="mt-4 flex items-center gap-2">
              <span className="font-orbitron text-[0.95rem] font-bold text-white">4.9</span>
              <span className="text-[0.9rem] text-[#8A9BB0]">TrustScore</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="text-[0.9rem] text-[#8A9BB0]">127 reviews</span>
            </div>
            <p className="mt-6 max-w-[520px] text-[1.05rem] leading-8 text-[#c5ced8]">{product.longDesc}</p>

            <div className="mt-8">
              <div className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#8A9BB0]">Select duration</div>
              <div className="space-y-3">
                {product.pricing.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setTierIndex(index)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-5 py-5 text-left transition-all ${
                      tierIndex === index ? "border-white/35 bg-white/[0.08] shadow-[0_0_30px_rgba(255,255,255,0.08)]" : "border-white/[0.09] bg-white/[0.025] hover:border-white/22"
                    }`}
                  >
                    <span className="font-orbitron text-[1.25rem] font-black text-white">{item.label}</span>
                    <span className="font-orbitron text-[1.15rem] font-black text-white">{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/[0.12] bg-white/[0.055] p-6">
              <div className="font-orbitron text-[3rem] font-black leading-none text-white">{tier.price}</div>
              <div className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.13em] text-[#8A9BB0]">Instant delivery / secure checkout</div>
            </div>

            <div className="mt-6 grid gap-3">
              {product.highlights.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-[#c5ced8]">
                  <Check size={17} className="text-white" />
                  <span className="text-[0.95rem]">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setEmailGate({ product, tier })}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.12] px-5 py-4 font-orbitron text-[1rem] font-bold text-white transition-all hover:bg-white/[0.18] hover:shadow-[0_0_30px_rgba(246,241,236,0.14)]"
            >
              <ShoppingCart size={18} />
              Buy now
              <ChevronRight size={18} />
            </button>
          </section>
        </div>
      </main>

      <Footer />

      {emailGate && <EmailGateModal product={emailGate.product} tier={emailGate.tier} onClose={() => setEmailGate(null)} />}

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
    </div>
  );
}
