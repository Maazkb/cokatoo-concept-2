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

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const B = {
  primary: '#6D5A8D',
  accent: '#6D5A8D',
  dark: '#1a0f2e',
  light: '#f0ebf7',
  white: '#FFFFFF',
} as const

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

// ─── 1. Navbar ────────────────────────────────────────────────────────────────

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
        backgroundColor: B.primary,
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.25)' : 'none',
      }}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <span className="text-xl font-semibold text-white tracking-tight">
            cokatoo
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {['About', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-75"
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
            style={{ backgroundColor: B.white, color: B.primary }}
          >
            Explore
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-white"
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
            style={{
              backgroundColor: B.primary,
              borderColor: 'rgba(255,255,255,0.15)',
            }}
          >
            <nav className="px-5 py-4 flex flex-col gap-1">
              {['About', 'Contact'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="px-3 py-2.5 text-sm font-semibold rounded-lg text-white hover:opacity-75 transition-opacity"
                >
                  {link}
                </a>
              ))}
              <a
                href="#waitlist"
                className="mt-2 py-3 text-sm font-semibold rounded-xl text-center"
                style={{ backgroundColor: B.white, color: B.primary }}
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

// ─── 2. Hero ──────────────────────────────────────────────────────────────────

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
      style={{ backgroundColor: B.dark }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 65% 55%, rgba(133,101,166,0.18) 0%, transparent 70%)',
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
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: B.primary }}
              >
                ✈️ Fly and earn
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-[64px] font-semibold leading-[1.08] tracking-tight text-white"
            >
              Deliver brands,<br />not just baggage.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed max-w-lg"
              style={{ color: '#c4b8d8' }}
            >
              Turn your extra luggage space into extra cash. Help global shoppers
              get the brands they love while you travel, with secure payments and
              verified requests.
            </motion.p>

            <motion.div variants={fadeUp}>
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-full text-[15px] transition-opacity hover:opacity-90"
                style={{ backgroundColor: B.primary }}
              >
                Start Traveling
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
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
              >
                <Image
                  src="/1x/Asset%2065.png"
                  alt="Cokatoo app"
                  fill
                  className="object-cover"
                />
              </motion.div>
              {/* Front phone — Asset 64 */}
              <motion.div
                className="absolute bottom-0 left-0 w-56 h-[420px] sm:w-[260px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl"
                style={{ border: '2px solid rgba(255,255,255,0.12)' }}
                animate={{ y: [0, 12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5.5,
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src="/1x/Asset%2064.png"
                  alt="Cokatoo app"
                  fill
                  className="object-cover"
                />
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
              style={{
                color: 'rgba(255,255,255,0.80)',
                borderColor: 'rgba(255,255,255,0.15)',
                backgroundColor: 'rgba(255,255,255,0.05)',
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255,255,255,0.10)',
                transition: { duration: 0.18 },
              }}
            >
              <span>{r.from}</span>
              <Plane className="w-3.5 h-3.5" style={{ color: B.accent }} />
              <span>{r.to}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── 3. Curiosity — What people are buying ────────────────────────────────────

const PRODUCTS = [
  {
    name: 'iPhone 15 Pro Max',
    from: 'Dubai',
    to: 'Lahore',
    value: '$1,299',
    reward: '$25',
    initial: 'AK',
  },
  {
    name: 'Rolex Day-Date',
    from: 'London',
    to: 'Karachi',
    value: '$8,500',
    reward: '$200',
    initial: 'SR',
  },
  {
    name: 'Nike Air Jordan 1 Retro',
    from: 'NYC',
    to: 'Islamabad',
    value: '$221',
    reward: '$35',
    initial: 'HR',
  },
  {
    name: 'MacBook Pro M4',
    from: 'Toronto',
    to: 'Lahore',
    value: '$1,999',
    reward: '$80',
    initial: 'ZA',
  },
  {
    name: 'Dyson Airwrap',
    from: 'London',
    to: 'Karachi',
    value: '$599',
    reward: '$45',
    initial: 'MP',
  },
  {
    name: 'Sony PS5',
    from: 'Tokyo',
    to: 'Dubai',
    value: '$499',
    reward: '$40',
    initial: 'YT',
  },
]

function CuriositySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-4"
            style={{ color: B.primary }}
          >
            What people are buying right now
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Real requests from real shoppers — earn extra on trips you are
            already taking.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={stagger}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-2xl border p-6 cursor-pointer transition-shadow hover:shadow-xl"
              style={{ borderColor: 'rgba(59,40,95,0.12)' }}
            >
              {/* Shopper avatar */}
              <div className="flex items-start gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0"
                  style={{ backgroundColor: B.primary }}
                >
                  {p.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Verified shopper
                  </p>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm font-medium text-gray-700">
                  {p.from}
                </span>
                <div className="flex-1 flex items-center gap-1">
                  <div
                    className="flex-1 border-t border-dashed"
                    style={{ borderColor: B.accent + '70' }}
                  />
                  <Plane
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: B.accent }}
                  />
                  <div
                    className="flex-1 border-t border-dashed"
                    style={{ borderColor: B.accent + '70' }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {p.to}
                </span>
              </div>

              {/* Value + Reward */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Item value
                  </p>
                  <p className="text-sm font-semibold text-gray-700 mt-0.5">
                    {p.value}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Reward
                  </p>
                  <p
                    className="text-2xl font-semibold"
                    style={{ color: B.primary }}
                  >
                    {p.reward}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 4. How It Works ──────────────────────────────────────────────────────────

const SHOPPER_STEPS = [
  {
    num: 1,
    title: 'Post your request with product link',
    desc: 'Share the product URL, set your reward, and let verified travelers find you.',
  },
  {
    num: 2,
    title: 'Get matched with a verified traveler',
    desc: 'We connect you with a trusted traveler already heading your way.',
  },
  {
    num: 3,
    title: 'Receive your item and release payment',
    desc: 'Confirm arrival and escrow payment releases automatically.',
  },
]

const TRAVELER_STEPS = [
  {
    num: 1,
    title: 'List your upcoming trip and route',
    desc: 'Add your travel dates and route so shoppers can find you.',
  },
  {
    num: 2,
    title: 'Browse matching shopper requests',
    desc: 'See open requests along your route and pick what fits your luggage.',
  },
  {
    num: 3,
    title: 'Deliver and earn your reward',
    desc: 'Hand over the item and collect your reward instantly upon delivery.',
  },
]

function HowItWorks() {
  const [tab, setTab] = useState<'shopper' | 'traveler'>('shopper')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const steps = tab === 'shopper' ? SHOPPER_STEPS : TRAVELER_STEPS

  return (
    <section ref={ref} className="py-28" style={{ backgroundColor: B.light }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <h2
            className="text-4xl sm:text-5xl font-semibold mb-10"
            style={{ color: B.primary }}
          >
            How Cokatoo Works
          </h2>

          {/* Toggle pills */}
          <div className="flex justify-center">
            <div
              className="flex rounded-full p-1 gap-1"
              style={{ backgroundColor: 'rgba(59,40,95,0.10)' }}
            >
              {(['shopper', 'traveler'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="relative px-7 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200"
                  style={{ color: tab === t ? B.white : B.primary }}
                >
                  {tab === t && (
                    <motion.span
                      layoutId="how-tab"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: B.primary }}
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
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-semibold mb-6"
                  style={{ backgroundColor: B.primary }}
                >
                  {step.num}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
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

// ─── 5. Track Your Order ──────────────────────────────────────────────────────

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
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease }}
        >
          <h2
            className="text-4xl sm:text-5xl font-semibold"
            style={{ color: B.primary }}
          >
            Track every step of your delivery
          </h2>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Connecting line */}
          <div
            className="absolute top-7 left-0 right-0 h-0.5 hidden lg:block"
            style={{ backgroundColor: '#e5e7eb', zIndex: 0 }}
          >
            <motion.div
              className="h-full origin-left"
              style={{ backgroundColor: B.primary }}
              initial={{ scaleX: 0 }}
              animate={
                inView
                  ? { scaleX: active < 0 ? 0 : active / (STAGES.length - 1) }
                  : { scaleX: 0 }
              }
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
                      backgroundColor: done ? B.primary : B.white,
                      borderColor: done ? B.primary : '#e5e7eb',
                    }}
                    animate={done ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                    transition={{ duration: 0.35, delay: i * 0.12 }}
                  >
                    <Icon
                      className="w-6 h-6 transition-colors duration-500"
                      style={{ color: done ? B.white : '#d1d5db' }}
                    />
                  </motion.div>
                  <p
                    className="text-sm font-semibold leading-tight transition-colors duration-500"
                    style={{ color: done ? B.primary : '#9ca3af' }}
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

// ─── 6. Do More With Cokatoo ─────────────────────────────────────────────────

const DO_MORE = [
  {
    icon: Wallet,
    title: 'Save on Shipping Costs',
    desc: 'Pay a small reward — far less than international shipping fees.',
  },
  {
    icon: Globe,
    title: 'Access Global Products',
    desc: 'Get anything from anywhere in the world delivered to your door.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    desc: 'Travelers move faster than couriers. Get your item in days, not weeks.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Travelers Only',
    desc: 'Multi-step ID verification, background checks, and ratings.',
  },
  {
    icon: Lock,
    title: 'Secure Escrow Payments',
    desc: 'Funds are held safely until you confirm your item arrived.',
  },
  {
    icon: MapPin,
    title: 'Real Time Tracking',
    desc: 'Track your request from posting to doorstep delivery.',
  },
]

function DoMore() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28" style={{ backgroundColor: B.dark }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold text-white">
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
                style={{
                  borderColor: B.primary + '80',
                  backgroundColor: 'rgba(59,40,95,0.20)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(133,101,166,0.22)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: B.accent }} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#a89bbf' }}>
                  {f.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 7. Trust Section ────────────────────────────────────────────────────────

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
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Stats */}
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
              style={{ backgroundColor: B.light }}
            >
              <div
                className="text-5xl sm:text-6xl font-semibold mb-2"
                style={{ color: B.primary }}
              >
                {s.value}
              </div>
              <p className="font-semibold text-gray-700">{s.label}</p>
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
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-8 rounded-2xl border"
                style={{ borderColor: 'rgba(59,40,95,0.12)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: B.light }}
                >
                  <Icon className="w-6 h-6" style={{ color: B.primary }} />
                </div>
                <h3 className="font-semibold text-gray-900 text-xl mb-3">
                  {p.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  {p.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 8. Testimonials ─────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: 'Sarah K',
    route: 'Dubai to Lahore',
    quote:
      'Got my Dyson Airwrap in perfect condition. The traveler was so professional.',
    stars: 5,
    initial: 'SK',
  },
  {
    name: 'Ahmed R',
    route: 'London to Karachi',
    quote:
      'Made $180 on my last trip just by carrying two small items. Totally worth it.',
    stars: 5,
    initial: 'AR',
  },
  {
    name: 'Priya M',
    route: 'NYC to Islamabad',
    quote:
      'Finally got the Nike Dunks that are not available here. Seamless experience.',
    stars: 5,
    initial: 'PM',
  },
]

function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28" style={{ backgroundColor: B.light }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <h2
            className="text-4xl sm:text-5xl font-semibold"
            style={{ color: B.primary }}
          >
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
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                  style={{ backgroundColor: B.primary }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.route}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed">"{t.quote}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 9. Waitlist CTA ─────────────────────────────────────────────────────────

function Waitlist() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email.trim()) setDone(true)
  }

  return (
    <section
      id="waitlist"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: B.primary }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Glow blobs */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ backgroundColor: B.accent }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: B.dark }}
      />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-4 leading-tight">
            Be the first to experience Cokatoo.
          </h2>
          <p className="text-lg mb-10" style={{ color: '#c4b5d4' }}>
            Join our waitlist and get early access to the platform.
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
                  className="flex-1 px-5 py-3.5 rounded-full text-white text-sm focus:outline-none"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full text-sm font-semibold whitespace-nowrap transition-opacity hover:opacity-90"
                  style={{ backgroundColor: B.white, color: B.primary }}
                >
                  Join Waitlist
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              >
                <span className="text-xl">🎉</span>
                <span className="font-semibold">
                  You're on the list! We'll be in touch soon.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar stack */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {['JK', 'AM', 'SR', 'LP', 'MN'].map((init, i) => (
                <div
                  key={init}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[9px] font-bold text-white"
                  style={{
                    backgroundColor: B.accent,
                    borderColor: B.primary,
                    zIndex: 5 - i,
                  }}
                >
                  {init}
                </div>
              ))}
            </div>
            <p className="text-sm" style={{ color: '#c4b5d4' }}>
              <span className="font-semibold text-white">2,400+</span> already
              waiting
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── 10. Footer ───────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ backgroundColor: B.dark }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-start gap-10 mb-12">
          {/* Brand */}
          <div className="flex-1">
            <div className="relative h-8 w-32 mb-4">
              <Image
                src="/1x/Asset%2065.png"
                alt="Cokatoo"
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
            <p className="text-sm max-w-[220px]" style={{ color: '#a89bbf' }}>
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
                <h4 className="text-white font-semibold text-sm mb-4">
                  {heading}
                </h4>
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: '#a89bbf' }}
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

        <div
          className="pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <p className="text-sm" style={{ color: '#6b5a7e' }}>
            © 2025 Cokatoo. All rights reserved.
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
        <Hero />
        <CuriositySection />
        <HowItWorks />
        <TrackOrder />
        <DoMore />
        <TrustSection />
        <Testimonials />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
