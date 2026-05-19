"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Target,
  Users,
  Sparkles,
  TrendingUp,
  Search,
  Layers,
  FileText,
  Share2,
  BarChart3,
  Brain,
  Zap,
  Globe,
  Mail,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Menu,
  X,
  Eye,
  Lightbulb,
  Rocket,
  RotateCcw,
  Shield,
  Star,
} from "lucide-react";

/* ─── Framer Motion variants ─── */

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeOut } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeOut } },
};

/* ─── useInView hook ─── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── Nav ─── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => setScrolled(y > 40));
    return unsubscribe;
  }, [scrollY]);

  const links = [
    { label: "About", href: "#about" },
    { label: "System", href: "#system" },
    { label: "Method", href: "#method" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-blur" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative w-14 h-9 overflow-hidden rounded group-hover:opacity-90 transition-opacity duration-300">
            <Image
              src="/logo.webp"
              alt="NXL Digital"
              fill
              sizes="56px"
              className="object-contain"
              priority
            />
          </div>
          <span className="text-white font-semibold text-sm md:text-base tracking-wide">
            <span className="gradient-text-blue">Digital</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 hover-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="btn-primary px-5 py-2.5 rounded-full text-sm font-medium inline-flex items-center gap-2"
          >
            <span>Start a Conversation</span>
            <ArrowRight size={14} className="relative z-10" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden nav-blur border-t border-white/5"
          >
            <div className="px-5 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-white text-base transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary px-5 py-3 rounded-full text-sm font-medium inline-flex items-center justify-center gap-2 mt-2"
              >
                <span>Start a Conversation</span>
                <ArrowRight size={14} className="relative z-10" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─── Hero ─── */

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const words = ["clarity,", "compression,", "and conversion."];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg grid-pattern">
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
            transform: "translate(50%, 50%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-3/4 left-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Floating geometric shapes — hidden on small screens for perf */}
      <motion.div
        style={{ y }}
        className="hidden sm:block absolute inset-0 pointer-events-none"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            className="absolute rounded-full border border-white/5"
            style={{
              width: 40 + i * 20,
              height: 40 + i * 20,
              top: `${15 + i * 16}%`,
              left: i % 2 === 0 ? `${5 + i * 5}%` : `${75 + i * 4}%`,
              opacity: 0.4,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 lg:px-12 text-center pt-24 lg:pt-28 pb-36"
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-5 md:mb-8"
        >
          <div className="hidden sm:flex gap-1 items-end h-4">
            {[10, 14, 12, 16, 10].map((h, i) => (
              <div
                key={i}
                className="wave-bar"
                style={{ height: h, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="tag">Digital Audience Engine</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight mb-5 md:mb-6"
        >
          Strong brands{" "}
          <span className="gradient-text">reduce comparison.</span>
          <br />
          <span className="text-white">The best brands</span>{" "}
          <span className="text-slate-400">eliminate it.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          NXL Digital turns insight into structured, scalable growth systems. A strategic operating system for visibility, trust, and measurable business impact.
        </motion.p>

        {/* Dynamic word */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm md:text-base text-slate-500 mb-10 md:mb-20"
        >
          Built for{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="gradient-text-blue font-semibold"
            >
              {words[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <a
            href="#system"
            className="btn-primary w-full sm:w-auto px-7 py-3.5 md:px-8 md:py-4 rounded-full text-sm md:text-base font-semibold inline-flex items-center justify-center gap-3"
          >
            <span>Discover the System</span>
            <ArrowRight size={16} className="relative z-10" />
          </a>
          <a
            href="#contact"
            className="btn-outline w-full sm:w-auto px-7 py-3.5 md:px-8 md:py-4 rounded-full text-sm md:text-base font-semibold inline-flex items-center justify-center gap-3"
          >
            <span>Start a Strategy Conversation</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — anchored to section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-xs tracking-[0.2em] uppercase text-slate-400 font-medium">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-400 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
          />
        </div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <ChevronDown size={18} className="text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Section 2: Core Truth ─── */

function CoreTruth() {
  const { ref, inView } = useInView();

  const problems = [
    { text: "Post consistently — without direction" },
    { text: "Run campaigns — without differentiation" },
    { text: "Measure metrics — not real growth" },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 dot-matrix opacity-50" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <div className="tag tag-amber inline-block mb-4">Core Truth</div>
              <div className="section-line section-line-amber mb-6" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            >
              Most Brands Create{" "}
              <span className="gradient-text-amber">Activity</span>, Not{" "}
              <span className="text-slate-400">Progress</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
              The result is visibility without traction. NXL helps brands stop competing blindly by building the system behind sustainable growth.
            </motion.p>

            <motion.div variants={staggerContainer} className="flex flex-col gap-3 mb-8">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  variants={slideLeft}
                  className="flex items-center gap-4 p-4 rounded-xl card-glass"
                >
                  <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                  <span className="text-slate-300 text-sm md:text-base">{p.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="#system"
              className="inline-flex items-center gap-2 text-blue-400 font-semibold hover-underline group"
            >
              See how we fix this
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right — visual */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={scaleIn}
            className="relative"
          >
            <div className="relative rounded-2xl p-6 md:p-8 card-glass gradient-border overflow-hidden">
              <div className="absolute inset-0 animate-shimmer pointer-events-none rounded-2xl" />

              <div className="relative z-10 text-center py-6 md:py-8">
                <div className="text-5xl md:text-6xl font-black mb-2">
                  <span className="text-white">N</span>
                  <span className="text-blue-400">X</span>
                  <span className="text-amber-400">L</span>
                </div>
                <div className="text-slate-400 text-sm mb-6 tracking-widest uppercase">Strategic System</div>

                {/* Concentric rings */}
                <div className="relative mx-auto" style={{ width: 160, height: 160 }}>
                  {[160, 120, 85, 50].map((size, i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                      transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
                      className="absolute rounded-full border"
                      style={{
                        width: size,
                        height: size,
                        top: (160 - size) / 2,
                        left: (160 - size) / 2,
                        borderColor: `rgba(59,130,246,${0.4 - i * 0.08})`,
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center animate-pulse-glow"
                    >
                      <Target size={18} className="text-blue-400" />
                    </motion.div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  {[
                    { label: "Clarity", icon: <Lightbulb size={14} /> },
                    { label: "Direction", icon: <Target size={14} /> },
                    { label: "Traction", icon: <Rocket size={14} /> },
                    { label: "Growth", icon: <TrendingUp size={14} /> },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-blue-400">{item.icon}</span>
                      <span className="text-xs text-slate-300 font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 3 & 5: System Positioning ─── */

function SystemPositioning() {
  const { ref, inView } = useInView();

  const layers = [
    {
      icon: <Brain size={20} />,
      name: "Insight Layer",
      desc: "Market, competitor, and audience intelligence",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      icon: <Shield size={20} />,
      name: "Identity Layer",
      desc: "Positioning, messaging, brand voice",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      icon: <FileText size={20} />,
      name: "Content Layer",
      desc: "Content systems, campaigns, storytelling",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      icon: <Share2 size={20} />,
      name: "Distribution Layer",
      desc: "Platforms, SEO, paid media, email",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      icon: <Zap size={20} />,
      name: "Conversion Layer",
      desc: "Websites, funnels, lead capture",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      icon: <BarChart3 size={20} />,
      name: "Learning Layer",
      desc: "Analytics, reporting, continuous optimization",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
  ];

  return (
    <section
      id="system"
      ref={ref}
      className="py-16 md:py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #08091C 0%, #0B0D20 50%, #08091C 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px"
            style={{
              top: `${20 + i * 20}%`,
              background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.06), transparent)",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <motion.div variants={fadeUp} className="tag inline-block mb-4">
            System Positioning
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
          >
            The Digital Audience{" "}
            <span className="gradient-text">Engine</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto"
          >
            A strategic operating system for visibility, trust, and growth. Not just to get attention — but to build an audience that recognizes, trusts, engages and takes action.
          </motion.p>
        </motion.div>

        {/* Integration areas */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-16 lg:mb-20"
        >
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative p-5 md:p-6 rounded-2xl card-glass cursor-default overflow-hidden group"
            >
              <div className="absolute top-4 right-4 text-xs font-mono text-white/10 font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className={`w-10 h-10 rounded-xl ${layer.bg} border ${layer.border} flex items-center justify-center ${layer.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {layer.icon}
              </div>
              <h3 className="font-semibold text-white mb-1.5">{layer.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{layer.desc}</p>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${layer.bg} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Compounding result callout */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={scaleIn}
          className="relative rounded-2xl p-6 md:p-10 lg:p-12 overflow-hidden text-center"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)",
            border: "1px solid rgba(59,130,246,0.15)",
          }}
        >
          <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          <div className="relative z-10">
            <Layers size={28} className="text-blue-400 mx-auto mb-4" />
            <p className="text-lg md:text-2xl font-semibold text-white mb-2">
              Each layer strengthens the next
            </p>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Creating compounding results that grow over time — not isolated activities, but one connected framework.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 4: Core Objectives ─── */

function CoreObjectives() {
  const { ref, inView } = useInView();

  const objectives = [
    {
      number: "01",
      icon: <Eye size={24} />,
      title: "Grow Visibility",
      desc: "Increase reach, discoverability, and awareness across all channels.",
      color: "text-blue-400",
      glow: "rgba(59,130,246,0.15)",
    },
    {
      number: "02",
      icon: <Users size={24} />,
      title: "Build an Engaged Audience",
      desc: "Attract and develop meaningful connections that last.",
      color: "text-violet-400",
      glow: "rgba(139,92,246,0.15)",
    },
    {
      number: "03",
      icon: <Star size={24} />,
      title: "Strengthen Digital Identity",
      desc: "Clarify positioning, messaging, and brand voice with precision.",
      color: "text-amber-400",
      glow: "rgba(245,158,11,0.15)",
    },
    {
      number: "04",
      icon: <TrendingUp size={24} />,
      title: "Enable Business Impact",
      desc: "Convert attention into leads, partnerships, and revenue.",
      color: "text-green-400",
      glow: "rgba(34,197,94,0.15)",
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-36 relative">
      <div className="absolute inset-0 dot-matrix opacity-30" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div variants={fadeUp} className="tag inline-block mb-4">
            Core Objectives
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5"
          >
            What the System Is{" "}
            <span className="gradient-text">Designed to Achieve</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {objectives.map((obj, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative p-5 md:p-6 rounded-2xl card-glass group overflow-hidden cursor-default"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 50%, ${obj.glow}, transparent 70%)` }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${obj.color} group-hover:scale-110 transition-transform`}>
                    {obj.icon}
                  </div>
                  <span className="text-2xl font-black text-white/5 group-hover:text-white/10 transition-colors font-mono">
                    {obj.number}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base md:text-lg mb-2">{obj.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{obj.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 6: Strategic Principle ─── */

function StrategicPrinciple() {
  const { ref, inView } = useInView();

  const principles = [
    "Continuous market and competitor analysis",
    "Understanding how audiences think and respond",
    "Identifying gaps others overlook",
    "Acting decisively on those insights",
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-36 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 50%, rgba(245,158,11,0.04) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="tag inline-block mb-5">
            Strategic Principle
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight"
          >
            Growth Is Not{" "}
            <span className="gradient-text">Accidental</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-base md:text-xl text-slate-400 mb-8 md:mb-12">
            Effective growth is built through:
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-10 md:mb-16"
          >
            {principles.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-3 p-4 md:p-5 rounded-xl card-glass text-left"
              >
                <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm md:text-base">{p}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.blockquote
            variants={scaleIn}
            className="relative p-6 md:p-8 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))",
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            <div className="absolute top-4 left-6 text-6xl text-blue-500/10 font-serif leading-none">"</div>
            <p className="text-base md:text-xl lg:text-2xl font-semibold text-white relative z-10">
              Growth is not about doing more.{" "}
              <span className="gradient-text">It's about doing the right things consistently.</span>
            </p>
            <p className="text-slate-500 mt-3 text-sm">
              Strong strategies are not copied. They are engineered.
            </p>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 7: NXL Method ─── */

function NXLMethod() {
  const { ref, inView } = useInView();

  const steps = [
    {
      num: "01",
      label: "DISCOVER",
      title: "Find the Strategic Gap",
      desc: "Analyze competitors, audience behavior, and overlooked opportunities.",
      icon: <Search size={22} />,
      color: "from-blue-600 to-blue-400",
      border: "border-blue-500/30",
    },
    {
      num: "02",
      label: "DESIGN",
      title: "Build the Growth Architecture",
      desc: "Define positioning, messaging, and content systems.",
      icon: <Layers size={22} />,
      color: "from-violet-600 to-violet-400",
      border: "border-violet-500/30",
    },
    {
      num: "03",
      label: "DEPLOY",
      title: "Execute with Creative Advantage",
      desc: "Launch content and campaigns with clarity and consistency.",
      icon: <Rocket size={22} />,
      color: "from-amber-600 to-amber-400",
      border: "border-amber-500/30",
    },
    {
      num: "04",
      label: "DRIVE",
      title: "Measure, Refine, and Compound",
      desc: "Optimize performance and build repeatable growth momentum.",
      icon: <RotateCcw size={22} />,
      color: "from-green-600 to-green-400",
      border: "border-green-500/30",
    },
  ];

  return (
    <section
      id="method"
      ref={ref}
      className="py-16 md:py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #08091C, #0B0D20 50%, #08091C)" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div variants={fadeUp} className="tag inline-block mb-4">
            The NXL Method
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            From <span className="gradient-text">Insight</span> to Execution
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            A four-phase system that turns strategic clarity into measurable results.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative p-5 md:p-6 rounded-2xl card-glass border ${step.border} group cursor-default`}
            >
              <div className="text-xs font-mono text-white/20 mb-3">{step.num}</div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
                {step.label}
              </div>
              <h3 className="font-bold text-white text-base md:text-lg mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>

              {i < 3 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-800 border border-white/10 items-center justify-center">
                  <ArrowRight size={10} className="text-slate-400" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mt-10 text-center"
        >
          <p className="text-slate-500 italic text-sm md:text-base">
            Clarity compounds.{" "}
            <span className="text-slate-300 not-italic font-semibold">Execution creates advantage.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 8: How the System Operates ─── */

function SystemOperates() {
  const { ref, inView } = useInView();

  const capabilities = [
    { icon: <Target size={18} />, text: "Build clear positioning and messaging systems" },
    { icon: <Users size={18} />, text: "Develop content and audience growth frameworks" },
    { icon: <Globe size={18} />, text: "Execute across platforms with consistency" },
    { icon: <Zap size={18} />, text: "Design conversion paths and lead systems" },
    { icon: <BarChart3 size={18} />, text: "Track performance and refine continuously" },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="tag inline-block mb-4">
              How the System Operates
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
            >
              Built and Scaled{" "}
              <span className="gradient-text">Layer by Layer</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
              NXL works across the full growth system — designing, implementing, and optimizing each layer for brands focused on measurable visibility, engagement, and conversion.
            </motion.p>

            <motion.div variants={staggerContainer} className="flex flex-col gap-3">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  variants={slideLeft}
                  className="flex items-center gap-4 p-3.5 md:p-4 rounded-xl card-glass group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    {cap.icon}
                  </div>
                  <span className="text-slate-300 text-sm">{cap.text}</span>
                  <ArrowRight size={14} className="text-slate-600 ml-auto shrink-0 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — stat cards */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "360°", label: "Growth System", icon: <RotateCcw size={20} /> },
              { value: "6", label: "System Layers", icon: <Layers size={20} /> },
              { value: "4", label: "Phase Method", icon: <Sparkles size={20} /> },
              { value: "Global", label: "Reach", icon: <Globe size={20} /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-5 md:p-6 rounded-2xl card-glass text-center group cursor-default"
              >
                <div className="text-blue-400 flex justify-center mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-slate-500 text-xs tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 9: About Us ─── */

function AboutUs() {
  const { ref, inView } = useInView();

  const traits = [
    { label: "Communicate with clarity", icon: <Sparkles size={16} /> },
    { label: "Attract the right audience", icon: <Target size={16} /> },
    { label: "Build trust over time", icon: <Shield size={16} /> },
    { label: "Convert attention into measurable growth", icon: <TrendingUp size={16} /> },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 md:py-24 lg:py-36 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #08091C, #0A0C1E 50%, #08091C)" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* Left */}
          <motion.div variants={staggerContainer}>
            <motion.div variants={fadeUp} className="tag inline-block mb-4">
              About NXL Digital
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            >
              Built for{" "}
              <span className="gradient-text">Long-Term Advantage</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-slate-400 text-base md:text-lg leading-relaxed mb-5">
              NXL Digital is a Manila-based growth and strategy collective helping businesses build audience advantage through strategic clarity, creative execution, and structured growth systems.
            </motion.p>

            <motion.p variants={fadeUp} className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
              We are a network of experienced strategists, marketers, creatives, and technical specialists united by one objective: helping brands grow with direction, consistency, and long-term momentum.
            </motion.p>

            <motion.p variants={fadeUp} className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              Rather than operating as a traditional agency limited by rigid structures, NXL functions as a{" "}
              <span className="text-white font-semibold">flexible strategic partner</span>, capable of integrating into a business as an extension of its team or leading initiatives as a full-service growth and consulting provider.
            </motion.p>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {traits.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/3 border border-white/5"
                >
                  <span className="text-blue-400 shrink-0">{t.icon}</span>
                  <span className="text-slate-300 text-sm font-medium">{t.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div variants={slideRight} className="space-y-4 md:space-y-5">
            <div className="p-5 md:p-6 rounded-2xl card-glass gradient-border">
              <div className="flex items-center gap-3 mb-4">
                <Globe size={20} className="text-blue-400 shrink-0" />
                <span className="font-semibold text-white">Global Reach</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                While based in Manila, NXL works with clients across the{" "}
                <span className="text-white">US, EU, and Asia</span> — bringing global perspective while remaining grounded in practical execution.
              </p>
              <div className="flex flex-wrap gap-2">
                {["🇵🇭 Manila", "🇺🇸 US", "🇪🇺 EU", "🌏 Asia"].map((loc) => (
                  <span key={loc} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 md:p-6 rounded-2xl card-glass">
              <div className="flex items-center gap-3 mb-4">
                <Layers size={20} className="text-violet-400 shrink-0" />
                <span className="font-semibold text-white">Network Model</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Supported by a curated network of specialists across strategy, creative, marketing, and technical disciplines — NXL assembles the right expertise around each business challenge.
              </p>
            </div>

            <div
              className="p-5 md:p-6 rounded-2xl overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.08))",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              <p className="relative z-10 text-white font-semibold text-base md:text-lg leading-relaxed">
                "We believe sustainable growth comes from{" "}
                <span className="gradient-text">clarity, differentiation,</span> and the ability to build trust consistently over time."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Contact / CTA ─── */

function Contact() {
  const { ref, inView } = useInView();

  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 md:py-24 lg:py-36 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="tag inline-block mb-5">
            Start a Conversation
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight"
          >
            Turn Insight Into{" "}
            <span className="gradient-text">Advantage</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-xl text-slate-400 mb-10 md:mb-12 max-w-2xl mx-auto"
          >
            Growth starts with clarity. Let's identify where your advantage is and build around it.
          </motion.p>

          {/* Contact options */}
          <motion.div
            variants={staggerContainer}
            className="flex justify-center max-w-sm mx-auto mb-10 md:mb-12"
          >
            <motion.a
              variants={scaleIn}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              href="mailto:contact@nxldigital.com"
              className="flex items-center gap-4 p-5 md:p-6 rounded-2xl card-glass group"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors shrink-0">
                <Mail size={20} />
              </div>
              <div className="text-left min-w-0">
                <div className="text-white font-semibold mb-0.5 text-sm md:text-base">Email Us</div>
                <div className="text-slate-400 text-xs md:text-sm truncate">contact@nxldigital.com</div>
              </div>
              <ArrowUpRight size={16} className="text-slate-600 ml-auto shrink-0 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </motion.a>

          </motion.div>

          {/* CTA Button */}
          <motion.div variants={fadeUp}>
            <a
              href="mailto:contact@nxldigital.com"
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg font-semibold"
            >
              <span>Start a Strategy Conversation</span>
              <ArrowRight size={18} className="relative z-10" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-xs md:text-sm"
          >
            <MapPin size={14} />
            <span>Manila, Philippines — serving US, EU &amp; Asia</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-4 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-10 opacity-70 hover:opacity-100 transition-opacity">
            <Image src="/logo.webp" alt="NXL Digital" fill sizes="64px" className="object-contain" />
          </div>
          <span className="text-sm text-slate-500">Digital Audience Engine</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <a href="#about" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">About</a>
          <a href="#system" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">System</a>
          <a href="#method" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Method</a>
          <a href="#contact" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Contact</a>
        </div>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} NXL Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="divider" />
        <CoreTruth />
        <div className="divider" />
        <SystemPositioning />
        <div className="divider" />
        <CoreObjectives />
        <div className="divider" />
        <StrategicPrinciple />
        <div className="divider" />
        <NXLMethod />
        <div className="divider" />
        <SystemOperates />
        <div className="divider" />
        <AboutUs />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
