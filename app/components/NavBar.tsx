"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import MyAccountModal from "./MyAccountModal";

export default function NavBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState("U");
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const meta = user.user_metadata ?? {};
      const url = meta.avatar_url ?? meta.picture ?? null;
      setAvatarUrl(url);
      const name: string = meta.full_name ?? meta.name ?? user.email ?? "";
      const ini = name.split(" ").filter(Boolean).map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
      setInitials(ini || "U");
    }
    loadUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
    <nav className="flex-shrink-0 bg-[#0d2137] flex items-center justify-between px-6 py-3 w-full z-10">
      {/* Left — logo */}
      <div className="flex items-center gap-4">
        <div className="w-[43px] h-[43px] bg-white/10 border border-white/15 rounded-[10px] flex items-center justify-center">
          <svg
            className="w-[22px] h-[22px] text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </div>
        <div>
          <p className="text-white text-[28px] font-bold leading-none tracking-tight">
            Trasck
          </p>
          <p className="text-blue-300/70 text-[11px] italic mt-0.5">
            Track your Tasks · Track your Productivity
          </p>
        </div>
      </div>

      {/* Right — quote + avatar */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-white/90 text-sm font-bold leading-snug">
            &ldquo;Believe you can and you&rsquo;re halfway there.&rdquo;
          </p>
          <p className="text-blue-300/60 text-[11px] italic">
            -Theodore Roosevelt
          </p>
        </div>

        {/* Avatar + popup */}
        <div className="relative" ref={popupRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-[41px] h-[41px] rounded-full overflow-hidden border border-white/20 flex items-center justify-center text-white text-sm font-bold hover:opacity-90 transition-opacity flex-shrink-0"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="w-full h-full bg-white/15 flex items-center justify-center">{initials}</span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-[#0d2137] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
              {/* Menu items */}
              <button
                onClick={() => { setOpen(false); setAccountOpen(true); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/[0.07] hover:text-white transition-colors text-sm"
              >
                {/* User icon */}
                <svg className="w-4 h-4 flex-shrink-0 text-blue-300/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Account
              </button>

              {/* Divider */}
              <div className="h-px bg-white/[0.08] mx-3" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400/80 hover:bg-red-400/[0.07] hover:text-red-400 transition-colors text-sm"
              >
                {/* Logout icon */}
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>

    {accountOpen && <MyAccountModal onClose={() => setAccountOpen(false)} />}
    </>
  );
}
