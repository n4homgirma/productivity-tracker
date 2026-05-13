import Link from "next/link";

export const metadata = { title: "Terms of Service · Trasck" };

const LAST_UPDATED = "May 13, 2026";

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-white/40 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10 text-white/75 leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>By creating an account or using Trasck, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">2. Description of Service</h2>
            <p>Trasck is a personal productivity tracking application that allows users to create, manage, and review daily tasks and habits. Features vary between the Free and Pro plans.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">3. Your Account</h2>
            <p className="mb-3">You are responsible for:</p>
            <ul className="list-disc list-inside space-y-1.5 text-white/60 ml-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Providing accurate and up-to-date account information</li>
            </ul>
            <p className="mt-3">You must be at least 13 years old to use Trasck. We reserve the right to terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">4. Acceptable Use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-white/60 ml-2">
              <li>Use Trasck for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Reverse-engineer, decompile, or otherwise attempt to extract the source code of the application</li>
              <li>Use the service in a way that could damage or overburden our infrastructure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">5. Subscription & Billing</h2>
            <p className="mb-3">Trasck offers a free tier and a paid Pro plan:</p>
            <ul className="list-disc list-inside space-y-1.5 text-white/60 ml-2">
              <li>Free plan features are available at no charge and may change over time</li>
              <li>Pro plan is billed monthly and renews automatically until cancelled</li>
              <li>Refunds are handled on a case-by-case basis — contact us within 7 days of a charge</li>
              <li>Downgrading to the free plan takes effect at the end of the current billing period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">6. Your Data</h2>
            <p>You retain ownership of all task and habit data you create in Trasck. By using the service, you grant us a limited license to store and process that data solely to provide the service to you. See our <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link> for full details.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">7. Availability & Warranty Disclaimer</h2>
            <p>Trasck is provided "as is" without warranty of any kind. We do not guarantee that the service will be uninterrupted, error-free, or available at all times. We will make reasonable efforts to maintain uptime and notify users of planned maintenance.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Trasck and its creators shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service, including loss of data.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">9. Changes to Terms</h2>
            <p>We may update these Terms from time to time. Continued use of Trasck after changes are posted constitutes your acceptance of the updated terms. We will notify you by email for material changes.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">10. Contact</h2>
            <p>Questions about these Terms? Reach us at <a href="mailto:n4homgirma@gmail.com" className="text-blue-400 hover:underline">n4homgirma@gmail.com</a>.</p>
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
