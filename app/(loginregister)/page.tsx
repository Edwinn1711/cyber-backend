"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Database, Server, Zap, ShieldAlert 
} from 'lucide-react'

// --- ASSET GALAXY HD ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- BACKGROUND BERSIH ELEGAN & STABIL (DEEP CONTRAST) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020106]">
      <AnimatePresence mode="wait">
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0, scale: 1.1 }} 
          animate={{ opacity: 0.25, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 3, ease: "easeInOut" }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten" 
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-static opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

export default function CyberLoginGateway() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  
  // State Form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ====================================================================
  // LOGIKA 3D PARALLAX TILT
  // ====================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 8000);
    return () => clearInterval(interval);
  }, []);

  // ====================================================================
  // FUNGSI AUTHENTICATE
  // ====================================================================
  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setErrorMessage("Mandatory fields missing."); setStatus('error'); return; }
    if (activeTab === 'REGISTER' && (!asal || !tanggalLahir)) { setErrorMessage("Complete all fields."); setStatus('error'); return; }

    setStatus('loading');
    try {
      const endpoint = activeTab === 'LOGIN' ? 'https://cyber-backend-delta.vercel.app/login' : 'https://cyber-backend-delta.vercel.app/register';
      const bodyData = activeTab === 'LOGIN' 
        ? { username, password } 
        : { username, password, role: 'siswa', class_name: className, asal, tanggal_lahir: tanggalLahir };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setStatus('success');
        const role = data.role || 'siswa';
        setTimeout(() => router.push(role === 'guru' || role === 'admin' ? '/guru' : '/siswa'), 1500);
      } else {
        setErrorMessage(data.detail || "Authentication Failed.");
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setErrorMessage("Gateway Connection Failed.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black text-slate-100 overflow-hidden font-sans selection:bg-fuchsia-500/30 relative perspective-[1200px]">
      <PersistentUniverse bgIdx={bgIdx} />

      {/* Ornamen Teks Kiri Bawah (Version V2.1 REMOVED) */}
      <div className="absolute bottom-10 left-10 z-10 hidden md:flex items-center gap-5">
        <div className="w-12 h-12 border-2 border-fuchsia-500/50 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-md shadow-[0_0_20px_rgba(217,70,239,0.2)]">
           <span className="font-black text-fuchsia-400 text-sm">CRI</span>
        </div>
        <div>
          <p className="text-[10px] font-black text-fuchsia-500 tracking-[0.5em] uppercase">SECURE ENCRYPTED ACCESS</p>
          <p className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">PLATFORM CONNECTED</p>
        </div>
      </div>

      {/* Ornamen Teks Kanan Bawah */}
      <div className="absolute bottom-10 right-10 text-right z-10 hidden md:block">
        <p className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase flex items-center justify-end gap-3"><Zap size={12} className="text-fuchsia-500"/> PROTOCOL: SECURE</p>
        <p className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mt-2">ENCRYPTION: AES-256 ACTIVE</p>
      </div>

      {/* KARTU LOGIN UTAMA (HIGH CONTRAST & MEGAH) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-sm mx-4 bg-[#0a0a0f]/90 backdrop-blur-[60px] border-2 border-white/10 rounded-[3rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.9)] my-8 overflow-hidden group"
      >
        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-600/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full" />
        
        {/* Holographic Scan Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500/50 shadow-[0_0_20px_#d946ef] animate-scan z-20" />

        <div className="mx-auto w-16 h-16 bg-black border-2 border-fuchsia-500 rounded-[1.8rem] flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(217,70,239,0.4)] transform group-hover:scale-110 transition-all duration-700">
          <ShieldCheck className="text-fuchsia-400" size={32} />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">
            CYBER <span className="text-fuchsia-500">READINESS</span>
          </h1>
          <h2 className="text-lg font-bold text-slate-300 tracking-[0.25em] uppercase mt-2 opacity-80">PLATFORM</h2>
          <div className="w-12 h-1 bg-fuchsia-600 mx-auto mt-6 rounded-full shadow-[0_0_10px_#d946ef]" />
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-white/5 mb-10 relative">
          <button onClick={() => setActiveTab('LOGIN')} className={`flex-1 pb-4 text-[11px] font-black tracking-[0.4em] transition-all ${activeTab === 'LOGIN' ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}>LOGIN</button>
          <button onClick={() => setActiveTab('REGISTER')} className={`flex-1 pb-4 text-[11px] font-black tracking-[0.4em] transition-all ${activeTab === 'REGISTER' ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}>REGISTER</button>
          <motion.div 
            animate={{ x: activeTab === 'LOGIN' ? '0%' : '100%' }}
            className="absolute bottom-[-2px] h-[3px] w-1/2 bg-fuchsia-500 shadow-[0_0_15px_#d946ef]" 
          />
        </div>

        <form onSubmit={handleAuthenticate} className="space-y-5">
          
          <div className="relative group">
            <User size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" />
            <input type="text" placeholder="IDENTIFIER" value={username} onChange={(e) => setUsername(e.target.value)} disabled={status === 'loading'} className="w-full bg-black/60 border-2 border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-[12px] font-black text-white tracking-widest outline-none focus:border-fuchsia-500 transition-all placeholder:text-slate-800" />
          </div>

          <div className="relative group">
            <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" />
            <input type="password" placeholder="PASSKEY" value={password} onChange={(e) => setPassword(e.target.value)} disabled={status === 'loading'} className="w-full bg-black/60 border-2 border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-[12px] font-black text-white tracking-widest outline-none focus:border-fuchsia-500 transition-all placeholder:text-slate-800" />
          </div>

          <AnimatePresence>
            {activeTab === 'REGISTER' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-5 pt-2 overflow-hidden">
                <div className="relative">
                   <MapPin size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
                   <input type="text" placeholder="ORIGIN CITY" value={asal} onChange={(e) => setAsal(e.target.value)} className="w-full bg-black/60 border-2 border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-[11px] font-black text-white outline-none focus:border-fuchsia-500 uppercase placeholder:text-slate-800" />
                </div>
                <div className="relative">
                   <Calendar size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
                   <input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} style={{ colorScheme: 'dark' }} className="w-full bg-black/60 border-2 border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-[11px] font-black text-white outline-none focus:border-fuchsia-500" />
                </div>
                <div className="relative">
                   <ShieldAlert size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
                   <select value={className} onChange={(e) => setClassName(e.target.value)} className="w-full bg-black/60 border-2 border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-[11px] font-black text-slate-200 outline-none focus:border-fuchsia-500 appearance-none uppercase cursor-pointer shadow-inner">
                     {AVAILABLE_CLASSES.map(cls => <option key={cls} value={cls} className="bg-black text-white">{cls}</option>)}
                   </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black tracking-widest uppercase">
              <AlertTriangle size={14} /> {errorMessage}
            </motion.div>
          )}

          <button type="submit" disabled={status === 'loading'} className="w-full mt-8 py-6 bg-fuchsia-600 hover:bg-fuchsia-500 rounded-[1.8rem] font-black text-[12px] tracking-[0.6em] text-white shadow-[0_15px_40px_rgba(217,70,239,0.4)] transition-all uppercase flex items-center justify-center gap-5 hover:scale-[1.02] active:scale-95 disabled:opacity-50">
             {status === 'loading' ? 'VERIFYING...' : 'AUTHENTICATE'} <ScanLine size={18} />
          </button>
        </form>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-static {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        @keyframes scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scan 4s linear infinite; }
        ::selection { background: #d946ef; color: white; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.6; cursor: pointer; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px #0a0a0f inset !important; -webkit-text-fill-color: white !important; }
      `}} />
    </div>
  );
}