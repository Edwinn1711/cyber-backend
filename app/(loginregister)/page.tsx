"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Server, Network, Shield,
  Home, Info, FileText, LayoutGrid, Megaphone, HelpCircle, X, ArrowRight, Zap,
  BrainCircuit, ShieldAlert, Cpu
} from 'lucide-react'

// --- ASSET BACKGROUND ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. EFEK KLIK PARTIKEL ULTRA GOD-TIER (PRESISI 100% & RESOLUSI TINGGI) ---
const UltraGodTierParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let elements: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);
    resize();

    const explode = (x: number, y: number) => {
      // Core Flash
      elements.push({ type: 'core', x, y, radius: 0, alpha: 1, speed: 2, maxRadius: 15 });

      // Fast Inner Shockwave
      elements.push({ type: 'shockwave', x, y, radius: 0, alpha: 0.8, speed: 6, width: 2, color: '56, 189, 248' }); 
      
      // Slower Outer Shockwave
      elements.push({ type: 'shockwave', x, y, radius: 0, alpha: 0.5, speed: 3, width: 1, color: '217, 70, 239' }); 

      // Electric Sparks
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i + (Math.random() * 0.5);
        const velocity = Math.random() * 5 + 3;
        elements.push({
          type: 'spark', x, y,
          vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity,
          life: 1, color: Math.random() > 0.5 ? '217, 70, 239' : '56, 189, 248'
        });
      }

      // Stardust
      for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        elements.push({
          type: 'dust', x, y,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 1, radius: Math.random() * 1.5 + 0.5,
          color: Math.random() > 0.5 ? '217, 70, 239' : '255, 255, 255'
        });
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      explode(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = 'screen'; 

      for (let i = elements.length - 1; i >= 0; i--) {
        let el = elements[i];

        if (el.type === 'core') {
          el.radius += el.speed; el.alpha -= 0.1;
          if (el.alpha <= 0) { elements.splice(i, 1); continue; }
          ctx.beginPath(); ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${el.alpha})`; ctx.fill();
        } 
        else if (el.type === 'shockwave') {
          el.radius += el.speed; el.alpha -= 0.04;
          if (el.alpha <= 0) { elements.splice(i, 1); continue; }
          ctx.beginPath(); ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${el.color}, ${el.alpha})`; ctx.lineWidth = el.width * el.alpha; ctx.stroke();
        } 
        else if (el.type === 'spark') {
          el.x += el.vx; el.y += el.vy; el.life -= 0.05; el.vx *= 0.85; el.vy *= 0.85;
          if (el.life <= 0) { elements.splice(i, 1); continue; }
          ctx.beginPath(); ctx.moveTo(el.x, el.y); ctx.lineTo(el.x - el.vx * 1.5, el.y - el.vy * 1.5);
          ctx.strokeStyle = `rgba(${el.color}, ${el.life})`; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke();
        } 
        else if (el.type === 'dust') {
          el.x += el.vx; el.y += el.vy; el.life -= 0.03; el.vx *= 0.92; el.vy *= 0.92;
          if (el.life <= 0) { elements.splice(i, 1); continue; }
          ctx.beginPath(); ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${el.color}, ${el.life})`; ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none" />;
};

// --- 2. BACKGROUND CYBER (TRANSISI SMOOTH) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020108]">
      <AnimatePresence>
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0, scale: 1.05 }} 
          animate={{ opacity: 0.35, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 2, ease: "easeInOut" }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten" 
        />
      </AnimatePresence>
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vh] bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-static opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

export default function CyberLandingDark() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  
  // State Form Login
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // 3D Mouse Hover Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 400, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX.set((e.touches[0].clientX / window.innerWidth) - 0.5);
        mouseY.set((e.touches[0].clientY / window.innerHeight) - 0.5);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Data otentikasi tidak lengkap.");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    if (activeTab === 'REGISTER' && (!asal || !tanggalLahir)) {
      setErrorMessage("Lengkapi form registrasi.");
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
        setErrorMessage(data.detail || "Otentikasi gagal.");
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
    <div className="flex flex-col min-h-screen w-full bg-black text-slate-200 overflow-x-hidden selection:bg-fuchsia-500/30 relative perspective-[1500px]">
      
      {/* 1. BACKGROUND GAMBAR UTAMA */}
      <PersistentUniverse bgIdx={bgIdx} />
      
      {/* 2. EFEK PARTIKEL KURSOR DEWA */}
      <UltraGodTierParticleSystem />

      {/* ========================================================================= */}
      {/* 3. NAVBAR (HEADER GELAP ELEGAN - LAYOUT FLEKSIBEL ANTI TABRAKAN)          */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-white/5 bg-[#05050a]/80 backdrop-blur-xl shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          
          {/* Bagian Kiri: Logo */}
          <div className="flex items-center gap-4 flex-1">
             <div className="w-10 h-10 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)] shrink-0">
                <ShieldCheck size={24} className="text-fuchsia-400" />
             </div>
             <div className="whitespace-nowrap">
                <h1 className="font-black text-white tracking-widest text-sm lg:text-base leading-tight">CYBER<span className="text-fuchsia-500">READINESS</span></h1>
                <p className="text-[9px] text-slate-400 font-bold tracking-[0.3em] uppercase mt-0.5">Infrastruktur Del</p>
             </div>
          </div>

          {/* Bagian Tengah: Menu */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-10 flex-1">
             {[ 
               { icon: Home, label: 'Beranda', active: true }, 
               { icon: Info, label: 'Profil', active: false }, 
               { icon: LayoutGrid, label: 'Organisasi', active: false }, 
               { icon: FileText, label: 'Berita', active: false }, 
               { icon: Megaphone, label: 'Pengumuman', active: false }, 
               { icon: HelpCircle, label: 'Layanan', active: false } 
             ].map((item, idx) => (
               <div key={idx} className="relative flex flex-col items-center justify-center group cursor-pointer h-20">
                  <div className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black transition-colors ${item.active ? 'text-fuchsia-400' : 'text-slate-500 group-hover:text-white'}`}>
                    <item.icon size={14} className={item.active ? "text-fuchsia-500" : "text-slate-600 group-hover:text-fuchsia-400"} />
                    {item.label}
                  </div>
                  {item.active && <div className="absolute bottom-0 w-full h-[2px] bg-fuchsia-500 rounded-t-md shadow-[0_0_10px_#d946ef]" />}
               </div>
             ))}
          </nav>

          {/* Bagian Kanan: Tombol Akses Portal */}
          <div className="flex items-center justify-end flex-1">
            <button 
               onClick={() => setIsLoginOpen(true)}
               className="flex items-center gap-3 px-6 py-2.5 bg-fuchsia-600 text-white rounded-full font-black text-[10px] tracking-[0.2em] uppercase hover:bg-fuchsia-500 transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] hover:-translate-y-0.5 whitespace-nowrap"
            >
               <User size={16} /> Akses Portal
            </button>
          </div>
          
        </div>
      </header>

      {/* ========================================================================= */}
      {/* KONTEN UTAMA (SCROLLABLE)                                                 */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full pt-20">
        
        {/* SECTION 1: HERO */}
        <section className="min-h-[calc(100vh-80px)] flex items-center w-full max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-0">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
              
              {/* Teks Kiri */}
              <div className="space-y-8 text-center lg:text-left">
                 <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-full text-[10px] font-black tracking-[0.3em] uppercase shadow-lg backdrop-blur-md">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"/> SECURE CONNECTION ACTIVE
                 </div>
                 
                 <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight uppercase drop-shadow-2xl">
                   Kesiapan Siber <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400">Sekolah 2026.</span>
                 </h2>
                 
                 <p className="text-sm lg:text-base font-bold text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                   Platform ini dirancang untuk mengkaji tingkat ketahanan siber di lingkungan Institut Teknologi Del melalui penyediaan infrastruktur digital yang aman dan terintegrasi secara penuh.
                 </p>

                 <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                   <button onClick={() => setIsLoginOpen(true)} className="w-full sm:w-auto px-10 py-4 bg-fuchsia-600 text-white rounded-[1.2rem] font-black text-[11px] tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:bg-fuchsia-500 hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] transition-all flex items-center justify-center gap-3 hover:-translate-y-1">
                      Mulai Evaluasi <ArrowRight size={16}/>
                   </button>
                 </div>

                 <div className="pt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                    {[ 
                      { icon: Shield, color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' }, 
                      { icon: Server, color: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10 shadow-[0_0_15px_rgba(217,70,239,0.2)]' }, 
                      { icon: Network, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]' }, 
                      { icon: Fingerprint, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]' } 
                    ].map((feat, i) => (
                      <div key={i} className={`w-14 h-14 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all hover:-translate-y-1 hover:scale-105 cursor-pointer ${feat.color}`}>
                         <feat.icon size={24} />
                      </div>
                    ))}
                 </div>
              </div>

              {/* Grafis Kanan (Card 3D Cyber Terpusat Rapi) */}
              <div className="hidden lg:flex items-center justify-center relative w-full" style={{ perspective: 1500 }}>
                 <motion.div 
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative w-full max-w-[400px] aspect-square bg-[#05050a]/80 backdrop-blur-3xl rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col items-center justify-center"
                 >
                    {/* Inner Glow Hologram */}
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/20 blur-[100px] rounded-full" />
                       <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500 shadow-[0_0_30px_#d946ef] animate-hologram-scan opacity-60" />
                    </div>
                    
                    {/* CONTAINER TERSENTRAL UNTUK CINCIN DAN LOGO */}
                    <div className="relative flex items-center justify-center mb-8" style={{ transform: "translateZ(70px)" }}>
                       {/* Cincin Energi */}
                       <div className="absolute w-40 h-40 border-[2px] border-dashed border-fuchsia-500/30 rounded-full animate-[spin_15s_linear_infinite]" style={{ transform: "translateZ(-10px)" }} />
                       {/* Logo Inti */}
                       <div className="w-28 h-28 bg-black border-[2px] border-fuchsia-500/50 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.3)] relative z-10">
                          <ShieldCheck size={56} className="text-fuchsia-400 drop-shadow-[0_0_15px_#d946ef]" />
                       </div>
                    </div>
                    
                    <h3 className="text-3xl font-black text-white tracking-widest uppercase text-center relative z-10 drop-shadow-2xl" style={{ transform: "translateZ(50px)" }}>
                      Sistem<br/>Keamanan
                    </h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-center mt-3 relative z-10" style={{ transform: "translateZ(30px)" }}>
                      Infrastruktur Del
                    </p>
                    
                    {/* Pita Teks Bawah */}
                    <div className="absolute -bottom-5 w-[85%] left-[7.5%] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 text-white px-8 py-3.5 rounded-full text-[10px] font-black tracking-[0.4em] text-center shadow-[0_20px_40px_rgba(217,70,239,0.5)] border border-white/20" style={{ transform: "translateZ(80px)" }}>
                      TERINTEGRASI 2026
                    </div>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* SECTION 2: PILAR UTAMA KEMANAN SIBER */}
        <div className="relative w-full bg-[#030208] border-t border-white/10 z-20 pb-32 pt-24 mt-12 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
           
           <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-indigo-900/10 via-fuchsia-900/5 to-transparent blur-[120px] pointer-events-none" />
           <div className="absolute inset-0 bg-grid-static opacity-[0.05] pointer-events-none" />

           <section className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
               <div className="text-center mb-20">
                 <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-6 drop-shadow-2xl">
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">Pilar Strategis</span> Kami
                 </h2>
                 <p className="text-slate-400 max-w-3xl mx-auto font-medium text-sm lg:text-base leading-relaxed">
                   Berkomitmen untuk menciptakan lingkungan akademik yang tangguh terhadap ancaman digital melalui penguatan infrastruktur, edukasi berkelanjutan, dan sistem keamanan proaktif.
                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1: Infrastruktur */}
                  <div className="bg-[#08070d]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl hover:border-cyan-500/40 hover:-translate-y-2 transition-all duration-500 group">
                     <div className="w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center mb-8 relative shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 group-hover:border-cyan-500/80 animate-[spin_10s_linear_infinite]" />
                        <Server size={32} className="text-cyan-400" />
                     </div>
                     <h3 className="text-2xl font-black text-white mb-4 tracking-wider uppercase">Infrastruktur Tangguh</h3>
                     <p className="text-[13px] font-medium text-slate-400 leading-relaxed">
                       Membangun dan memelihara arsitektur jaringan sekolah yang terpusat, berkinerja tinggi, dan tahan terhadap gangguan atau serangan siber berskala besar.
                     </p>
                  </div>

                  {/* Card 2: Keamanan Proaktif */}
                  <div className="bg-[#08070d]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl hover:border-fuchsia-500/40 hover:-translate-y-2 transition-all duration-500 group">
                     <div className="w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center mb-8 relative shadow-[0_0_30px_rgba(217,70,239,0.1)] group-hover:shadow-[0_0_40px_rgba(217,70,239,0.3)] transition-all">
                        <div className="absolute inset-0 rounded-full border-2 border-fuchsia-500/30 group-hover:border-fuchsia-500/80 animate-[spin_10s_linear_infinite_reverse]" />
                        <ShieldAlert size={32} className="text-fuchsia-400" />
                     </div>
                     <h3 className="text-2xl font-black text-white mb-4 tracking-wider uppercase">Keamanan Proaktif</h3>
                     <p className="text-[13px] font-medium text-slate-400 leading-relaxed">
                       Menerapkan protokol enkripsi end-to-end dan pemantauan real-time untuk mendeteksi serta menetralisir ancaman siber sebelum berdampak pada sistem.
                     </p>
                  </div>

                  {/* Card 3: Literasi Digital */}
                  <div className="bg-[#08070d]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl hover:border-emerald-500/40 hover:-translate-y-2 transition-all duration-500 group">
                     <div className="w-20 h-20 bg-black border border-white/10 rounded-full flex items-center justify-center mb-8 relative shadow-[0_0_30px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all">
                        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 group-hover:border-emerald-500/80 animate-[spin_10s_linear_infinite]" />
                        <BrainCircuit size={32} className="text-emerald-400" />
                     </div>
                     <h3 className="text-2xl font-black text-white mb-4 tracking-wider uppercase">Literasi Digital</h3>
                     <p className="text-[13px] font-medium text-slate-400 leading-relaxed">
                       Meningkatkan kesadaran dan kompetensi seluruh sivitas akademika dalam menjaga keamanan data pribadi maupun data institusi di dunia maya.
                     </p>
                  </div>

               </div>
           </section>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. MODAL LOGIN                                                            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative w-full ${activeTab === 'REGISTER' ? 'max-w-[450px]' : 'max-w-sm'} bg-[#0a0a0f]/95 border border-white/10 rounded-[2.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,1)] overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" />

              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-6 right-6 p-2 bg-white/5 text-slate-400 rounded-full hover:bg-white/10 hover:text-white transition-all border border-white/5"
              >
                <X size={16} />
              </button>

              <div className="mx-auto w-12 h-12 bg-transparent border border-fuchsia-500/50 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(217,70,239,0.15)]">
                <ShieldCheck className="text-fuchsia-400" size={24} />
              </div>

              <div className="mb-8 text-center">
                <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1">
                  PORTAL <span className="text-fuchsia-500">AKSES</span>
                </h2>
                <p className="text-[9px] font-bold text-slate-500 tracking-[0.2em] uppercase">
                  Otentikasi Identitas Jaringan
                </p>
              </div>

              <div className="flex border-b border-white/10 mb-8 relative">
                <button 
                  type="button"
                  onClick={() => { setActiveTab('LOGIN'); setErrorMessage(''); }} 
                  className={`flex-1 pb-3 text-[10px] font-black tracking-[0.3em] uppercase transition-colors ${activeTab === 'LOGIN' ? 'text-fuchsia-400' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  MASUK
                </button>
                <button 
                  type="button"
                  onClick={() => { setActiveTab('REGISTER'); setErrorMessage(''); }} 
                  className={`flex-1 pb-3 text-[10px] font-black tracking-[0.3em] uppercase transition-colors ${activeTab === 'REGISTER' ? 'text-fuchsia-400' : 'text-slate-600 hover:text-slate-400'}`}
                >
                  DAFTAR BARU
                </button>
                <div className={`absolute bottom-0 h-[2px] w-1/2 bg-fuchsia-500 transition-transform duration-300 shadow-[0_0_10px_#d946ef] ${activeTab === 'LOGIN' ? 'translate-x-0' : 'translate-x-full'}`} />
              </div>

              <form onSubmit={handleAuthenticate} className="space-y-4">
                
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                     <User size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="NAMA PENGGUNA" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-colors disabled:opacity-50 shadow-inner" 
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                     <Lock size={16} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="KATA SANDI" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-colors disabled:opacity-50 shadow-inner" 
                  />
                </div>

                <AnimatePresence>
                  {activeTab === 'REGISTER' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      className="space-y-4 pt-2 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                             <MapPin size={14} />
                          </div>
                          <input 
                            type="text" 
                            placeholder="ASAL / KOTA" 
                            value={asal}
                            onChange={(e) => setAsal(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-10 pr-3 text-[10px] md:text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-colors disabled:opacity-50 shadow-inner uppercase" 
                          />
                        </div>

                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                             <Calendar size={14} />
                          </div>
                          <input 
                            type="date" 
                            value={tanggalLahir}
                            onChange={(e) => setTanggalLahir(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            style={{ colorScheme: 'dark' }}
                            className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-10 pr-3 text-[10px] md:text-[11px] font-bold text-white tracking-widest placeholder:text-slate-600 focus:border-fuchsia-500 outline-none transition-colors disabled:opacity-50 shadow-inner uppercase" 
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors z-10 pointer-events-none">
                           <Server size={16} />
                        </div>
                        <select 
                          value={className}
                          onChange={(e) => setClassName(e.target.value)}
                          disabled={status === 'loading' || status === 'success'}
                          className="w-full relative z-20 bg-black/60 border border-white/5 rounded-[1.2rem] py-4 pl-14 pr-4 text-[11px] font-bold text-slate-300 tracking-widest focus:border-fuchsia-500 outline-none transition-colors appearance-none cursor-pointer uppercase shadow-inner"
                        >
                          {AVAILABLE_CLASSES.map(cls => (
                            <option key={cls} value={cls} className="bg-black">{cls}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold tracking-widest uppercase relative z-20">
                       <AlertTriangle size={14} className="shrink-0" /> {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full relative z-20 mt-4 py-4 rounded-[1.2rem] font-black text-[10px] tracking-[0.4em] text-white transition-colors flex items-center justify-center gap-3 uppercase overflow-hidden shadow-lg ${status === 'success' ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.4)] disabled:opacity-50 disabled:cursor-not-allowed'}`}
                >
                   {status === 'loading' && <span className="animate-pulse">MEMVERIFIKASI...</span>}
                   {status === 'success' && <><CheckCircle2 size={16} /> AKSES DIBERIKAN</>}
                   {status !== 'loading' && status !== 'success' && (
                     <>OTENTIKASI <Zap size={14} /></>
                   )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hologram-scan {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-hologram-scan {
          animation: hologram-scan 3s ease-in-out infinite;
        }
        .bg-grid-static {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        ::selection { background: #d946ef; color: white; }
        .perspective-\\[1500px\\] { perspective: 1500px; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #050505 inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; cursor: pointer; }
        input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity: 0.8; }
      `}} />
    </div>
  );
}