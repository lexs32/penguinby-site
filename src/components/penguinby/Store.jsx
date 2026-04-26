import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, Eye, X } from "lucide-react";
import EmailGateModal from "@/components/penguinby/EmailGateModal";

const products = [
  {
    id: "arc",
    name: "Arc Raiders Pro",
    shortName: "ARC PRO",
    thumbnail: "https://i.postimg.cc/pLBt3jcs/download.png",
    imagePosition: "center 30%",
    showcase: ["https://i.postimg.cc/cLQ8Ffs7/image.png", "https://i.postimg.cc/nVgjZ3rw/image.png", "https://i.postimg.cc/nVgjZ3rw/image.png"],
    desc: "Full access to the Arc Raiders control suite with live updates, guided setup, and priority support.",
    pricing: [
      { label: "1 Day", price: "$7.99", period: "/ day", url: "https://penguinby.site/" },
      { label: "1 Week", price: "$24.99", period: "/ week", url: "https://penguinby.site/", featured: true },
      { label: "1 Month", price: "$49.99", period: "/ month", url: "https://penguinby.site/" },
    ],
    features: ["Visual ESP", "Aimbot tuning", "Loot radar", "Recoil control", "Instant delivery", "Priority updates"],
    highlights: ["Player & Loot ESP", "Smart aim control", "Custom settings"],
    details: [
      { label: "Product", value: "Arc Raiders Pro" },
      { label: "Delivery", value: "Instant" },
      { label: "Support", value: "24/7" },
      { label: "Setup", value: "Guided" },
    ],
  },
  {
    id: "r6",
    name: "R6 Pro",
    shortName: "R6 PRO",
    thumbnail: "https://i.postimg.cc/wxsYgZbw/download.png",
    imagePosition: "center 24%",
    showcase: ["https://i.postimg.cc/cC8pQxQC/image.png", "https://i.postimg.cc/VsDgRQ7s/image.png", "https://i.postimg.cc/1XjpZSTt/image.png"],
    desc: "A compact premium package built for fast fulfillment, clean setup, and reliable customer access.",
    pricing: [
      { label: "1 Day", price: "$6.99", period: "/ day", url: "https://penguinby.site/" },
      { label: "1 Week", price: "$24.99", period: "/ week", url: "https://penguinby.site/", featured: true },
      { label: "1 Month", price: "$49.99", period: "/ month", url: "https://penguinby.site/" },
    ],
    features: ["Secure checkout", "Config profiles", "Fast delivery", "Live status", "Support routing", "Maintenance updates"],
    highlights: ["Advanced ESP & Aimbot", "No recoil spread", "Daily updates"],
    details: [
      { label: "Product", value: "R6 Pro" },
      { label: "Delivery", value: "Instant" },
      { label: "Support", value: "24/7" },
      { label: "Setup", value: "Guided" },
    ],
  },
];

function TierButton({ tier, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-primary/45 bg-primary/[0.095] shadow-[0_0_28px_rgba(246,241,236,0.08)]"
          : "border-white/[0.08] bg-white/[0.025] hover:border-primary/25 hover:bg-white/[0.045]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#8A9BB0]">{tier.label}</div>
          <div className="mt-2 font-orbitron text-[1.45rem] font-black text-white">{tier.price}</div>
        </div>
      </div>
    </button>
  );
}

function PricingCard({ product, onDetails, onBuy, onPreview }) {
  const [tierIndex, setTierIndex] = useState(1);
  const tier = product.pricing[tierIndex];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0c0e]/82 p-5 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-6"
    >
      <div className="absolute right-[-8rem] top-[-8rem] h-64 w-64 rounded-full bg-white/[0.045] blur-[90px]" />
      <div className="relative z-10">
        <div className="mb-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070809]">
          <button type="button" onClick={() => onPreview(product.thumbnail)} className="group relative block h-[164px] w-full text-left sm:h-[178px]" aria-label={`Open ${product.name} image`}>
            <img
              src={product.thumbnail}
              alt={`${product.name} preview`}
              style={{ objectPosition: product.imagePosition }}
              className="absolute inset-0 h-full w-full object-cover opacity-90 grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.10)_34%,rgba(0,0,0,0.88))]" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0c0e] to-transparent" />
          </button>
        </div>
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-orbitron text-[2rem] font-black leading-none text-white">{product.name}</h3>
            <p className="mt-4 max-w-[520px] text-[0.98rem] leading-7 text-[#8A9BB0]">{product.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => onPreview(product.thumbnail)}
            className="hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-primary transition-colors hover:bg-white/[0.08] sm:block"
            aria-label={`Preview ${product.name} image`}
          >
            <Eye size={24} />
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {product.pricing.map((item, index) => (
            <TierButton key={item.label} tier={item} selected={index === tierIndex} onClick={() => setTierIndex(index)} />
          ))}
        </div>

        <div className="mb-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {product.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-[#8A9BB0]">
              <Check className="text-primary" size={16} />
              <span className="text-[0.9rem]">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onDetails(product, tierIndex)}
            className="details-button inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-4 font-mono text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white/75 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:text-white"
          >
            Browse
            <Eye size={16} />
          </button>
          <button
            type="button"
            onClick={() => onBuy(product, tierIndex)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/45 bg-primary/[0.1] px-5 py-4 font-orbitron text-[1rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-primary/[0.18] hover:shadow-[0_0_30px_rgba(246,241,236,0.14)]"
          >
            Buy {tier.price}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Store() {
  const [modalData, setModalData] = useState(null);
  const [emailGate, setEmailGate] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const openEmailGate = (product, tierIdx) => setEmailGate({ product, tier: product.pricing[tierIdx] });
  const modalProduct = useMemo(() => {
    if (!modalData) return null;
    const tier = modalData.product.pricing[modalData.tierIdx];
    return { ...modalData.product, tier };
  }, [modalData]);

  return (
    <>
      <section id="pricing" className="relative overflow-hidden bg-[#05070a]/92 px-6 py-28 sm:px-12">
        <div className="absolute left-[-14rem] top-20 h-[32rem] w-[32rem] rounded-full bg-primary/8 blur-[120px]" />
        <div className="section-shell relative z-10">
          <div className="mb-14 text-center">
            <div className="mx-auto mb-4 w-fit border-l-2 border-primary pl-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">
              Pricing
            </div>
            <h2 className="mx-auto max-w-[760px] font-orbitron text-[2.4rem] font-black leading-[1.04] text-white md:text-[3.8rem]">
              Choose access that matches the session.
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-[1rem] leading-[1.7] text-[#8A9BB0]">
              Every tier uses the same premium delivery and support flow. Pick a product, choose a duration, and move straight into checkout.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {products.map((product) => (
              <PricingCard
                key={product.id}
                product={product}
                onDetails={(p, tierIdx) => setModalData({ product: p, tierIdx })}
                onBuy={openEmailGate}
                onPreview={setPreviewImage}
              />
            ))}
          </div>
        </div>
      </section>

      {modalProduct && (
        <div className="fixed inset-0 z-[9998] overflow-y-auto bg-[#05070a]/96 px-5 py-8 backdrop-blur-[10px]" onClick={() => setModalData(null)}>
          <div
            className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[1.1fr_0.9fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div>
              <div className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#8A9BB0]">
                Home / <span className="text-white">{modalProduct.name}</span>
              </div>

              <button
                type="button"
                onClick={() => setPreviewImage(modalProduct.thumbnail)}
                className="relative mb-5 block h-[310px] w-full overflow-hidden rounded-3xl border border-white/[0.09] bg-black/40 text-left shadow-[0_26px_90px_rgba(0,0,0,0.42)] sm:h-[360px]"
                aria-label={`Open ${modalProduct.name} preview`}
              >
                <img
                  src={modalProduct.thumbnail}
                  alt={`${modalProduct.name} interface preview`}
                  style={{ objectPosition: modalProduct.imagePosition }}
                  className="absolute inset-0 h-full w-full object-cover opacity-90 grayscale contrast-125 brightness-90"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.13),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.38),transparent_54%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.78))]" />
                <div className="absolute bottom-8 left-8 font-orbitron text-[2.4rem] font-black leading-[0.9] tracking-[-0.02em] text-white/85 sm:text-[3.3rem]">
                  {modalProduct.shortName}
                </div>
              </button>

              {modalProduct.showcase?.length > 0 && (
                <div className="mb-5 grid grid-cols-3 gap-3">
                  {modalProduct.showcase.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => setPreviewImage(src)}
                      className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/30"
                      aria-label={`Open ${modalProduct.name} proof ${index + 1}`}
                    >
                      <img src={src} alt={`${modalProduct.name} proof ${index + 1}`} className="h-[92px] w-full object-cover opacity-90 transition duration-200 hover:scale-105 sm:h-[108px]" />
                    </button>
                  ))}
                </div>
              )}

              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
                <h4 className="font-orbitron text-[1.05rem] font-bold text-white">Premium {modalProduct.name} Access</h4>
                <p className="mt-3 text-[0.95rem] leading-7 text-[#8A9BB0]">{modalProduct.desc}</p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    ["24/7", "Support"],
                    ["Fast", "Delivery"],
                    ["Live", "Updates"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-3 text-center">
                      <div className="font-orbitron text-[0.9rem] font-bold text-white">{value}</div>
                      <div className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[#8A9BB0]">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <button className="absolute right-0 top-0 rounded-xl border border-white/10 p-2 text-white/60 transition-colors hover:text-white" onClick={() => setModalData(null)} aria-label="Close">
                <X size={18} />
              </button>

              <div className="pr-12">
                <h3 className="font-orbitron text-[2.8rem] font-black leading-none text-white md:text-[3.5rem]">{modalProduct.name}</h3>
                <div className="mt-4 flex items-center gap-2 text-white/70">
                  <span className="font-orbitron text-[0.95rem] font-bold text-white">4.9</span>
                  <span className="text-[0.9rem] text-[#8A9BB0]">TrustScore</span>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <span className="text-[0.9rem] text-[#8A9BB0]">127 reviews</span>
                </div>
                <p className="mt-6 max-w-[520px] text-[1.05rem] leading-8 text-[#c5ced8]">{modalProduct.desc}</p>
              </div>

              <div className="mt-8">
                <div className="mb-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#8A9BB0]">Select duration</div>
                <div className="space-y-3">
                  {modalProduct.pricing.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setModalData((current) => ({ ...current, tierIdx: index }))}
                      className={`flex w-full items-center justify-between rounded-2xl border px-5 py-5 text-left transition-all ${
                        modalData.tierIdx === index
                          ? "border-white/35 bg-white/[0.08] shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                          : "border-white/[0.09] bg-white/[0.025] hover:border-white/22"
                      }`}
                    >
                      <span className="font-orbitron text-[1.25rem] font-black text-white">{item.label}</span>
                      <span className="font-orbitron text-[1.15rem] font-black text-white">{item.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/[0.12] bg-white/[0.055] p-6">
                <div className="font-orbitron text-[3rem] font-black leading-none text-white">{modalProduct.tier.price}</div>
                <div className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.13em] text-[#8A9BB0]">Instant delivery / secure checkout</div>
              </div>

              <div className="mt-6 grid gap-3">
                {modalProduct.highlights.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-[#c5ced8]">
                    <Check size={17} className="text-white" />
                    <span className="text-[0.95rem]">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <label className="mb-2 block text-[0.86rem] text-[#8A9BB0]">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/[0.09] bg-white/[0.035] px-4 py-4 text-white outline-none transition-colors placeholder:text-[#6f7b8a] focus:border-white/28"
                />
              </div>

              <button
                onClick={() => {
                  openEmailGate(modalData.product, modalData.tierIdx);
                  setModalData(null);
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.12] px-5 py-4 font-orbitron text-[1rem] font-bold text-white transition-all hover:bg-white/[0.18] hover:shadow-[0_0_30px_rgba(246,241,236,0.14)]"
              >
                Buy now
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
}
