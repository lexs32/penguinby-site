import Navbar from "@/components/penguinby/Navbar";
import Hero from "@/components/penguinby/Hero";
import StatsBar from "@/components/penguinby/StatsBar";
import Features from "@/components/penguinby/Features";
import Details from "@/components/penguinby/Details";
import Store from "@/components/penguinby/Store";
import Reviews from "@/components/penguinby/Reviews";
import Support from "@/components/penguinby/Support";
import FAQ from "@/components/penguinby/FAQ";
import Footer from "@/components/penguinby/Footer";

export default function Home() {
  const handlePointerMove = (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 36;
    const y = (event.clientY / window.innerHeight - 0.5) * 36;
    document.documentElement.style.setProperty("--mx", `${x}px`);
    document.documentElement.style.setProperty("--my", `${y}px`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground font-rajdhani" onPointerMove={handlePointerMove}>
      <div className="fixed inset-0 site-grid animate-grid-pan opacity-55 pointer-events-none" />
      <div className="fixed inset-0 noise-overlay opacity-[0.045] pointer-events-none" />
      <div className="depth-blob fixed right-[-16rem] top-[-14rem] h-[42rem] w-[42rem] rounded-full bg-white/[0.055] blur-[140px] pointer-events-none" />
      <div className="depth-blob-reverse fixed bottom-[-18rem] left-[-14rem] h-[38rem] w-[38rem] rounded-full bg-white/[0.035] blur-[140px] pointer-events-none" />
      <div className="fixed left-1/2 top-[8rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[120px] pointer-events-none" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <StatsBar />
        <Features />
        <Details />
        <Store />
        <Reviews />
        <Support />
        <FAQ />
        <div className="mx-auto flex max-w-[1180px] justify-center px-6 pb-10 sm:px-12">
          <div className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#8A9BB0]">
            K2m-WTA-P1M-
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
