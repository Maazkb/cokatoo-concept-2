'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Wallet, Globe, Zap, ShieldCheck, Lock, MapPin,
  Star, ArrowRight, Menu, X, Play, ChevronRight,
  Package, Search, ShoppingBag, Plane, Truck, CheckCircle2,
  Bird,
} from 'lucide-react'

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

// ─── Animation presets ────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
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
    const h = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = ['How it works', 'Features', 'Track Order', 'About', 'FAQ']

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm' : 'bg-white'
      }`}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
            <Bird className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">Cokatoo</span>
        </a>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <a key={l} href="#" className="px-3.5 py-1.5 text-sm font-medium text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all">
              {l}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <a href="#waitlist" className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 bg-teal-600 text-white text-sm font-semibold rounded-full hover:bg-teal-700 active:scale-95 transition-all shadow-sm">
            Join Waitlist
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div key="mob" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="md:hidden overflow-hidden border-t border-slate-100 bg-white">
            <nav className="px-5 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a key={l} href="#" className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">{l}</a>
              ))}
              <a href="#waitlist" className="mt-2 py-3 bg-teal-600 text-white text-sm font-semibold rounded-xl text-center hover:bg-teal-700">Join Waitlist</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const ROUTES = [
  { from: '🇦🇪 Dubai', to: '🇵🇰 Lahore' },
  { from: '🇬🇧 London', to: '🇵🇰 Karachi' },
  { from: '🇺🇸 NYC', to: '🇵🇰 Islamabad' },
  { from: '🇯🇵 Tokyo', to: '🇦🇪 Dubai' },
]

function HeroCard() {
  return (
    <motion.div
      className="relative"
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-200 to-cyan-100 rounded-3xl blur-3xl opacity-50 scale-90 pointer-events-none" />
      <div className="relative bg-white rounded-3xl shadow-2xl p-5 w-[300px] sm:w-80 border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            New Request
          </span>
          <span className="text-xs text-slate-400">2 min ago</span>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center text-3xl flex-shrink-0">⌚</div>
          <div>
            <p className="font-bold text-slate-900 text-sm leading-tight">Apple Watch Ultra 2</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Titanium · 49mm · GPS+Cell</p>
            <div className="flex items-center gap-0.5 mt-1.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
              <span className="text-xs font-semibold text-slate-600 ml-1">4.9</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">From</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">Dubai 🇦🇪</p>
            </div>
            <div className="flex-1 flex items-center justify-center gap-1 px-2">
              <div className="flex-1 border-t-2 border-dashed border-teal-200" />
              <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <Plane className="w-3.5 h-3.5 text-teal-600" />
              </div>
              <div className="flex-1 border-t-2 border-dashed border-teal-200" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">To</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">Lahore 🇵🇰</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Item value</p>
            <p className="text-sm font-bold text-slate-700 mt-0.5">$799</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Reward</p>
            <p className="text-2xl font-bold text-teal-600">$45</p>
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition-colors">Accept</button>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">AK</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700 leading-none">Ali Khan</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Verified · 23 orders</p>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-green-600" />
            <span className="text-[10px] font-semibold text-green-700">Trusted</span>
          </div>
        </div>
      </div>

      <motion.div className="absolute -top-3 -right-6 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 border border-slate-100" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.6 }}>
        <Lock className="w-4 h-4 text-teal-600" />
        <div>
          <p className="text-[10px] font-bold text-slate-900 leading-none">Escrow</p>
          <p className="text-[9px] text-slate-400">Protected</p>
        </div>
      </motion.div>

      <motion.div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 border border-slate-100" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.2 }}>
        <ShieldCheck className="w-4 h-4 text-teal-600" />
        <div>
          <p className="text-[10px] font-bold text-slate-900 leading-none">Verified ID</p>
          <p className="text-[9px] text-slate-400">Checked</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #5eead4 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-teal-50 opacity-80 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-48 w-[500px] h-[500px] rounded-full bg-cyan-50 opacity-70 blur-3xl pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-6">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                Crowdshipping, reimagined
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-heading text-5xl sm:text-6xl lg:text-[62px] font-bold text-slate-900 leading-[1.05] tracking-tight">
              Someone's already<br />
              flying there.{' '}
              <em className="text-teal-600 not-italic">Let them<br className="hidden sm:block" /> bring it back.</em>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-slate-500 leading-relaxed max-w-lg">
              Cokatoo connects shoppers who want international products with verified travelers who carry items in their luggage — safely, affordably, for a reward.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a href="#waitlist" className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 active:scale-95 transition-all shadow-lg text-[15px]">
                I Want Something
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#waitlist" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-teal-600 text-teal-700 font-bold rounded-full hover:bg-teal-50 active:scale-95 transition-all text-[15px]">
                I Am a Traveler
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {['JK','AM','SR','LP','MN'].map((init, i) => (
                  <div key={init} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-teal-800 bg-gradient-to-br from-teal-100 to-teal-50" style={{ zIndex: 5 - i }}>{init}</div>
                ))}
              </div>
              <p className="text-sm text-slate-500"><span className="font-bold text-slate-900">2,400+</span> people already waiting</p>
            </motion.div>
          </motion.div>

          {/* Right: Floating card */}
          <motion.div className="flex justify-center lg:justify-end" initial={{ opacity: 0, x: 40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.25, ease }}>
            <HeroCard />
          </motion.div>
        </div>

        {/* Route pills */}
        <motion.div className="mt-16 flex flex-wrap justify-center gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease }}>
          {ROUTES.map((r, i) => (
            <motion.div key={i} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm font-medium text-slate-700 hover:border-teal-300 hover:shadow-md transition-all cursor-default" whileHover={{ scale: 1.04 }}>
              <span>{r.from}</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-500" />
              <span>{r.to}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Video Section ────────────────────────────────────────────────────────────

function VideoSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-slate-50/60">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }} className="text-center mb-12">
          <p className="text-teal-600 font-bold text-xs uppercase tracking-[0.15em] mb-3">Watch & Learn</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900">See how Cokatoo works in 60 seconds</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.15, ease }} className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl" onClick={() => setModalOpen(true)}>
          {/* Thumbnail */}
          <div className="aspect-video bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            {/* Mock scene */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
              <div className="flex items-center gap-8 opacity-30">
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">✈️</div>
                <div className="text-white text-2xl font-bold">→</div>
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">📦</div>
                <div className="text-white text-2xl font-bold">→</div>
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">🏠</div>
              </div>
            </div>
            {/* Play button */}
            <motion.div className="relative z-10 w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center shadow-2xl group-hover:bg-teal-500 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </motion.div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div className="relative w-full max-w-4xl z-10" initial={{ scale: 0.85, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}>
              <button onClick={() => setModalOpen(false)} className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                <X className="w-5 h-5" /> Close
              </button>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" allow="autoplay; fullscreen" allowFullScreen title="How Cokatoo works" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const SHOPPER_STEPS = [
  { num: '01', title: 'Post your request', desc: 'Tell us what you want, where it\'s from, and your reward offer.' },
  { num: '02', title: 'Match with a traveler', desc: 'Browse verified travelers heading your way and connect.' },
  { num: '03', title: 'Receive your item', desc: 'Your traveler delivers it. Escrow releases automatically.' },
]
const TRAVELER_STEPS = [
  { num: '01', title: 'Browse requests', desc: 'Explore open requests along your travel route by reward and category.' },
  { num: '02', title: 'Accept and shop', desc: 'Accept a request, buy the item abroad, and pack it in your luggage.' },
  { num: '03', title: 'Deliver and earn', desc: 'Hand over the item at destination and collect your reward instantly.' },
]

function HowItWorks() {
  const [tab, setTab] = useState<'shoppers' | 'travelers'>('shoppers')
  const steps = tab === 'shoppers' ? SHOPPER_STEPS : TRAVELER_STEPS
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div className="text-center max-w-2xl mx-auto mb-12" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <p className="text-teal-600 font-bold text-xs uppercase tracking-[0.15em] mb-3">Simple process</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">How Cokatoo works</h2>
          <p className="text-slate-500 text-lg">Whether you're shopping for global goods or traveling with spare luggage space — it's effortless on both sides.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-14">
          <div className="flex bg-slate-100 rounded-full p-1">
            {(['shoppers', 'travelers'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`relative px-7 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 ${tab === t ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}>
                {tab === t && (
                  <motion.span layoutId="tab-bg" className="absolute inset-0 bg-teal-600 rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative z-10">For {t === 'shoppers' ? 'Shoppers' : 'Travelers'}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} className="grid md:grid-cols-3 gap-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            {steps.map((step, i) => (
              <motion.div key={step.num} className="flex flex-col items-center text-center p-8 rounded-3xl border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <div className="w-20 h-20 rounded-3xl bg-teal-50 border-2 border-teal-100 flex flex-col items-center justify-center mb-6">
                  <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest">Step</span>
                  <span className="font-heading text-3xl font-bold text-teal-600 leading-none">{step.num}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Track Order ──────────────────────────────────────────────────────────────

const STAGES = [
  { icon: Package, label: 'Request Posted', desc: 'Your request is live' },
  { icon: Search, label: 'Traveler Matched', desc: 'A verified traveler accepted' },
  { icon: ShoppingBag, label: 'Item Purchased', desc: 'Item bought on your behalf' },
  { icon: Plane, label: 'In Transit', desc: 'Traveler is flying your way' },
  { icon: Truck, label: 'Out for Delivery', desc: 'Almost at your door' },
  { icon: CheckCircle2, label: 'Delivered', desc: 'Enjoy your item!' },
]

function TrackOrder() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const id = setInterval(() => {
      i++
      setActive(i)
      if (i >= STAGES.length - 1) clearInterval(id)
    }, 400)
    return () => clearInterval(id)
  }, [inView])

  return (
    <section className="py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div className="text-center max-w-2xl mx-auto mb-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55, ease }}>
          <p className="text-teal-600 font-bold text-xs uppercase tracking-[0.15em] mb-3">Always in the loop</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Track every step of your delivery</h2>
          <p className="text-slate-500 text-lg">From the moment your request is posted to delivery at your door — full transparency, every step.</p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Connector line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-200 hidden lg:block" style={{ zIndex: 0 }}>
            <motion.div className="h-full bg-teal-500 origin-left" initial={{ scaleX: 0 }} animate={inView ? { scaleX: active / (STAGES.length - 1) } : { scaleX: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon
              const done = i <= active
              return (
                <motion.div key={i} className="flex flex-col items-center text-center gap-3" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12, duration: 0.45, ease }}>
                  <motion.div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${done ? 'bg-teal-600 border-teal-600 shadow-lg shadow-teal-200' : 'bg-white border-slate-200'}`} animate={done ? { scale: [1, 1.15, 1] } : { scale: 1 }} transition={{ duration: 0.35, delay: i * 0.12 }}>
                    <Icon className={`w-7 h-7 transition-colors duration-500 ${done ? 'text-white' : 'text-slate-300'}`} />
                  </motion.div>
                  <div>
                    <p className={`text-sm font-bold transition-colors duration-500 ${done ? 'text-teal-700' : 'text-slate-400'}`}>{stage.label}</p>
                    <p className={`text-xs mt-0.5 transition-colors duration-500 ${done ? 'text-slate-500' : 'text-slate-300'}`}>{stage.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Sample tracker card */}
        <motion.div className="mt-14 max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.3, ease }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-2xl flex-shrink-0">⌚</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 truncate">Apple Watch Ultra 2</p>
              <p className="text-sm text-slate-500 mt-0.5">Dubai 🇦🇪 → Lahore 🇵🇰</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">
                <Plane className="w-3 h-3" />
                In Transit
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-sm text-slate-500">
            <span>Order #COK-2847</span>
            <span className="font-semibold text-teal-700">Est. delivery: Tomorrow</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Features Bento ──────────────────────────────────────────────────────────

const FEATURES = [
  { icon: Wallet, title: 'Save on Shipping Costs', desc: 'Pay a small reward — far less than international shipping fees.' },
  { icon: Globe, title: 'Access Global Products', desc: 'Get anything from anywhere in the world delivered to your door.' },
  { icon: Zap, title: 'Fast Delivery', desc: 'Travelers move faster than couriers. Get your item in days, not weeks.' },
  { icon: ShieldCheck, title: 'Verified Travelers Only', desc: 'Multi-step ID verification, background checks, and ratings.' },
  { icon: Lock, title: 'Secure Escrow Payments', desc: 'Funds are held safely until you confirm your item arrived.' },
  { icon: MapPin, title: 'Real-Time Tracking', desc: 'Track your request from posting to doorstep delivery.' },
]

function FeaturesBento() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div className="text-center max-w-2xl mx-auto mb-14" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <p className="text-teal-600 font-bold text-xs uppercase tracking-[0.15em] mb-3">Everything you need</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Do more with Cokatoo</h2>
          <p className="text-slate-500 text-lg">Built for trust, speed, and global reach — every feature designed around your experience.</p>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={i} variants={fadeUp} className="group p-7 rounded-3xl border border-slate-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 bg-white cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors">
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Live Requests ────────────────────────────────────────────────────────────

const REQUESTS = [
  { product: 'Apple Watch Ultra 2', emoji: '⌚', from: 'Dubai', fromFlag: '🇦🇪', to: 'Lahore', toFlag: '🇵🇰', value: '$799', reward: '$45', rating: '4.9', initials: 'AK', category: 'Electronics' },
  { product: 'Dyson Airwrap Complete', emoji: '💨', from: 'London', fromFlag: '🇬🇧', to: 'Karachi', toFlag: '🇵🇰', value: '$600', reward: '$55', rating: '5.0', initials: 'SM', category: 'Beauty' },
  { product: 'Nike Air Jordan 1 Retro', emoji: '👟', from: 'New York', fromFlag: '🇺🇸', to: 'Islamabad', toFlag: '🇵🇰', value: '$220', reward: '$35', rating: '4.8', initials: 'HR', category: 'Footwear' },
  { product: 'MacBook Pro M4 Pro', emoji: '💻', from: 'Toronto', fromFlag: '🇨🇦', to: 'Lahore', toFlag: '🇵🇰', value: '$1,999', reward: '$80', rating: '4.7', initials: 'ZA', category: 'Electronics' },
]

function LiveRequests() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div className="text-center max-w-2xl mx-auto mb-14" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em]">Live now</p>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">See what people are requesting right now</h2>
          <p className="text-slate-500 text-lg">Real requests from real shoppers — earn extra on trips you're already taking.</p>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          {REQUESTS.map((req, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="p-5 bg-gradient-to-br from-teal-50 to-cyan-50">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[11px] font-bold text-teal-700 bg-white/80 px-2.5 py-1 rounded-full">{req.category}</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-700">{req.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{req.emoji}</span>
                  <h3 className="font-bold text-slate-900 text-sm leading-tight">{req.product}</h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-center">
                    <span className="text-base">{req.fromFlag}</span>
                    <p className="text-[11px] font-bold text-slate-700 mt-0.5">{req.from}</p>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex-1 border-t border-dashed border-teal-300" />
                    <Plane className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                    <div className="flex-1 border-t border-dashed border-teal-300" />
                  </div>
                  <div className="text-center">
                    <span className="text-base">{req.toFlag}</span>
                    <p className="text-[11px] font-bold text-slate-700 mt-0.5">{req.to}</p>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Value</p>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">{req.value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Your reward</p>
                    <p className="text-2xl font-bold text-teal-600">{req.reward}</p>
                  </div>
                </div>

                <div className="mt-3.5 pt-3.5 border-t border-slate-50 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-white">{req.initials}</span>
                  </div>
                  <span className="text-xs text-slate-400 flex-1">Verified shopper</span>
                  <span className="text-xs font-bold text-teal-600 group-hover:underline underline-offset-2 flex items-center gap-0.5">
                    View <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Trust Section ────────────────────────────────────────────────────────────

function TrustSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const stats = [
    { value: '12,000+', label: 'Deliveries', sub: 'completed worldwide' },
    { value: '80+', label: 'Countries', sub: 'covered globally' },
    { value: '4.9 ★', label: 'Star Rating', sub: 'from verified users' },
  ]

  const pillars = [
    { icon: ShieldCheck, title: 'Verified ID Checks', desc: 'Every traveler passes multi-step identity verification — passport scan, selfie match, and background review before accepting any request.' },
    { icon: Lock, title: 'Escrow Payments', desc: 'Your payment is held in secure escrow for the entire journey. Released only after you confirm the item arrived correctly.' },
    { icon: CheckCircle2, title: 'Delivery Guarantee', desc: "If your item doesn't arrive or doesn't match, you receive a full refund. No forms, no questions, no hassle." },
  ]

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div className="grid sm:grid-cols-3 gap-5 mb-24" variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center px-8 py-10 rounded-3xl bg-gradient-to-b from-teal-50 to-white border border-teal-100/60">
              <div className="font-heading text-5xl sm:text-6xl font-bold text-teal-600 mb-2">{s.value}</div>
              <p className="text-slate-800 font-semibold">{s.label}</p>
              <p className="text-slate-400 text-sm mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center max-w-2xl mx-auto mb-14" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2, ease }}>
          <p className="text-teal-600 font-bold text-xs uppercase tracking-[0.15em] mb-3">Trust & Safety</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Built on trust,<br />secured by design</h2>
          <p className="text-slate-500 text-lg">Every transaction protected by multiple layers of verification and financial security.</p>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div key={i} variants={fadeUp} className="p-8 rounded-3xl border border-slate-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 group-hover:bg-teal-100 transition-colors">
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-3">{p.title}</h3>
                <p className="text-slate-500 leading-relaxed text-[15px]">{p.desc}</p>
              </motion.div>
            )
          })}
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
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500 opacity-50 translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-700 opacity-40 -translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/50 border border-teal-400/30 text-white text-xs font-bold uppercase tracking-[0.15em] mb-6">Early Access</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">Ready to shop the world?</h2>
          <p className="text-teal-100 text-lg mb-10 max-w-md mx-auto">Be first to access Cokatoo. Early members get priority matching, zero fees for 6 months, and exclusive perks.</p>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2 }}>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/25 text-white placeholder:text-teal-200/70 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all text-sm" />
                <button type="submit" className="px-6 py-3.5 bg-white text-teal-700 font-bold text-sm rounded-full hover:bg-teal-50 active:scale-95 transition-all shadow-xl whitespace-nowrap">Join Waitlist</button>
              </motion.form>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} className="inline-flex items-center gap-3 bg-white/15 text-white px-8 py-4 rounded-full border border-white/20">
                <span className="text-xl">🎉</span>
                <span className="font-bold">You're on the list! We'll be in touch soon.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {['JK','AM','SR','LP','MN'].map((init, i) => (
                <div key={init} className="w-8 h-8 rounded-full border-2 border-teal-600 flex items-center justify-center text-[9px] font-bold text-teal-800 bg-gradient-to-br from-teal-100 to-white" style={{ zIndex: 5 - i }}>{init}</div>
              ))}
            </div>
            <p className="text-teal-100 text-sm"><span className="font-bold text-white">2,400+</span> people already waiting</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const socials = [
    { Icon: TwitterXIcon, label: 'Twitter' },
    { Icon: InstagramIcon, label: 'Instagram' },
    { Icon: LinkedInIcon, label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center">
                <Bird className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Cokatoo</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-[220px]">Connecting the world one suitcase at a time.</p>
            <div className="flex items-center gap-2">
              {socials.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { heading: 'Product', links: ['How it works', 'Browse requests', 'Pricing'] },
            { heading: 'Company', links: ['About', 'FAQ', 'Contact'] },
            { heading: 'Legal', links: ['Terms', 'Privacy', 'Cookies'] },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-3">
                {links.map((l) => <li key={l}><a href="#" className="text-sm hover:text-teal-400 transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2026 Cokatoo Technologies Inc. All rights reserved.</p>
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
        <VideoSection />
        <HowItWorks />
        <TrackOrder />
        <FeaturesBento />
        <LiveRequests />
        <TrustSection />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
