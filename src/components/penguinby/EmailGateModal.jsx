import React, { useEffect, useRef, useState } from "react";
import { Bitcoin, CreditCard, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAADLASpI4vxGrly6M";

const RATE_LIMIT_KEY = "penguinby_purchase_attempts";
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000;
const COOLDOWN_MS = 2_000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkRateLimit() {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const attempts = raw ? JSON.parse(raw).filter((t) => now - t < WINDOW_MS) : [];
    if (attempts.length >= MAX_ATTEMPTS) {
      const wait = Math.ceil((WINDOW_MS - (now - attempts[0])) / 1000);
      return { ok: false, message: `Too many attempts. Try again in ${wait}s.` };
    }
    if (attempts.length > 0 && now - attempts[attempts.length - 1] < COOLDOWN_MS) {
      return { ok: false, message: "Please wait a moment before retrying." };
    }
    attempts.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(attempts));
    return { ok: true };
  } catch {
    return { ok: true };
  }
}

export default function EmailGateModal({ product, tier, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [payMethod, setPayMethod] = useState("card");
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const getTs = () => window["turnstile"];
    const render = () => {
      const ts = getTs();
      if (cancelled || !turnstileRef.current || !ts || widgetIdRef.current) return;
      widgetIdRef.current = ts.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        size: "flexible",
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    };
    if (getTs()) render();
    else {
      const interval = setInterval(() => {
        if (getTs()) {
          clearInterval(interval);
          render();
        }
      }, 200);
      return () => {
        cancelled = true;
        clearInterval(interval);
        const ts = getTs();
        if (widgetIdRef.current && ts) ts.remove(widgetIdRef.current);
      };
    }
    return () => {
      cancelled = true;
      const ts = getTs();
      if (widgetIdRef.current && ts) ts.remove(widgetIdRef.current);
    };
  }, []);

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (loading) return;

    const normalized = email.toLowerCase().trim();
    if (!normalized || !EMAIL_RE.test(normalized) || normalized.length > 254) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!turnstileToken) {
      setError("Please complete the verification.");
      return;
    }

    const rl = checkRateLimit();
    if (!rl.ok) {
      setError(rl.message);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const blocked = await base44.entities.BlockedEntry.filter({ type: "email", value: normalized });
      if (blocked && blocked.length > 0) {
        setError("This email is not eligible to make purchases.");
        setLoading(false);
        return;
      }
      const target = payMethod === "crypto" && tier.cryptoUrl ? tier.cryptoUrl : tier.url;
      window.open(target, "_blank", "noopener,noreferrer");
      onClose();
    } catch {
      const target = payMethod === "crypto" && tier.cryptoUrl ? tier.cryptoUrl : tier.url;
      window.open(target, "_blank", "noopener,noreferrer");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/85 p-6 backdrop-blur-[8px]" onClick={onClose}>
      <div
        className="relative w-full max-w-[430px] rounded-xl border border-primary/20 bg-[#0b0b0d] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.65)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-3 bg-primary" />
            Checkout
          </div>
          <h3 className="font-orbitron text-[1.4rem] font-black tracking-normal text-white">{product.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-orbitron text-[1.15rem] font-black tracking-normal text-primary">{tier.price}</span>
            <span className="font-mono text-[0.65rem] text-muted-foreground">{tier.period}</span>
            <span className="ml-auto rounded border border-primary/30 bg-primary/5 px-2 py-[2px] font-mono text-[0.6rem] text-primary">
              {tier.label}
            </span>
          </div>
        </div>

        <form onSubmit={handlePurchase} className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">Your Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoFocus
              className="w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 font-mono text-[0.85rem] text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              style={{ userSelect: "text", WebkitUserSelect: "text" }}
            />
            {error && <div className="mt-2 font-mono text-[0.7rem] text-destructive">{error}</div>}
          </div>

          <div>
            <label className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPayMethod("card")}
                className={`flex items-center justify-center gap-2 rounded-md border px-3 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-all ${
                  payMethod === "card"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/10 bg-black/25 text-muted-foreground hover:border-white/25 hover:text-white"
                }`}
              >
                <CreditCard size={14} />
                Card
              </button>
              <button
                type="button"
                onClick={() => setPayMethod("crypto")}
                disabled={!tier.cryptoUrl}
                className={`flex items-center justify-center gap-2 rounded-md border px-3 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                  payMethod === "crypto"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/10 bg-black/25 text-muted-foreground hover:border-white/25 hover:text-white"
                }`}
              >
                <Bitcoin size={14} />
                Crypto
              </button>
            </div>
          </div>

          <div ref={turnstileRef} className="min-h-[65px]" />

          <p className="font-mono text-[0.65rem] leading-[1.6] text-muted-foreground">Your email is used for order delivery and support only.</p>

          <div className="mt-1 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-white/10 px-3 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-primary px-3 py-2.5 font-orbitron text-[0.86rem] font-bold tracking-normal text-background transition-all hover:-translate-y-0.5 hover:bg-stone-200 hover:shadow-[0_0_24px_rgba(246,241,236,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "..." : "Purchase"}
            </button>
          </div>
        </form>

        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-primary" aria-label="Close">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
