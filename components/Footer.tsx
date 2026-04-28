import Link from 'next/link'
import { Compass, Mail, Heart, Globe, Search, ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-3xl pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 lg:pr-8">
            <Link href="/" className="inline-flex items-center gap-2 font-bold tracking-tight text-xl mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <span className="text-white text-lg">T</span>
              </div>
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-emerald-300 transition-colors">
                TransparentCents
              </span>
            </Link>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Building a future of radical trust. Bringing full on-chain transparency to charitable giving.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-500 hover:text-emerald-500 hover:-translate-y-1 transition-all"><Globe className="w-4 h-4"/></a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-500 hover:text-emerald-500 hover:-translate-y-1 transition-all"><Search className="w-4 h-4"/></a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-500 hover:text-emerald-500 hover:-translate-y-1 transition-all"><ArrowUpRight className="w-4 h-4"/></a>
            </div>
          </div>
          
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-200 mb-6 uppercase tracking-wider text-xs">Explore</div>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link className="hover:text-emerald-500 inline-flex items-center gap-2 transition-colors" href="/browse/campaigns"><Compass className="w-4 h-4" /> Active Campaigns</Link></li>
              <li><Link className="hover:text-emerald-500 inline-flex items-center gap-2 transition-colors" href="/browse/charities"><Heart className="w-4 h-4" /> Approved Charities</Link></li>
            </ul>
          </div>
          
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-200 mb-6 uppercase tracking-wider text-xs">Platform</div>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link className="hover:text-emerald-500 transition-colors" href="/about">About Us</Link></li>
              <li><Link className="hover:text-emerald-500 transition-colors" href="/how-it-works">How It Works</Link></li>
              <li><Link className="hover:text-emerald-500 inline-flex items-center gap-2 transition-colors" href="/contact"><Mail className="w-4 h-4"/> Contact Support</Link></li>
            </ul>
          </div>
          
          <div>
            <div className="font-semibold text-slate-900 dark:text-slate-200 mb-6 uppercase tracking-wider text-xs">Legal</div>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link className="hover:text-emerald-500 transition-colors" href="/privacy">Privacy Policy</Link></li>
              <li><a className="hover:text-emerald-500 transition-colors" href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200/50 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-500">
          <span>© {new Date().getFullYear()} Transparent Cents. All rights reserved.</span>
          <span className="flex items-center gap-1">Built with <Heart className="w-3 h-3 text-emerald-500" /> for maximal transparency</span>
        </div>
      </div>
    </footer>
  )
}
