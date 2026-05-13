"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Tab = "account" | "subscription";

interface Props {
  onClose: () => void;
}

const PLANS = [
  { label: "Task history & analytics", free: true, pro: true },
  { label: "Unlimited daily tasks", free: false, pro: true },
  { label: "Weekly & monthly reports", free: false, pro: true },
  { label: "Google Calendar sync", free: false, pro: true },
  { label: "Priority support", free: false, pro: true },
];

export default function MyAccountModal({ onClose }: Props) {
  const [tab, setTab] = useState<Tab>("account");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [memberSince, setMemberSince] = useState("");
  const [saved, setSaved] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const meta = user.user_metadata ?? {};
      setName(meta.full_name ?? meta.name ?? "");
      setEmail(user.email ?? "");
      setAvatarUrl(meta.avatar_url ?? meta.picture ?? null);
      if (user.created_at) {
        const d = new Date(user.created_at);
        setMemberSince(d.toLocaleDateString("en-US", { month: "long", year: "numeric" }));
      }
    }
    loadUser();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", backgroundColor: "rgba(5,15,30,0.55)" }}
    >
      <div className="w-full max-w-[500px] mx-4 bg-[#0a1e33] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-0">
          <h2 className="text-white text-lg font-bold">My Account</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mx-6 mt-5 bg-white/[0.05] rounded-xl p-1">
          {(["account", "subscription"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {t === "account" ? "Account" : "Subscription"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-5">
          {tab === "account" && (
            <div className="space-y-5">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative group w-[68px] h-[68px] flex-shrink-0">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={name}
                      className="w-[68px] h-[68px] rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-bold select-none">
                      {initials}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{name || "—"}</p>
                  <p className="text-blue-300/60 text-xs mt-0.5">{email || "—"}</p>
                  <p className="text-white/30 text-[11px] mt-1">
                    Free plan{memberSince ? ` · Member since ${memberSince}` : ""}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.07]" />

              {/* Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-blue-300/70 text-xs font-medium mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-blue-300/70 text-xs font-medium mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white/40 text-sm outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-blue-300/70 text-xs font-medium mb-1.5">
                    Password
                  </label>
                  <button className="w-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.09] rounded-xl px-4 py-2.5 text-white/60 hover:text-white/80 text-sm text-left transition-colors">
                    Change password →
                  </button>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-[#1e6fc4] hover:bg-[#1a5fa8] text-white font-semibold text-sm rounded-xl py-2.5 transition-colors"
              >
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          )}

          {tab === "subscription" && (
            <div className="space-y-4">
              {/* Current plan badge */}
              <div className="flex items-center justify-between bg-white/[0.05] border border-white/[0.08] rounded-2xl px-4 py-3">
                <div>
                  <p className="text-white/50 text-[11px] uppercase tracking-wider font-medium">Current plan</p>
                  <p className="text-white font-bold text-lg leading-tight mt-0.5">Free</p>
                </div>
                <span className="px-3 py-1 bg-white/10 text-white/60 text-xs font-medium rounded-full">
                  Active
                </span>
              </div>

              {/* Feature comparison */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="grid grid-cols-3 px-4 py-2.5 border-b border-white/[0.06]">
                  <span className="text-white/30 text-xs col-span-1" />
                  <span className="text-center text-white/40 text-xs font-medium">Free</span>
                  <span className="text-center text-blue-400 text-xs font-semibold">Pro</span>
                </div>
                {PLANS.map((f) => (
                  <div key={f.label} className="grid grid-cols-3 px-4 py-2.5 border-b border-white/[0.04] last:border-0 items-center">
                    <span className="text-white/60 text-xs col-span-1">{f.label}</span>
                    <span className="text-center">
                      {f.free
                        ? <svg className="w-4 h-4 text-green-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        : <svg className="w-4 h-4 text-white/20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      }
                    </span>
                    <span className="text-center">
                      <svg className="w-4 h-4 text-green-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f2440] border border-blue-400/20 rounded-2xl px-5 py-4">
                <p className="text-white font-bold text-sm">Upgrade to Pro</p>
                <p className="text-blue-300/70 text-xs mt-1 mb-3 leading-relaxed">
                  Unlock unlimited tasks, detailed analytics, and calendar sync.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white text-xl font-bold">$5</span>
                    <span className="text-white/40 text-xs"> / month</span>
                  </div>
                  <button className="bg-[#1e6fc4] hover:bg-[#1a5fa8] text-white font-semibold text-sm rounded-xl px-5 py-2 transition-colors">
                    Upgrade now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
