import React, { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export default function Admin() {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("email");
  const [value, setValue] = useState("");
  const [reason, setReason] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user?.role === "admin") loadEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadEntries = async () => {
    setLoading(true);
    const data = await base44.entities.BlockedEntry.list("-created_date", 100);
    setEntries(data);
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setAdding(true);
    setError("");
    try {
      await base44.entities.BlockedEntry.create({
        type,
        value: value.trim().toLowerCase(),
        reason: reason.trim(),
      });
      setValue("");
      setReason("");
      await loadEntries();
    } catch {
      setError("Failed to add entry.");
    }
    setAdding(false);
  };

  const handleDelete = async (id) => {
    await base44.entities.BlockedEntry.delete(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const filtered = useMemo(() => {
    if (filter === "all") return entries;
    return entries.filter((e) => e.type === filter);
  }, [entries, filter]);

  if (!user) return null;
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="font-orbitron font-black text-[2rem] text-destructive mb-3">ACCESS DENIED</div>
          <p className="font-mono text-muted-foreground text-[0.8rem] tracking-[1px]">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-[860px] mx-auto">
        <div className="mb-10">
          <div className="font-mono text-[0.65rem] text-primary tracking-[4px] uppercase mb-2 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-primary" />
            Admin Panel
          </div>
          <h1 className="font-orbitron font-extrabold text-[1.8rem] tracking-[1px]">Blocklist Manager</h1>
          <p className="text-muted-foreground font-mono text-[0.75rem] mt-1 tracking-[0.5px]">
            Block emails or IPs from starting checkout.
          </p>
        </div>

        <form onSubmit={handleAdd} className="bg-card border border-border p-6 mb-8">
          <div className="font-mono text-[0.65rem] text-primary tracking-[3px] uppercase mb-4 flex items-center gap-2">
            <span className="w-3 h-[1px] bg-primary" />
            Add to Blocklist
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-background border border-border text-foreground font-mono text-[0.78rem] px-3 py-2.5 focus:outline-none focus:border-primary sm:w-[140px]"
            >
              <option value="email">Email</option>
              <option value="ip">IP Address</option>
            </select>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={type === "email" ? "user@example.com" : "192.168.1.1"}
              className="flex-1 bg-background border border-border text-foreground font-mono text-[0.78rem] px-3 py-2.5 focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
              style={{ userSelect: "text", WebkitUserSelect: "text" }}
            />
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason (optional)"
              className="flex-1 bg-background border border-border text-foreground font-mono text-[0.78rem] px-3 py-2.5 focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
              style={{ userSelect: "text", WebkitUserSelect: "text" }}
            />
            <button
              type="submit"
              disabled={adding}
              className="bg-gradient-to-br from-primary to-accent text-background font-orbitron font-bold text-[0.72rem] tracking-[1.5px] px-5 py-2.5 uppercase clip-angled transition-all hover:-translate-y-0.5 disabled:opacity-60"
            >
              {adding ? "..." : "Block"}
            </button>
          </div>
          {error && <p className="font-mono text-destructive text-[0.7rem] mt-2">{error}</p>}
        </form>

        <div className="flex gap-2 mb-4">
          {["all", "email", "ip"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`font-mono text-[0.68rem] tracking-[1.5px] uppercase px-4 py-1.5 border transition-all ${
                filter === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {f === "all"
                ? `All (${entries.length})`
                : f === "email"
                  ? `Emails (${entries.filter((e) => e.type === "email").length})`
                  : `IPs (${entries.filter((e) => e.type === "ip").length})`}
            </button>
          ))}
        </div>

        <div className="bg-card border border-border">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 font-mono text-[0.75rem] text-muted-foreground tracking-[1px]">
              NO ENTRIES FOUND
            </div>
          ) : (
            filtered.map((entry, idx) => (
              <div
                key={entry.id}
                className={`flex items-center gap-4 px-5 py-4 ${idx !== filtered.length - 1 ? "border-b border-border" : ""}`}
              >
                <span
                  className={`font-mono text-[0.6rem] tracking-[1.5px] border px-2 py-[2px] min-w-[56px] text-center ${
                    entry.type === "email"
                      ? "text-accent border-accent/30 bg-accent/5"
                      : "text-destructive border-destructive/30 bg-destructive/5"
                  }`}
                >
                  {String(entry.type).toUpperCase()}
                </span>
                <span className="font-mono text-[0.8rem] text-foreground flex-1 break-all">{entry.value}</span>
                {entry.reason && (
                  <span className="font-mono text-[0.68rem] text-muted-foreground hidden sm:block max-w-[180px] truncate">
                    {entry.reason}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="font-mono text-[0.65rem] text-destructive border border-destructive/30 px-3 py-1 tracking-[1px] hover:bg-destructive/10 transition-all uppercase ml-auto"
                >
                  Unblock
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

