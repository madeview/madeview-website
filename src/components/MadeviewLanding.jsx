import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Play,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";

/**
 * MADEVIEW — landing page
 * ------------------------------------------------------------------
 * MADEVIEW is a production review platform, not a SaaS dashboard and
 * not a video editor. Every customer order becomes a verified
 * production record. The page leads with that emotionally (hero +
 * a real production review card), states the core identity as one
 * large typographic flow (ORDER → MATCH → MAKE → VERIFY → REVIEW),
 * then explains the mechanism quietly afterward. No fabricated
 * statistics, no AI-forward framing, no dashboard chrome — trust is
 * the strongest visual message on the page.
 * ------------------------------------------------------------------
 */

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="h-1 w-1 rounded-full bg-[#5FAE8C]" />
      <span className="font-mono text-[11px] tracking-[0.18em] text-[#8B9198] uppercase">
        {children}
      </span>
    </div>
  );
}

function FramePlaceholder() {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#22262B] bg-[#0D0F12]">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(236,237,238,0.04) 0px, rgba(236,237,238,0.04) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#14181D] via-[#0D0F12] to-[#0A0C0E]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border border-[#2E343A] bg-[#121519]/80 flex items-center justify-center">
          <Play
            className="h-4 w-4 text-[#8B9198]"
            fill="currentColor"
            strokeWidth={0}
          />
        </div>
      </div>
    </div>
  );
}

function ProductionReviewCard({ time, dish, platform, note, elevated = false }) {
  return (
    <div
      className={`rounded-xl border border-[#22262B] bg-[#121519] overflow-hidden ${
        elevated ? "shadow-2xl shadow-black/40" : "hover:border-[#2E343A] transition-colors duration-300"
      }`}
    >
      <div className="p-4">
        <FramePlaceholder />
      </div>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[#8B9198]">{time}</span>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#5FAE8C]" />
            <span className="font-mono text-[11px] text-[#5FAE8C] tracking-wide">
              VERIFIED
            </span>
          </div>
        </div>
        <div className="mt-2.5 flex items-end justify-between">
          <div>
            <div className="text-[#ECEDEE] text-base font-medium">{dish}</div>
            <div className="text-xs text-[#565C63] mt-0.5">
              Production Review
            </div>
          </div>
          {platform && (
            <span className="font-mono text-[10px] text-[#565C63]">
              {platform}
            </span>
          )}
        </div>
        {note && (
          <div className="mt-4 pt-3 border-t border-[#22262B]">
            <span className="text-xs text-[#8B9198]">{note}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const REVIEW_ORDERS = [
  { time: "14:32", dish: "모듬초밥 · 2인", platform: "배민" },
  { time: "13:58", dish: "문실장", platform: "쿠팡이츠" },
  { time: "12:41", dish: "셰프초밥", platform: "땡겨요" },
  { time: "11:20", dish: "모듬초밥 · 1인", platform: "배달특급" },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Order",
    body: "The order comes in exactly as the customer placed it — item, time, and platform.",
  },
  {
    n: "02",
    title: "Video",
    body: "Kitchen footage from that shift is captured automatically. No extra step for staff.",
  },
  {
    n: "03",
    title: "AI matching",
    body: "The order is matched to the specific clip of it being made — not a schedule guess.",
  },
  {
    n: "04",
    title: "Production events",
    body: "The moments that matter within the clip — plating, finishing, packaging — are marked.",
  },
  {
    n: "05",
    title: "Production review",
    body: "The matched, verified clip becomes the review the next customer sees.",
  },
];

const TECH_CARDS = [
  {
    title: "Order sync",
    body: "Reads orders directly from delivery platform data — items, quantities, and timestamps — with no manual entry.",
  },
  {
    title: "Vision matching",
    body: "Matches kitchen footage to a specific order using what's visibly being made, not a schedule guess.",
  },
  {
    title: "Render pipeline",
    body: "Trims and labels the matched clip automatically, then holds it for verification before it can publish.",
  },
];

const TRADITIONAL_POINTS = [
  "Photos submitted by the customer",
  "Star ratings and short comments",
  "No link to the order that produced them",
  "Nothing left to check once it's posted",
];

const PRODUCTION_POINTS = [
  "Footage from the moment the order was made",
  "Matched to the exact order it belongs to",
  "Verified before it's ever published",
  "A production record that can be checked",
];

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Reviews", href: "#reviews" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Why", href: "#why" },
    { label: "About", href: "#about" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-[#22262B] bg-[#0A0C0E]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm tracking-tight text-[#ECEDEE]">
          MADEVIEW
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#8B9198] hover:text-[#ECEDEE] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5FAE8C] rounded-sm"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#access"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-[#ECEDEE] text-[#0A0C0E] text-sm font-medium px-3.5 py-1.5 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FAE8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C0E]"
        >
          Request access
        </a>

        <button
          className="md:hidden text-[#ECEDEE] p-1.5"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="w-4 h-px bg-current mb-1" />
          <div className="w-4 h-px bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#22262B] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#8B9198]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#access" className="text-sm text-[#ECEDEE]">
            Request access →
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const titleLines = [
    "Real orders.",
    "Real production.",
    "Verified process.",
  ];

  return (
    <section
      id="top"
      className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20"
    >
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-12 items-center">
        <div>
          <motion.div>
            <h1 className="font-sans text-[2.375rem] leading-[1.08] min-[390px]:text-[2.75rem] sm:text-[3.5rem] sm:leading-[1.06] tracking-tight text-[#ECEDEE] font-semibold">
              {titleLines.map((line, index) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.6,
                          delay: 0.5 + index * 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                >
                  {line}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.55, delay: 2.3, ease: "easeOut" }
            }
          >
            <p className="mt-7 text-base sm:text-lg text-[#8B9198] max-w-md leading-relaxed">
              Every order becomes a verified production review — matched to
              the exact footage of how it was made, and checked before it's
              ever shown to the next customer.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: 2.8, ease: "easeOut" }
            }
          >
            <div className="mt-9 flex items-center gap-2 min-[390px]:gap-5">
              <a
                href="#access"
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md bg-[#ECEDEE] text-[#0A0C0E] text-sm font-medium px-3.5 min-[390px]:px-4 py-2.5 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FAE8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C0E]"
              >
                Request early access
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#how-it-works"
                className="shrink-0 whitespace-nowrap text-sm text-[#8B9198] hover:text-[#ECEDEE] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5FAE8C] rounded-sm"
              >
                See how it works
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 8 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.6,
                  delay: 3.2,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
        >
          <div className="max-w-sm mx-auto lg:mx-0 lg:ml-auto">
            <ProductionReviewCard
              time="11:28"
              dish="모듬초밥"
              note="Matched to production footage"
              elevated
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CoreFlow() {
  const shouldReduceMotion = useReducedMotion();
  const steps = ["Order", "Match", "Make", "Verify", "Review"];
  return (
    <section className="border-t border-b border-[#22262B]">
      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-3">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              return (
                <React.Fragment key={step}>
                  <motion.span
                    className={`font-mono uppercase tracking-tight text-2xl sm:text-3xl md:text-4xl font-semibold ${
                      isLast ? "text-[#5FAE8C]" : "text-[#ECEDEE]"
                    }`}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0.45, scale: 0.98 }
                    }
                    whileInView={
                      shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
                    }
                    viewport={{ once: true, amount: 0.8 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.55,
                            delay: i * 0.55,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                  >
                    {step}
                  </motion.span>
                  {!isLast && (
                    <span className="text-[#3A3F45]">
                      <ArrowDown className="h-5 w-5 md:hidden" />
                      <ArrowRight className="h-5 w-5 hidden md:block" />
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-[#8B9198] max-w-md mx-auto">
            Every order follows this exact path. Nothing is published until
            it's verified.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="border-t border-[#22262B]">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <Reveal>
          <Eyebrow>Production reviews</Eyebrow>
          <h2 className="font-sans text-2xl sm:text-3xl text-[#ECEDEE] tracking-tight max-w-lg">
            Every review, traceable to a real order.
          </h2>
          <p className="mt-3 text-[#8B9198] max-w-lg leading-relaxed">
            Each one links a customer's exact order to the footage of it
            being made — timestamped, matched, and verified before
            publishing.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {REVIEW_ORDERS.map((order, i) => (
            <Reveal key={order.dish + order.time} delay={i * 80}>
              <ProductionReviewCard
                time={order.time}
                dish={order.dish}
                platform={order.platform}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-[#22262B]">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <Reveal>
          <Eyebrow>Process</Eyebrow>
          <h2 className="font-sans text-2xl sm:text-3xl text-[#ECEDEE] tracking-tight max-w-lg">
            How a review gets made.
          </h2>
        </Reveal>

        <div className="mt-12 max-w-2xl">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <div className="flex gap-6 py-6 border-t border-[#22262B] first:border-t-0 first:pt-0">
                <span className="font-mono text-sm text-[#565C63] pt-0.5 w-6 shrink-0">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-[#ECEDEE] text-base font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#8B9198] leading-relaxed max-w-md">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyProductionReviews() {
  return (
    <section id="why" className="border-t border-[#22262B]">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <Reveal>
          <Eyebrow>Why production reviews</Eyebrow>
          <h2 className="font-sans text-2xl sm:text-3xl text-[#ECEDEE] tracking-tight max-w-lg">
            A new layer of trust, not another rating.
          </h2>
          <p className="mt-3 text-[#8B9198] max-w-lg leading-relaxed">
            Delivery platforms have relied on photos and star ratings for
            years. Production reviews replace guesswork with a record that
            can be traced back to the order itself.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid md:grid-cols-2 gap-px bg-[#22262B] rounded-xl overflow-hidden border border-[#22262B]">
            <div className="bg-[#0A0C0E] p-6 sm:p-7">
              <h3 className="font-mono text-[11px] tracking-[0.14em] text-[#565C63] uppercase mb-5">
                Traditional reviews
              </h3>
              <ul className="space-y-3.5">
                {TRADITIONAL_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-[#8B9198]"
                  >
                    <span className="mt-[7px] h-1 w-1 rounded-full bg-[#3A3F45] shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#121519] p-6 sm:p-7">
              <h3 className="font-mono text-[11px] tracking-[0.14em] text-[#5FAE8C] uppercase mb-5">
                Production reviews
              </h3>
              <ul className="space-y-3.5">
                {PRODUCTION_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-[#ECEDEE]"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#5FAE8C] mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="technology" className="border-t border-[#22262B]">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <Reveal>
          <Eyebrow>Technology</Eyebrow>
          <h2 className="font-sans text-2xl sm:text-3xl text-[#ECEDEE] tracking-tight max-w-lg">
            Built to verify, not just generate.
          </h2>
          <p className="mt-3 text-[#8B9198] max-w-lg leading-relaxed">
            MADEVIEW doesn't synthesize footage. It reads real order data and
            matches it to real kitchen footage — the system's only job is
            confirming that the two actually correspond.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {TECH_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <div className="rounded-xl border border-[#22262B] bg-[#121519] p-5 h-full hover:border-[#2E343A] transition-colors duration-300">
                <span className="font-mono text-[10px] tracking-[0.12em] text-[#565C63] uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[#ECEDEE] text-base font-medium">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-[#8B9198] leading-relaxed">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Statistics() {
  const cards = [
    { label: "Orders verified" },
    { label: "Restaurants live" },
    { label: "Avg. verification time" },
    { label: "Match accuracy" },
  ];

  return (
    <section id="statistics" className="border-t border-[#22262B]">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <Reveal>
          <Eyebrow>Live statistics</Eyebrow>
          <h2 className="font-sans text-2xl sm:text-3xl text-[#ECEDEE] tracking-tight max-w-lg">
            Numbers, once there are real ones to show.
          </h2>
          <p className="mt-3 text-[#8B9198] max-w-lg leading-relaxed">
            These figures populate automatically as restaurants go live. We'd
            rather leave this section quiet than fill it with numbers that
            aren't real yet.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 70}>
              <div className="h-full rounded-xl border border-[#22262B] bg-[#121519] p-5">
                <div className="font-mono text-2xl sm:text-3xl text-[#3A3F45]">
                  —
                </div>
                <div className="mt-1.5 text-xs text-[#8B9198]">{c.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-[#22262B]">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h2 className="font-sans text-2xl sm:text-3xl text-[#ECEDEE] tracking-tight">
              Trust, shown — not claimed.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-4 text-[#8B9198] leading-relaxed">
              <p>
                MADEVIEW started in a working kitchen, not a studio. Most
                delivery reviews are staged after the fact — reshot,
                restyled, disconnected from the order that actually went out
                the door.
              </p>
              <p>
                We built MADEVIEW to close that gap: connect the order a
                customer placed to the footage of it actually being made, and
                verify the match before anything is published. The review a
                customer sees is the order they received.
              </p>
              <p>
                It's a small, deliberate claim — but it's one the process
                checks every time, not one we ask you to take on faith.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AccessCTA() {
  return (
    <section id="access" className="border-t border-[#22262B]">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 text-center">
        <Reveal className="flex flex-col items-center">
          <h2 className="font-sans text-2xl sm:text-3xl text-[#ECEDEE] tracking-tight max-w-md">
            See your own orders, verified.
          </h2>
          <p className="mt-3 text-[#8B9198] max-w-sm">
            Early access is limited while we onboard kitchens one at a time.
          </p>
          <a
            href="mailto:hello@madeview.app"
            className="mt-7 inline-flex items-center gap-1.5 rounded-md bg-[#ECEDEE] text-[#0A0C0E] text-sm font-medium px-5 py-2.5 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FAE8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C0E]"
          >
            Request early access
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#22262B]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-[#565C63]">
          MADEVIEW — production reviews, verified.
        </span>
        <span className="font-mono text-xs text-[#565C63]">
          © {new Date().getFullYear()} MADEVIEW
        </span>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MadeviewLanding() {
  return (
    <div className="min-h-screen bg-[#0A0C0E] font-sans antialiased selection:bg-[#5FAE8C]/20 selection:text-[#ECEDEE]">
      <Nav />
      <Hero />
      <CoreFlow />
      <Reviews />
      <HowItWorks />
      <WhyProductionReviews />
      <Technology />
      <Statistics />
      <About />
      <AccessCTA />
      <Footer />
    </div>
  );
}
