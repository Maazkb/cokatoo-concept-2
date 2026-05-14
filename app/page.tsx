'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Icons ────────────────────────────────────────────────────────────────────

function BirdIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.5 3.5c-2.2-.4-4.3.8-5.5 2.8L9 8.5 8 12l4-.5-2 4 3.5-.5.5 3L17 16c.5 1.5 1 3 .5 5 2.5-1.5 4-4.5 4-7 1.5-1 2.5-3 2.5-5.5 0-2.5-1.5-4.5-3.5-5z" />
      <circle cx="20" cy="7" r="1.2" />
    </svg>
  )
}

function ShieldCheckIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function LockIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function StarIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  )
}

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function MenuIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function XIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function PlaneIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  )
}

function TwitterXIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SHOPPER_STEPS = [
  {
    num: '1',
    title: 'Post your request',
    desc: "Tell us what you want, where it's from, and how much you're willing to offer as a reward fee.",
  },
  {
    num: '2',
    title: 'Match with a traveler',
    desc: 'Browse verified travelers heading your way and connect with one who can carry your item.',
  },
  {
    num: '3',
    title: 'Receive your item',
    desc: 'Your traveler delivers the item at your door. Payment releases from escrow automatically.',
  },
]

const TRAVELER_STEPS = [
  {
    num: '1',
    title: 'Browse requests',
    desc: 'Explore open requests for items along your travel route. Filter by destination, reward, and category.',
  },
  {
    num: '2',
    title: 'Accept and shop',
    desc: 'Accept a request, buy the item while abroad, and pack it in your luggage on your trip.',
  },
  {
    num: '3',
    title: 'Deliver and earn',
    desc: 'Hand over the item at your destination and collect your reward fee instantly through escrow.',
  },
]

const REQUESTS = [
  {
    id: 1,
    product: 'Apple Watch Ultra 2',
    emoji: '⌚',
    from: 'Dubai',
    fromFlag: '🇦🇪',
    to: 'Lahore',
    toFlag: '🇵🇰',
    value: '$799',
    reward: '$45',
    rating: '4.9',
    initials: 'AK',
    category: 'Electronics',
    gradStart: '#f0fdfa',
    gradEnd: '#e0f2fe',
  },
  {
    id: 2,
    product: 'Dyson Airwrap Complete',
    emoji: '💨',
    from: 'London',
    fromFlag: '🇬🇧',
    to: 'Karachi',
    toFlag: '🇵🇰',
    value: '$600',
    reward: '$55',
    rating: '5.0',
    initials: 'SM',
    category: 'Beauty',
    gradStart: '#fdf4ff',
    gradEnd: '#fce7f3',
  },
  {
    id: 3,
    product: 'Nike Air Jordan 1 Retro',
    emoji: '👟',
    from: 'New York',
    fromFlag: '🇺🇸',
    to: 'Islamabad',
    toFlag: '🇵🇰',
    value: '$220',
    reward: '$35',
    rating: '4.8',
    initials: 'HR',
    category: 'Footwear',
    gradStart: '#fff7ed',
    gradEnd: '#fef3c7',
  },
  {
    id: 4,
    product: 'MacBook Pro M3 Pro',
    emoji: '💻',
    from: 'Toronto',
    fromFlag: '🇨🇦',
    to: 'Lahore',
    toFlag: '🇵🇰',
    value: '$1,999',
    reward: '$80',
    rating: '4.7',
    initials: 'ZA',
    category: 'Electronics',
    gradStart: '#f0fdf4',
    gradEnd: '#dbeafe',
  },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = ['How it works', 'Browse', 'About', 'FAQ', 'Contact']

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-white'
      }`}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
              <BirdIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Cokatoo</span>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#waitlist"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 bg-teal-600 text-white text-sm font-semibold rounded-full hover:bg-teal-700 active:scale-95 transition-all shadow-sm"
            >
              Get Early Access
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <nav className="px-5 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link}
                </a>
              ))}
              <a
                href="#waitlist"
                className="mt-2 px-4 py-3 bg-teal-600 text-white text-sm font-semibold rounded-xl text-center hover:bg-teal-700 transition-colors"
              >
                Get Early Access
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Hero Card ────────────────────────────────────────────────────────────────

function HeroCard() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -14, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-3xl blur-2xl opacity-40 scale-95 pointer-events-none" />

      {/* Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-5 w-80 border border-slate-100">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            New Request
          </span>
          <span className="text-xs text-slate-400">2 min ago</span>
        </div>

        {/* Product */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-3xl flex-shrink-0 shadow-inner">
            ⌚
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight">Apple Watch Ultra 2</h3>
            <p className="text-xs text-slate-400 mt-0.5">Titanium · GPS+Cellular · 49mm</p>
            <div className="flex items-center gap-0.5 mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="w-3 h-3 text-amber-400" />
              ))}
              <span className="text-xs font-semibold text-slate-600 ml-1">4.9</span>
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="bg-slate-50 rounded-2xl p-3.5 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">From</p>
              <p className="font-bold text-slate-900 text-sm">Dubai</p>
              <p className="text-xs text-slate-500">🇦🇪 UAE</p>
            </div>
            <div className="flex-1 flex items-center px-3">
              <div className="w-full flex items-center gap-1">
                <div className="flex-1 border-t-2 border-dashed border-teal-200" />
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <PlaneIcon className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <div className="flex-1 border-t-2 border-dashed border-teal-200" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">To</p>
              <p className="font-bold text-slate-900 text-sm">Lahore</p>
              <p className="text-xs text-slate-500">🇵🇰 Pakistan</p>
            </div>
          </div>
        </div>

        {/* Reward row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Item value</p>
            <p className="text-sm font-bold text-slate-700 mt-0.5">$799</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Reward fee</p>
            <p className="text-2xl font-bold text-teal-600 mt-0.5">$45</p>
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition-colors">
            Accept
          </button>
        </div>

        {/* Shopper */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">AK</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700 leading-none">Ali Khan</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Verified · 23 orders</p>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
            <CheckIcon className="w-3 h-3 text-green-600" />
            <span className="text-[10px] font-semibold text-green-700">Trusted</span>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        className="absolute -top-3 -right-5 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 border border-slate-100"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.8 }}
      >
        <span className="text-base">🔒</span>
        <div>
          <p className="text-[10px] font-bold text-slate-900 leading-none">Escrow</p>
          <p className="text-[9px] text-slate-400">Protected</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-3 -left-5 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 border border-slate-100"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.3 }}
      >
        <span className="text-base">✅</span>
        <div>
          <p className="text-[10px] font-bold text-slate-900 leading-none">Verified</p>
          <p className="text-[9px] text-slate-400">ID Checked</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #99f6e4 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute -top-48 right-0 w-[700px] h-[700px] rounded-full bg-teal-50 opacity-70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-48 w-[500px] h-[500px] rounded-full bg-cyan-50 opacity-60 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 max-w-xl"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                Crowdshipping, reimagined
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl sm:text-6xl lg:text-[64px] font-bold text-slate-900 leading-[1.05] tracking-tight"
            >
              Shop global.{' '}
              <em className="text-teal-600 not-italic">A traveler</em>
              <br />
              brings it to you.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-slate-500 leading-relaxed">
              Cokatoo connects you with verified travelers who carry items from anywhere in the
              world — safely, affordably, and directly to your door.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 active:scale-95 transition-all shadow-lg text-[15px]"
              >
                Start Shopping
                <ArrowRightIcon />
              </a>
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-200 text-slate-700 font-bold rounded-full hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-all text-[15px]"
              >
                Become a Traveler
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-2.5">
                {['JK', 'AM', 'SR', 'LP', 'MN'].map((init, i) => (
                  <div
                    key={init}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-teal-700 bg-gradient-to-br from-teal-100 to-teal-50"
                    style={{ zIndex: 5 - i }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500">
                <span className="font-bold text-slate-900">12,000+</span> deliveries completed
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Floating card */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 48, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────

function TrustBar() {
  const items = [
    { icon: <LockIcon className="w-5 h-5 text-teal-600" />, label: 'Secure Escrow Payments' },
    { icon: <ShieldCheckIcon className="w-5 h-5 text-teal-600" />, label: 'Verified Travelers Only' },
    { icon: <CheckIcon className="w-5 h-5 text-teal-600" />, label: 'Buyer Protection' },
    { icon: <StarIcon className="w-5 h-5 text-amber-400" />, label: '4.9 Star Rated' },
  ]

  return (
    <div className="border-y border-slate-100 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              {item.icon}
              <span className="text-sm font-medium text-slate-600">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const [tab, setTab] = useState<'shoppers' | 'travelers'>('shoppers')
  const steps = tab === 'shoppers' ? SHOPPER_STEPS : TRAVELER_STEPS

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-teal-600 font-bold text-xs uppercase tracking-[0.15em] mb-3">
            Simple process
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            How Cokatoo works
          </h2>
          <p className="text-slate-500 text-lg">
            Whether you're shopping for international goods or traveling with spare luggage space —
            it's effortless on both sides.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-14">
          <div className="flex bg-slate-100 rounded-full p-1">
            {(['shoppers', 'travelers'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-7 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
                  tab === t ? 'text-white' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-teal-600 rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  For {t === 'shoppers' ? 'Shoppers' : 'Travelers'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28 }}
          >
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-3xl bg-teal-50 border-2 border-teal-100 flex flex-col items-center justify-center mb-6">
                  <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest leading-none mb-0.5">
                    Step
                  </span>
                  <span className="font-heading text-3xl font-bold text-teal-600 leading-none">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2.5">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">{step.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Live Requests ────────────────────────────────────────────────────────────

// function LiveRequests() {
//   return (
//     <section className="py-28 bg-slate-50/70">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8">
//         <motion.div
//           className="text-center max-w-2xl mx-auto mb-14"
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//             <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em]">Live now</p>
//           </div>
//           <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
//             Real requests, real rewards
//           </h2>
//           <p className="text-slate-500 text-lg">
//             Earn extra income on trips you&apos;re already taking. Browse open requests along your route.
//           </p>
//         </motion.div>

//         <motion.div
//           className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
//           variants={stagger}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           {REQUESTS.map((req) => (
//             <motion.div
//               key={req.id}
//               variants={fadeUp}
//               whileHover={{ y: -5, transition: { duration: 0.2 } }}
//               className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm cursor-pointer group"
//             >
//               {/* Gradient header */}
//               <div
//                 className="p-5 pb-6"
//                 style={{
//                   background: `linear-gradient(135deg, ${req.gradStart}, ${req.gradEnd})`,
//                 }}
//               >
//                 <div className="flex items-start justify-between mb-3">
//                   <span className="text-[11px] font-bold text-slate-600 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
//                     {req.category}
//                   </span>
//                   <div className="flex items-center gap-0.5">
//                     <StarIcon className="w-3.5 h-3.5 text-amber-400" />
//                     <span className="text-xs font-bold text-slate-700">{req.rating}</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="text-3xl">{req.emoji}</span>
//                   <h3 className="font-bold text-slate-900 text-sm leading-tight">{req.product}</h3>
//                 </div>
//               </div>

//               <div className="p-4">
//                 {/* Route */}
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="text-center">
//                     <span className="text-base">{req.fromFlag}</span>
//                     <p className="text-[11px] font-bold text-slate-700 mt-0.5">{req.from}</p>
//                   </div>
//                   <div className="flex-1 flex items-center gap-1">
//                     <div className="flex-1 border-t border-dashed border-teal-300" />
//                     <PlaneIcon className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
//                     <div className="flex-1 border-t border-dashed border-teal-300" />
//                   </div>
//                   <div className="text-center">
//                     <span className="text-base">{req.toFlag}</span>
//                     <p className="text-[11px] font-bold text-slate-700 mt-0.5">{req.to}</p>
//                   </div>
//                 </div>

//                 {/* Value / reward */}
//                 <div className="flex items-end justify-between">
//                   <div>
//                     <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">
//                       Item value
//                     </p>
//                     <p className="text-sm font-semibold text-slate-700">{req.value}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">
//                       Your reward
//                     </p>
//                     <p className="text-2xl font-bold text-teal-600">{req.reward}</p>
//                   </div>
//                 </div>

//                 {/* Shopper */}
//                 <div className="mt-3.5 pt-3.5 border-t border-slate-50 flex items-center gap-2">
//                   <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center">
//                     <span className="text-[10px] font-bold text-white">{req.initials}</span>
//                   </div>
//                   <span className="text-xs text-slate-400 flex-1">Verified shopper</span>
//                   <button className="text-xs font-bold text-teal-600 group-hover:underline underline-offset-2 transition-all">
//                     View →
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         <div className="text-center mt-10">
//           <a
//             href="#"
//             className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 text-sm font-semibold hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50 transition-all"
//           >
//             Browse all requests
//             <ArrowRightIcon className="w-4 h-4" />
//           </a>
//         </div>
//       </div>
//     </section>
//   )
// }

// ─── Trust Section ────────────────────────────────────────────────────────────

function TrustSection() {
  const stats = [
    { value: '12,000+', label: 'Deliveries completed', sub: 'and counting' },
    { value: '80+', label: 'Countries covered', sub: 'worldwide' },
    { value: '4.9 ★', label: 'Average rating', sub: 'from verified users' },
  ]

  const pillars = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-teal-600" />,
      title: 'Verified ID checks',
      desc: 'Every traveler undergoes multi-step identity verification — passport scan, selfie match, and background review — before accepting any request.',
    },
    {
      icon: <LockIcon className="w-6 h-6 text-teal-600" />,
      title: 'Escrow payments',
      desc: "Payment is held in secure escrow for the entire journey. It's only released to the traveler after you confirm the item was delivered correctly.",
    },
    {
      icon: <CheckIcon className="w-6 h-6 text-teal-600" />,
      title: 'Delivery guarantee',
      desc: "If your item doesn't arrive or doesn't match the description, you receive a full refund. No forms, no questions, no hassle.",
    },
  ]

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Stats */}
        <motion.div
          className="grid sm:grid-cols-3 gap-5 mb-28"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center px-8 py-10 rounded-3xl bg-gradient-to-b from-teal-50 to-white border border-teal-100/60"
            >
              <div className="font-heading text-5xl sm:text-6xl font-bold text-teal-600 mb-2">
                {stat.value}
              </div>
              <p className="text-slate-800 font-semibold mb-1">{stat.label}</p>
              <p className="text-slate-400 text-sm">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pillars header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-teal-600 font-bold text-xs uppercase tracking-[0.15em] mb-3">
            Trust & Safety
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Built on trust,
            <br />
            secured by design
          </h2>
          <p className="text-slate-500 text-lg">
            Every transaction on Cokatoo is protected by multiple layers of verification and
            financial security — because your trust is everything.
          </p>
        </motion.div>

        {/* Pillars */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-8 rounded-3xl border border-slate-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 group-hover:bg-teal-100 transition-colors">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-3">{pillar.title}</h3>
              <p className="text-slate-500 leading-relaxed text-[15px]">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Waitlist ─────────────────────────────────────────────────────────────────

function Waitlist() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email.trim()) setDone(true)
  }

  return (
    <section id="waitlist" className="relative py-28 overflow-hidden bg-teal-600">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500 opacity-50 translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-700 opacity-40 -translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/50 border border-teal-400/30 text-white text-xs font-bold uppercase tracking-[0.15em] mb-6">
            Early Access
          </span>

          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Join thousands already waiting
          </h2>
          <p className="text-teal-100 text-lg mb-10 max-w-md mx-auto">
            Be first to access Cokatoo. Early members get priority matching, zero fees for 6 months,
            and exclusive founder perks.
          </p>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/25 text-white placeholder:text-teal-200/70 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-white text-teal-700 font-bold text-sm rounded-full hover:bg-teal-50 active:scale-95 transition-all shadow-xl whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="inline-flex items-center gap-3 bg-white/15 text-white px-8 py-4 rounded-full border border-white/20"
              >
                <span className="text-xl">🎉</span>
                <span className="font-bold">You&apos;re on the list! We&apos;ll be in touch soon.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-5 text-teal-200/80 text-xs">
            No spam, ever. Already{' '}
            <span className="font-bold text-white">2,847</span> people waiting.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const cols: Record<string, string[]> = {
    Product: ['How it works', 'Browse requests', 'Pricing', 'Mobile app'],
    Company: ['About us', 'Blog', 'Careers', 'Press'],
    Support: ['Help center', 'Safety', 'Contact us', 'Status'],
    Legal: ['Privacy policy', 'Terms of service', 'Cookies'],
  }

  const socials = [
    { Icon: TwitterXIcon, label: 'X (Twitter)' },
    { Icon: InstagramIcon, label: 'Instagram' },
    { Icon: LinkedInIcon, label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center">
                <BirdIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Cokatoo</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-[220px]">
              The world&apos;s first peer-to-peer crowdshipping marketplace. The world&apos;s products,
              delivered by real travelers.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-teal-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2025 Cokatoo Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-slate-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        {/* <LiveRequests /> */}
        <TrustSection />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
