import { X } from "lucide-react";

export default function PolicyModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 p-8 backdrop-blur-[6px]" onClick={onClose}>
      <div
        className="relative max-h-[85vh] w-full max-w-[720px] overflow-y-auto rounded-xl border border-primary/20 bg-[#0b0b0d] shadow-[0_32px_100px_rgba(0,0,0,0.65)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-white/10 bg-[#0b0b0d] p-6">
          <div className="font-orbitron text-[1rem] font-extrabold tracking-normal text-primary">{title}</div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 border border-white/10 bg-transparent px-3.5 py-1.5 font-mono text-[0.75rem] tracking-[0.12em] text-muted-foreground transition-all hover:border-primary hover:text-primary"
          >
            <X size={14} />
            CLOSE
          </button>
        </div>
        <div className="p-8 text-[0.9rem] leading-[1.7] text-[#94a3b8]">{children}</div>
      </div>
    </div>
  );
}
