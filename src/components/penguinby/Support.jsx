import { motion } from "framer-motion";
import { Clock, Mail, MessageCircle, Signal, Ticket } from "lucide-react";

const channels = [
  { icon: MessageCircle, name: "Discord", desc: "Fastest path for setup help and account questions.", status: "Online", url: "https://discord.gg/HtSVra2rFS" },
  { icon: Ticket, name: "Ticket System", desc: "Use tickets for purchase, delivery, and technical issues.", status: "Online", url: "https://discord.gg/HtSVra2rFS" },
  { icon: Mail, name: "Email", desc: "support.penguinby@gmail.com", status: "24/7", url: "mailto:support.penguinby@gmail.com" },
];

const statuses = [
  ["Arc Raiders Pro", "Operational"],
  ["R6 Pro", "Operational"],
  ["Checkout", "Operational"],
  ["Delivery", "Operational"],
];

export default function Support() {
  return (
    <section id="support" className="relative overflow-hidden bg-[#080808]/90 px-6 py-24 sm:px-12">
      <div className="absolute right-[-16rem] bottom-[-12rem] h-[34rem] w-[34rem] rounded-full bg-primary/8 blur-[130px]" />
      <div className="section-shell relative z-10 grid gap-7 lg:grid-cols-[1fr_0.86fr]">
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3 border-l-2 border-primary pl-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">
            Support
          </div>
          <h2 className="max-w-[680px] font-orbitron text-[2.25rem] font-black leading-[1.04] text-white md:text-[3.4rem]">
            Clear help paths before and after checkout.
          </h2>
          <p className="mt-5 max-w-[620px] text-[1rem] leading-[1.7] text-[#8A9BB0]">
            The support area is now a real product surface, with quick channels and operational confidence in one place.
          </p>

          <div className="mt-8 grid gap-3">
            {channels.map((channel, index) => (
              <motion.a
                key={channel.name}
                href={channel.url}
                target={channel.url.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#0d0d0f]/80 p-5 no-underline transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white/[0.045]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.07] text-primary">
                  <channel.icon size={21} />
                </div>
                <div>
                  <div className="font-orbitron text-[1.05rem] font-bold text-white">{channel.name}</div>
                  <div className="mt-1 text-[0.92rem] text-[#8A9BB0]">{channel.desc}</div>
                </div>
                <div className="ml-auto hidden items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(246,241,236,0.55)]" />
                  {channel.status}
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-primary/15 bg-[#0d0d0f]/80 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.35),0_0_50px_rgba(246,241,236,0.05)] backdrop-blur-xl">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary">Status</div>
              <h3 className="mt-2 font-orbitron text-[1.55rem] font-black text-white">Product Health</h3>
            </div>
            <Signal className="text-primary" size={28} />
          </div>

          <div className="space-y-3">
            {statuses.map(([name, status]) => (
              <div key={name} className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[#8A9BB0]">{name}</span>
                <span className="font-orbitron text-[0.95rem] font-bold text-white">{status}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/[0.055] p-5">
            <Clock className="mb-4 text-primary" size={24} />
            <div className="font-orbitron text-[2rem] font-black leading-none text-white">&lt; 10 min</div>
            <p className="mt-3 text-[0.92rem] leading-6 text-[#8A9BB0]">Target response time during active support windows.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
