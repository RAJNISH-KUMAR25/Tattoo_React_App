"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Menu,
  X,
} from "lucide-react";

/* ====== Local images (place in src/images) ====== */
import img1 from "@/images/dragon_1.jpeg";
import img2 from "@/images/dragon_2.jpeg";
import img3 from "@/images/dragon_3.jpeg";
import img4 from "@/images/dragon_4.jpeg";
import img5 from "@/images/dragon_5.jpeg";
import img6 from "@/images/dragon_6.jpg";
import img7 from "@/images/dragon_7.jpg";
import img8 from "@/images/dragon_8.jpg";
import img9 from "@/images/dragon_9.jpg";
import img10 from "@/images/dragon_10.jpg";

const IMAGES = [
  img1.src,
  img2.src,
  img3.src,
  img4.src,
  img5.src,
  img6.src,
  img7.src,
  img8.src,
  img9.src,
  img10.src,
];

const BG =
  "https://as1.ftcdn.net/v2/jpg/07/71/05/88/1000_F_771058830_Gl3e1T7akEjCRrJ7MlcSFcZxbbcpCNVB.jpg"; // blurred page BG
const PURPLE = "#6B21A8";

/* ============ Small helpers ============ */
const Section = ({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className={`relative scroll-mt-24 ${className}`}
    style={{
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
  >
    <div className="absolute inset-0 bg-black/74 backdrop-blur-[20px]" />
    <div className="relative z-10">{children}</div>
  </section>
);

/* =======================================================================
   LOADER (4s splash)
   ======================================================================= */
function LoaderScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-busy="true"
      aria-live="polite"
    >
      {/* Logo / Title */}
      <div className="flex items-center gap-3">
        <Sparkles className="h-6 w-6" style={{ color: PURPLE }} />
        <h1 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">
          Ink & Ember
        </h1>
      </div>

      {/* Spinner ring */}
      <div className="relative mt-8 h-16 w-16">
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: PURPLE,
            animation: "spin 1.1s linear infinite",
            filter: "drop-shadow(0 0 14px rgba(107,33,168,.6))",
          }}
        />
      </div>

      {/* Shimmer progress bar */}
      <div className="mt-8 w-[220px] h-2 rounded-full overflow-hidden bg-white/10">
        <div
          className="h-full w-1/2"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)",
            animation: "bar 1.6s ease-in-out infinite",
          }}
        />
      </div>

      <p className="mt-4 text-sm text-gray-400">Preparing canvas…</p>

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes bar {
          0% {
            transform: translateX(-60%);
          }
          100% {
            transform: translateX(120%);
          }
        }
      `}</style>
    </motion.div>
  );
}

/* =======================================================================
   HERO (bottom-left text + hover + shining button)
   ======================================================================= */
function HeroCarousel() {
  const [active, setActive] = React.useState(0);
  const count = IMAGES.length;

  React.useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % count), 4000); // 4s delay
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="relative w-full h-[88vh] overflow-hidden bg-[#07070a]">
      {/* blurred background from active image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center blur-[28px] brightness-[0.28] transition-[background-image] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ backgroundImage: `url(${IMAGES[active]})` }}
      />
      {/* soft vignette */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_65%_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,.55)_60%,rgba(0,0,0,.92)_100%)]" />

      {/* slides (crossfade + subtle zoom for smoothness) */}
      {IMAGES.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`hero ${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover will-change-transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
          }`}
          draggable={false}
        />
      ))}

      {/* Bottom-left text block */}
      <div className="pointer-events-none absolute bottom-10 left-6 md:left-14">
        <motion.div
          initial={{ x: -18, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="pointer-events-auto max-w-lg rounded-3xl border border-white/15 bg-black/50 backdrop-blur-xl p-5 md:p-6 shadow-[0_20px_70px_rgba(0,0,0,.65)]"
          style={{
            boxShadow: `0 1px 0 0 ${PURPLE}30 inset, 0 18px 54px -18px ${PURPLE}55`,
          }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Ink the fire. Wear your story.
          </h1>
          <p className="mt-2 text-[15px] md:text-base text-gray-200">
            Your skin is the canvas—every line a memory, every shade a roar.
          </p>

          <div className="mt-4 flex items-center gap-3">
            {/* Shining button */}
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#booking");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="relative inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white overflow-hidden"
              style={{
                backgroundColor: "rgba(107,33,168,.28)",
                border: "1px solid rgba(255,255,255,.18)",
                boxShadow: `0 0 0 1px ${PURPLE}40 inset, 0 12px 34px -12px ${PURPLE}88`,
              }}
            >
              <span className="relative z-10">Book a Session</span>
              {/* shine sweep */}
              <span
                className="pointer-events-none absolute inset-0 -skew-x-12 opacity-60"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)",
                  transform: "translateX(-120%)",
                  animation: "shine 2.2s linear infinite",
                }}
              />
              {/* pulsing outer ring */}
              <span
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 0 0 rgba(107,33,168,.55)`,
                  animation: "ringPulse 2.4s ease-out infinite",
                }}
              />
            </a>

            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#gallery");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="rounded-full px-5 py-2 text-sm font-semibold text-white border border-white/20 bg-white/10 hover:bg-white/20 transition"
            >
              View Gallery
            </a>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <button
        onClick={() => setActive((i) => (i - 1 + count) % count)}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/30 bg-white/10 text-white text-3xl leading-none hover:bg-white/20 backdrop-blur-sm"
        aria-label="Prev"
      >
        ‹
      </button>
      <button
        onClick={() => setActive((i) => (i + 1) % count)}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/30 bg-white/10 text-white text-3xl leading-none hover:bg-white/20 backdrop-blur-sm"
        aria-label="Next"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {IMAGES.map((_, i) => (
          <span
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 cursor-pointer rounded-full transition-all ${
              i === active ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* keyframes for shine + pulse */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-120%) skewX(-12deg);
          }
          100% {
            transform: translateX(120%) skewX(-12deg);
          }
        }
        @keyframes ringPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(107, 33, 168, 0.55);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(107, 33, 168, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(107, 33, 168, 0);
          }
        }
      `}</style>
    </div>
  );
}

/* ============ MARQUEE GALLERY (true infinite, 12s, opposing rows) ============ */
function MarqueeGallery() {
  const track = [...IMAGES, ...IMAGES];

  return (
    <div className="relative w-full overflow-hidden py-10 md:py-14">
      {/* edge vignette */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_60%_at_50%_50%,rgba(0,0,0,.0)_0%,rgba(0,0,0,.55)_60%,rgba(0,0,0,.9)_100%)]" />

      {/* one-liner above rows */}
      <div className="mx-auto max-w-7xl px-6 pb-6 text-center">
        <p className="text-base md:text-lg text-gray-200">
          “Every line tells a story worth wearing.”
        </p>
      </div>

      <div className="mx-auto max-w-[1400px] space-y-6 px-2 md:px-6">
        {/* Row 1 (left) */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex gap-4 md:gap-6 marquee">
            {track.map((src, i) => (
              <img
                key={`r1-${i}`}
                src={src}
                alt="gallery"
                draggable={false}
                className="h-40 md:h-56 w-auto rounded-2xl object-cover border border-white/10"
              />
            ))}
          </div>
        </div>

        {/* Row 2 (right) */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex gap-4 md:gap-6 marquee-reverse">
            {track.map((src, i) => (
              <img
                key={`r2-${i}`}
                src={src}
                alt="gallery"
                draggable={false}
                className="h-40 md:h-56 w-auto rounded-2xl object-cover border border-white/10"
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* seamless infinite */
        @keyframes marqueeX {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeXReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .marquee,
        .marquee-reverse {
          width: 200%;
          will-change: transform;
          animation-duration: 12s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee {
          animation-name: marqueeX;
        }
        .marquee-reverse {
          animation-name: marqueeXReverse;
        }
        /* Pause on hover */
        .marquee:hover,
        .marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/* ================================= PAGE (with 4s Loader) ================================= */
export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 4000); // <-- 4 seconds
    return () => clearTimeout(t);
  }, []);

  const smooth = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      {/* Loader overlay */}
      <AnimatePresence>{loading && <LoaderScreen />}</AnimatePresence>

      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => smooth(e, "#home")}
            className="flex items-center gap-2 font-semibold"
          >
            <Sparkles className="h-5 w-5" style={{ color: PURPLE }} />
            Ink & Ember
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {["Services", "Artists", "Gallery", "Booking", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={(e) => smooth(e, `#${label.toLowerCase()}`)}
                className="text-sm text-gray-300 hover:text-white"
              >
                {label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={(e) => smooth(e, "#booking")}
              className="rounded-full px-4 py-1.5 text-sm text-white"
              style={{
                backgroundColor: "rgba(107,33,168,.22)",
                border: "1px solid rgba(255,255,255,.18)",
                boxShadow: `0 0 0 1px ${PURPLE}20 inset, 0 10px 30px -10px ${PURPLE}60`,
              }}
            >
              Book Now
            </a>
          </nav>

          <button
            onClick={() => setOpen((s) => !s)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 bg-black/85 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2">
              {["Services", "Artists", "Gallery", "Booking", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={(e) => smooth(e, `#${label.toLowerCase()}`)}
                  className="py-2 text-sm text-gray-200 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <div id="home" />
      <HeroCarousel />

      {/* ===== SERVICES ===== */}
      <Section id="services" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Services</h2>
          <p className="mt-3 text-center text-gray-300">
            Premium inks. Steady hands. Timeless art.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Custom Tattoos", d: "Unique designs from concept to stencil." },
              { t: "Black & Grey", d: "Portrait realism and fine gradients." },
              { t: "Fine Line", d: "Delicate linework & minimalist styles." },
              { t: "Cover-Ups", d: "Thoughtful redesigns to honor what came before." },
              { t: "Photo Realism", d: "High-fidelity ink that captures life on skin." },
              { t: "Piercings", d: "Sterile, safe, and styled to your vibe." },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="rounded-3xl p-6 bg-white/8 backdrop-blur-xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,.55)]"
                style={{
                  boxShadow: `0 1px 0 0 ${PURPLE}30 inset, 0 18px 50px -18px ${PURPLE}50`,
                }}
              >
                <h3 className="text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-gray-300">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== ARTISTS ===== */}
      <Section id="artists" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Artists</h2>
          <p className="mt-3 text-center text-gray-300">
            Every artist has a unique style — find the one that vibes with you.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                n: "Riya Kapoor",
                r: "Fine Line / Florals",
                src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200",
              },
              {
                n: "Arjun Mehta",
                r: "Black & Grey / Portraits",
                src: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200",
              },
              {
                n: "Zara Ali",
                r: "Neo-Trad / Color",
                src: "https://images.unsplash.com/photo-1541534401786-2077eed87a74?q=80&w=1200",
              },
            ].map((a, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-3xl border border-white/15 bg-white/8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.55)]"
                style={{ boxShadow: `0 1px 0 0 ${PURPLE}30 inset, 0 18px 50px -18px ${PURPLE}50` }}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={a.src}
                    alt={a.n}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{a.n}</h3>
                  <p className="text-sm text-gray-300">{a.r}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== GALLERY (Infinite Marquee) ===== */}
      <Section id="gallery" className="py-6 md:py-10">
        <MarqueeGallery />
      </Section>

      {/* ===== BOOKING ===== */}
      <Section id="booking" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-2">
          <div
            className="rounded-3xl border border-white/15 bg-white/8 backdrop-blur-2xl p-6 shadow-[0_25px_80px_rgba(0,0,0,.6)]"
            style={{ boxShadow: `0 1px 0 0 ${PURPLE}30 inset, 0 20px 60px -20px ${PURPLE}50` }}
          >
            <h3 className="text-2xl font-semibold">Book a Consultation</h3>
            <p className="mt-2 text-gray-300 text-sm">
              Fill the form — we’ll email you within 24 hours.
            </p>
            <form
              action="https://formspree.io/f/movkpeyd"
              method="POST"
              className="mt-6 grid gap-4"
            >
              <input
                name="name"
                placeholder="Full name"
                required
                className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  required
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="artist"
                  placeholder="Preferred artist (optional)"
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
                />
                <input
                  type="date"
                  name="date"
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
                />
              </div>
              <textarea
                name="notes"
                placeholder="Describe size, placement, references…"
                className="min-h-[120px] w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-700/40"
              />
              <button
                type="submit"
                className="mt-2 rounded-full px-5 py-3 text-sm font-semibold transition"
                style={{
                  backgroundColor: "rgba(107,33,168,.22)",
                  border: "1px solid rgba(255,255,255,.18)",
                  boxShadow: `0 0 0 1px ${PURPLE}30 inset, 0 10px 30px -10px ${PURPLE}70`,
                }}
              >
                Send Booking Request
              </button>
            </form>
          </div>

          <div
            className="rounded-3xl border border-white/15 bg-white/8 backdrop-blur-2xl p-6 shadow-[0_25px_80px_rgba(0,0,0,.6)]"
            style={{ boxShadow: `0 1px 0 0 ${PURPLE}30 inset, 0 20px 60px -20px ${PURPLE}50` }}
          >
            <h3 className="text-2xl font-semibold">What to expect</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-200">
              <li>1) We’ll review your idea and check artist availability.</li>
              <li>2) You’ll get an email with time slots and a rough quote.</li>
              <li>3) A small deposit secures your appointment.</li>
            </ul>
            <div className="mt-6 grid gap-2 text-sm text-gray-300">
              <p>• Disposable needles • Hospital-grade sterilization • Certified inks</p>
              <p>• Hours: Mon–Sun 11:00 – 20:00</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== CONTACT ===== */}
      <Section id="contact" className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-3">
          <div
            className="md:col-span-2 rounded-3xl border border-white/15 bg-white/8 backdrop-blur-2xl p-0 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,.6)]"
            style={{ boxShadow: `0 1px 0 0 ${PURPLE}30 inset, 0 20px 60px -20px ${PURPLE}50` }}
          >
            <iframe
              title="Map"
              className="h-[360px] w-full border-0"
              loading="lazy"
              src="https://www.google.com/maps?q=Connaught+Place,+New+Delhi&output=embed"
            />
          </div>
          <div
            className="rounded-3xl border border-white/15 bg-white/8 backdrop-blur-2xl p-6 shadow-[0_25px_80px_rgba(0,0,0,.6)]"
            style={{ boxShadow: `0 1px 0 0 ${PURPLE}30 inset, 0 20px 60px -20px ${PURPLE}50` }}
          >
            <h3 className="text-xl font-semibold mb-3">Contact & Hours</h3>
            <p className="flex items-start gap-3 text-gray-200">
              <MapPin className="mt-[2px] h-5 w-5" style={{ color: PURPLE }} />
              2F, Regal Building, Connaught Place, New Delhi, 110001
            </p>
            <p className="mt-3 flex items-start gap-3 text-gray-200">
              <Phone className="mt-[2px] h-5 w-5" style={{ color: PURPLE }} />
              +91 98XX-XXXXXX
            </p>
            <p className="mt-3 flex items-start gap-3 text-gray-200">
              <Mail className="mt-[2px] h-5 w-5" style={{ color: PURPLE }} />
              hello@inkandember.studio
            </p>
            <div className="mt-4 flex items-center gap-4 text-gray-300">
              <Instagram className="h-5 w-5 hover:opacity-80 cursor-pointer" />
              <Facebook className="h-5 w-5 hover:opacity-80 cursor-pointer" />
            </div>
            <p className="mt-6 text-sm text-gray-400">Hours: Mon–Sun 11:00 – 20:00</p>
          </div>
        </div>
      </Section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/10 bg-black/80 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Ink & Ember Tattoo Studio. All rights reserved.
      </footer>
    </div>
  );
}
