import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, Eye, X } from "lucide-react";
import EmailGateModal from "@/components/penguinby/EmailGateModal";

const products = [
  {
    id: "arc",
    name: "Arc Raiders Pro",
    thumbnail: "https://i.postimg.cc/wxsYgZbw/download.png",
    showcase: ["https://i.postimg.cc/cLQ8Ffs7/image.png", "https://i.postimg.cc/nVgjZ3rw/image.png", "https://i.postimg.cc/nVgjZ3rw/image.png"],
    desc: "Full access to the Arc Raiders control suite with live updates, guided setup, and priority support.",
    pricing: [
      { label: "1 Day", price: "$7.99", period: "/ day", url: "https://penguinby.site/" },
      { label: "1 Week", price: "$24.99", period: "/ week", url: "https://penguinby.site/", featured: true },
      { label: "1 Month", price: "$49.99", period: "/ month", url: "https://penguinby.site/" },
    ],
    features: ["Visual ESP", "Aimbot tuning", "Loot radar", "Recoil control", "Instant delivery", "Priority updates"],
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
    thumbnail: "https://i.postimg.cc/pLBt3jcs/download.png",
    showcase: ["https://i.postimg.cc/cC8pQxQC/image.png", "https://i.postimg.cc/VsDgRQ7s/image.png", "https://i.postimg.cc/1XjpZSTt/image.png"],
    desc: "A compact premium package built for fast fulfillment, clean setup, and reliable customer access.",
    pricing: [
      { label: "1 Day", price: "$6.99", period: "/ day", url: "https://penguinby.site/" },
      { label: "1 Week", price: "$24.99", period: "/ week", url: "https://penguinby.site/", featured: true },
      { label: "1 Month", price: "$49.99", period: "/ month", url: "https://penguinby.site/" },
    ],
    features: ["Secure checkout", "Config profiles", "Fast delivery", "Live status", "Support routing", "Maintenance updates"],
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
      className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0c0c0e]/82 p-6 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-xl"
    >
      <div className="absolute right-[-8rem] top-[-8rem] h-64 w-64 rounded-full bg-white/[0.045] blur-[90px]" />
      <div className="relative z-10">
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101113]">
          <button type="button" onClick={() => onPreview(product.thumbnail)} className="relative block h-[220px] w-full text-left" aria-label={`Open ${product.name} image`}>
            <img
              src={product.thumbnail}
              alt={`${product.name} preview`}
              className="h-full w-full object-cover opacity-85 grayscale contrast-125 brightness-95 transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101113]/10 to-[#0c0c0e]" />
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
            Details
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
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/85 p-5 backdrop-blur-[10px]" onClick={() => setModalData(null)}>
          <div
            className="max-h-[90vh] w-full max-w-[820px] overflow-y-auto rounded-3xl border border-primary/20 bg-[#0b0b0d] p-7 shadow-[0_32px_100px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary">{modalProduct.tier.label} Access</div>
                <h3 className="mt-2 font-orbitron text-[2.25rem] font-black text-white">{modalProduct.name}</h3>
                <p className="mt-3 max-w-[560px] text-[0.98rem] leading-7 text-[#8A9BB0]">{modalProduct.desc}</p>
              </div>
              <button className="rounded-xl border border-white/10 p-2 text-white/60 transition-colors hover:text-white" onClick={() => setModalData(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setPreviewImage(modalProduct.thumbnail)}
              className="mb-7 block w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-black/30 text-left"
              aria-label={`Open ${modalProduct.name} preview`}
            >
              <img src={modalProduct.thumbnail} alt={`${modalProduct.name} interface preview`} className="h-[260px] w-full object-cover opacity-90 grayscale contrast-125" />
            </button>

            <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {modalProduct.details.map((detail) => (
                <div key={detail.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <div className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#8A9BB0]">{detail.label}</div>
                  <div className="mt-2 font-orbitron text-[0.95rem] font-bold text-white">{detail.value}</div>
                </div>
              ))}
            </div>

            <div className="mb-7 grid gap-2 sm:grid-cols-2">
              {modalProduct.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[#8A9BB0]">
                  <Check size={16} className="text-primary" />
                  {feature}
                </div>
              ))}
            </div>

            {modalProduct.showcase?.length > 0 && (
              <div className="mb-7 grid grid-cols-3 gap-3">
                {modalProduct.showcase.map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => setPreviewImage(src)}
                    className="overflow-hidden rounded-xl border border-white/[0.08]"
                    aria-label={`Open ${modalProduct.name} proof ${index + 1}`}
                  >
                    <img src={src} alt={`${modalProduct.name} proof ${index + 1}`} className="h-[96px] w-full object-cover opacity-90 transition duration-200 hover:scale-105" />
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                openEmailGate(modalData.product, modalData.tierIdx);
                setModalData(null);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/45 bg-primary/[0.1] px-5 py-4 font-orbitron text-[1rem] font-bold text-white transition-all hover:bg-primary/[0.18] hover:shadow-[0_0_30px_rgba(246,241,236,0.14)]"
            >
              Purchase {modalProduct.tier.price}
              <ChevronRight size={18} />
            </button>
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
