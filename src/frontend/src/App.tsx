import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_CATEGORIES = [
  {
    id: "makeup",
    label: "Makeup & Styling",
    icon: "✨",
    services: [
      "Professional Makeup",
      "Bridal Makeup",
      "Trendy Hairstyles",
      "Trendy Haircuts",
    ],
  },
  {
    id: "skin",
    label: "Skin Treatments",
    icon: "🌸",
    services: [
      "Pigmentation Treatment",
      "Wrinkle Treatment",
      "Acne Treatment",
      "Skin Tightening / Loose Skin Treatment",
    ],
  },
  {
    id: "hair",
    label: "Hair Treatments",
    icon: "💆",
    services: [
      "Hair Fall Treatment",
      "Hair Smoothening",
      "Hair Straightening",
      "Hair Botox",
      "Hair Highlighting",
      "Hair Spa",
    ],
  },
  {
    id: "body",
    label: "Body Care",
    icon: "🌿",
    services: ["Body Polishing", "Body Peeling", "Body Pain Therapy"],
  },
  {
    id: "grooming",
    label: "Grooming Services",
    icon: "💅",
    services: ["Manicure", "Pedicure", "Threading", "Threading with Wax"],
  },
];

type GalleryItem = {
  img: string;
  category: string;
  label: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    img: "/assets/generated/gallery-makeup-1.dim_600x600.jpg",
    category: "makeup",
    label: "Bridal Makeup",
  },
  {
    img: "/assets/generated/gallery-makeup-evening.dim_600x600.jpg",
    category: "makeup",
    label: "Evening Makeup",
  },
  {
    img: "/assets/generated/gallery-makeup-party.dim_600x600.jpg",
    category: "makeup",
    label: "Party Makeup",
  },
  {
    img: "/assets/generated/gallery-hair-1.dim_600x600.jpg",
    category: "hair",
    label: "Hair Straightening",
  },
  {
    img: "/assets/generated/gallery-hair-highlights.dim_600x600.jpg",
    category: "hair",
    label: "Hair Highlights",
  },
  {
    img: "/assets/generated/gallery-hair-spa.dim_600x600.jpg",
    category: "hair",
    label: "Hair Spa",
  },
  {
    img: "/assets/generated/gallery-skin-1.dim_600x600.jpg",
    category: "skin",
    label: "Skin Glow Treatment",
  },
  {
    img: "/assets/generated/gallery-skin-acne.dim_600x600.jpg",
    category: "skin",
    label: "Acne Treatment",
  },
  {
    img: "/assets/generated/gallery-skin-antiaging.dim_600x600.jpg",
    category: "skin",
    label: "Anti-aging Therapy",
  },
  {
    img: "/assets/generated/gallery-grooming-1.dim_600x600.jpg",
    category: "grooming",
    label: "Manicure & Pedicure",
  },
  {
    img: "/assets/generated/gallery-grooming-threading.dim_600x600.jpg",
    category: "grooming",
    label: "Threading & Waxing",
  },
  {
    img: "/assets/generated/gallery-transform-1.dim_600x600.jpg",
    category: "transform",
    label: "Total Makeover",
  },
  {
    img: "/assets/generated/gallery-transform-bridal.dim_600x600.jpg",
    category: "transform",
    label: "Bridal Transformation",
  },
];

const GALLERY_TABS = [
  { id: "all", label: "All" },
  { id: "makeup", label: "Makeup Work" },
  { id: "hair", label: "Hair Work" },
  { id: "skin", label: "Skin Treatments" },
  { id: "transform", label: "Transformations" },
];

// ─────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".fade-up, .fade-in");
    for (const el of Array.from(elements)) {
      observerRef.current?.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrolled;
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function GalleryCard({ item }: { item: GalleryItem }) {
  const gradients = [
    "linear-gradient(135deg, oklch(0.88 0.07 15), oklch(0.92 0.08 45))",
    "linear-gradient(135deg, oklch(0.92 0.05 50), oklch(0.85 0.06 30))",
    "linear-gradient(135deg, oklch(0.90 0.06 25), oklch(0.95 0.04 55))",
  ];
  const grad = gradients[Math.abs(item.label.length) % gradients.length];

  return (
    <div className="card-luxury rounded-xl overflow-hidden group cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        {item.img ? (
          <img
            src={item.img}
            alt={item.label}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: grad }}
          >
            <div className="text-center opacity-60">
              <Sparkles
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "oklch(0.52 0.11 22)" }}
              />
              <span
                className="text-sm font-sans-body"
                style={{ color: "oklch(0.40 0.08 20)" }}
              >
                {item.label}
              </span>
            </div>
          </div>
        )}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4"
          style={{
            background:
              "linear-gradient(to top, oklch(0.18 0.04 20 / 0.8), transparent)",
          }}
        >
          <span className="text-white font-sans-body text-xs sm:text-sm font-medium">
            {item.label}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────

export default function App() {
  const scrolled = useNavScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState("all");

  useScrollAnimation();

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const filteredGallery =
    galleryTab === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === galleryTab);

  const currentYear = new Date().getFullYear();

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.98 0.008 60)" }}
    >
      <Toaster position="top-right" />

      {/* ── Navigation ── */}
      <header
        data-ocid="nav.section"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={
          scrolled || mobileOpen
            ? {
                background: "oklch(0.995 0.005 60 / 0.97)",
                borderBottom: "1px solid oklch(0.88 0.025 40)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px oklch(0.52 0.11 22 / 0.06)",
              }
            : {
                background: "transparent",
              }
        }
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo + Name */}
            <button
              type="button"
              onClick={() => handleNavClick("#home")}
              className="flex items-center gap-2 sm:gap-3 group cursor-pointer bg-transparent border-0 p-0 touch-manipulation"
              data-ocid="nav.link.1"
            >
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 flex-shrink-0"
                style={{ borderColor: "oklch(0.58 0.10 24)" }}
              >
                <img
                  src="/assets/generated/logo-placeholder-transparent.dim_400x400.png"
                  alt="Damak Beauty Parlor Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span
                  className={`font-serif-display text-sm sm:text-base lg:text-lg font-medium block leading-tight transition-colors ${
                    scrolled || mobileOpen ? "" : "text-white"
                  }`}
                  style={
                    scrolled || mobileOpen
                      ? { color: "oklch(0.28 0.04 25)" }
                      : {}
                  }
                >
                  Damak Beauty Parlor
                </span>
                <span
                  className={`font-sans-body text-xs transition-colors ${
                    scrolled || mobileOpen ? "" : "text-white/70"
                  }`}
                  style={
                    scrolled || mobileOpen
                      ? { color: "oklch(0.58 0.10 24)" }
                      : {}
                  }
                >
                  18+ Years of Trust
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  data-ocid={`nav.link.${i + 1}`}
                  className={`px-4 py-2 rounded-full font-sans-body text-sm font-medium transition-all hover:scale-105 ${
                    scrolled
                      ? "text-foreground hover:bg-secondary"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={`lg:hidden p-2 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation ${
                scrolled || mobileOpen ? "text-foreground" : "text-white"
              }`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.menu.toggle"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu — always has solid background */}
          {mobileOpen && (
            <div
              className="lg:hidden pb-4 pt-1"
              style={{
                borderTop: "1px solid oklch(0.88 0.025 40)",
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  data-ocid={`nav.link.${i + 1}`}
                  className="block px-4 py-3 font-sans-body text-sm font-medium transition-colors hover:bg-secondary min-h-[44px] flex items-center touch-manipulation"
                  style={{ color: "oklch(0.28 0.04 25)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* ── Hero Section ── */}
      <section
        id="home"
        data-ocid="hero.section"
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-bg.dim_1600x900.jpg"
            alt="Damak Beauty Parlor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>

        {/* Decorative blobs — hidden on mobile to prevent overflow */}
        <div
          className="absolute top-20 right-20 w-48 lg:w-64 h-48 lg:h-64 rounded-full opacity-10 blur-3xl hidden sm:block"
          style={{ background: "oklch(0.88 0.07 15)" }}
        />
        <div
          className="absolute bottom-20 left-10 w-64 lg:w-96 h-64 lg:h-96 rounded-full opacity-10 blur-3xl hidden sm:block"
          style={{ background: "oklch(0.92 0.08 45)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 pt-24 sm:pt-28 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="text-white fade-up">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0 animate-float"
                  style={{
                    border: "3px solid oklch(0.88 0.05 40 / 0.6)",
                    boxShadow: "0 0 30px oklch(0.88 0.07 15 / 0.4)",
                  }}
                >
                  <img
                    src="/assets/generated/logo-placeholder-transparent.dim_400x400.png"
                    alt="Damak Beauty Parlor Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div
                    className="text-xs font-sans-body uppercase tracking-widest mb-1 opacity-80"
                    style={{ color: "oklch(0.88 0.05 40)" }}
                  >
                    Est. 2005
                  </div>
                  <div
                    className="text-sm font-sans-body font-medium opacity-90"
                    style={{ color: "oklch(0.92 0.05 40)" }}
                  >
                    Premium Beauty Services
                  </div>
                </div>
              </div>

              <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-4">
                <span className="block text-white">Damak</span>
                <span
                  className="block"
                  style={{ color: "oklch(0.88 0.07 40)" }}
                >
                  Beauty Parlor
                </span>
              </h1>

              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div
                  className="h-px flex-1 max-w-8 sm:max-w-12"
                  style={{ background: "oklch(0.88 0.05 40 / 0.5)" }}
                />
                <p
                  className="font-serif-display text-base sm:text-xl italic"
                  style={{ color: "oklch(0.92 0.06 40)" }}
                >
                  18+ Years of Beauty & Trust
                </p>
                <div
                  className="h-px flex-1 max-w-8 sm:max-w-12"
                  style={{ background: "oklch(0.88 0.05 40 / 0.5)" }}
                />
              </div>

              <p
                className="font-sans-body text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-lg leading-relaxed"
                style={{ color: "oklch(0.92 0.02 40 / 0.9)" }}
              >
                Discover the art of beauty with our certified experts. From
                bridal makeup to advanced skin treatments — we bring out your
                best self with care, skill, and passion.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="tel:9784704611"
                  className="btn-primary-rose font-sans-body text-sm sm:text-base px-6 sm:px-8 py-3 rounded-full min-h-[44px] touch-manipulation inline-flex items-center gap-2"
                  data-ocid="hero.primary_button"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.58 0.13 22), oklch(0.48 0.11 22))",
                    color: "white",
                    fontWeight: 500,
                  }}
                >
                  <Phone className="w-4 h-4" />
                  Call Us Now
                </a>
                <Button
                  variant="outline"
                  onClick={() => handleNavClick("#services")}
                  className="btn-outline-rose font-sans-body text-sm sm:text-base px-6 sm:px-8 py-3 h-auto rounded-full border-white text-white hover:bg-white hover:text-foreground min-h-[44px] touch-manipulation"
                >
                  Explore Services
                </Button>
              </div>

              {/* Trust badges — compact on mobile */}
              <div
                className="flex gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 flex-wrap"
                style={{ borderTop: "1px solid oklch(1 0 0 / 0.15)" }}
              >
                {[
                  { n: "18+", l: "Years" },
                  { n: "1000+", l: "Clients" },
                  { n: "100%", l: "Certified" },
                ].map((stat) => (
                  <div key={stat.l} className="text-center">
                    <div
                      className="font-serif-display text-xl sm:text-2xl font-normal"
                      style={{ color: "oklch(0.88 0.07 40)" }}
                    >
                      {stat.n}
                    </div>
                    <div
                      className="font-sans-body text-xs opacity-80"
                      style={{ color: "oklch(0.92 0.02 40)" }}
                    >
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Owner Photo — show below content on mobile, right on desktop */}
            <div className="flex justify-center lg:justify-end fade-in stagger-2 mt-4 sm:mt-6 lg:mt-0">
              <div className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-none">
                {/* Decorative ring */}
                <div
                  className="absolute -inset-3 sm:-inset-4 rounded-3xl opacity-30"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.88 0.07 15), oklch(0.92 0.08 45))",
                  }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden owner-frame"
                  style={{ maxWidth: "380px", width: "100%" }}
                >
                  <img
                    src="/assets/uploads/WhatsApp-Image-2026-03-03-at-8.35.40-PM-1.jpeg"
                    alt="Damak Beauty Expert"
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: "420px" }}
                  />
                  {/* Overlay tag */}
                  <div
                    className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 rounded-xl p-2.5 sm:p-3"
                    style={{
                      background: "oklch(0.995 0.005 60 / 0.92)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <p
                      className="font-serif-display text-xs sm:text-sm font-medium"
                      style={{ color: "oklch(0.28 0.04 25)" }}
                    >
                      Your Beauty Expert
                    </p>
                    <p
                      className="font-sans-body text-xs"
                      style={{ color: "oklch(0.52 0.11 22)" }}
                    >
                      Certified Professional · 18+ Years
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator — hidden on very small screens */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-60">
          <span className="font-sans-body text-xs text-white uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-white/50 animate-pulse" />
        </div>
      </section>

      {/* ── About Section ── */}
      <section
        id="about"
        data-ocid="about.section"
        className="py-16 sm:py-20 lg:py-28"
        style={{ background: "oklch(0.97 0.012 58)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start mb-0">
            {/* Left: Big editorial heading */}
            <div className="fade-up">
              <span
                className="font-sans-body text-xs uppercase tracking-widest mb-4 block"
                style={{ color: "oklch(0.58 0.10 24)" }}
              >
                Our Story
              </span>
              <h2
                className="font-serif-display leading-none mb-2"
                style={{
                  color: "oklch(0.28 0.04 25)",
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                About
                <br />
                <em
                  style={{
                    color: "oklch(0.52 0.11 22)",
                    fontStyle: "italic",
                    fontSize: "0.78em",
                  }}
                >
                  Damak Beauty
                </em>
              </h2>
              <div
                className="mt-4 mb-6 sm:mb-8"
                style={{
                  width: "48px",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, oklch(0.58 0.10 24), oklch(0.72 0.09 40))",
                }}
              />
              <h3
                className="font-serif-display text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 leading-snug"
                style={{ color: "oklch(0.35 0.04 25)" }}
              >
                Where Beauty Meets{" "}
                <span style={{ color: "oklch(0.52 0.11 22)" }}>
                  18 Years of Excellence
                </span>
              </h3>
              <div
                className="font-sans-body text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4"
                style={{ color: "oklch(0.40 0.03 35)" }}
              >
                <p>
                  Damak Beauty Parlor has been a trusted name in professional
                  beauty services for over 18 years. Founded with a passion for
                  bringing out the natural beauty in every client, we've grown
                  into a full-service premium beauty destination.
                </p>
                <p>
                  Our salon is run by a certified beauty expert with deep
                  knowledge of the latest techniques, products, and treatments.
                  We combine time-tested traditions with modern innovations to
                  deliver results that exceed your expectations.
                </p>
                <p>
                  We take pride in maintaining the highest standards of hygiene
                  and cleanliness. Every client is treated with personalized
                  care in a warm, welcoming, and professional environment.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
                {[
                  "✓ Certified Professionals",
                  "✓ Premium Products",
                  "✓ Hygienic Environment",
                  "✓ Personalized Care",
                ].map((item) => (
                  <span
                    key={item}
                    className="font-sans-body text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full border"
                    style={{
                      borderColor: "oklch(0.52 0.11 22 / 0.3)",
                      color: "oklch(0.40 0.08 20)",
                      background: "oklch(0.52 0.11 22 / 0.06)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 fade-up stagger-2">
              {[
                {
                  icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
                  number: "18+",
                  label: "Years of Experience",
                  desc: "Trusted since 2005",
                },
                {
                  icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
                  number: "1000+",
                  label: "Happy Clients",
                  desc: "Satisfied & glowing",
                },
                {
                  icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />,
                  number: "100%",
                  label: "Certified Expert",
                  desc: "Professional certified",
                },
                {
                  icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
                  number: "5★",
                  label: "Premium Products",
                  desc: "Quality-first always",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`card-luxury rounded-2xl p-4 sm:p-6 text-center fade-up stagger-${i + 1}`}
                >
                  <div
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                    style={{
                      background: "oklch(0.52 0.11 22 / 0.1)",
                      color: "oklch(0.52 0.11 22)",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className="font-serif-display text-2xl sm:text-3xl font-normal mb-1"
                    style={{ color: "oklch(0.52 0.11 22)" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="font-sans-body text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1"
                    style={{ color: "oklch(0.28 0.04 25)" }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="font-sans-body text-xs hidden sm:block"
                    style={{ color: "oklch(0.55 0.03 35)" }}
                  >
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section
        id="services"
        data-ocid="services.section"
        className="py-16 sm:py-20 lg:py-28 bg-peach-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14 fade-up">
            <span
              className="font-sans-body text-xs uppercase tracking-widest mb-3 block"
              style={{ color: "oklch(0.52 0.11 22)" }}
            >
              What We Offer
            </span>
            <h2
              className="font-serif-display mb-2"
              style={{
                color: "oklch(0.28 0.04 25)",
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
              }}
            >
              Our Services
            </h2>
            <div
              className="section-ornament mx-auto mt-4 mb-4"
              style={{ maxWidth: "200px" }}
            >
              <div className="section-ornament-diamond" />
            </div>
            <p
              className="font-sans-body text-sm sm:text-base max-w-xl mx-auto"
              style={{ color: "oklch(0.45 0.04 30)" }}
            >
              A complete range of premium beauty services tailored to enhance
              your natural beauty and confidence.
            </p>
          </div>

          <div className="fade-up">
            <Tabs defaultValue="makeup" className="w-full">
              {/* Horizontal scroll tabs on mobile */}
              <div className="relative mb-8 sm:mb-10">
                <TabsList className="flex h-auto gap-2 bg-transparent p-0 w-full overflow-x-auto scrollbar-hide justify-start sm:justify-center flex-nowrap">
                  {SERVICE_CATEGORIES.map((cat, i) => (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      data-ocid={`services.tab.${i + 1}`}
                      className="font-sans-body text-xs sm:text-sm px-3 sm:px-5 py-2.5 rounded-full border transition-all data-[state=active]:shadow-md flex-shrink-0 whitespace-nowrap min-h-[44px] touch-manipulation"
                      style={
                        {
                          "--tw-ring-color": "oklch(0.52 0.11 22)",
                        } as React.CSSProperties
                      }
                    >
                      <span className="mr-1 sm:mr-1.5">{cat.icon}</span>
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {SERVICE_CATEGORIES.map((cat) => (
                <TabsContent key={cat.id} value={cat.id} className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {cat.services.map((service, idx) => (
                      <div
                        key={service}
                        className={`service-card rounded-xl p-4 sm:p-6 fade-up stagger-${Math.min(idx + 1, 4)}`}
                      >
                        {/* Category badge */}
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <span
                            className="text-lg leading-none"
                            aria-hidden="true"
                          >
                            {cat.icon}
                          </span>
                          <span
                            className="font-sans-body text-xs uppercase tracking-wider"
                            style={{ color: "oklch(0.62 0.09 24)" }}
                          >
                            {cat.label}
                          </span>
                        </div>
                        <h4
                          className="font-serif-display mb-3 sm:mb-4 leading-snug"
                          style={{
                            color: "oklch(0.24 0.04 25)",
                            fontSize: "1rem",
                          }}
                        >
                          {service}
                        </h4>
                        {/* Separator */}
                        <div
                          className="mb-3 sm:mb-4"
                          style={{
                            height: "1px",
                            background:
                              "linear-gradient(90deg, oklch(0.58 0.10 24 / 0.25), transparent)",
                          }}
                        />
                        <a
                          href="https://wa.me/919784704611"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans-body text-xs font-semibold uppercase tracking-widest flex items-center gap-1 transition-all group/cta min-h-[44px] touch-manipulation"
                          style={{ color: "oklch(0.52 0.11 22)" }}
                        >
                          Enquire on WhatsApp
                          <MessageCircle className="w-3 h-3 transition-transform group-hover/cta:translate-x-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section
        id="gallery"
        data-ocid="gallery.section"
        className="py-16 sm:py-20 lg:py-28"
        style={{ background: "oklch(0.995 0.005 60)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14 fade-up">
            <span
              className="font-sans-body text-xs uppercase tracking-widest mb-3 block"
              style={{ color: "oklch(0.52 0.11 22)" }}
            >
              Portfolio
            </span>
            <h2
              className="font-serif-display leading-none mb-4"
              style={{
                color: "oklch(0.28 0.04 25)",
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Our{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "oklch(0.52 0.11 22)",
                }}
              >
                Work
              </em>
            </h2>
            <p
              className="font-sans-body text-sm sm:text-base max-w-xl mx-auto"
              style={{ color: "oklch(0.45 0.04 30)" }}
            >
              A glimpse of the transformations we've crafted with love and
              expertise.
            </p>
          </div>

          <Tabs
            value={galleryTab}
            onValueChange={setGalleryTab}
            className="w-full fade-up"
          >
            {/* Horizontal scroll tabs on mobile */}
            <div className="mb-6 sm:mb-8">
              <TabsList className="flex h-auto gap-2 bg-transparent p-0 w-full overflow-x-auto scrollbar-hide justify-start sm:justify-center flex-nowrap">
                {GALLERY_TABS.map((tab, i) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    data-ocid={`gallery.tab.${i + 1}`}
                    className="font-sans-body text-xs sm:text-sm px-3 sm:px-5 py-2 rounded-full border transition-all data-[state=active]:shadow-md flex-shrink-0 whitespace-nowrap min-h-[44px] touch-manipulation"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={galleryTab} className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredGallery.map((item, idx) => (
                  <div key={`${item.category}-${idx}`}>
                    <GalleryCard item={item} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── Instagram Section ── */}
      <section
        id="instagram"
        data-ocid="instagram.section"
        className="py-16 sm:py-20 lg:py-28"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.995 0.005 60) 0%, oklch(0.96 0.02 35) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 fade-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.15 30), oklch(0.55 0.20 0), oklch(0.65 0.18 55))",
                }}
              >
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <h2
                className="font-serif-display text-2xl sm:text-3xl lg:text-4xl"
                style={{ color: "oklch(0.28 0.04 25)" }}
              >
                Follow Us on Instagram
              </h2>
            </div>
            <p
              className="font-sans-body text-sm sm:text-base mb-5"
              style={{ color: "oklch(0.52 0.11 22)" }}
            >
              @damakbeautyparlour1
            </p>
            <a
              href="https://instagram.com/damakbeautyparlour1"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="instagram.button"
            >
              <Button className="btn-primary-rose font-sans-body px-6 sm:px-8 py-2.5 h-auto rounded-full min-h-[44px] touch-manipulation">
                <Instagram className="mr-2 w-4 h-4" />
                Follow on Instagram
              </Button>
            </a>
          </div>

          {/* Instagram grid — 2 cols on mobile showing 4, 3 on tablet, 6 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 fade-up">
            {[
              {
                src: "/assets/generated/gallery-makeup-1.dim_600x600.jpg",
                id: "ig-1",
              },
              {
                src: "/assets/generated/gallery-hair-1.dim_600x600.jpg",
                id: "ig-2",
              },
              {
                src: "/assets/generated/gallery-skin-1.dim_600x600.jpg",
                id: "ig-3",
              },
              {
                src: "/assets/generated/gallery-grooming-1.dim_600x600.jpg",
                id: "ig-4",
              },
              {
                src: "/assets/generated/gallery-transform-1.dim_600x600.jpg",
                id: "ig-5",
                hideMobile: true,
              },
              {
                src: "/assets/generated/gallery-makeup-1.dim_600x600.jpg",
                id: "ig-6",
                hideMobile: true,
              },
            ].map(({ src, id, hideMobile }) => (
              <a
                key={id}
                href="https://instagram.com/damakbeautyparlour1"
                target="_blank"
                rel="noopener noreferrer"
                className={`aspect-square rounded-lg overflow-hidden block group touch-manipulation${hideMobile ? " hidden sm:block" : ""}`}
              >
                <img
                  src={src}
                  alt={`Instagram post ${id}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section
        id="contact"
        data-ocid="contact.section"
        className="py-16 sm:py-20 lg:py-28 bg-cream-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14 fade-up">
            <span
              className="font-sans-body text-xs uppercase tracking-widest mb-3 block"
              style={{ color: "oklch(0.52 0.11 22)" }}
            >
              Reach Us
            </span>
            <h2
              className="font-serif-display leading-none mb-4"
              style={{
                color: "oklch(0.28 0.04 25)",
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Get in Touch
            </h2>
            <p
              className="font-sans-body text-sm sm:text-base max-w-xl mx-auto"
              style={{ color: "oklch(0.45 0.04 30)" }}
            >
              Book an appointment or simply reach out — we'd love to hear from
              you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto w-full">
            {/* Contact Info */}
            <div className="fade-up space-y-4 sm:space-y-6">
              <h3
                className="font-serif-display text-xl sm:text-2xl"
                style={{ color: "oklch(0.28 0.04 25)" }}
              >
                Contact Information
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <a
                  href="tel:9784704611"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all hover:-translate-y-1 card-luxury min-h-[60px] touch-manipulation"
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "oklch(0.52 0.11 22 / 0.1)",
                      color: "oklch(0.52 0.11 22)",
                    }}
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p
                      className="font-sans-body text-xs uppercase tracking-wide mb-0.5"
                      style={{ color: "oklch(0.55 0.03 35)" }}
                    >
                      Phone
                    </p>
                    <p
                      className="font-serif-display text-base sm:text-lg"
                      style={{ color: "oklch(0.28 0.04 25)" }}
                    >
                      9784704611
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919784704611"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all hover:-translate-y-1 card-luxury min-h-[60px] touch-manipulation"
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "oklch(0.55 0.14 148 / 0.1)",
                      color: "oklch(0.45 0.14 148)",
                    }}
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p
                      className="font-sans-body text-xs uppercase tracking-wide mb-0.5"
                      style={{ color: "oklch(0.55 0.03 35)" }}
                    >
                      WhatsApp
                    </p>
                    <p
                      className="font-serif-display text-base sm:text-lg"
                      style={{ color: "oklch(0.28 0.04 25)" }}
                    >
                      Chat with Us
                    </p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/damakbeautyparlour1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all hover:-translate-y-1 card-luxury min-h-[60px] touch-manipulation"
                >
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "oklch(0.72 0.14 0 / 0.1)",
                      color: "oklch(0.62 0.14 0)",
                    }}
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p
                      className="font-sans-body text-xs uppercase tracking-wide mb-0.5"
                      style={{ color: "oklch(0.55 0.03 35)" }}
                    >
                      Instagram
                    </p>
                    <p
                      className="font-serif-display text-base sm:text-lg"
                      style={{ color: "oklch(0.28 0.04 25)" }}
                    >
                      @damakbeautyparlour1
                    </p>
                  </div>
                </a>
              </div>

              {/* Address card */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl card-luxury">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "oklch(0.52 0.11 22 / 0.1)",
                    color: "oklch(0.52 0.11 22)",
                  }}
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p
                    className="font-sans-body text-xs uppercase tracking-wide mb-0.5"
                    style={{ color: "oklch(0.55 0.03 35)" }}
                  >
                    Address
                  </p>
                  <p
                    className="font-serif-display text-sm sm:text-base leading-snug"
                    style={{ color: "oklch(0.28 0.04 25)" }}
                  >
                    50, Ganesh Enclave, Sogaria Road
                    <br />
                    Station Area, Kota, Rajasthan, India
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: "oklch(0.88 0.025 40)" }}
                data-ocid="contact.map_marker"
              >
                <div
                  className="h-40 sm:h-48 flex flex-col items-center justify-center gap-3"
                  style={{ background: "oklch(0.95 0.02 50)" }}
                >
                  <MapPin
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    style={{ color: "oklch(0.52 0.11 22)" }}
                  />
                  <div className="text-center px-4">
                    <p
                      className="font-serif-display text-sm sm:text-base font-medium"
                      style={{ color: "oklch(0.28 0.04 25)" }}
                    >
                      Find Us Here
                    </p>
                    <p
                      className="font-sans-body text-xs mt-1"
                      style={{ color: "oklch(0.55 0.03 35)" }}
                    >
                      50, Ganesh Enclave, Sogaria Road
                    </p>
                    <p
                      className="font-sans-body text-xs"
                      style={{ color: "oklch(0.55 0.03 35)" }}
                    >
                      Station Area, Kota, Rajasthan, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        data-ocid="footer.section"
        className="py-10 sm:py-14 bg-footer-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10 mb-8 sm:mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                  <img
                    src="/assets/generated/logo-placeholder-transparent.dim_400x400.png"
                    alt="Damak Beauty Parlor Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-serif-display text-base font-medium text-white block">
                    Damak Beauty Parlor
                  </span>
                </div>
              </div>
              <p
                className="font-sans-body text-sm leading-relaxed mb-5"
                style={{ color: "oklch(0.75 0.02 40)" }}
              >
                18+ years of trusted beauty services. Bringing out your best
                self with expertise and care.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/damakbeautyparlour1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 touch-manipulation"
                  style={{
                    background: "oklch(0.72 0.14 0 / 0.2)",
                    color: "oklch(0.88 0.07 15)",
                  }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/919784704611"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 touch-manipulation"
                  style={{
                    background: "oklch(0.55 0.14 148 / 0.2)",
                    color: "oklch(0.75 0.12 148)",
                  }}
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="tel:9784704611"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 touch-manipulation"
                  style={{
                    background: "oklch(0.52 0.11 22 / 0.3)",
                    color: "oklch(0.88 0.06 40)",
                  }}
                  aria-label="Phone"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4
                className="font-serif-display text-base mb-4 font-normal"
                style={{ color: "oklch(0.88 0.06 40)" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="font-sans-body text-sm transition-colors hover:text-white min-h-[44px] inline-flex items-center touch-manipulation"
                      style={{ color: "oklch(0.70 0.02 40)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="font-serif-display text-base mb-4 font-normal"
                style={{ color: "oklch(0.88 0.06 40)" }}
              >
                Contact Us
              </h4>
              <div className="space-y-3">
                <a
                  href="tel:9784704611"
                  className="flex items-center gap-2 font-sans-body text-sm transition-colors hover:text-white min-h-[44px] touch-manipulation"
                  style={{ color: "oklch(0.70 0.02 40)" }}
                >
                  <Phone
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "oklch(0.72 0.09 40)" }}
                  />
                  9784704611
                </a>
                <a
                  href="https://wa.me/919784704611"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans-body text-sm transition-colors hover:text-white min-h-[44px] touch-manipulation"
                  style={{ color: "oklch(0.70 0.02 40)" }}
                >
                  <MessageCircle
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "oklch(0.75 0.12 148)" }}
                  />
                  WhatsApp Us
                </a>
                <a
                  href="https://instagram.com/damakbeautyparlour1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans-body text-sm transition-colors hover:text-white min-h-[44px] touch-manipulation"
                  style={{ color: "oklch(0.70 0.02 40)" }}
                >
                  <Instagram
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "oklch(0.82 0.09 15)" }}
                  />
                  @damakbeautyparlour1
                </a>
                <div
                  className="flex items-start gap-2 font-sans-body text-sm"
                  style={{ color: "oklch(0.70 0.02 40)" }}
                >
                  <MapPin
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{ color: "oklch(0.72 0.09 40)" }}
                  />
                  <span>
                    50, Ganesh Enclave, Sogaria Road,
                    <br />
                    Station Area, Kota, Rajasthan, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.1)" }}
          >
            <p
              className="font-sans-body text-xs"
              style={{ color: "oklch(0.55 0.02 35)" }}
            >
              © {currentYear} Damak Beauty Parlor. All Rights Reserved.
            </p>
            <p
              className="font-sans-body text-xs"
              style={{ color: "oklch(0.50 0.02 35)" }}
            >
              Built with{" "}
              <Heart
                className="inline w-3 h-3 mx-0.5"
                style={{ color: "oklch(0.62 0.13 22)" }}
                fill="currentColor"
              />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                style={{ color: "oklch(0.65 0.08 40)" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/919784704611"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center z-40 shadow-luxury transition-all hover:scale-110 animate-float touch-manipulation"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.58 0.18 148), oklch(0.46 0.16 148))",
          color: "white",
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>
    </div>
  );
}
