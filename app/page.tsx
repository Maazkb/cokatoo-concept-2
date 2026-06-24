'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'
import Image from 'next/image'
import {
  Wallet,
  Globe,
  Zap,
  ShieldCheck,
  Lock,
  MapPin,
  Star,
  ArrowRight,
  Menu,
  X,
  Plane,
  CheckCircle2,
  Package,
  Search,
  ShoppingBag,
  Truck,
} from 'lucide-react'

// ─── Brand tokens — strict two-color palette ──────────────────────────────────

const P = '#6D5A8D'   // purple
const W = '#FFFFFF'   // white

// Derived opacity helpers (inline style strings)
const p70 = 'rgba(109,90,141,0.70)'  // purple 70% — subtext on white
const p40 = 'rgba(109,90,141,0.40)'  // purple 40% — muted / borders
const p20 = 'rgba(109,90,141,0.20)'  // purple 20% — card borders / backgrounds
const p12 = 'rgba(109,90,141,0.12)'  // purple 12% — very subtle bg
const w75 = 'rgba(255,255,255,0.75)' // white 75%  — subtext on purple
const w50 = 'rgba(255,255,255,0.50)' // white 50%  — muted on purple
const w20 = 'rgba(255,255,255,0.20)' // white 20%  — borders on purple
const w10 = 'rgba(255,255,255,0.10)' // white 10%  — subtle bg on purple

// ─── Motion presets ───────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

// ─── 1. Navbar — purple bg ────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 transition-shadow duration-300"
      style={{
        backgroundColor: P,
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.20)' : 'none',
      }}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight" style={{ color: W }}>
            cokatoo
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {['About', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-opacity hover:opacity-70"
              style={{ color: W }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: W, color: P }}
          >
            Explore
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: W }}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden border-t"
            style={{ backgroundColor: P, borderColor: w20 }}
          >
            <nav className="px-5 py-4 flex flex-col gap-1">
              {['About', 'Contact'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="px-3 py-2.5 text-sm font-semibold rounded-lg transition-opacity hover:opacity-75"
                  style={{ color: W }}
                >
                  {link}
                </a>
              ))}
              <a
                href="#waitlist"
                className="mt-2 py-3 text-sm font-semibold rounded-xl text-center"
                style={{ backgroundColor: W, color: P }}
              >
                Explore
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── 2. Hero — purple bg ──────────────────────────────────────────────────────

const ROUTES = [
  { from: '🇦🇪 Dubai', to: '🇵🇰 Lahore' },
  { from: '🇬🇧 London', to: '🇵🇰 Karachi' },
  { from: '🇺🇸 NYC', to: '🇵🇰 Islamabad' },
  { from: '🇯🇵 Tokyo', to: '🇦🇪 Dubai' },
]

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      style={{ backgroundColor: P }}
    >
      {/* Subtle white glow for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 65% 50%, ${w10} 0%, transparent 70%)`,
        }}
      />

      <motion.div
        style={{ y: parallaxY }}
        className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* Left copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-7"
          >
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{ backgroundColor: w20, color: W }}
              >
                Shop global
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-[64px] font-semibold leading-[1.08] tracking-tight"
              style={{ color: W }}
            >
              Delivered by people,<br />not packages.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed max-w-lg"
              style={{ color: w75 }}
            >
              With Cokatoo, you don't need an overseas address — just a link. We'll
              match you with trusted travelers flying to your country who
              hand-deliver your items.
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-full text-[15px] transition-opacity hover:opacity-90"
                style={{ backgroundColor: W, color: P }}
              >
                Explore how it works
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: overlapping phone mockups */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            <div className="relative w-72 h-[500px] sm:w-80 sm:h-[560px]">
              {/* Back phone — Asset 65 */}
              <motion.div
                className="absolute top-0 right-0 w-56 h-[420px] sm:w-[260px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 0.6 }}
              >
                <Image src="/1x/Asset%2065.png" alt="Cokatoo app" fill className="object-cover" />
              </motion.div>
              {/* Front phone — Asset 64 */}
              <motion.div
                className="absolute bottom-0 left-0 w-56 h-[420px] sm:w-[260px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl"
                style={{ border: `2px solid ${w20}` }}
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
              >
                <Image src="/1x/Asset%2064.png" alt="Cokatoo app" fill className="object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Animated route pills */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease }}
        >
          {ROUTES.map((r, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium border"
              style={{ color: w75, borderColor: w20, backgroundColor: w10 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)', transition: { duration: 0.18 } }}
            >
              <span>{r.from}</span>
              <Plane className="w-3.5 h-3.5" style={{ color: W }} />
              <span>{r.to}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── 3. Curiosity — white bg ──────────────────────────────────────────────────

const PRODUCTS = [
  { name: 'iPhone 15 Pro Max', from: 'Dubai', to: 'Lahore', value: '$1,299', reward: '$25', initial: 'AK' },
  { name: 'Rolex Day-Date', from: 'London', to: 'Karachi', value: '$8,500', reward: '$200', initial: 'SR' },
  { name: 'Nike Air Jordan 1 Retro', from: 'NYC', to: 'Islamabad', value: '$221', reward: '$35', initial: 'HR' },
  { name: 'MacBook Pro M4', from: 'Toronto', to: 'Lahore', value: '$1,999', reward: '$80', initial: 'ZA' },
  { name: 'Dyson Airwrap', from: 'London', to: 'Karachi', value: '$599', reward: '$45', initial: 'MP' },
  { name: 'Sony PS5', from: 'Tokyo', to: 'Dubai', value: '$499', reward: '$40', initial: 'YT' },
]

function CuriositySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28" style={{ backgroundColor: W }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold mb-4" style={{ color: P }}>
            What people are buying right now
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: p70 }}>
            Real requests from real shoppers — earn extra on trips you are already taking.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {PRODUCTS.map((prod, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-2xl border p-6 cursor-pointer transition-shadow hover:shadow-xl"
              style={{ borderColor: p20, backgroundColor: W }}
            >
              {/* Shopper avatar */}
              <div className="flex items-start gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                  style={{ backgroundColor: P, color: W }}
                >
                  {prod.initial}
                </div>
                <div>
                  <p className="font-semibold leading-tight" style={{ color: P }}>{prod.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: p40 }}>Verified shopper</p>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm font-medium" style={{ color: P }}>{prod.from}</span>
                <div className="flex-1 flex items-center gap-1">
                  <div className="flex-1 border-t border-dashed" style={{ borderColor: p40 }} />
                  <Plane className="w-3.5 h-3.5 flex-shrink-0" style={{ color: P }} />
                  <div className="flex-1 border-t border-dashed" style={{ borderColor: p40 }} />
                </div>
                <span className="text-sm font-medium" style={{ color: P }}>{prod.to}</span>
              </div>

              {/* Value + Reward */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: p40 }}>Item value</p>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: p70 }}>{prod.value}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: p40 }}>Reward</p>
                  <p className="text-2xl font-semibold" style={{ color: P }}>{prod.reward}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 4. How It Works — purple bg ─────────────────────────────────────────────

const SHOPPER_STEPS = [
  { num: 1, title: 'Paste a product link', desc: 'Add the product URL from any global brand.' },
  { num: 2, title: 'Set your offer', desc: 'Name your price, include item cost, delivery reward, and any extras.' },
  { num: 3, title: 'Get matched with a traveler', desc: 'A traveler heading your way accepts the request.' },
  { num: 4, title: 'Track and receive', desc: 'Stay updated until the product is in your hands.' },
]

const TRAVELER_STEPS = [
  { num: 1, title: 'Add your upcoming trip', desc: 'Enter your travel dates and destination.' },
  { num: 2, title: 'Browse shopper requests', desc: 'View product requests matching your route.' },
  { num: 3, title: 'Accept and buy', desc: 'Negotiate if needed, purchase the product.' },
  { num: 4, title: 'Deliver and earn', desc: 'Meet the buyer, deliver the product, and get paid.' },
]

const TAB_HEADLINES = {
  shopper: 'Shop Your Favorite Brands, No Matter Where You Are',
  traveler: 'Fly, Deliver, and Earn on Every Trip',
}

function HowItWorks() {
  const [tab, setTab] = useState<'shopper' | 'traveler'>('shopper')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const steps = tab === 'shopper' ? SHOPPER_STEPS : TRAVELER_STEPS

  return (
    <section ref={ref} className="py-28" style={{ backgroundColor: P }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold mb-10" style={{ color: W }}>
            {TAB_HEADLINES[tab]}
          </h2>

          {/* Toggle pills */}
          <div className="flex justify-center">
            <div className="flex rounded-full p-1 gap-1" style={{ backgroundColor: w20 }}>
              {(['shopper', 'traveler'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="relative px-7 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200"
                  style={{ color: tab === t ? P : W }}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="how-tab"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: W }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">
                    I am a {t === 'shopper' ? 'Shopper' : 'Traveler'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="flex flex-col items-center text-center p-8 rounded-2xl"
                style={{ backgroundColor: W }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold mb-6"
                  style={{ backgroundColor: P, color: W }}
                >
                  {step.num}
                </div>
                <h3 className="font-semibold text-lg mb-3 leading-snug" style={{ color: P }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: p70 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── 5. Track Your Order — white bg ───────────────────────────────────────────

const STAGES = [
  { icon: Package, label: 'Request Posted' },
  { icon: Search, label: 'Traveler Matched' },
  { icon: ShoppingBag, label: 'Item Purchased' },
  { icon: Plane, label: 'In Transit' },
  { icon: Truck, label: 'Out for Delivery' },
  { icon: CheckCircle2, label: 'Delivered' },
]

function TrackOrder() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(timelineRef, { once: true, margin: '-100px' })
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!inView) return
    let i = -1
    const id = setInterval(() => {
      i++
      setActive(i)
      if (i >= STAGES.length - 1) clearInterval(id)
    }, 420)
    return () => clearInterval(id)
  }, [inView])

  return (
    <section className="py-28" style={{ backgroundColor: W }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold" style={{ color: P }}>
            Track every step of your delivery
          </h2>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Connecting line */}
          <div
            className="absolute top-7 left-0 right-0 h-0.5 hidden lg:block"
            style={{ backgroundColor: p20, zIndex: 0 }}
          >
            <motion.div
              className="h-full origin-left"
              style={{ backgroundColor: P }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: active < 0 ? 0 : active / (STAGES.length - 1) } : { scaleX: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon
              const done = i <= active
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.45, ease }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500"
                    style={{
                      backgroundColor: done ? P : W,
                      borderColor: done ? P : p20,
                    }}
                    animate={done ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={{ duration: 0.35, delay: i * 0.12 }}
                  >
                    <Icon
                      className="w-6 h-6 transition-colors duration-500"
                      style={{ color: done ? W : p40 }}
                    />
                  </motion.div>
                  <p
                    className="text-sm font-semibold leading-tight transition-colors duration-500"
                    style={{ color: done ? P : p40 }}
                  >
                    {stage.label}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 6. Do More With Cokatoo — purple bg ─────────────────────────────────────

const DO_MORE = [
  { icon: Wallet, title: 'Save on Shipping Costs', desc: 'Pay a small reward — far less than international shipping fees.' },
  { icon: Globe, title: 'Access Global Products', desc: 'Get anything from anywhere in the world delivered to your door.' },
  { icon: Zap, title: 'Fast Delivery', desc: 'Travelers move faster than couriers. Get your item in days, not weeks.' },
  { icon: ShieldCheck, title: 'Verified Travelers Only', desc: 'Multi-step ID verification, background checks, and ratings.' },
  { icon: Lock, title: 'Secure Escrow Payments', desc: 'Funds are held safely until you confirm your item arrived.' },
  { icon: MapPin, title: 'Real Time Tracking', desc: 'Track your request from posting to doorstep delivery.' },
]

function DoMore() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28" style={{ backgroundColor: P }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold" style={{ color: W }}>
            Do more with Cokatoo
          </h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {DO_MORE.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-7 rounded-2xl border cursor-default"
                style={{ borderColor: w20, backgroundColor: w10 }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: w20 }}
                >
                  <Icon className="w-5 h-5" style={{ color: W }} />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: W }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: w75 }}>{f.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 7. Trust Section — white bg ─────────────────────────────────────────────

function TrustSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const stats = [
    { value: '12,000+', label: 'Deliveries' },
    { value: '80+', label: 'Countries' },
    { value: '4.9 ★', label: 'Star Rating' },
  ]

  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Verified ID Checks',
      desc: 'Every traveler passes multi-step identity verification — passport scan, selfie match, and background review before accepting any request.',
    },
    {
      icon: Lock,
      title: 'Escrow Payments',
      desc: 'Your payment is held in secure escrow for the entire journey. Released only after you confirm the item arrived correctly.',
    },
    {
      icon: CheckCircle2,
      title: 'Delivery Guarantee',
      desc: "If your item doesn't arrive or doesn't match, you receive a full refund. No forms, no questions, no hassle.",
    },
  ]

  return (
    <section ref={ref} className="py-28" style={{ backgroundColor: W }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Headline block */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold mb-4" style={{ color: P }}>
            Trusted by a global community
          </h2>
          <p className="text-xl font-semibold mb-5" style={{ color: P }}>
            Built on trust, powered by people.
          </p>
          <p className="text-base leading-relaxed" style={{ color: p70 }}>
            At Cokatoo, every transaction is backed by real people and real journeys. Our growing
            community of verified buyers and travelers ensures a safe, transparent, and supportive
            experience — where mutual trust leads to shared value. From ratings to secure payments,
            every feature is designed to build confidence and accountability.
          </p>
        </motion.div>

        {/* Stats — purple cards on white section */}
        <motion.div
          className="grid sm:grid-cols-3 gap-5 mb-20"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center py-10 px-6 rounded-2xl"
              style={{ backgroundColor: P }}
            >
              <div className="text-5xl sm:text-6xl font-semibold mb-2" style={{ color: W }}>
                {s.value}
              </div>
              <p className="font-semibold" style={{ color: w75 }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust pillars */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-8 rounded-2xl border"
                style={{ borderColor: p20 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: p12 }}
                >
                  <Icon className="w-6 h-6" style={{ color: P }} />
                </div>
                <h3 className="font-semibold text-xl mb-3" style={{ color: P }}>{pillar.title}</h3>
                <p className="leading-relaxed text-[15px]" style={{ color: p70 }}>{pillar.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 8. Testimonials — purple bg ─────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: 'Sarah K',
    route: 'Dubai to Lahore',
    quote: 'Got my Dyson Airwrap in perfect condition. The traveler was so professional.',
    stars: 5,
    initial: 'SK',
  },
  {
    name: 'Ahmed R',
    route: 'London to Karachi',
    quote: 'Made $180 on my last trip just by carrying two small items. Totally worth it.',
    stars: 5,
    initial: 'AR',
  },
  {
    name: 'Priya M',
    route: 'NYC to Islamabad',
    quote: 'Finally got the Nike Dunks that are not available here. Seamless experience.',
    stars: 5,
    initial: 'PM',
  },
]

function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28" style={{ backgroundColor: P }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold" style={{ color: W }}>
            What our community says
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-8 rounded-2xl"
              style={{ backgroundColor: W }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-semibold flex-shrink-0"
                  style={{ backgroundColor: P, color: W }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: P }}>{t.name}</p>
                  <p className="text-sm" style={{ color: p70 }}>{t.route}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4" style={{ color: P, fill: P }} />
                ))}
              </div>
              <p className="leading-relaxed" style={{ color: p70 }}>"{t.quote}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 9. Waitlist CTA — white bg ───────────────────────────────────────────────

function Waitlist() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email.trim()) setDone(true)
  }

  return (
    <section id="waitlist" className="relative py-28 overflow-hidden" style={{ backgroundColor: W }}>
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${p12} 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold mb-3 leading-tight" style={{ color: P }}>
            Launching Soon
          </h2>
          <p className="text-xl font-semibold mb-4" style={{ color: P }}>
            A new way to shop, travel and earn
          </p>
          <p className="text-base leading-relaxed mb-10" style={{ color: p70 }}>
            Get ready for an exciting experience where shopping and traveling meet opportunity.
            With Cokatoo, you can place orders, deliver products, and earn rewards — all in one
            simple app.
          </p>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3.5 rounded-full text-sm focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: p12,
                    border: `1px solid ${p40}`,
                    color: P,
                    focusRingColor: P,
                  } as React.CSSProperties}
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full text-sm font-semibold whitespace-nowrap transition-opacity hover:opacity-90"
                  style={{ backgroundColor: P, color: W }}
                >
                  Notify Me
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border"
                style={{ borderColor: p40, backgroundColor: p12, color: P }}
              >
                <span className="text-xl">🎉</span>
                <span className="font-semibold">You're on the list! We'll be in touch soon.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar stack */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {['JK', 'AM', 'SR', 'LP', 'MN'].map((init, i) => (
                <div
                  key={init}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[9px] font-bold"
                  style={{ backgroundColor: P, borderColor: W, color: W, zIndex: 5 - i }}
                >
                  {init}
                </div>
              ))}
            </div>
            <p className="text-sm" style={{ color: p70 }}>
              <span className="font-semibold" style={{ color: P }}>2,400+</span> already waiting
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── 10. Footer — purple bg ───────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ backgroundColor: P }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-start gap-10 mb-12">
          {/* Brand */}
          <div className="flex-1">
            <span className="text-xl font-semibold tracking-tight block mb-4" style={{ color: W }}>
              cokatoo
            </span>
            <p className="text-sm max-w-[220px]" style={{ color: w75 }}>
              Connecting the world one suitcase at a time.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {[
              { heading: 'Company', links: ['About', 'FAQ', 'Contact'] },
              { heading: 'Legal', links: ['Terms', 'Privacy'] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <h4 className="font-semibold text-sm mb-4" style={{ color: W }}>{heading}</h4>
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm transition-opacity hover:opacity-100"
                        style={{ color: w75 }}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t" style={{ borderColor: w20 }}>
          <p className="text-sm" style={{ color: w50 }}>
            Copyright 2026 CokatooApp Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />           {/* purple */}
        <CuriositySection />{/* white  */}
        <HowItWorks />     {/* purple */}
        <TrackOrder />     {/* white  */}
        <DoMore />         {/* purple */}
        <TrustSection />   {/* white  */}
        <Testimonials />   {/* purple */}
        <Waitlist />       {/* white  */}
      </main>
      <Footer />           {/* purple */}
    </div>
  )
}
