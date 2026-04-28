"use client"
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/auth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { getProvider, ensureSepolia } from '@/lib/web3'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, HeartHandshake, UserCircle, LogOut } from 'lucide-react'

export function Navbar() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const user = useAuthStore(s => s.user)
  const setUser = useAuthStore(s => s.setUser)
  const logout = useAuthStore(s => s.logout)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  
  useDetectConnectedAddress(setConnectedAddress)

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-white/60 dark:bg-[#0A0F1C]/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/10" />
      <div className="container relative flex items-center justify-between h-20">
        <Link href="/" className="group flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <span className="text-white text-lg">T</span>
          </div>
          <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-emerald-300 transition-colors">
            TransparentCents
          </span>
        </Link>
        
        <nav className="relative flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 mr-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
             <Link href="/browse/campaigns" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5"><Compass className="w-4 h-4"/> Discover</Link>
             <Link href="/browse/charities" className="hover:text-emerald-500 transition-colors flex items-center gap-1.5"><HeartHandshake className="w-4 h-4"/> Charities</Link>
          </div>

          {/* Connected wallet indicator */}
          {typeof window !== 'undefined' && (
            <div className="hidden sm:flex items-center gap-3">
              {connectedAddress ? (
                <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-xl text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-slate-700 dark:text-slate-200">{`${connectedAddress.slice(0,6)}...${connectedAddress.slice(-4)}`}</span>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    setConnecting(true)
                    try {
                      let eth: any;
                      try { eth = (window as any).ethereum } catch {}
                      if (!eth) throw new Error('No wallet available')
                      try { await eth.request?.({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] }) } catch {}
                      const accounts = await eth.request?.({ method: 'eth_requestAccounts' })
                      setConnectedAddress(accounts?.[0] ?? null)
                      try {
                        const provider = getProvider()
                        if (provider) await ensureSepolia(provider)
                      } catch (e: any) {
                        if (typeof window !== 'undefined') alert(e?.message || 'Please switch your wallet network to Sepolia testnet')
                      }
                      if (isAuthenticated) {
                        try {
                          const res = await api.get('/auth/me')
                          setUser(res.data)
                        } catch {}
                      }
                    } catch (e) {
                    } finally {
                      setConnecting(false)
                    }
                  }}
                  className="btn-outline text-xs !py-1.5 !px-3 shadow-sm hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400"
                  disabled={connecting}
                >
                  {connecting ? 'Connecting…' : 'Connect Wallet'}
                </button>
              )}
            </div>
          )}

          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 hidden sm:block mx-1" />

          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link href="/login" className="btn-ghost">Log in</Link>
              <Link href="/signup" className="btn-primary">Get Started</Link>
            </div>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setOpen(v => !v)} 
                className="flex items-center gap-2 glass px-3 py-1.5 rounded-xl hover-lift"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
                   {user?.username?.charAt(0) || 'U'}
                </div>
                <span className="font-semibold text-sm hidden sm:block">{user?.username}</span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-slate-400 text-xs ml-1">▼</motion.span>
              </button>
              
              <AnimatePresence>
                {open && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 glass glass-deeper p-2 z-50 rounded-2xl shadow-2xl border border-white/40 dark:border-white/10 origin-top-right flex flex-col gap-1"
                  >
                    <Link href="/my-account" className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors font-medium text-sm" onClick={() => setOpen(false)}>
                      <UserCircle className="w-4 h-4 text-emerald-500" />
                      My Dashboard
                    </Link>
                    <div className="h-px w-full bg-slate-200/50 dark:bg-white/10 my-1" />
                    <button onClick={() => { setOpen(false); logout(); router.replace('/login') }} className="flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 transition-colors font-medium text-sm">
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

function useDetectConnectedAddress(setConnectedAddress: (a: string | null) => void) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    let eth: any;
    try {
      eth = (window as any).ethereum
    } catch {
      return // Some strict browsers throw on access
    }
    if (!eth) return
    let mounted = true
    const update = async () => {
      try {
        // Try eth_accounts to avoid prompting UI
        // @ts-ignore
        const accounts = await eth.request?.({ method: 'eth_accounts' }) || []
        if (!mounted) return
        setConnectedAddress(accounts[0] ?? null)
      } catch {
        try {
          // fallback to provider.listAccounts
          const provider = getProvider()
          // @ts-ignore
          const list = provider ? await provider.listAccounts() : []
          if (!mounted) return
          // list may be array of Signer-like objects or addresses
          const addr = Array.isArray(list) && list.length ? (typeof list[0] === 'string' ? list[0] : list[0]?.address ?? null) : null
          setConnectedAddress(addr)
        } catch {
          if (!mounted) return
          setConnectedAddress(null)
        }
      }
    }
    update()
    const onAccountsChanged = (accounts: any) => setConnectedAddress(accounts?.[0] ?? null)
    try {
      eth.on?.('accountsChanged', onAccountsChanged)
      eth.on?.('connect', update)
      eth.on?.('disconnect', () => setConnectedAddress(null))
    } catch {}
    return () => {
      mounted = false
      try {
        eth.removeListener?.('accountsChanged', onAccountsChanged)
        eth.removeListener?.('connect', update)
        eth.removeListener?.('disconnect', () => setConnectedAddress(null))
      } catch {}
    }
  }, [setConnectedAddress])
}
