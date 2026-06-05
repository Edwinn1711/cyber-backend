"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Zap, ArrowRight, Globe, Cpu } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#06080f] text-white overflow-hidden font-sans">
      {/* BACKGROUND OPTIMIZED */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-hud-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 via-transparent to-black" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 lg:px-12 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-fuchsia-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.4)]">
            <Shield size={20} className="text-fuchsia-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-sm tracking-[0.2em] leading-none uppercase">CYBER<span className="text-fuchsia-500">READINESS</span></span>
            <span className="text-[8px] font-bold text-slate-500 tracking-[0.3em] mt-1 uppercase">Security Level 01</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black tracking-[0.2em] text-slate-400">
          <Link href="/" className="text-fuchsia-400 border-b-2 border-fuchsia-500 pb-1">BERANDA</Link>
          <Link href="#" className="hover:text-white transition-colors">TENTANG KAMI</Link>
          <Link href="#" className="hover:text-white transition-colors">LAYANAN</Link>
        </div>

        <Link href="/login" className="px-8 py-2.5 bg-white text-black rounded-full font-black text-[10px] tracking-widest hover:bg-fuchsia-500 hover:text-white transition-all uppercase">
          LOGIN
        </Link>
      </nav>

      {/* HERO SECTION */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 pt-16 pb-20">
        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-[10px] font-black tracking-widest uppercase">
            <Zap size={12} className="animate-pulse" /> Secure Protocol Active
          </div>

          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
            KESIAPAN SIBER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-500 to-fuchsia-600">SEKOLAH 2026.</span>
          </h1>

          <p className="text-slate-400 text-sm lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium uppercase tracking-wide">
            Platform evaluasi digital mandiri untuk mengukur tingkat ketahanan keamanan siber sekolah.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Link href="/login" className="group px-10 py-4 bg-white text-black rounded-2xl font-black text-[11px] tracking-[0.2em] flex items-center gap-4 hover:bg-fuchsia-600 hover:text-white transition-all shadow-2xl">
              MULAI EVALUASI <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* VISUAL CARD (Penyebab Lag Jika Terlalu Berat - Ini Versi Ringan) */}
        <div className="w-full lg:w-1/2 mt-20 lg:mt-0 relative flex justify-center">
          <motion.div 
            animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-96 lg:w-[380px] lg:h-[480px] bg-[#0d111a] border border-fuchsia-500/20 rounded-[3rem] shadow-[0_0_50px_rgba(217,70,239,0.1)] flex flex-col items-center justify-center overflow-hidden"
          >
             <div className="absolute inset-0 bg-hud-grid opacity-10" />
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-black border-2 border-fuchsia-500 rounded-3xl flex items-center justify-center text-fuchsia-400 shadow-[0_0_30px_rgba(217,70,239,0.3)] mb-8">
                  <Shield size={40} />
                </div>
                <h3 className="text-2xl font-black tracking-widest uppercase text-white">SECURITY HUB</h3>
                <div className="mt-10 px-6 py-2 bg-black/60 border border-fuchsia-500/30 rounded-xl">
                  <span className="text-[10px] font-black text-fuchsia-400 tracking-[0.5em] uppercase">ENCRYPTED</span>
                </div>
             </div>
          </motion.div>
        </div>
      </main>

      {/* FOOTER METRICS */}
      <div className="fixed bottom-10 left-6 lg:left-20 z-20 flex gap-10">
        <div className="flex flex-col text-left">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Latency Node</span>
          <span className="text-xs font-black text-fuchsia-400 font-mono">0.002 MS</span>
        </div>
        <div className="flex flex-col border-l border-white/10 pl-10 text-left">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">System Protocol</span>
          <span className="text-xs font-black text-white font-mono uppercase">Ver. 2026.Alpha</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-hud-grid { 
          background-image: linear-gradient(to right, rgba(217, 70, 239, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 70, 239, 0.05) 1px, transparent 1px); 
          background-size: 40px 40px; 
        }
        body { background: #06080f; }
      `}} />
    </div>
  )
}