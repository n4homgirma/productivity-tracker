import Link from "next/link";

export const metadata = {
  title: "Trasck — Track your Tasks · Track your Productivity",
  description: "Trasck helps you build better habits, complete daily tasks, and visualise your productivity over time.",
};

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Daily Task Tracking",
    description: "Add and complete tasks day by day. Each day is its own slate — nothing carries over unless you want it to.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Weekly & Monthly Views",
    description: "See your progress at a glance. Weekly progress bars and a monthly calendar give you the full picture.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Productivity Insights",
    description: "Track streaks, completion rates, and year-over-year trends to understand how productive you really are.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Plan Ahead",
    description: "Schedule tasks for upcoming days in plan mode. History mode lets you review and reflect on past days.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "Synced Everywhere",
    description: "Your data is stored securely in the cloud. Sign in from any device and pick up right where you left off.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: "Smart Reminders",
    description: "Never miss a task. Upcoming reminders and streak alerts keep you accountable without being annoying.",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to get started with daily productivity.",
    cta: "Get Started",
    ctaHref: "/login",
    highlight: false,
    features: [
      "Daily task tracking",
      "Weekly progress view",
      "Monthly calendar",
      "Task history",
      "Cloud sync",
    ],
    missing: [
      "Unlimited tasks per day",
      "Weekly & monthly reports",
      "Google Calendar sync",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    price: "$5",
    period: "per month",
    description: "For people serious about their productivity.",
    cta: "Upgrade to Pro",
    ctaHref: "/login",
    highlight: true,
    features: [
      "Everything in Free",
      "Unlimited tasks per day",
      "Weekly & monthly reports",
      "Annual productivity report",
      "Google Calendar sync",
      "Priority support",
    ],
    missing: [],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d2137] text-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0d2137]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] bg-white/10 border border-white/15 rounded-[9px] flex items-center justify-center">
              <svg className="w-[18px] h-[18px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <span className="text-white text-xl font-bold tracking-tight">Trasck</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-white/70 hover:text-white text-sm transition-colors">
              Sign in
            </Link>
            <Link href="/login" className="bg-[#1e6fc4] hover:bg-[#1a5fa8] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-1.5 text-blue-300 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Now in early access
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">
          Track your tasks.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Own your day.
          </span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Trasck is a clean, focused productivity tracker that helps you build daily habits, complete tasks, and understand your productivity over time.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/login" className="bg-[#1e6fc4] hover:bg-[#1a5fa8] text-white font-semibold px-8 py-3.5 rounded-2xl text-base transition-colors">
            Start for free
          </Link>
          <a href="#features" className="bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-white font-medium px-8 py-3.5 rounded-2xl text-base transition-colors">
            See how it works
          </a>
        </div>

        {/* Hero visual */}
        <div className="mt-16 relative">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0d2137] to-transparent z-10" />
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
              {/* Monthly column mock */}
              <div className="bg-[#fff4f0]/5 border border-orange-300/10 rounded-2xl p-4">
                <p className="text-orange-300/70 text-xs font-semibold uppercase tracking-wider mb-3">Monthly</p>
                <div className="space-y-1.5">
                  {[90, 75, 60, 85, 70].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-orange-400/20 flex items-center justify-center text-[9px] text-orange-300/70">{i + 1}</div>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400/40 rounded-full" style={{ width: `${w}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Weekly column mock */}
              <div className="bg-blue-400/[0.03] border border-blue-400/10 rounded-2xl p-4">
                <p className="text-blue-300/70 text-xs font-semibold uppercase tracking-wider mb-3">Weekly</p>
                <div className="space-y-1.5">
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
                    <div key={d} className="flex items-center gap-2">
                      <span className="text-[10px] text-white/30 w-6">{d}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400/50 rounded-full" style={{ width: `${[80, 100, 60, 90, 45][i]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Daily column mock */}
              <div className="bg-green-400/[0.03] border border-green-400/10 rounded-2xl p-4">
                <p className="text-green-300/70 text-xs font-semibold uppercase tracking-wider mb-3">Today</p>
                <div className="space-y-2">
                  {["Deep work session", "Morning run", "Read 30 min", "Plan tomorrow"].map((t, i) => (
                    <div key={t} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${i < 2 ? "bg-green-400/30 border-green-400/50" : "border-white/20"}`}>
                        {i < 2 && <svg className="w-2.5 h-2.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-[11px] ${i < 2 ? "line-through text-white/30" : "text-white/60"}`}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need. Nothing you don&apos;t.</h2>
          <p className="text-white/50 max-w-xl mx-auto">Trasck is intentionally simple — powerful enough to see real results, clean enough to actually use every day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6 hover:bg-white/[0.06] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 mb-4">
                {f.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24 border-t border-white/[0.06]">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, honest pricing</h2>
          <p className="text-white/50 max-w-xl mx-auto">Start free. Upgrade when you&apos;re ready. No hidden fees, no gotchas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-gradient-to-br from-[#1e3a5f] to-[#0f2440] border border-blue-400/30"
                  : "bg-white/[0.04] border border-white/[0.08]"
              }`}
            >
              {plan.highlight && (
                <div className="self-start mb-4 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <p className="text-white/60 text-sm font-medium mb-1">{plan.name}</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-white/40 text-sm mb-1">/ {plan.period}</span>
              </div>
              <p className="text-white/50 text-sm mb-6">{plan.description}</p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/25">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`w-full text-center font-semibold text-sm py-3 rounded-xl transition-colors ${
                  plan.highlight
                    ? "bg-[#1e6fc4] hover:bg-[#1a5fa8] text-white"
                    : "bg-white/[0.08] hover:bg-white/[0.13] text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24 border-t border-white/[0.06]">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
        </div>

        <div className="space-y-4">
          {[
            { q: "Is Trasck really free?", a: "Yes. The free plan has no time limit and includes everything you need to track daily tasks, view weekly progress, and browse your history. You only upgrade if you want advanced features like reports and calendar sync." },
            { q: "Can I use Trasck across multiple devices?", a: "Absolutely. Sign in with your account on any device and your tasks, completions, and history are all synced instantly via the cloud." },
            { q: "What happens to my data if I cancel Pro?", a: "You keep all your data. Cancelling Pro moves you to the Free plan at the end of your billing period. Nothing is deleted." },
            { q: "Does Trasck work offline?", a: "Trasck caches your data locally so you can view and interact with your tasks without internet. Changes sync automatically when you reconnect." },
            { q: "How do I delete my account?", a: "You can request full account and data deletion at any time by reaching out to us at n4homgirma@gmail.com. We'll handle it within 48 hours." },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl px-6 py-5">
              <p className="text-white font-medium mb-2">{q}</p>
              <p className="text-white/50 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-6xl mx-auto px-6 py-12 pb-24">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f2440] border border-blue-400/20 rounded-3xl px-8 py-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to take back your day?</h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">Join Trasck and start building the productive habits you&apos;ve always wanted.</p>
          <Link href="/login" className="inline-block bg-[#1e6fc4] hover:bg-[#1a5fa8] text-white font-semibold px-10 py-3.5 rounded-2xl text-base transition-colors">
            Get started for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white/10 rounded-md flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <span>© {new Date().getFullYear()} Trasck. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <a href="mailto:n4homgirma@gmail.com" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
