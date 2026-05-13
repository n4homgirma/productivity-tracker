import Link from "next/link";

export const metadata = { title: "Privacy Policy · Trasck" };

const LAST_UPDATED = "May 13, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0d2137] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.08] px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-[36px] h-[36px] bg-white/10 border border-white/15 rounded-[9px] flex items-center justify-center">
            <svg className="w-[18px] h-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <span className="text-white text-xl font-bold tracking-tight">Trasck</span>
        </Link>
        <Link href="/" className="text-blue-300/60 hover:text-blue-300 text-sm transition-colors">
          Go to Home →
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10 text-white/75 leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. Information We Collect</h2>
            <p className="mb-3">When you create an account, we collect the following information:</p>
            <ul className="list-disc list-inside space-y-1.5 text-white/60 ml-2">
              <li>Your name and email address (provided directly or via Google Sign-In)</li>
              <li>Profile photo (if signing in with Google)</li>
              <li>Task and habit data you create within the app</li>
              <li>Completion records and productivity metrics</li>
            </ul>
            <p className="mt-3">We do not collect payment information directly — any subscription payments are processed by a third-party provider.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">Your information is used solely to provide and improve Trasck:</p>
            <ul className="list-disc list-inside space-y-1.5 text-white/60 ml-2">
              <li>To authenticate your account and keep it secure</li>
              <li>To store and sync your tasks and productivity data</li>
              <li>To generate your personal productivity reports</li>
              <li>To send account-related emails (e.g. password resets)</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. Data Storage</h2>
            <p>Your data is stored securely using <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Supabase</a>, which is hosted on AWS infrastructure. All data is encrypted in transit (TLS) and at rest. We retain your data for as long as your account is active. You may request deletion at any time.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. Google Sign-In</h2>
            <p>If you choose to sign in with Google, we receive your name, email address, and profile picture from Google. We do not access your Google account beyond these fields. Your use of Google Sign-In is also governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google's Privacy Policy</a>.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Cookies & Local Storage</h2>
            <p>Trasck uses cookies to maintain your authentication session. We also use browser local storage to temporarily cache your task data for offline performance. No advertising or tracking cookies are used.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-white/60 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and all associated data</li>
              <li>Export your task data at any time</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at the email below.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">7. Changes to This Policy</h2>
            <p>We may update this policy from time to time. When we do, we will update the "Last updated" date at the top and notify you by email if the changes are significant.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">8. Contact</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:n4homgirma@gmail.com" className="text-blue-400 hover:underline">n4homgirma@gmail.com</a>.</p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] mt-12 py-6 px-6 max-w-4xl mx-auto flex items-center justify-between text-white/30 text-xs">
        <span>© {new Date().getFullYear()} Trasck. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
