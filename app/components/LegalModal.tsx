"use client";

import { useEffect, useRef, useState } from "react";

type LegalType = "privacy" | "terms";

interface Props {
  type: LegalType;
  onClose: () => void;
}

const LAST_UPDATED = "May 13, 2026";

const PLANS = [
  { label: "Task history & analytics", free: true, pro: true },
  { label: "Unlimited daily tasks", free: false, pro: true },
  { label: "Weekly & monthly reports", free: false, pro: true },
  { label: "Google Calendar sync", free: false, pro: true },
  { label: "Priority support", free: false, pro: true },
];

function PrivacyContent() {
  return (
    <div className="space-y-8 text-white/70 leading-relaxed text-sm">
      <section>
        <h2 className="text-white text-base font-semibold mb-2">1. Information We Collect</h2>
        <p className="mb-2">When you create an account, we collect:</p>
        <ul className="list-disc list-inside space-y-1 text-white/55 ml-2">
          <li>Your name and email address (directly or via Google Sign-In)</li>
          <li>Profile photo (if signing in with Google)</li>
          <li>Task and habit data you create within the app</li>
          <li>Completion records and productivity metrics</li>
        </ul>
        <p className="mt-2">We do not collect payment information directly — payments are processed by a third-party provider.</p>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1 text-white/55 ml-2">
          <li>To authenticate your account and keep it secure</li>
          <li>To store and sync your tasks and productivity data</li>
          <li>To generate your personal productivity reports</li>
          <li>To send account-related emails (e.g. password resets)</li>
        </ul>
        <p className="mt-2">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">3. Data Storage</h2>
        <p>Your data is stored securely using Supabase, hosted on AWS infrastructure. All data is encrypted in transit (TLS) and at rest. You may request deletion at any time.</p>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">4. Google Sign-In</h2>
        <p>If you sign in with Google, we receive your name, email, and profile picture. We do not access your Google account beyond these fields.</p>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">5. Cookies & Local Storage</h2>
        <p>Trasck uses cookies to maintain your session and browser local storage to cache task data for performance. No advertising or tracking cookies are used.</p>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">6. Your Rights</h2>
        <ul className="list-disc list-inside space-y-1 text-white/55 ml-2">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your account and all associated data</li>
          <li>Export your task data at any time</li>
        </ul>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">7. Contact</h2>
        <p>Questions? Reach us at <a href="mailto:n4homgirma@gmail.com" className="text-blue-400 hover:underline">n4homgirma@gmail.com</a>.</p>
      </section>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="space-y-8 text-white/70 leading-relaxed text-sm">
      <section>
        <h2 className="text-white text-base font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>By creating an account or using Trasck, you agree to be bound by these Terms of Service.</p>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">2. Description of Service</h2>
        <p>Trasck is a personal productivity tracking app for creating, managing, and reviewing daily tasks and habits. Features vary between Free and Pro plans.</p>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">3. Your Account</h2>
        <ul className="list-disc list-inside space-y-1 text-white/55 ml-2">
          <li>You are responsible for the confidentiality of your credentials</li>
          <li>You must be at least 13 years old to use Trasck</li>
          <li>We may terminate accounts that violate these terms</li>
        </ul>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">4. Acceptable Use</h2>
        <ul className="list-disc list-inside space-y-1 text-white/55 ml-2">
          <li>Do not use Trasck for any unlawful purpose</li>
          <li>Do not attempt unauthorized access to our systems</li>
          <li>Do not reverse-engineer or decompile the application</li>
        </ul>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">5. Subscription & Billing</h2>
        <ul className="list-disc list-inside space-y-1 text-white/55 ml-2">
          <li>Free plan features are available at no charge and may change</li>
          <li>Pro plan is billed monthly and renews automatically until cancelled</li>
          <li>Refund requests handled within 7 days of a charge</li>
        </ul>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">6. Your Data</h2>
        <p>You retain ownership of all data you create. By using the service, you grant us a limited license to store and process that data solely to provide the service.</p>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">7. Warranty Disclaimer</h2>
        <p>Trasck is provided "as is" without warranty of any kind. We do not guarantee uninterrupted or error-free service.</p>
      </section>

      <section>
        <h2 className="text-white text-base font-semibold mb-2">8. Contact</h2>
        <p>Questions? Reach us at <a href="mailto:n4homgirma@gmail.com" className="text-blue-400 hover:underline">n4homgirma@gmail.com</a>.</p>
      </section>
    </div>
  );
}

export default function LegalModal({ type, onClose }: Props) {
  const [tab, setTab] = useState<LegalType>(type);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", backgroundColor: "rgba(5,15,30,0.55)" }}
    >
      <div className="w-full max-w-[560px] mx-4 bg-[#0a1e33] border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-0 flex-shrink-0">
          <h2 className="text-white text-lg font-bold">Privacy &amp; Terms</h2>
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
        <div className="flex gap-1 mx-6 mt-5 bg-white/[0.05] rounded-xl p-1 flex-shrink-0">
          {(["privacy", "terms"] as LegalType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              {t === "privacy" ? "Privacy Policy" : "Terms of Service"}
            </button>
          ))}
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-5">
          <p className="text-white/30 text-[11px] mb-5">Last updated: {LAST_UPDATED}</p>
          {tab === "privacy" ? <PrivacyContent /> : <TermsContent />}
        </div>
      </div>
    </div>
  );
}
