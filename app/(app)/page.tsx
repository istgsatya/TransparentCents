"use client"
import useSWR from 'swr'
import { apiClient } from '@/lib/api'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/auth'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Link as LinkIcon, ShieldCheck, HandCoins, ArrowRight, ActivitySquare, CheckCircle2 } from 'lucide-react'

function fetcher(url: string) {
  return apiClient.get(url).then(r => r.data)
}

function CampaignProgress({ id, goal }: { id: number | string; goal?: number | string }) {
  const { data } = useSWR(`/campaigns/${id}/balance`, fetcher)
  const toNum = (v: any) => {
    const n = Number(typeof v === 'object' ? (v?.balance ?? v?.data ?? 0) : v)
    return Number.isFinite(n) ? n : 0
  }
  const raised = toNum(data)
  const g = toNum(goal)
  const pct = g > 0 ? Math.max(0, Math.min(100, Math.round((raised / g) * 100))) : 0
  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs font-semibold mb-2 text-slate-700 dark:text-slate-300">
        <span>{raised > 0 ? `${raised}` : '0'} raised</span>
        <span className="text-slate-400">of {g || '—'} goal</span>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
           animate={{ width: `${pct}%` }} 
           transition={{ duration: 1, ease: "easeOut" }}
           className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" 
        />
      </div>
    </div>
  )
}

export default function HomePage() {
  const isAuthed = useAuthStore(s => s.isAuthenticated)
  const { data, isLoading } = useSWR('/campaigns', fetcher)
  const { data: charities } = useSWR(isAuthed ? '/charities/approved' : null, fetcher)

  const trendingCampaigns = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [] as any[]
    const copy = [...data]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy.slice(0, Math.min(3, copy.length))
  }, [data])

  const campaignCount = Array.isArray(data) ? data.length : 0
  const charityCount = Array.isArray(charities) ? charities.length : 0

  function normalizeTitle(raw: any, idx: number) {
    const s = String(raw || '').trim()
    const presets = [
      'Clean Water Initiative',
      'Build a School in Sundarbans',
      'Local Food Bank Drive',
      'Free Health Camp',
      'Reforest the Ridge'
    ]
    if (!s || s.length < 3 || /\b(q|w|e|r|t|y){3,}|\d{5,}|[^\w\s]/i.test(s)) {
      return presets[idx % presets.length]
    }
    return s
  }

  // Uses the beautiful AI generated images
  const stockImages = ['/campaigns/c1.png', '/campaigns/c2.png', '/campaigns/c3.png']

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }
  const staggerContainer = { 
    hidden: {}, 
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } 
  }

  return (
    <div className="relative pb-24">
      {/* Immersive Background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 hero-bg overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-emerald-500/20 blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute top-[20%] -right-[10%] h-[700px] w-[700px] rounded-full bg-violet-500/10 blur-[140px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-slate-50/50 dark:bg-[#050810]/70 backdrop-blur-[50px] transition-colors duration-500" />
      </div>

      {!isAuthed && (
      <section className="container pt-20 pb-16 lg:pt-32 lg:pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-6 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              100% On-Chain Verifiable
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Giving reimagined with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 drop-shadow-sm">radical trust.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Transparent Cents uses blockchain technology to track every donation from wallet to real-world impact. No guesswork, just proof.
            </motion.p>
            
            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/signup" className="btn-primary text-base px-8 py-3.5 hover:shadow-emerald-500/25">Join the Movement <ArrowRight className="w-5 h-5 ml-2"/></Link>
              <Link href="#how" className="glass text-slate-900 dark:text-white font-semibold text-base px-8 py-3.5 rounded-xl hover-lift border border-slate-200 dark:border-white/10 flex items-center justify-center">See how it works</Link>
            </motion.div>

            {charityCount > 0 && (
              <motion.div variants={fadeUp} className="mt-12 pt-8 border-t border-slate-200/50 dark:border-white/10 grid grid-cols-3 gap-6 text-center lg:text-left">
                 <div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{campaignCount}</div>
                    <div className="mt-1 text-sm text-slate-500 font-medium">Active Campaigns</div>
                 </div>
                 <div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{charityCount}</div>
                    <div className="mt-1 text-sm text-slate-500 font-medium">Verified Charities</div>
                 </div>
                 <div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">100%</div>
                    <div className="mt-1 text-sm text-slate-500 font-medium">Auditable</div>
                 </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden lg:block relative perspective-1000 animate-float"
          >
            <div className="glass-deeper aspect-square rounded-[3rem] p-8 relative overflow-hidden flex flex-col justify-center border-white/40 shadow-2xl shadow-emerald-500/10">
               {/* Decorative Abstract Glass Shapes inside */}
               <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-400/30 rounded-full blur-2xl" />
               <div className="absolute bottom-10 left-10 w-40 h-40 bg-violet-400/20 rounded-full blur-2xl" />
               
               <div className="relative z-10 space-y-6">
                 {/* Mock UI Elements */}
                 <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 dark:border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600"><CheckCircle2/></div>
                       <div>
                          <div className="font-bold text-slate-900 dark:text-white">Withdrawal Approved</div>
                          <div className="text-xs text-slate-500">Community Consensus Reached</div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/50 dark:border-white/5 ml-12">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center text-violet-600"><LinkIcon/></div>
                       <div>
                          <div className="font-bold text-slate-900 dark:text-white">Proof Uploaded</div>
                          <div className="text-xs text-slate-500">Transaction ID: 0x8f...4a2</div>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Features Section */}
      {!isAuthed && (
      <section className="container py-24" id="features">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Cryptographically verifiable impact</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">We solve the "black box" problem of charitable giving by putting the entire lifecycle of a donation on the blockchain.</p>
        </div>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          {[
            { icon: <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400"/>, title: 'On-chain Tracking', desc: 'Every donation goes directly to a smart contract. No hidden fees or intermediaries.' },
            { icon: <ActivitySquare className="w-6 h-6 text-violet-600 dark:text-violet-400"/>, title: 'Real-time Proofs', desc: 'Charities must attach financial and visual proofs to their withdrawals before they are released.' },
            { icon: <HandCoins className="w-6 h-6 text-blue-600 dark:text-blue-400"/>, title: 'Community Voting', desc: 'As a donor, you hold voting power to approve or reject charity fund usage plans.' }
          ].map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} className="card p-8 card-hover group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      )}

      {/* Trending Campaigns Gallery */}
      <section className="container py-12" id="trending">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Active Campaigns</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 font-medium">Support verifiable causes today.</p>
          </div>
          <Link href="/browse/campaigns" className="btn-ghost group font-semibold">
            View All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {isLoading && (
           <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
             {[1,2,3].map(i => <div key={i} className="card h-96 skeleton rounded-3xl" />)}
           </div>
        )}
        
        <motion.div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer} initial="hidden" animate="show">
          {trendingCampaigns?.map((c: any, idx: number) => (
            <motion.div key={c.id} variants={fadeUp} className="group">
              <div className="card p-0 overflow-hidden card-hover h-full flex flex-col border-white/50 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 transition-all duration-500 rounded-3xl">
                {/* Visual Image with Gradient Overlay */}
                <Link href={`/campaign/${c.id}`} className="block relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" /> {/* Fallback loading bg */}
                  <img src={stockImages[idx % stockImages.length]} alt="Campaign visual" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                     <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-xs font-semibold border border-white/20 mb-2">
                         Verified
                     </div>
                     <h3 className="font-bold text-xl leading-tight line-clamp-2">{normalizeTitle(c.title, idx)}</h3>
                  </div>
                </Link>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">🏢</div>
                     <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 truncate">{c.charityName || 'Partner Charity'}</div>
                  </div>
                  
                  <div className="mt-auto">
                    <CampaignProgress id={c.id} goal={c.goal} />
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex gap-3">
                    <Link href={`/campaign/${c.id}`} className="btn-primary flex-1 text-center py-3">Support</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA For Charities */}
      <section className="container py-24" id="for-charities">
        <div className="glass-deeper rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden flex flex-col items-center border border-white/40 dark:border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-violet-500/10" />
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 leading-tight">Elevate trust with your donors.</h3>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 font-medium">Join Transparent Cents as a registered charity to showcase real-time proofs, build deep trust, and receive direct crypto funding.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto shadow-emerald-500/30">Register Your Charity</Link>
              <Link href="/about" className="glass btn-ghost hover:bg-white/50 dark:hover:bg-white/10 text-base px-8 py-3.5 w-full sm:w-auto rounded-xl">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
