"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ArrowLeft, Eye, EyeOff, 
  MapPin, Calendar, CheckCircle2, ScanLine, AlertTriangle,
  Home, Info, LayoutGrid, FileText, Trophy, Megaphone, HelpCircle, 
  Settings, Database, Network, Globe, Fingerprint, Star
} from 'lucide-react'

// --- ASSET BACKGROUND ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

export default function LandingPage() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  
  // State Navigasi Halaman
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  
  // State Form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Efek ganti background otomatis
  useEffect(() => {
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Nama pengguna dan kata sandi wajib diisi.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    if (activeTab === 'REGISTER' && (!asal || !tanggalLahir)) {
      setErrorMessage("Data Asal dan Tanggal Lahir wajib diisi.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    const uname = username.trim();

    try {
      const endpoint = activeTab === 'LOGIN' ? 'https://cyber-backend-delta.vercel.app/login' : 'https://cyber-backend-delta.vercel.app/register';
      const bodyData = activeTab === 'LOGIN' 
        ? { username: uname, password } 
        : { username: uname, password, role: 'siswa', class_name: className, asal: asal, tanggal_lahir: tanggalLahir };

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
        setErrorMessage(data.detail || "Autentikasi gagal.");
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setErrorMessage("Koneksi ke peladen terputus.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-50 font-sans text-slate-800 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. BACKGROUND SEKOLAH (LANDING PAGE)                                      */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img 
            key={bgIdx} 
            src={CYBER_ASSETS[bgIdx]} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.15 }} // Sangat transparan agar tidak mengganggu teks
            exit={{ opacity: 0 }} 
            transition={{ duration: 2 }} 
            className="absolute inset-0 w-full h-full object-cover grayscale-[30%]" 
          />
        </AnimatePresence>
        {/* Gradient putih dari bawah ke atas mirip referensi */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-white/80 to-white/90" />
      </div>

      {/* ========================================================================= */}
      {/* 2. HEADER / NAVBAR                                                        */}
      {/* ========================================================================= */}
      <header className="relative z-10 w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Kiri: Logo */}
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
                <ShieldCheck size={24} className="text-blue-600" />
             </div>
             <div>
                <h1 className="font-black text-slate-800 text-lg leading-tight">CYBER READINESS</h1>
                <p className="text-[10px] text-slate-500 font-medium">Maju Bersama</p>
             </div>
          </div>

          {/* Tengah: Menu Navigasi (Hanya Desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
             {[ 
               { icon: Home, label: 'Beranda', active: true }, 
               { icon: Info, label: 'Profil', active: false }, 
               { icon: LayoutGrid, label: 'Organisasi', active: false }, 
               { icon: FileText, label: 'Berita', active: false }, 
               { icon: Trophy, label: 'Kompetisi', active: false }, 
               { icon: Megaphone, label: 'Pengumuman', active: false }, 
               { icon: HelpCircle, label: 'Layanan', active: false } 
             ].map((item, idx) => (
               <div key={idx} className="relative flex flex-col items-center justify-center group cursor-pointer h-20">
                  <div className={`flex items-center gap-2 text-[13px] font-bold transition-colors ${item.active ? 'text-blue-700' : 'text-slate-600 group-hover:text-blue-600'}`}>
                    <item.icon size={16} className={item.active ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"} />
                    {item.label}
                  </div>
                  {/* Garis bawah biru untuk menu aktif */}
                  {item.active && <div className="absolute bottom-0 w-full h-[3px] bg-blue-600 rounded-t-md" />}
               </div>
             ))}
          </nav>

          {/* Kanan: Tombol Login */}
          <button 
             onClick={() => setIsLoginOpen(true)}
             className="flex items-center gap-2 px-6 py-2.5 bg-[#1e3a8a] hover:bg-blue-800 text-white rounded-full font-bold text-sm transition-all shadow-md"
          >
             <User size={16} /> Login
          </button>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. HERO SECTION (KONTEN UTAMA LANDING PAGE)                               */}
      {/* ========================================================================= */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 lg:py-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Bagian Kiri: Teks & Ikon */}
            <div className="space-y-6">
               <div className="inline-block px-5 py-2 bg-[#2563eb] text-white rounded-full text-xs font-bold shadow-md">
                 Selamat Datang di Website
               </div>
               
               <h2 className="text-5xl lg:text-7xl font-black text-[#1e3a8a] tracking-tight leading-none">
                 CYBER READINESS <span className="text-[#34d399]">2026</span><span className="text-[#2563eb]">|</span>
               </h2>
               
               <p className="text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl font-medium">
                 Cyber Readiness adalah platform sistem informasi yang menjalankan fungsi evaluasi ketahanan siber di Institut Teknologi Del. Kami berkomitmen untuk aktif dan konstruktif melalui berbagai asesmen, pengabdian, dan layanan digital.
               </p>

               {/* Deretan Ikon Bulat Mirip Logo Divisi */}
               <div className="pt-8 flex flex-wrap gap-4">
                  {[ 
                    { icon: Settings, bg: 'bg-black text-white' }, 
                    { icon: Database, bg: 'bg-blue-100 text-blue-600 border border-blue-200' }, 
                    { icon: Network, bg: 'bg-[#1e3a8a] text-white' }, 
                    { icon: Globe, bg: 'bg-[#2563eb] text-white' }, 
                    { icon: Fingerprint, bg: 'bg-white text-blue-600 border border-slate-200' } 
                  ].map((item, idx) => (
                    <div key={idx} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:-translate-y-1 cursor-pointer ${item.bg}`}>
                       <item.icon size={26} />
                    </div>
                  ))}
               </div>
            </div>

            {/* Bagian Kanan: Card Logo Besar */}
            <div className="hidden lg:flex justify-end">
               <div className="relative w-full max-w-[380px] bg-white rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100">
                  {/* Latar Belakang Kartu Biru */}
                  <div className="w-full aspect-square bg-[#0ea5e9] rounded-[1.5rem] flex flex-col items-center justify-center relative overflow-hidden">
                     {/* Bentuk Atap Hijau & Orang */}
                     <div className="mb-4 text-white text-center">
                        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M60 0L120 40H0L60 0Z" fill="#facc15"/>
                          <path d="M60 10L100 35H20L60 10Z" fill="#34d399"/>
                          <rect x="25" y="40" width="10" height="20" fill="white"/>
                          <rect x="45" y="40" width="10" height="20" fill="white"/>
                          <rect x="65" y="40" width="10" height="20" fill="white"/>
                          <rect x="85" y="40" width="10" height="20" fill="white"/>
                        </svg>
                     </div>
                     <h3 className="text-5xl font-black text-white tracking-widest mt-2">CYBER</h3>
                     <div className="w-3/4 h-[1px] bg-white/30 my-4" />
                  </div>
                  
                  {/* Pita Bawah */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[110%] bg-slate-200 py-3 rounded-full text-center shadow-md">
                     <p className="text-[#2563eb] text-sm font-bold tracking-widest">Institut Teknologi Del</p>
                  </div>
               </div>
            </div>

         </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. HALAMAN LOGIN FULL SCREEN (MUNCUL JIKA TOMBOL LOGIN DITEKAN)             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }} 
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-[#f8fafc] overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col items-center py-10 px-6 relative">
               
               {/* Tombol Back Kiri Atas */}
               <button 
                 onClick={() => setIsLoginOpen(false)}
                 className="absolute top-8 left-8 p-2 text-[#1e3a8a] hover:bg-blue-100 rounded-full transition-colors"
               >
                 <ArrowLeft size={28} />
               </button>

               {/* Logo Center */}
               <div className="w-16 h-16 bg-[#2563eb] rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-blue-500/30 mt-4 mb-8">
                 <ShieldCheck size={32} className="text-white" />
               </div>

               {/* Judul Halaman */}
               <h2 className="text-3xl font-black text-[#1e3a8a] mb-2 text-center">Selamat Datang</h2>
               <h3 className="text-xl font-bold text-[#3b82f6] mb-4 text-center">Portal Cyber Readiness</h3>
               <p className="text-sm text-slate-500 text-center max-w-sm mb-10 leading-relaxed font-medium">
                 Masuk ke Sistem Informasi Ketahanan Siber Institut Teknologi Del
               </p>

               {/* Container Form */}
               <div className="w-full max-w-[420px]">
                 
                 {/* Switcher Login / Daftar */}
                 {activeTab === 'REGISTER' && (
                   <button onClick={() => setActiveTab('LOGIN')} className="mb-6 text-sm font-bold text-blue-600 flex items-center gap-2 hover:underline">
                      <ArrowLeft size={16}/> Kembali ke Login
                   </button>
                 )}

                 <form onSubmit={handleAuthenticate} className="space-y-6">
                   
                   {/* Input Username */}
                   <div className="space-y-2">
                     <label className="flex items-center gap-2 text-sm font-bold text-[#1e3a8a]">
                        <User size={18} /> Nama Pengguna
                     </label>
                     <div className="relative">
                        <input 
                          type="text" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Masukkan nama pengguna Anda"
                          className="w-full border border-slate-300 rounded-xl py-3.5 px-4 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                        <User size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-800" />
                     </div>
                   </div>

                   {/* Input Password */}
                   <div className="space-y-2">
                     <label className="flex items-center gap-2 text-sm font-bold text-[#1e3a8a]">
                        <Lock size={18} /> Kata Sandi
                     </label>
                     <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Masukkan Kata Sandi Anda"
                          className="w-full border border-slate-300 rounded-xl py-3.5 px-4 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all pr-12"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-800 hover:text-blue-600">
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                     </div>
                   </div>

                   {/* Field Tambahan jika Register */}
                   {activeTab === 'REGISTER' && (
                     <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="space-y-6 overflow-hidden pt-2">
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="flex items-center gap-2 text-sm font-bold text-[#1e3a8a]">
                              <MapPin size={18} /> Asal / Kota
                           </label>
                           <input 
                             type="text" 
                             value={asal}
                             onChange={(e) => setAsal(e.target.value)}
                             placeholder="Kota asal..."
                             className="w-full border border-slate-300 rounded-xl py-3.5 px-4 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all uppercase"
                           />
                         </div>
                         <div className="space-y-2">
                           <label className="flex items-center gap-2 text-sm font-bold text-[#1e3a8a]">
                              <Calendar size={18} /> Tanggal Lahir
                           </label>
                           <input 
                             type="date" 
                             value={tanggalLahir}
                             onChange={(e) => setTanggalLahir(e.target.value)}
                             className="w-full border border-slate-300 rounded-xl py-3.5 px-4 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all uppercase"
                           />
                         </div>
                       </div>
                       <div className="space-y-2">
                         <label className="flex items-center gap-2 text-sm font-bold text-[#1e3a8a]">
                            <LayoutGrid size={18} /> Kelas
                         </label>
                         <select 
                           value={className}
                           onChange={(e) => setClassName(e.target.value)}
                           className="w-full border border-slate-300 rounded-xl py-3.5 px-4 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer uppercase appearance-none"
                         >
                           {AVAILABLE_CLASSES.map(cls => (
                             <option key={cls} value={cls}>{cls}</option>
                           ))}
                         </select>
                       </div>
                     </motion.div>
                   )}

                   {/* Checkbox & Forgot Password (Hanya di Login) */}
                   {activeTab === 'LOGIN' && (
                     <div className="flex items-center justify-between pt-2">
                       <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-500 font-medium hover:text-slate-800">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                          Ingat saya
                       </label>
                       <a href="#" className="text-sm font-bold text-blue-500 hover:text-blue-700 hover:underline">
                          Lupa Password?
                       </a>
                     </div>
                   )}

                   {/* Error Alert */}
                   <AnimatePresence>
                     {status === 'error' && (
                       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-bold">
                          <AlertTriangle size={18} className="shrink-0" /> {errorMessage}
                       </motion.div>
                     )}
                   </AnimatePresence>

                   {/* Submit Button */}
                   <button 
                     type="submit" 
                     disabled={status === 'loading' || status === 'success'}
                     className={`w-full py-4 rounded-xl font-bold text-base text-white transition-all flex items-center justify-center gap-3 shadow-md ${status === 'success' ? 'bg-emerald-500' : 'bg-[#4a90e2] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'}`}
                   >
                      {status === 'loading' && <span className="animate-pulse">Memverifikasi...</span>}
                      {status === 'success' && <><CheckCircle2 size={20} /> Berhasil</>}
                      {status !== 'loading' && status !== 'success' && (
                        <>Masuk ke Portal <ScanLine size={18} /></>
                      )}
                   </button>
                 </form>

                 {/* Switcher Text Bawah */}
                 {activeTab === 'LOGIN' && (
                   <p className="text-center text-sm font-medium text-slate-500 mt-8">
                     Belum Memiliki Akun?{' '}
                     <button onClick={() => { setActiveTab('REGISTER'); setErrorMessage(''); }} className="text-blue-600 font-bold hover:underline">
                       Daftar dengan Akun CIS
                     </button>
                   </p>
                 )}

                 {/* Footer Address */}
                 <div className="mt-16 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2 mb-2">
                       <Star size={16} /> <p className="font-bold text-sm">Cyber Readiness Institut Teknologi Del</p>
                    </div>
                    <p className="text-xs leading-relaxed max-w-sm mx-auto">
                      Jl. Sisingamangaraja, Sitoluama, Laguboti, Toba Samosir<br/>
                      Sumatera Utara 22381, Indonesia
                    </p>
                 </div>

               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}