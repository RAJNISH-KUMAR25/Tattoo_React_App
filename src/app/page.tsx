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

/* ====== Local JPEGs in /public/prince ====== */
const IMAGES = [
  "/prince/dragon_1.jpeg",
  "/prince/dragon_2.jpeg",
  "/prince/dragon_3.jpeg",
  "/prince/dragon_4.jpeg",
  "/prince/dragon_5.jpeg",
  "/prince/dragon_6.jpeg",
  "/prince/dragon_7.jpeg",
  "/prince/dragon_8.jpeg",
  "/prince/dragon_9.jpeg",
  "/prince/dragon_10.jpeg",
];

const BG =
  "https://as1.ftcdn.net/v2/jpg/07/71/05/88/1000_F_771058830_Gl3e1T7akEjCRrJ7MlcSFcZxbbcpCNVB.jpg";
const PURPLE = "#6B21A8";

/* ---------- Shared frame styles ---------- */
const baseFrame = "border border-white/15 bg-white/[0.06] backdrop-blur-xl";
const frameRounded = `rounded-3xl ${baseFrame}`;
const frameSquare = `rounded-none ${baseFrame}`;

/* ===================== ALWAYS-VISIBLE HEADER (fixed) ===================== */
function useHeaderElevated() {
  const [elevated, setElevated] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setElevated((window.scrollY || 0) > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return elevated;
}

const NAV = [
  "Announcements",
  "Services",
  "Artists",
  "Gallery",
  "Pricing",
  "Booking",
  "Contact",
];

function HeaderBar({ onSmooth }: { onSmooth: (e: any, href: string) => void }) {
  const elevated = useHeaderElevated();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        elevated
          ? "bg-black/60 backdrop-blur-md border-b border-white/10"
          : "bg-black/30 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center px-4 md:px-6 py-3">
        <div className="justify-self-start">
          <a
            href="#home"
            onClick={(e) => onSmooth(e, "#home")}
            className="inline-flex items-center gap-2 text-base md:text-lg font-semibold"
          >
            <Sparkles className="h-5 w-5 text-purple-500" />
            Prince Tattoo
          </a>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-6">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => onSmooth(e, `#${item.toLowerCase()}`)}
              className="text-sm text-gray-200/90 hover:text-white transition"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="justify-self-end flex items-center gap-3">
          <a
            href="#booking"
            onClick={(e) => onSmooth(e, "#booking")}
            className="hidden md:inline-block rounded-full px-4 py-1.5 text-sm bg-purple-700/25 border border-white/20"
          >
            Book Now
          </a>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="md:hidden text-white hover:text-purple-400"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`${frameSquare} border-t border-white/15 bg-black/70 px-4 md:px-6 md:hidden`}
          >
            <div className="mx-auto max-w-7xl py-3 flex flex-col gap-2">
              {NAV.map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={(e) => onSmooth(e, `#${label.toLowerCase()}`)}
                  className="py-2 text-sm text-gray-100 hover:text-white"
                >
                  {label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={(e) => onSmooth(e, "#booking")}
                className="py-2 text-sm text-gray-100 hover:text-white"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ============ Section wrapper ============ */
const Section = ({
  id,
  children,
  className = "",
  isGallery = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  isGallery?: boolean;
}) => (
  <section
    id={id}
    className={`relative min-h-screen py-14 flex items-center justify-center snap-start overflow-x-hidden scroll-mt-24 ${className}`}
    style={{
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
  >
    <div className="absolute inset-0 bg-black/70 backdrop-blur-[14px]" />
    <div className="relative z-10 w-full">
      {isGallery ? (
        children
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={frameRounded + " p-6 md:p-8"}>{children}</div>
        </div>
      )}
    </div>
  </section>
);

/* ============ HERO (Fullscreen Carousel) ============ */
function HeroCarousel() {
  const [active, setActive] = React.useState(0);
  const count = IMAGES.length;

  React.useEffect(() => {
    const starter = setTimeout(() => {
      const id = setInterval(() => setActive((i) => (i + 1) % count), 5000);
      (window as any).__heroInterval = id;
    }, 3000);
    return () => {
      clearTimeout(starter);
      if ((window as any).__heroInterval) clearInterval((window as any).__heroInterval);
    };
  }, [count]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black snap-start">
      {IMAGES.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`hero ${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          draggable={false}
        />
      ))}

      <div className="absolute left-8 bottom-12 md:left-14">
        <div
          className={`${frameRounded} max-w-xl px-6 py-5 md:px-7 md:py-6 bg-black/55 border-white/20`}
          style={{ boxShadow: `0 1px 0 0 ${PURPLE}30 inset` }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Prince Tattoo • Patna
          </h1>
          <p className="mt-2 text-gray-200">
            Custom designs • Hygienic setup • Skilled artists
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="#booking"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white"
              style={{
                backgroundColor: "rgba(107,33,168,.22)",
                border: "1px solid rgba(255,255,255,.18)",
              }}
            >
              Book Now
            </a>
            <a
              href="#gallery"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white/90 border border-white/25 bg-white/10 hover:bg-white/20 transition"
            >
              Gallery
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => setActive((i) => (i - 1 + count) % count)}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/30 bg-white/15 text-white text-3xl leading-none hover:bg-white/25 backdrop-blur-sm"
        aria-label="Prev"
      >
        ‹
      </button>
      <button
        onClick={() => setActive((i) => (i + 1) % count)}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/30 bg-white/15 text-white text-3xl leading-none hover:bg-white/25 backdrop-blur-sm"
        aria-label="Next"
      >
        ›
      </button>

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
    </div>
  );
}

/* ============ 3D Spotlight Gallery ============ */
function SpotlightGallery() {
  const [index, setIndex] = React.useState(0);
  const n = IMAGES.length;

  React.useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % n), 5000);
    return () => clearInterval(interval);
  }, [n]);

  const getOffset = (i: number) => {
    let offset = i - index;
    if (offset > n / 2) offset -= n;
    if (offset < -n / 2) offset += n;
    return offset;
  };

  const getStyle = (offset: number): React.CSSProperties => {
    const isCenter = offset === 0;
    const scale = isCenter ? 1 : 0.78;
    const rotate = offset * -28;
    const translate = offset * 62;
    return {
      transform: `translateX(${translate}%) rotateY(${rotate}deg) scale(${scale})`,
      zIndex: n - Math.abs(offset),
      opacity: Math.abs(offset) <= 2 ? 1 : 0,
      filter: isCenter ? "brightness(1)" : "brightness(0.55)",
      transition: "transform 0.85s ease, opacity 0.85s ease, filter 0.6s ease",
    };
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-x-hidden">
      <div
        className="relative w-full h-[70vh] flex items-center justify-center overflow-visible"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {IMAGES.map((src, i) => {
          const offset = getOffset(i);
          return (
            <div
              key={i}
              style={getStyle(offset)}
              className="absolute w-[46vmin] h-[62vmin] rounded-3xl overflow-hidden border border-white/10"
            >
              <img
                src={src}
                alt={`tattoo-${i}`}
                className="w-full h-full object-cover block"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setIndex((i) => (i - 1 + n) % n)}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/20 backdrop-blur-sm"
        >
          ‹ Prev
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % n)}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/20 backdrop-blur-sm"
        >
          Next ›
        </button>
      </div>
    </div>
  );
}

/* ======================= INTERACTIVE FOOTER (Compact height) ======================= */
function InteractiveFooter() {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--mx", String(x));
    el.style.setProperty("--my", String(y));
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };
  const handleShapeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    target.classList.add("slashed");
    setTimeout(() => target.classList.remove("slashed"), 500);
  };

  const shapes = [
    { t: "circle", left: "6%", top: "28%", s: 36, col: "236,72,153", k: 0.9 },
    { t: "square", left: "12%", top: "16%", s: 24, col: "99,102,241", k: 0.6 },
    { t: "hex", left: "18%", top: "34%", s: 28, col: "14,165,233", k: 0.7 },
    { t: "diamond", left: "22%", top: "20%", s: 24, col: "34,197,94", k: 0.8 },
    { t: "triangle", left: "28%", top: "40%", s: 32, col: "245,158,11", k: 1.0 },
    { t: "star", left: "34%", top: "18%", s: 28, col: "59,130,246", k: 0.7 },
    { t: "circle", left: "40%", top: "34%", s: 22, col: "250,204,21", k: 0.6 },
    { t: "square", left: "46%", top: "22%", s: 26, col: "168,85,247", k: 0.7 },
    { t: "diamond", left: "52%", top: "38%", s: 24, col: "20,184,166", k: 0.5 },
    { t: "hex", left: "58%", top: "26%", s: 30, col: "244,63,94", k: 0.9 },
    { t: "triangle", left: "64%", top: "42%", s: 24, col: "147,51,234", k: 0.8 },
    { t: "star", left: "70%", top: "20%", s: 30, col: "34,197,94", k: 0.7 },
    { t: "circle", left: "76%", top: "36%", s: 30, col: "56,189,248", k: 0.9 },
    { t: "square", left: "82%", top: "24%", s: 22, col: "251,146,60", k: 0.6 },
    { t: "diamond", left: "10%", bottom: "14%", s: 20, col: "236,72,153", k: 0.6 },
    { t: "hex", left: "18%", bottom: "18%", s: 22, col: "99,102,241", k: 0.7 },
    { t: "triangle", left: "30%", bottom: "12%", s: 28, col: "14,165,233", k: 0.8 },
    { t: "star", left: "42%", bottom: "16%", s: 26, col: "245,158,11", k: 0.7 },
    { t: "circle", left: "54%", bottom: "14%", s: 20, col: "59,130,246", k: 0.5 },
    { t: "square", left: "66%", bottom: "18%", s: 24, col: "250,204,21", k: 0.6 },
    { t: "diamond", left: "78%", bottom: "12%", s: 28, col: "168,85,247", k: 0.9 },
    { t: "hex", left: "90%", bottom: "16%", s: 22, col: "34,197,94", k: 0.6 },   
    { t: "circle", left: "6%", top: "28%", s: 36, col: "236,72,153", k: 0.9 },
    { t: "square", left: "12%", top: "16%", s: 24, col: "99,102,241", k: 0.6 },
    { t: "hex", left: "18%", top: "34%", s: 28, col: "14,165,233", k: 0.7 },
    { t: "diamond", left: "22%", top: "20%", s: 24, col: "34,197,94", k: 0.8 },
    { t: "triangle", left: "28%", top: "40%", s: 32, col: "245,158,11", k: 1.0 },
    { t: "star", left: "34%", top: "18%", s: 28, col: "59,130,246", k: 0.7 },
    { t: "circle", left: "40%", top: "34%", s: 22, col: "250,204,21", k: 0.6 },
    { t: "square", left: "46%", top: "22%", s: 26, col: "168,85,247", k: 0.7 },
    { t: "diamond", left: "52%", top: "38%", s: 24, col: "20,184,166", k: 0.5 },
    { t: "hex", left: "58%", top: "26%", s: 30, col: "244,63,94", k: 0.9 },
    { t: "triangle", left: "64%", top: "42%", s: 24, col: "147,51,234", k: 0.8 },
    { t: "star", left: "70%", top: "20%", s: 30, col: "34,197,94", k: 0.7 },
    { t: "circle", left: "76%", top: "36%", s: 30, col: "56,189,248", k: 0.9 },
    { t: "square", left: "82%", top: "24%", s: 22, col: "251,146,60", k: 0.6 },
    { t: "diamond", left: "10%", bottom: "14%", s: 20, col: "236,72,153", k: 0.6 },
    { t: "hex", left: "18%", bottom: "18%", s: 22, col: "99,102,241", k: 0.7 },
    { t: "triangle", left: "30%", bottom: "12%", s: 28, col: "14,165,233", k: 0.8 },
    { t: "star", left: "42%", bottom: "16%", s: 26, col: "245,158,11", k: 0.7 },
    { t: "circle", left: "54%", bottom: "14%", s: 20, col: "59,130,246", k: 0.5 },
    { t: "square", left: "66%", bottom: "18%", s: 24, col: "250,204,21", k: 0.6 },
    { t: "diamond", left: "78%", bottom: "12%", s: 28, col: "168,85,247", k: 0.9 },
    { t: "hex", left: "90%", bottom: "16%", s: 22, col: "34,197,94", k: 0.6 },
  ] as const;

  return (
    <footer
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 select-none border-t border-white/15"
      style={{ "--mx": 0, "--my": 0 } as React.CSSProperties}
    >
      {/* Background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(100% 120% at 50% 100%, rgba(107,33,168,.18), rgba(0,0,0,.95))",
        }}
      />

      {/* Shapes Layer */}
      <div className="absolute inset-0 z-0">
        {shapes.map((s, i) => {
          const pos: React.CSSProperties = {
            ...(s as any).left ? { left: (s as any).left } : {},
            ...(s as any).top ? { top: (s as any).top } : {},
            ...(s as any).bottom ? { bottom: (s as any).bottom } : {},
            width: s.s,
            height: s.s,
            background: `linear-gradient(145deg, rgba(${s.col},.9), rgba(${s.col},.3))`,
            border: "1px solid rgba(255,255,255,.18)",
            boxShadow: `0 0 ${Math.max(8, s.s / 2)}px rgba(${s.col},.4)`,
            transform: `translate(calc(var(--mx) * ${s.k * 20}px), calc(var(--my) * ${
              s.k * -14
            }px))`,
            transition: "transform 120ms linear",
          };
          const cls =
            s.t === "circle"
              ? "pt-circle"
              : s.t === "square"
              ? "pt-square"
              : s.t === "triangle"
              ? "pt-triangle"
              : s.t === "diamond"
              ? "pt-diamond"
              : s.t === "hex"
              ? "pt-hex"
              : "pt-star";
          return (
            <div
              key={i}
              className={`absolute cursor-pointer ${cls}`}
              style={pos}
              onClick={handleShapeClick}
            />
          );
        })}
      </div>

      {/* Crystal Panel (Compact) */}
      <div className="relative z-10 flex justify-center">
        <div
          className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl px-5 py-3 md:px-6 md:py-4 shadow-[0_6px_25px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))",
          }}
        >
          <div className="text-center">
            <p className="text-sm text-gray-100">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white">Prince Tattoo</span> • All rights reserved.
            </p>
            <p className="mt-1 text-xs text-gray-300">Hover or click on the shapes ✨</p>
          </div>
        </div>
      </div>

      {/* Shape blueprints */}
      <style jsx>{`
        .pt-circle { border-radius: 9999px; }
        .pt-square { border-radius: 10px; }
        .pt-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
        .pt-diamond { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
        .pt-hex { clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%); }
        .pt-star {
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 72%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
        }
        [class*="pt-"] { position: absolute; overflow: hidden; }
        [class*="pt-"]::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1.5px;
          height: 140%;
          background-color: rgba(255, 255, 255, 0.9);
          transform-origin: center;
          transform: translate(-50%, -50%) rotate(45deg) scaleY(0);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .slashed::after { transform: translate(-50%, -50%) rotate(45deg) scaleY(1); }
      `}</style>
    </footer>
  );
}

/* ======================= PAGE ======================= */
export default function Page() {
  const smooth = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-[#0b0c0e] text-white">
      <style jsx global>{`
        html, body { overflow-x: hidden; }
      `}</style>

      <HeaderBar onSmooth={smooth} />

      {/* HERO */}
      <div id="home" className="snap-start">
        <HeroCarousel />
      </div>

      {/* ANNOUNCEMENTS */}
      <Section id="announcements">
        <div className="flex flex-col md:flex-row gap-6">
          <div className={frameRounded + " p-6 flex-1"}>
            <h2 className="text-3xl font-bold">Announcements</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-200">
              <li>• Festive Offer: 10% off on custom designs till Oct 31.</li>
              <li>• New Artist: Zara joins the team (Neo-traditional).</li>
              <li>• Walk-ins welcome daily 12–7 PM.</li>
            </ul>
          </div>
          <div className={frameRounded + " p-6 md:w-[380px]"}>
            <h3 className="text-lg font-semibold">Studio Hours</h3>
            <p className="mt-2 text-sm text-gray-300">Mon–Sun • 11:00 – 20:00</p>
            <h3 className="mt-5 text-lg font-semibold">Quick Contact</h3>
            <p className="mt-2 text-sm text-gray-300">
              +91 98XX-XXXXXX • hello@princetattoo.in
            </p>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Services</h2>
        <p className="mt-3 text-center text-gray-300">Premium inks. Steady hands. Timeless art.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Custom Tattoos", d: "Unique designs from concept to stencil." },
            { t: "Black & Grey", d: "Portrait realism and fine gradients." },
            { t: "Fine Line", d: "Delicate linework & minimalist styles." },
            { t: "Cover-Ups", d: "Redesigns that honor what came before." },
            { t: "Photo Realism", d: "Lifelike art captured in ink." },
            { t: "Piercings", d: "Sterile, safe, and styled to you." },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className={frameRounded + " p-6"}
            >
              <h3 className="text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-gray-300">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ARTISTS */}
      <Section id="artists">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Artists</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <div key={i} className={frameRounded + " overflow-hidden"}>
              <img
                src={a.src}
                alt={a.n}
                className="h-64 w-full object-cover hover:scale-110 transition-transform duration-500 block"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{a.n}</h3>
                <p className="text-sm text-gray-300">{a.r}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" isGallery>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className={frameRounded + " p-6 md:p-8"}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Gallery</h2>
            <p className="text-center text-gray-300 mb-8">
              Explore the artistry in motion — rotate through our work.
            </p>
            <SpotlightGallery />
          </div>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Pricing (Starting)</h2>
        <p className="mt-3 text-center text-gray-300">
          Exact quotes depend on size, placement, detail, and artist.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Mini (1–2 in)", p: "₹1,499 – ₹2,999" },
            { t: "Medium (3–6 in)", p: "₹3,499 – ₹7,999" },
            { t: "Large / Custom", p: "Consultation based" },
          ].map((card, i) => (
            <div key={i} className={frameRounded + " p-6"}>
              <h3 className="text-lg font-semibold">{card.t}</h3>
              <p className="mt-2 text-sm text-gray-300">{card.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BOOKING */}
      <Section id="booking">
        <div className="grid gap-8 md:grid-cols-2">
          <div className={frameRounded + " p-6"}>
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
                }}
              >
                Send Booking Request
              </button>
            </form>
          </div>

          <div className={frameRounded + " p-6"}>
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

      {/* CONTACT */}
      <Section id="contact">
        <div className="grid gap-8 md:grid-cols-2">
          <div className={frameRounded + " p-6"}>
            <h3 className="text-xl font-semibold mb-3">Contact & Hours</h3>
            <p className="flex items-start gap-3 text-gray-200">
              <MapPin className="h-5 w-5 text-purple-500" />
              Exhibition Road, Patna, Bihar 800001
            </p>
            <p className="mt-3 flex items-start gap-3 text-gray-200">
              <Phone className="h-5 w-5 text-purple-500" />
              +91 98XX-XXXXXX
            </p>
            <p className="mt-3 flex items-start gap-3 text-gray-200">
              <Mail className="h-5 w-5 text-purple-500" />
              hello@princetattoo.in
            </p>
            <div className="mt-4 flex items-center gap-4 text-gray-300">
              <Instagram className="h-5 w-5 hover:opacity-80 cursor-pointer" />
              <Facebook className="h-5 w-5 hover:opacity-80 cursor-pointer" />
            </div>
            <p className="mt-6 text-sm text-gray-400">Hours: Mon–Sun 11:00 – 20:00</p>
          </div>

          <div className={frameRounded + " p-0 overflow-hidden"}>
            <iframe
              title="Map"
              className="h-[360px] w-full border-0 block"
              loading="lazy"
              src="https://www.google.com/maps?q=Patna,+Bihar&output=embed"
            />
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <section id="footer" className="snap-start">
        <InteractiveFooter />
      </section>
    </div>
  );
}
