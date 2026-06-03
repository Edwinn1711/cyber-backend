"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Server, Network, Shield,
  Home, Info, FileText, LayoutGrid, Megaphone, HelpCircle, X, ArrowRight, Zap,
  BrainCircuit, ShieldAlert, Cpu, Star, Target, Activity,
  CreditCard, Globe, Key, Bug, Mail, Cloud, Search, Terminal, Eye,
  Facebook, Twitter, Youtube, Instagram, Send, Phone, Globe2,
  Radar as RadarIcon, ChevronDown, MessageSquare, MousePointer2, Binary, 
  ShieldQuestion, Radio, RefreshCw, 
  ChevronRight, ChevronLeft, ArrowLeft // <--- TAMBAHKAN TIGA INI AGAR SEMPURNA
} from 'lucide-react'

// Tambahkan parameter { user } agar bisa baca nama mahasiswa
const CyberIntelligenceHUD = ({ user }: { user: any }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const triggerDeepScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setLogs([]);

    const checkSequence = [
      "MENGHUBUNGKAN KE NEURAL UPLINK...",
      "MENYINKRONKAN IDENTITAS PERSONEL...",
      "MEMVALIDASI ENKRIPSI DATABASE...",
      "PEMINDAIAN INTEGRITAS SELESAI"
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < checkSequence.length) {
        const time = new Date().toLocaleTimeString('id-ID', { hour12: false });
        setLogs(prev => [`[${time}] ${checkSequence[i]}`, ...prev]);
        i++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        // HASIL ANALISIS YANG SANGAT DETAIL & PERSONAL
        setScanResult({
          operative: user.username || "GUEST_USER",
          node: "LAGUBOTI_SERVER_01",
          session_id: Math.random().toString(36).substring(2, 10).toUpperCase(),
          integrity: "OPTIMAL (100%)",
          encryption: "AES_256_ACTIVE"
        });
      }
    }, 700);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[10000] hidden lg:block pointer-events-auto">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.button
            key="min" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            onClick={() => setIsMinimized(false)}
            className="group relative w-14 h-14 bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl flex items-center justify-center shadow-2xl hover:border-cyan-400 transition-all"
          >
            <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 animate-ping" />
            <Terminal size={20} className="text-cyan-400" />
          </motion.button>
        ) : (
          <motion.div
            key="max" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="relative w-[350px] bg-[#050811]/95 backdrop-blur-3xl border border-cyan-500/20 rounded-[2.5rem] p-6 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[10px] font-black text-white tracking-[0.3em] uppercase">Intelligence Terminal</span>
               </div>
               <button onClick={() => setIsMinimized(true)} className="text-slate-500 hover:text-white transition-colors">
                  <ChevronDown size={20} />
               </button>
            </div>

            {/* Log Area */}
            <div className="h-[100px] space-y-2 font-mono overflow-y-auto no-scrollbar mb-6 opacity-60">
              {logs.map((log, i) => (
                <p key={i} className={`text-[7px] tracking-tighter ${i === 0 ? 'text-cyan-400' : 'text-slate-500'}`}>{log}</p>
              ))}
            </div>

            {/* HASIL ANALISIS MEWAH (DENGAN DATA MAHASISWA) */}
            <AnimatePresence>
              {scanResult && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="mb-6 p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-2 opacity-10"><ShieldCheck size={40} /></div>
                  <p className="text-[9px] font-black text-cyan-400 tracking-[0.4em] uppercase mb-4 border-b border-cyan-500/10 pb-2">Security Report</p>
                  
                  <div className="space-y-2 font-mono text-[9px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">OPERATIVE:</span>
                      <span className="text-white font-bold">{scanResult.operative}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">SESSION ID:</span>
                      <span className="text-fuchsia-400 font-bold">{scanResult.session_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">INTEGRITY:</span>
                      <span className="text-emerald-400 font-bold">{scanResult.integrity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">LOCATION:</span>
                      <span className="text-cyan-400 font-bold">IT_DEL_LAGUBOTI</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={triggerDeepScan}
              disabled={isScanning}
              className={`w-full py-4 rounded-2xl font-black text-[9px] tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 ${isScanning ? 'bg-white/5 text-slate-700' : 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-[1.02]'}`}
            >
              {isScanning ? 'SEDANG MEMPROSES...' : 'Jalankan Diagnosa'} 
              <Zap size={14} className={isScanning ? 'animate-spin' : ''} />
            </button>

            {isScanning && <div className="absolute inset-0 bg-cyan-400/5"><div className="absolute top-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_cyan] animate-scanner" /></div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const CyberMouseHUD = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => (
  <motion.div style={{ x: mouseX, y: mouseY, translateX: 20, translateY: 20 }} className="fixed top-0 left-0 z-[10000] pointer-events-none hidden lg:block">
    <div className="relative">
      <div className="absolute -top-5 -left-5 w-10 h-10 border border-cyan-500/30 rounded-full animate-spin" style={{ animationDuration: '6s' }} />
      <div className="bg-black/40 backdrop-blur-sm border-l-2 border-cyan-500 p-2 ml-6 space-y-1 min-w-[100px] text-left">
         <div className="flex justify-between items-center"><span className="text-[6px] font-mono text-cyan-400 uppercase tracking-tighter">Target_Lock</span><div className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" /></div>
         <div className="text-[7px] font-mono text-white/50 leading-none"><p>ID: <span className="text-cyan-400 uppercase">Operative_02</span></p><p>SEC: <span className="text-emerald-500">SAFE</span></p></div>
      </div>
    </div>
  </motion.div>
);

// --- ASSET BACKGROUND ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. EFEK KLIK PARTIKEL ULTRA GOD-TIER ---
const UltraGodTierParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let elements: any[] =[];
    let animationFrameId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', resize);
    resize();

    const explode = (x: number, y: number) => {
      // Dapatkan posisi relatif terhadap canvas
      const rect = canvas.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;

      elements.push({ type: 'core', x: relX, y: relY, radius: 0, alpha: 1, speed: 2 });
      // Spark
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        elements.push({ type: 'spark', x: relX, y: relY, vx: Math.cos(angle) * 4, vy: Math.sin(angle) * 4, life: 1 });
      }
    };

    const handlePointerDown = (e: PointerEvent) => explode(e.clientX, e.clientY);
    window.addEventListener('pointerdown', handlePointerDown);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan dengan ukuran canvas sebenarnya
      ctx.globalCompositeOperation = 'lighter';

      for (let i = elements.length - 1; i >= 0; i--) {
        let el = elements[i];
        el.alpha -= 0.02;
        if (el.alpha <= 0) { elements.splice(i, 1); continue; }

        if (el.type === 'core') {
          el.radius += 2;
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${el.alpha})`; // Ubah ke outline biru muda agar tidak abu-abu
          ctx.stroke();
        } else {
          el.x += el.vx; el.y += el.vy;
          ctx.fillStyle = `rgba(217, 70, 239, ${el.alpha})`;
          ctx.fillRect(el.x, el.y, 3, 3);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => { 
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId); 
    };
  },[]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none w-full h-full" />;
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

const SectionDivider = () => (
  <div className="relative w-full h-[1px] z-50 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
  </div>
);

const CyberDecoration = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none select-none opacity-20 lg:opacity-30 ${className}`}>
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 border border-cyan-500/40 rounded-full animate-pulse" />
      <div className="absolute inset-4 border border-fuchsia-500/30 rounded-full animate-pulse delay-75" />
      <div className="absolute inset-10 border border-cyan-500/20 rounded-full animate-pulse delay-150" />
      <div className="absolute inset-[40%] bg-cyan-500/10 blur-2xl rounded-full" />
    </div>
  </div>
);


const VisiMisiSection = ({ bgIdx }: { bgIdx: number }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const data = [
    { 
      id: "visi", 
      icon: Star, 
      title: "VISI KEDAULATAN", 
      desc: "Menjadi ekosistem pendidikan menengah yang tangguh siber, unggul dalam inovasi digital, serta mampu menjadi pelopor keamanan data nasional." 
    },
    { 
      id: "misi", 
      icon: Target, 
      title: "MISI OPERASIONAL", 
      desc: "Menyelenggarakan infrastruktur digital terproteksi, membekali siswa dengan kompetensi siber, dan menanamkan budaya kewaspadaan digital." 
    }
  ];

  return (
    <section id="visi-misi" className="relative w-full min-h-[85vh] flex flex-col items-center justify-center py-20 bg-[#020108] border-b border-white/5 overflow-hidden">
      
      {/* --- BACKGROUND SINKRON (OPACITY DIKALIBRASI) --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      {/* Dekorasi Pengisi Area Kosong */}
      <CyberDecoration className="-bottom-32 -right-32 rotate-45 opacity-10" />

      {/* Kontainer Padat 1280px */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 w-full text-center">
        
        {/* Header (Ukuran Pas & Rapi) */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Membangun Kedaulatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 animate-gradient-x">Digital Sekolah</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-xs lg:text-sm font-medium opacity-80 leading-relaxed">
            Integrasi infrastruktur siber aman demi mewujudkan lingkungan belajar yang terlindungi dan cerdas.
          </p>
        </div>

        {/* Grid 2 Kartu (Mewah & Padat) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" onMouseLeave={() => setHovered(null)}>
          {data.map((item) => (
            <motion.div 
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              className={`
                group relative bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/5 p-10 lg:p-14 rounded-[3rem] text-left transition-all duration-500
                ${hovered && hovered !== item.id ? 'blur-sm scale-[0.98] opacity-40' : 'scale-100 opacity-100'}
                ${hovered === item.id ? 'border-cyan-500/40 shadow-[0_0_50px_rgba(34,211,238,0.15)] -translate-y-2' : ''}
              `}
            >
              {/* HUD Details */}
              <div className="absolute top-8 right-10 text-[8px] font-mono text-slate-700 tracking-[0.4em] uppercase group-hover:text-cyan-500/50 transition-colors">
                Directive 0{item.id === 'visi' ? '1' : '2'}
              </div>

              <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                <item.icon size={28} />
              </div>
              
              <h3 className="text-xl lg:text-2xl font-black text-white mb-4 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed font-medium">
                {item.desc}
              </p>

              {/* Status Bar HUD */}
              <div className="mt-10 flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                 <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" 
                    />
                 </div>
                 <span className="text-[7px] font-mono tracking-widest text-slate-500">AUTHORIZED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SecurityStatsSection = () => {
  const stats = [
    { label: "Data Terlindungi", value: "99.9%", color: "text-emerald-400", sub: "Protokol Enkripsi AES-256" },
    { label: "Ancaman Terblokir", value: "1,240", color: "text-fuchsia-400", sub: "Deteksi Intrusi Otomatis" },
    { label: "Siswa Terliterasi", value: "850+", color: "text-blue-400", sub: "Sertifikasi Keamanan Dasar" },
    { label: "Uptime Sistem", value: "24/7", color: "text-cyan-400", sub: "Konektivitas Node Stabil" },
  ];

  return (
    <section id="stats" className="relative w-full min-h-[85vh] flex flex-col items-center justify-center py-20 bg-[#030208] border-b border-white/5 overflow-hidden">
      
      {/* --- AMBIENT HUD LIGHTING --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-fuchsia-600/5 blur-[120px] rounded-full pointer-events-none" />
      <CyberDecoration className="top-10 left-10 scale-50 opacity-10" />

      {/* Kontainer Padat 1280px */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 w-full text-center">
        
        {/* Header (Ukuran Pas & Rapi) */}
        <div className="mb-20">
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            Metrik Ketahanan <span className="text-fuchsia-500">Digital</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xs lg:text-sm font-medium opacity-80 leading-relaxed uppercase tracking-widest">
            Visualisasi Data Real-Time Infrastruktur Siber Sekolah
          </p>
        </div>

        {/* Grid 4 Kolom (Mewah & Sangat Padat) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[#0a0a0f]/60 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] border border-white/5 hover:border-fuchsia-500/30 transition-all duration-700 shadow-2xl flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Scanline Effect (Hanya muncul di kotak ini) */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/[0.02] to-transparent h-10 w-full animate-scanner opacity-0 group-hover:opacity-100" />
              
              {/* Angka Utama (Dewa Scale: Tidak pecah/overflow) */}
              <div className={`text-4xl lg:text-6xl font-black mb-3 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(217,70,239,0.3)] ${s.color}`}>
                {s.value}
              </div>

              {/* Label & Sub-info */}
              <div className="space-y-1">
                <p className="text-[10px] lg:text-[11px] font-black text-white uppercase tracking-widest group-hover:text-fuchsia-400 transition-colors">
                  {s.label}
                </p>
                <p className="text-[7px] font-mono text-slate-600 uppercase tracking-widest">
                  {s.sub}
                </p>
              </div>

              {/* Indikator "Verified" HUD di pojok */}
              <div className="absolute top-4 right-6 flex items-center gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                 <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[6px] font-mono text-slate-500">LIVE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const CyberInfrastructureSection = () => {
  const sectors = [
    { title: "Firewall Node", icon: ShieldAlert, desc: "Penyaringan trafik masuk keluar jaringan secara real-time.", tag: "SECURE" },
    { title: "Network Monitoring", icon: Network, desc: "Pemantauan beban bandwidth dan stabilitas koneksi tiap kelas.", tag: "STABLE" },
    { title: "Server Hub", icon: Server, desc: "Manajemen data akademik di pangkalan data terenkripsi.", tag: "ENCRYPTED" },
    { title: "IDS Detection", icon: ScanLine, desc: "Deteksi otomatis terhadap akses ilegal atau upaya peretasan.", tag: "ACTIVE" },
    { title: "Identity Auth", icon: Fingerprint, desc: "Sistem login identitas digital dengan enkripsi ganda.", tag: "VERIFIED" },
    { title: "Data Backup", icon: Cpu, desc: "Redundansi data mingguan otomatis di server lokal aman.", tag: "BACKED UP" }
  ];

  return (
    <section id="infra" className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 bg-black overflow-hidden border-b border-cyan-500/20 group/hacking">
      
      {/* --- BACKGROUND VIDEO (TAJAM) --- */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 pointer-events-none">
          <source src="/bg/hacking-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 w-full text-center">
        
        {/* HEADER SECTION */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black tracking-[0.5em] uppercase mb-8"
          >
            <Radio size={14} className="animate-pulse" /> Live System Monitor
          </motion.div>
          
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            MODUL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient-x">PERTUMBUHAN</span> SIBER
          </h2>
        </div>

{/* --- GRID 6 KOTAK (OPTIMASI SMOOTH MOBILE TAP) --- */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {sectors.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              // SPRING PHYSICS: Rahasia agar di HP terasa membal dan smooth
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.05 }}
              
              // EFEK SAAT DISENTUH (MOBILE) & HOVER (LAPTOP)
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98, y: -5 }} // Memberikan efek "naik" saat jari menekan layar
              
              className="group/card relative bg-[#050811]/60 backdrop-blur-2xl border border-white/5 p-10 rounded-[3rem] cursor-pointer overflow-hidden shadow-2xl flex flex-col h-full"
            >
              {/* Laser Scanner Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/60 opacity-0 group-hover:opacity-100 group-hover:animate-scanner z-20" />
              
              {/* Ikon dengan Aura Neon */}
              <div className="relative w-16 h-16 bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 rounded-3xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-all duration-300">
                <s.icon size={30} className="drop-shadow-[0_0_8px_currentColor]" />
              </div>
              
              <div className="space-y-3 flex-1 text-center">
                <h3 className="text-xl font-black text-white uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-[11px] leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all">
                <span className="text-[9px] font-black text-cyan-400 tracking-[0.3em] uppercase">{s.tag}</span>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReadinessProtocolSection = () => {
  const protocols = [
    { num: "01", title: "IDENTIFIKASI", icon: ScanLine, col: "text-cyan-400", desc: "Pemetaan seluruh aset perangkat dan akun digital sekolah." },
    { num: "02", title: "PROTEKSI", icon: ShieldCheck, col: "text-blue-400", desc: "Penerapan enkripsi dan firewall berlapis pada database." },
    { num: "03", title: "DETEKSI", icon: Search, col: "text-emerald-400", desc: "Pemantauan aktif untuk mendeteksi malware dan phishing." },
    { num: "04", title: "RESPON", icon: ShieldAlert, col: "text-red-400", desc: "Tindakan mitigasi instan saat terjadi insiden keamanan." },
    { num: "05", title: "PEMULIHAN", icon: RefreshCw, col: "text-fuchsia-400", desc: "Restorasi layanan via backup rutin agar KBM tetap normal." },
    { num: "06", title: "EDUKASI", icon: BrainCircuit, col: "text-violet-400", desc: "Pelatihan literasi siber untuk membangun budaya waspada." },
    { num: "07", title: "KEBIJAKAN", icon: FileText, col: "text-indigo-400", desc: "Penyusunan aturan penggunaan perangkat dan data pribadi." },
    { num: "08", title: "EVALUASI", icon: Activity, col: "text-orange-400", desc: "Audit sistem berkala agar efektif menghadapi ancaman baru." }
  ];

  return (
    <section id="protocol" className="relative w-full min-h-[90vh] flex flex-col items-center justify-center py-20 bg-[#030208] border-b border-white/5 overflow-hidden">
      
      {/* --- DEKORASI LATAR BELAKANG --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)]" />
        <CyberDecoration className="bottom-0 left-0 scale-75 opacity-5" />
      </div>

      {/* Kontainer Padat 1280px */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 w-full text-center">
        
        {/* Header (Simetris 100%) */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black tracking-[0.6em] text-slate-400 uppercase mb-5"
          >
            Security Compliance Protocol
          </motion.div>
          <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            PROTOKOL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-500 animate-gradient-x">KESIAPAN SIBER</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xs lg:text-sm font-medium opacity-80 uppercase tracking-widest">
            Standar Operasional Perlindungan Data Digital Sekolah
          </p>
        </div>

        {/* --- GRID 8 KOTAK (KOMPAK & RAPI) --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {protocols.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-[#0a0a0f]/40 backdrop-blur-xl border border-white/5 p-6 lg:p-8 rounded-[2rem] hover:border-white/20 transition-all duration-500 flex flex-col items-start text-left shadow-2xl overflow-hidden"
            >
              {/* Nomor Seri Transparan (Efek Depth) */}
              <span className="absolute -bottom-2 -right-2 text-6xl font-black text-white/[0.02] group-hover:text-white/[0.05] transition-colors pointer-events-none font-mono">
                {p.num}
              </span>

              {/* Icon Row */}
              <div className="w-full flex justify-between items-center mb-6">
                <div className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${p.col}`}>
                  <p.icon size={22} className="drop-shadow-[0_0_8px_currentColor]" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              </div>

              {/* Title & Desc */}
              <h3 className="text-sm lg:text-base font-black text-white mb-2 tracking-widest uppercase group-hover:text-cyan-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                {p.desc}
              </p>

              {/* Scanning Light (Footer Card) */}
              <div className="mt-6 h-[1px] w-full bg-white/5 relative overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CyberClosingSection = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isSecured, setIsSecured] = useState(false);

  const startFinalScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsSecured(true);
      // Reset otomatis setelah 5 detik agar bisa dicoba pengunjung lain
      setTimeout(() => setIsSecured(false), 5000);
    }, 2800);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#010103] overflow-hidden border-b border-white/5">
      
      {/* --- BACKGROUND HUD ELEMENTS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-cyan-500/5 rounded-full animate-[spin_80s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-dashed border-fuchsia-500/10 rounded-full animate-[spin_50s_linear_infinite_reverse]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {!isSecured ? (
            <motion.div 
              key="standby"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-14"
            >
              {/* --- INTERACTIVE BIOMETRIC SCANNER --- */}
              <div className="relative mx-auto w-44 h-44 lg:w-64 lg:h-64 flex items-center justify-center">
                 {/* Energy Aura */}
                 <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full animate-pulse" />
                 
                 <button 
                   onClick={startFinalScan}
                   disabled={isScanning}
                   className={`relative z-10 w-full h-full rounded-full border-2 border-white/10 flex items-center justify-center bg-black/40 backdrop-blur-2xl transition-all duration-700 ${isScanning ? 'scale-90 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.3)]' : 'hover:scale-105 hover:border-cyan-400/50 shadow-2xl'}`}
                 >
                    {isScanning ? (
                      <div className="flex flex-col items-center gap-4">
                         <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                            <Zap size={40} className="text-cyan-400" />
                         </motion.div>
                         <span className="text-[10px] font-black text-cyan-400 tracking-[0.6em] animate-pulse uppercase">Encrypting</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-5 group">
                         <Fingerprint size={70} className="text-white/20 group-hover:text-cyan-400 transition-all duration-500 group-hover:drop-shadow-[0_0_15px_#22d3ee]" />
                         <span className="text-[9px] font-black text-slate-500 tracking-[0.5em] group-hover:text-white transition-colors">INITIALIZE LOCK</span>
                      </div>
                    )}

                    {/* Scanning Laser Line */}
                    {isScanning && (
                      <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-20"
                      />
                    )}
                 </button>

                 {/* Decorative HUD Corners Around Button */}
                 <div className="absolute -inset-4 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-3xl pointer-events-none" />
                 <div className="absolute -inset-4 border-b-2 border-r-2 border-fuchsia-500/20 rounded-br-3xl pointer-events-none" />
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                  KEDAULATAN DIGITAL <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 animate-gradient-x">
                    DI TANGAN ANDA.
                  </span>
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-sm lg:text-base font-bold tracking-[0.3em] uppercase opacity-60">
                   SENTUHAN AKHIR UNTUK MENGAMANKAN SELURUH DATA SEKOLAH
                </p>
              </div>
            </motion.div>
          ) : (
<motion.div 
              key="secured"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center space-y-12"
            >
               {/* Icon Success - Ukuran disesuaikan */}
               <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] rounded-full animate-pulse" />
                  <div className="relative w-32 h-32 lg:w-40 lg:h-40 bg-emerald-500/5 border-2 border-emerald-400/50 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)] transition-all duration-1000">
                     <ShieldCheck size={60} className="text-emerald-400 drop-shadow-[0_0_15px_#10b981]" />
                  </div>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -inset-6 border border-dashed border-emerald-500/20 rounded-full" />
               </div>
               
               <div className="text-center space-y-6">
                  {/* JUDUL DIKECILKAN: Dari 9xl ke 6xl (Desktop) dan 4xl (Mobile) */}
                  <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    ACCESS GRANTED
                  </h2>
                  
                  {/* Pill Status yang lebih ramping */}
                  <div className="inline-flex items-center gap-3 px-6 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] lg:text-xs tracking-[0.4em] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SYSTEM STATUS: FULLY PROTECTED
                  </div>
               </div>

               {/* Grid Kecil di Bawah (Dibuat Lebih Halus) */}
               <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    { t: "DATABASE SECURED", i: Lock },
                    { t: "FIREWALL ACTIVE", i: Globe },
                    { t: "NODES STABLE", i: Activity }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 group">
                      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 border border-white/5 transition-all group-hover:text-emerald-400 group-hover:border-emerald-500/30">
                        <item.i size={16} />
                      </div>
                      <span className="text-[8px] font-black text-slate-600 tracking-[0.3em] uppercase group-hover:text-white transition-colors">{item.t}</span>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};



const CyberFooterLuxury = ({ onScroll }: { onScroll: (id: string, label: string) => void }) => {
  return (
    <footer className="relative w-full bg-[#010103] pt-24 pb-10 overflow-hidden border-t border-white/5">
      {/* --- AMBIENT BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.03)_0%,transparent_70%)]" />
        {/* Efek Garis Data Mengalir Horizontal */}
        <div className="absolute bottom-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-50" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10">
        
        {/* --- TOP ROW: NEURAL UPLINK (NEWSLETTER HUD) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center pb-20 mb-20 border-b border-white/5 gap-10">
          <div className="text-center lg:text-left space-y-3">
            <div className="flex items-center justify-center lg:justify-start gap-3">
               <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]" />
               <h4 className="text-white font-black text-xs tracking-[0.4em] uppercase">Neural Uplink Subscription</h4>
            </div>
            <p className="text-slate-500 text-[10px] lg:text-xs font-medium max-w-md">Sambungkan email Anda untuk menerima laporan intelijen keamanan siber dan pembaruan sistem secara berkala.</p>
          </div>
          
          <div className="relative w-full lg:w-[450px] group">
            <input 
              type="email" 
              placeholder="ENTER SYSTEM EMAIL..." 
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 pl-8 pr-20 text-[10px] font-mono text-cyan-400 focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-800 shadow-inner group-hover:border-white/20"
            />
            <button className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black rounded-xl font-black text-[10px] tracking-widest hover:bg-cyan-500 hover:text-white transition-all flex items-center justify-center shadow-xl active:scale-95">
              CONNECT
            </button>
          </div>
        </div>

        {/* --- MIDDLE ROW: DATA CLUSTERS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-24">
          
          {/* Cluster 1: Branding (HUD Mode) */}
          <div className="col-span-2 md:col-span-1 space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onScroll('hero', 'Beranda')}>
              <div className="w-12 h-12 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                <ShieldCheck size={28} className="text-fuchsia-500" />
              </div>
              <div className="text-left">
                <h3 className="font-black text-white text-xl tracking-tighter uppercase leading-none">CYBER<span className="text-fuchsia-500">READINESS</span></h3>
                <p className="text-[7px] font-mono text-slate-600 tracking-[0.3em] mt-1">SECURED PLATFORM</p>
              </div>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed font-medium">Pusat pertahanan digital pendidikan terintegrasi. Membangun kedaulatan data masa depan melalui protokol keamanan internasional.</p>
            <div className="flex items-center gap-3 text-emerald-500 font-mono text-[9px] tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              SYSTEMS ENCRYPTED AND OPERATIONAL
            </div>
          </div>

          {/* Cluster 2: Quick Navigation */}
          <div className="space-y-8">
            <h5 className="text-white font-black text-[10px] tracking-[0.5em] uppercase opacity-30 flex items-center gap-2">
              <Globe size={12} className="text-cyan-400" /> Navigation
            </h5>
            <ul className="space-y-4">
              {[
                { n: "Beranda Utama", i: "hero" },
                { n: "Profil Platform", i: "pilar" },
                { n: "Layanan Siber", i: "infra" },
                { n: "Protokol SOP", i: "protocol" }
              ].map((link, j) => (
                <li 
                  key={j} 
                  onClick={() => onScroll(link.i, link.n)}
                  className="text-slate-500 text-[10px] font-bold hover:text-white cursor-pointer transition-all flex items-center gap-3 group/link"
                >
                  <div className="w-0 group-hover/link:w-3 h-[1px] bg-cyan-400 transition-all" />
                  {link.n.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>

          {/* Cluster 3: Contact HUD */}
          <div className="space-y-8 text-left">
            <h5 className="text-white font-black text-[10px] tracking-[0.5em] uppercase opacity-30 flex items-center gap-2">
              <Phone size={12} className="text-fuchsia-400" /> Connect
            </h5>
            <div className="space-y-6">
               <div className="group cursor-pointer">
                  <p className="text-[8px] font-mono text-slate-600 mb-1">MAIL</p>
                  <p className="text-slate-400 text-[10px] font-bold lowercase group-hover:text-cyan-400 transition-colors">devinedwinsiahaan171105@gmail.com</p>
               </div>
               <div className="group cursor-pointer">
                  <p className="text-[8px] font-mono text-slate-600 mb-1">WHATSAPP</p>
                  <p className="text-slate-400 text-[10px] font-bold group-hover:text-fuchsia-400 transition-colors">08887537736</p>
               </div>
            </div>
          </div>

          {/* Cluster 4: Location Target */}
          <div className="space-y-8">
            <h5 className="text-white font-black text-[10px] tracking-[0.5em] uppercase opacity-30 flex items-center gap-2">
              <MapPin size={12} className="text-emerald-400" /> Target Node
            </h5>
            <div className="relative group">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Institut+Teknologi+Del+Laguboti" 
                target="_blank" rel="noopener noreferrer"
                className="block p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all duration-500"
              >
                <p className="text-white font-black text-[10px] tracking-widest mb-1">INSTITUT TEKNOLOGI DEL</p>
                <p className="text-slate-600 text-[9px] font-bold">LAGUBOTI, INDONESIA</p>
                {/* Micro Map Decoration */}
                <div className="mt-4 flex justify-between items-center">
                   <span className="text-[7px] font-mono text-emerald-500/50">COORD: 2.38° N, 99.14° E</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* --- BOTTOM ROW: METADATA & SOCIALS --- */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex gap-8">
            {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
              <Icon 
                key={i} 
                size={18} 
                className="text-slate-600 hover:text-white cursor-pointer transition-all hover:-translate-y-1" 
              />
            ))}
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
             <p className="text-slate-700 text-[8px] font-mono tracking-[0.4em] uppercase">
                © 2026 CYBER READINESS INDEX
             </p>
             <p className="text-[7px] font-mono text-slate-800 tracking-[0.2em]">BUILT WITH PRECISION AT IT DEL</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
const TECH_ICONS = [
  { id: "c1", icon: CreditCard, label: "CARD SEC", col: "text-cyan-400" },
  { id: "c2", icon: ShieldAlert, label: "PHISH HOOK", col: "text-red-400" },
  { id: "c3", icon: Cpu, label: "SHIELD CHIP", col: "text-emerald-400" },
  { id: "c4", icon: Globe, label: "GLOBE LCK", col: "text-blue-400" },
  { id: "c5", icon: Key, label: "KEY VAULT", col: "text-fuchsia-400" },
  { id: "c6", icon: Bug, label: "ANTIVIRUS", col: "text-amber-400" },
  { id: "c7", icon: Terminal, label: "WARN WIN", col: "text-orange-400" },
  { id: "c8", icon: Mail, label: "SECURE MAIL", col: "text-cyan-300" },
  { id: "c9", icon: Cloud, label: "CLOUD NET", col: "text-indigo-400" },
  { id: "c10", icon: FileText, label: "DOC CRYPT", col: "text-fuchsia-300" },
];

const CyberHiveMarquee = () => {
  return (
    // h-[90px] agar tetap ramping di HP
    <div className="relative w-full h-[90px] lg:h-[130px] overflow-hidden select-none bg-transparent mt-2">
      
      {/* --- MASKING GRADIENT SUPER TIPIS (KHUSUS HP) --- */}
      {/* SISI KIRI: w-6 (24px) di HP agar area tengah luas | w-32 di Laptop */}
      <div className="absolute inset-y-0 left-0 w-6 lg:w-32 bg-gradient-to-r from-[#020108] to-transparent z-10 pointer-events-none" />
      
      {/* SISI KANAN: w-6 di HP | w-32 di Laptop */}
      <div className="absolute inset-y-0 right-0 w-6 lg:w-32 bg-gradient-to-l from-[#020108] to-transparent z-10 pointer-events-none" />
      
      <div className="flex items-center h-full">
        <motion.div 
          className="flex gap-8 lg:gap-20 px-4"
          animate={{ x: [0, -1800] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {[...TECH_ICONS, ...TECH_ICONS, ...TECH_ICONS].map((node, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, Math.sin(i) * 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="group relative flex-shrink-0 flex flex-col items-center justify-center bg-transparent"
            >
              {/* Orb Lingkaran Ikon Mini */}
              <div className="relative w-9 h-9 lg:w-12 lg:h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                <div className={`absolute inset-0 rounded-full blur-xl opacity-5 group-hover:opacity-20 ${node.col.replace('text', 'bg')}`} />
                <node.icon 
                  size={20} 
                  className={`${node.col} lg:size-6 drop-shadow-[0_0_8px_currentColor] opacity-70 group-hover:opacity-100 transition-all`} 
                />
              </div>

              {/* Label Teks HUD */}
              <div className="mt-2 text-center pointer-events-none">
                <p className="text-[6px] lg:text-[8px] font-black text-white/30 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">
                  {node.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const CyberModal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 lg:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl max-h-[85vh] bg-[#050811]/90 border border-cyan-500/20 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)] flex flex-col"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/30 animate-scanner z-50" />
          <div className="flex justify-between items-center p-8 border-b border-white/5 relative z-10 bg-black/20">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-widest">{title}</h2>
            </div>
            <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all"><X size={24} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 lg:p-12 relative z-10 custom-scrollbar">{children}</div>
          <div className="p-6 border-t border-white/5 text-center bg-black/20">
          <p className="text-[10px] font-mono text-slate-500 tracking-[0.5em] uppercase">Security Protocol Access Authorized</p>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);


// --- DEFINISI 1: NEURAL NETWORK (GARIS MENGEJAR MOUSE) ---
const NeuralNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: any[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    class Particle {
      x: number; y: number; vx: number; vy: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) { this.x += dx * 0.01; this.y += dy * 0.01; }
      }
    }
    for (let i = 0; i < 60; i++) particles.push(new Particle());
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(34, 211, 238, 0.15)";
      ctx.lineWidth = 0.5;
      particles.forEach((p, i) => {
        p.update();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; });
    resize(); animate();
    return () => window.removeEventListener('resize', resize);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

const CyberLensHUD = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  return (
    <motion.div 
      // translateX: -160 memindahkan HUD ke sisi KIRI kursor agar tidak menabrak widget
      style={{ x: mouseX, y: mouseY, translateX: -160, translateY: 20 }}
      className="fixed top-0 left-0 z-[10000] pointer-events-none hidden lg:block"
    >
      <div className="relative opacity-40 group-hover:opacity-100 transition-opacity duration-700">
        
        {/* Lingkaran Bidik Tipis di Sisi Kiri */}
        <div className="absolute -top-3 -right-3 w-6 h-6 border border-cyan-500/20 rounded-full animate-pulse" />
        
        {/* Box HUD - Diarahkan ke kiri dengan perataan teks kanan */}
        <div className="bg-black/10 backdrop-blur-[2px] border-r-2 border-cyan-500/50 p-2 mr-4 space-y-1 text-right">
           <div className="flex items-center justify-end gap-2">
              <span className="text-[6px] font-mono text-cyan-400 uppercase tracking-[0.2em]">System Analyzing</span>
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
           </div>
           
           <div className="text-[7px] font-mono text-white/50 leading-none space-y-0.5">
              <p>STATUS: <span className="text-cyan-400">VERIFIED</span></p>
              <p>ACCESS: <span className="text-emerald-500">GRANTED</span></p>
              <p>ENCRYPTION: <span className="text-fuchsia-400">ACTIVE</span></p>
           </div>

           {/* Dekorasi Garis Data Bawah */}
           <div className="flex justify-end pt-1">
              <div className="w-8 h-[1px] bg-white/10" />
           </div>
        </div>

      </div>
    </motion.div>
  );
};


export default function CyberLandingDark() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [activeSection, setActiveSection] = useState('Beranda');
  const [activeModal, setActiveModal] = useState<'TENTANG KAMI' | 'LAYANAN' | null>(null); // State Modal Baru

  // State Form & Mouse (Sama seperti sebelumnya)
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [inspectedArchitect, setInspectedArchitect] = useState<string | null>(null);
  const [user, setUser] = useState({ username: 'OPERATIVE' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 400, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { mouseX.set((e.clientX / window.innerWidth) - 0.5); mouseY.set((e.clientY / window.innerHeight) - 0.5); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string, label: string) => {
    setActiveSection(label);
    const element = document.getElementById(id);
    if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
  };

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
    <div className="flex flex-col min-h-screen w-full bg-black text-slate-200 overflow-x-hidden selection:bg-cyan-500/30 relative">
      <PersistentUniverse bgIdx={bgIdx} />
      <NeuralNetworkCanvas />
      <UltraGodTierParticleSystem />
      <CyberLensHUD mouseX={mouseX} mouseY={mouseY} />
      <CyberIntelligenceHUD user={user} />

{/* --- ULTIMATE HOLOGRAPHIC HEADER (DEWA VERSION) --- */}
<header className="fixed top-0 left-0 right-0 z-[1000] w-full">
        {/* Progress Bar Tipis di Paling Atas */}
        <div className="h-[2px] w-full bg-white/5 overflow-hidden">
           <motion.div 
             animate={{ x: ["-100%", "100%"] }} 
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee]" 
           />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="h-20 lg:h-24 bg-black/40 backdrop-blur-2xl border-x border-b border-white/5 rounded-b-[2.5rem] px-8 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            
            {/* Ambient Glow di dalam Header */}
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/5 blur-[40px] rounded-full pointer-events-none" />

            {/* --- SISI KIRI: LOGO BIOMETRIK --- */}
            <div className="flex items-center gap-4 relative z-10 shrink-0">
               <motion.div 
                 whileHover={{ rotate: 180 }}
                 className="w-10 h-10 lg:w-12 lg:h-12 bg-white/5 border border-cyan-500/30 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]"
               >
                  <ShieldCheck size={24} className="text-cyan-400 drop-shadow-[0_0_8px_cyan]" />
               </motion.div>
               <div className="text-left">
                  <h1 className="font-black text-white text-base lg:text-lg tracking-[0.2em] uppercase leading-none">
                    CYBER<span className="text-cyan-400">READINESS</span>
                  </h1>
                  <div className="flex items-center gap-2 mt-1.5">
                     <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[7px] font-mono text-slate-500 tracking-[0.3em] uppercase">Security Level 01</span>
                  </div>
               </div>
            </div>

            <nav className="hidden lg:flex flex-1 justify-center items-center gap-12 h-full">
             {[ 
               { label: 'Beranda', id: 'hero', icon: Home, type: 'scroll' }, 
               { label: 'Tentang Kami', id: 'pilar', icon: Info, type: 'modal' }, 
               { label: 'Layanan', id: 'infra', icon: HelpCircle, type: 'modal' } 
             ].map((item, idx) => {
               const isActive = activeSection === item.label;
               return (
                 <button 
                    key={idx} 
                    onClick={() => {
                      setActiveSection(item.label);
                      if (item.type === 'scroll') {
                        scrollToSection(item.id, item.label);
                      } else {
                        // SINKRONISASI: Menggunakan 'TENTANG KAMI' agar modal terbuka
                        const modalKey = item.label.toUpperCase();
                        setActiveModal(modalKey as any);
                      }
                    }}
                    className="relative flex flex-col items-center justify-center h-full px-2 group outline-none"
                 >
                    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black transition-all duration-300 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-white'}`}>
                      <item.icon size={15} className={isActive ? "text-cyan-400 animate-pulse" : "opacity-40 group-hover:opacity-100"} />
                      {item.label}
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="nav-glow" 
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-cyan-400 rounded-t-full shadow-[0_-2px_10px_#22d3ee]" 
                      />
                    )}
                 </button>
               )
             })}
          </nav>

            {/* --- SISI KANAN: AUTH & STATUS --- */}
            <div className="flex items-center gap-6 relative z-10 shrink-0">
               {/* Indikator Latency (Simulasi) */}
               <div className="hidden xl:flex flex-col items-end gap-1 opacity-40">
                  <span className="text-[6px] font-mono text-slate-400 uppercase tracking-widest">Latency</span>
                  <span className="text-[8px] font-mono text-cyan-400 font-bold tracking-tighter">0.002 MS</span>
               </div>

               <div className="h-8 w-px bg-white/10 hidden sm:block" />

               <button 
                 onClick={() => setIsLoginOpen(true)}
                 className="px-8 py-2.5 bg-white text-black rounded-full font-black text-[9px] tracking-[0.4em] uppercase transition-all hover:bg-cyan-400 hover:text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] active:scale-95 shadow-xl"
               >
                 LOGIN
               </button>

               {/* Mobile Toggle */}
               <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 bg-white/5 rounded-xl text-white border border-white/10">
                  <LayoutGrid size={20} />
               </button>
            </div>

            {/* Decorative Corner HUD Marks */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="absolute top-full left-0 w-full bg-[#05050a]/98 backdrop-blur-3xl py-10 px-6 lg:hidden flex flex-col gap-6 shadow-2xl overflow-hidden"
            >
               {[ 
                 { icon: Home, label: 'Beranda', id: 'hero' }, 
                 { icon: Info, label: 'Tentang Kami', id: 'pilar' }, // NAMA DIGANTI AGAR BISA DIKLIK
                 { icon: HelpCircle, label: 'Layanan', id: 'infra' } 
               ].map((item, idx) => (
                 <div 
                   key={idx} 
                   onClick={() => { 
                     if (idx === 0) {
                        scrollToSection('hero', 'Beranda');
                     } else {
                        // Memanggil modal dengan kunci yang benar: TENTANG KAMI atau LAYANAN
                        setActiveModal(item.label.toUpperCase() as any);
                        setIsMobileMenuOpen(false); 
                     }
                   }} 
                   className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-slate-300 font-bold text-sm uppercase hover:text-cyan-400 transition-all active:scale-95"
                 >
                   <div className="flex items-center gap-4">
                      <item.icon size={20} />
                      {item.label}
                   </div>
                   <ChevronRight size={16} className="opacity-30" />
                 </div>
               ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 w-full">
        
{/* --- HALAMAN 1: HERO (REVISI: COMPACT & SOLID) --- */}
<section id="hero" className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-10 px-6 lg:px-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-[1280px] mx-auto text-left">
            
            {/* Widget Area (Kanan) */}
            <div className="relative w-full flex flex-col items-center justify-center order-1 lg:order-2 gap-4">
              <div className="relative" style={{ perspective: 2000 }}>
                <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-[240px] h-[300px] sm:w-[280px] sm:h-[350px] lg:w-[320px] lg:h-[400px] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl rounded-[2.5rem] p-1 shadow-2xl border border-white/10 flex flex-col items-center justify-center group/card">
                  <div className="relative flex items-center justify-center mb-6" style={{ transform: "translateZ(60px)" }}>
                    <div className="absolute w-32 h-32 lg:w-40 lg:h-40 border border-cyan-500/20 rounded-full animate-spin-slow" />
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-black border border-cyan-500/30 rounded-2xl flex items-center justify-center shadow-xl"><ShieldCheck size={32} className="text-cyan-400" /></div>
                  </div>
                  <h3 className="text-lg lg:text-xl font-black text-white uppercase tracking-widest">Security Hub</h3>
                  <div className="absolute -bottom-4 px-8 py-3 bg-black border border-white/5 text-white rounded-xl text-[8px] lg:text-[10px] font-black uppercase">ENCRYPTED</div>
                </motion.div>
              </div>
              <div className="w-full max-w-[400px]"><CyberHiveMarquee /></div>
            </div>

            {/* Teks Area (Kiri) */}
            <div className="flex flex-col items-center lg:items-start space-y-6 w-full order-2 lg:order-1 pt-4 lg:pt-0">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 rounded-full text-[8px] lg:text-[9px] font-black tracking-[0.4em] uppercase backdrop-blur-md">SECURE PROTOCOL ACTIVE</div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] uppercase text-center lg:text-left">KESIAPAN SIBER <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 animate-gradient-x">SEKOLAH 2026.</span></h2>
              <p className="text-sm lg:text-base font-medium text-slate-400 opacity-70 max-w-lg text-center lg:text-left leading-relaxed">Platform kesiapan digital sekolah yang mengintegrasikan keamanan tingkat tinggi dengan infrastruktur modern.</p>
              <button onClick={() => setIsLoginOpen(true)} className="px-10 py-4 bg-white text-black rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase shadow-xl hover:bg-cyan-400 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95">MULAI EVALUASI <ArrowRight size={16} /></button>
            </div>

          </div>
        </section>

        <section id="pilar" className="relative w-full min-h-[85vh] flex flex-col items-center justify-center py-20 bg-[#030208] border-b border-white/5 overflow-hidden">
     <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-900/10 via-transparent to-transparent blur-[100px] pointer-events-none" />
     
     {/* Kontainer Padat 1280px (max-w-7xl) */}
     <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10 w-full text-center">
       <div className="mb-16 lg:mb-20">
         <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4">
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 animate-gradient-x">Pilar Strategis</span> Kami
         </h2>
         <p className="text-slate-500 max-w-xl mx-auto text-xs lg:text-sm font-medium opacity-80 leading-relaxed">
           Tiga pilar utama dalam membangun fondasi keamanan siber yang kokoh untuk ekosistem pendidikan masa depan.
         </p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
         {[
           { t: "Infrastruktur", i: Server, c: "text-cyan-400", d: "Arsitektur jaringan sekolah yang terpusat, tangguh, dan tahan terhadap gangguan siber." },
           { t: "Keamanan", i: ShieldAlert, c: "text-fuchsia-400", d: "Protokol enkripsi berlapis dan pemantauan aktif untuk mendeteksi ancaman secara instan." },
           { t: "Literasi", i: BrainCircuit, c: "text-emerald-400", d: "Meningkatkan kesadaran digital seluruh personel sekolah untuk menjaga kedaulatan data." }
         ].map((item, i) => (
           <motion.div key={i} className="group relative bg-[#08070d]/60 backdrop-blur-2xl border border-white/5 p-10 rounded-[2.5rem] hover:border-cyan-500/20 transition-all duration-700 hover:-translate-y-2 shadow-2xl flex flex-col items-center">
             <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/10 group-hover:border-cyan-500/40 transition-colors" />
             <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/10 group-hover:border-cyan-500/40 transition-colors" />
             <div className="w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:shadow-cyan-500/5 transition-all">
               <item.i size={30} className={`${item.c} drop-shadow-[0_0_8px_currentColor]`} />
             </div>
             <h3 className="text-lg lg:text-xl font-black text-white mb-3 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">{item.t}</h3>
             <p className="text-[11px] lg:text-xs text-slate-400 leading-relaxed font-medium opacity-80">{item.d}</p>
             <div className="mt-8 pt-4 border-t border-white/5 w-full flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[7px] font-mono tracking-widest text-slate-500 uppercase">System Ready</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             </div>
           </motion.div>
         ))}
       </div>
     </div>
  </section>

        <SectionDivider /><VisiMisiSection bgIdx={bgIdx} />
        <SectionDivider /><SecurityStatsSection />
        <SectionDivider /><CyberInfrastructureSection />
        <SectionDivider /><ReadinessProtocolSection />
        <SectionDivider /><CyberClosingSection />
        <CyberFooterLuxury onScroll={scrollToSection} />
      </main>

{/* --- MODAL TENTANG KAMI (REVISI TOTAL: DEWA VERSION) --- */}
<CyberModal 
        isOpen={activeModal === 'TENTANG KAMI'} 
        onClose={() => { setActiveModal(null); setInspectedArchitect(null); }} 
        title="COMMAND CENTRE TENTANG KAMI"
      >
        <div className="space-y-12 text-left">
          
          {/* --- PENJELASAN MENDALAM PLATFORM --- */}
          <div className="relative p-8 lg:p-12 rounded-[3rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 border border-white/10 overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-1000 rotate-12">
              <ShieldCheck size={200} />
            </div>
            
            <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-4 mb-2">
                  <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-400 to-fuchsia-500 rounded-full shadow-[0_0_15px_#22d3ee]" />
                  <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter">
                    Mengenal Platform <span className="text-cyan-400">Cyber Readiness</span>
                  </h3>
               </div>

               <div className="space-y-6 text-slate-300 text-sm lg:text-base leading-relaxed font-medium">
                  <p>
                    <span className="text-cyan-400 font-bold">Cyber Readiness</span> adalah platform keamanan siber komprehensif yang dirancang khusus untuk memperkuat ekosistem digital di lingkungan pendidikan sekolah menengah. Platform ini hadir sebagai solusi cerdas atas pesatnya transformasi digital di dunia pendidikan yang seringkali tidak dibarengi dengan sistem perlindungan data yang mumpuni, membuat sekolah rentan terhadap eksploitasi pihak luar.
                  </p>
                  
                  <p>
                    Platform ini dikembangkan karena adanya kesadaran akan meningkatnya ancaman serangan siber global seperti pencurian identitas, peretasan database akademik, serta serangan ransomware yang dapat melumpuhkan seluruh kegiatan belajar mengajar. Kami melihat bahwa sekolah menyimpan aset yang sangat berharga yaitu data generasi masa depan, dan aset tersebut harus dilindungi dengan standar keamanan setara industri militer.
                  </p>

                  <p>
                    Tujuan utama kami adalah membangun kedaulatan digital sekolah yang mandiri, tangguh, dan tak tertembus. Kami berkomitmen untuk memastikan bahwa setiap data pribadi siswa, guru, dan staf tersimpan dalam lingkungan terenkripsi tingkat tinggi. Selain menyediakan alat pemantauan infrastruktur secara real time, platform ini juga berfungsi sebagai pusat edukasi untuk menanamkan budaya kewaspadaan digital bagi seluruh warga sekolah demi terciptanya lingkungan belajar yang cerdas, aman, dan terlindungi.
                  </p>
               </div>
            </div>
          </div>

          {/* --- TIM PENGEMBANG (THE ARCHITECT TRIO) --- */}
          <div className="space-y-10">
            <div className="flex items-center gap-6 justify-center">
               <div className="h-px w-full max-w-[150px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
               <span className="text-[10px] font-black tracking-[0.8em] text-fuchsia-500 uppercase whitespace-nowrap">Authorized Personnel</span>
               <div className="h-px w-full max-w-[150px] bg-gradient-to-l from-transparent via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  id: "001", 
                  name: "Ester Sinaga", 
                  role: "Project Manager", 
                  image: "/bg/ester.jpeg", 
                  bio: "Lead Project Manager. Bertanggung jawab atas manajemen strategis, koordinasi sumber daya, dan memastikan setiap protokol operasional berjalan sesuai standar keamanan tertinggi.", 
                  col: "fuchsia", 
                  details: { 
                    "Nama Lengkap": "Ester Satia Sinaga",
                    "NIK": "1201036906060001",
                    "NISN": "0069362666",
                    "Lahir": "Sibolga, 29 Jun 2006",
                    "Gol Darah": "Tipe O",
                    "Email": "estersinaga2906@gmail.com"
                  } 
                },
                { 
                  id: "002", 
                  name: "Devin Siahaan", 
                  role: "Web Developer", 
                  image: "/bg/devin.jpeg", // Path ke foto Devin
                  bio: "Lead Developer dan Arsitek Infrastruktur. Spesialis dalam pengembangan sistem enkripsi database dan integrasi kontrol panel siber.", 
                  col: "cyan", 
                  details: { 
                    "Nama Lengkap": "Devin Edwin Frederico Siahaan",
                    "NISN": "9015005904",
                    "Asal": "Medan, 17 Nov 2005",
                    "Gol Darah": "Tipe O",
                    "Email": "devin1711edwin@gmail.com"
                  } 
                },
                { 
                  id: "003", 
                  name: "Iren Sitinjak", 
                  role: "Intelligence Architect", 
                  image: "/bg/iren.jpeg", // Path ke foto Iren
                  bio: "Ahli dalam analisis data intelijen dan perancangan antarmuka pengguna untuk memastikan pengalaman navigasi yang intuitif dan aman.", 
                  col: "violet", 
                  details: { "ID Personel": "IRN 7712", "Status": "Chief Analyst", "Sektor": "User Intelligence" } 
                }
              ].map((member, i) => (
                <motion.div 
                  key={i}
                  layout
                  onClick={() => setInspectedArchitect(inspectedArchitect === member.id ? null : member.id)}
                  className={`group relative cursor-pointer p-1 rounded-[2.5rem] transition-all duration-500 ${inspectedArchitect === member.id ? 'ring-2 ring-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'hover:scale-105'}`}
                >
                  <div className="relative bg-[#08070d] border border-white/5 p-8 rounded-[2.5rem] h-full flex flex-col items-center text-center overflow-hidden shadow-inner">
                    
                    {/* HOLOGRAPHIC AVATAR ENGINE */}
                    <div className="relative w-28 h-28 mb-6">
                      <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${member.col === 'cyan' ? 'bg-cyan-400' : member.col === 'fuchsia' ? 'bg-fuchsia-400' : 'bg-violet-400'}`} />
                      <div className="relative w-full h-full rounded-full border-2 border-white/10 p-1 bg-black/50 overflow-hidden flex items-center justify-center">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 brightness-90 group-hover:brightness-110 transition-all duration-700 scale-[1.4] group-hover:scale-[1.2]" 
                            alt={member.name}
                          />
                        ) : (
                          <User size={40} className={member.col === 'cyan' ? 'text-cyan-400' : member.col === 'fuchsia' ? 'text-fuchsia-400' : 'text-violet-400'} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-6 w-full animate-scanner pointer-events-none" />
                      </div>
                      <div className={`absolute inset-[-8px] rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite] ${member.col === 'cyan' ? 'group-hover:border-cyan-500/50' : member.col === 'fuchsia' ? 'group-hover:border-fuchsia-500/50' : 'group-hover:border-violet-500/50'}`} />
                    </div>

                    <h4 className="text-xl font-black text-white uppercase tracking-widest">{member.name}</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-1 ${member.col === 'cyan' ? 'text-cyan-400' : member.col === 'fuchsia' ? 'text-fuchsia-400' : 'text-violet-400'}`}>{member.role}</p>

                    <AnimatePresence>
                      {inspectedArchitect === member.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-6 pt-6 border-t border-white/10 w-full text-left">
                          <p className="text-[11px] text-slate-400 leading-relaxed font-medium mb-6 italic">"{member.bio}"</p>
                          <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/5 font-mono text-[9px]">
                             {Object.entries(member.details).map(([key, val], idx) => (
                               <div key={idx} className="flex justify-between border-b border-white/5 pb-2">
                                  <span className="text-slate-500 uppercase">{key}:</span>
                                  <span className="text-white font-bold">{val}</span>
                               </div>
                             ))}
                          </div>
                          <div className="mt-6 flex justify-between items-center px-1">
                             <span className="text-[8px] font-black text-emerald-500 tracking-widest uppercase">Verified Personnel</span>
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- FOOTER MODAL --- */}
          <div className="pt-10 border-t border-white/5 flex flex-col items-center gap-6 text-center">
             <p className="text-[9px] font-mono text-slate-600 tracking-[0.5em] uppercase">Protokol Keamanan Platform Transmisi Data Terenkripsi</p>
             <div className="flex gap-8">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <Icon key={i} size={18} className="text-slate-700 hover:text-cyan-400 transition-all cursor-pointer hover:scale-125" />
                ))}
             </div>
          </div>
        </div>
      </CyberModal>

{/* --- MODAL LAYANAN (REVISI FINAL: FUNCTIONAL & DEWA VISUAL) --- */}
<CyberModal 
        isOpen={activeModal === 'LAYANAN'} 
        onClose={() => setActiveModal(null)} 
        title="PLATFORM STRATEGIC CAPABILITIES"
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch py-4">
          
          {/* --- SISI KIRI: THE CORE ENGINE (DENGAN LAYANANCYBER.JPG) --- */}
          <div className="w-full lg:w-1/2 relative min-h-[350px] lg:min-h-[550px] bg-black border border-white/10 rounded-[4rem] flex items-center justify-center overflow-hidden shadow-2xl group">
             
             {/* GAMBAR UTAMA DENGAN FILTER SIBER */}
             <div className="absolute inset-0 z-0">
                <img 
                  src="/bg/layanancyber.jpg" 
                  className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[3s] mix-blend-lighten"
                  alt="Cyber Infrastructure"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000000_100%)]" />
             </div>

             {/* HUD LAYER DI ATAS GAMBAR */}
             <div className="relative z-10">
                {/* Ring Orbit Raksasa */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 border border-cyan-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 lg:w-72 lg:h-72 border border-dashed border-fuchsia-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                
                {/* Central Reactive Icon */}
                <motion.div 
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative w-28 h-28 lg:w-36 lg:h-36 bg-black/60 backdrop-blur-xl border-2 border-cyan-400/50 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.4)] z-20"
                >
                   <Cpu size={50} className="text-cyan-400 drop-shadow-[0_0_15px_#22d3ee] animate-pulse" />
                   {/* Scanner Line Internal */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/40 animate-scanner pointer-events-none" />
                </motion.div>
             </div>

             {/* Animated Badge */}
             <div className="absolute top-10 left-10 flex items-center gap-3 px-4 py-2 bg-black/50 border border-white/10 rounded-full backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[8px] font-mono text-emerald-400 tracking-[0.4em] uppercase">Core Sync Stable</span>
             </div>
          </div>

          {/* --- SISI KANAN: THE CAPABILITY LIST (FUNCTIONAL LINKS) --- */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between py-2 space-y-8">
            <div className="space-y-4 text-left px-4">
              <h3 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                MODUL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">OPERASI</span>
              </h3>
              <p className="text-slate-400 text-sm lg:text-base font-medium leading-relaxed max-w-lg opacity-80">
                Akses pusat komando pertahanan siber sekolah. Pilih modul di bawah untuk memulai validasi keamanan infrastruktur.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { t: "Assessment Center", i: Target, d: "Inisiasi simulasi kuesioner keamanan.", id: "protocol", col: "text-cyan-400" },
                { t: "Intelligence Hub", i: BrainCircuit, d: "Pusat edukasi ancaman siber terbaru.", id: "hero", col: "text-fuchsia-400" },
                { t: "Credential Guard", i: ShieldCheck, d: "Audit identitas digital warga sekolah.", id: "hero", col: "text-blue-400" },
                { t: "Infrastructure Monitor", i: Server, d: "Visualisasi stabilitas jaringan real-time.", id: "infra", col: "text-emerald-400" },
                { t: "Incident Response", i: ShieldAlert, d: "Protokol mitigasi anomali trafik siber.", id: "protocol", col: "text-rose-400" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveModal(null); // TUTUP MODAL
                    setTimeout(() => scrollToSection(item.id, item.t), 300); // JALANKAN SCROLL KE SECTION TERKAIT
                  }}
                  className="group flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-cyan-500/10 hover:border-cyan-400/40 transition-all duration-500 cursor-pointer shadow-lg"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] ${item.col}`}>
                    <item.i size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm lg:text-base font-black text-white uppercase tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">{item.t}</h4>
                    <p className="text-[10px] lg:text-[11px] text-slate-500 font-medium group-hover:text-slate-300 transition-colors">{item.d}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronRight size={16} className="text-cyan-400" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 px-4">
               <p className="text-[9px] font-mono text-slate-700 tracking-[0.5em] uppercase text-center lg:text-left">
                 Platform Operational Security Interface // 2026
               </p>
            </div>
          </div>

        </div>
      </CyberModal>

{/* --- ULTRA-SMOOTH HOLOGRAPHIC PORTAL (DEWA VERSION) --- */}
<AnimatePresence>
        {isLoginOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              layout // Kunci untuk animasi perubahan ukuran kontainer yang smooth
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-sm bg-[#0a0a0f]/80 border border-white/10 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(217,70,239,0.1)] overflow-hidden"
            >
              {/* Top Scanner Line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_15px_#d946ef]" />

              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-6 right-6 p-2 bg-white/5 text-slate-400 rounded-full hover:bg-white/10 hover:text-white transition-all z-50"
              >
                <X size={18} />
              </button>

              <div className="mx-auto w-14 h-14 bg-fuchsia-600/10 border border-fuchsia-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
                <ShieldCheck className="text-fuchsia-400" size={28} />
              </div>

              <div className="mb-8 text-center">
                <h2 className="text-2xl font-black text-white tracking-[0.2em] uppercase">
                  PORTAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-violet-500 animate-gradient-x">AKSES</span>
                </h2>
                <p className="text-[9px] font-bold text-slate-500 tracking-[0.4em] uppercase mt-1">Otentikasi Identitas Jaringan</p>
              </div>

              {/* TABS DENGAN ANIMASI GESER HALUS */}
              <div className="flex border-b border-white/5 mb-8 relative">
                <button 
                  type="button" 
                  onClick={() => { setActiveTab('LOGIN'); setErrorMessage(''); }} 
                  className={`flex-1 pb-3 text-[10px] font-black tracking-widest transition-colors z-10 ${activeTab === 'LOGIN' ? 'text-fuchsia-400' : 'text-slate-600'}`}
                >
                  MASUK
                </button>
                <button 
                  type="button" 
                  onClick={() => { setActiveTab('REGISTER'); setErrorMessage(''); }} 
                  className={`flex-1 pb-3 text-[10px] font-black tracking-widest transition-colors z-10 ${activeTab === 'REGISTER' ? 'text-fuchsia-400' : 'text-slate-600'}`}
                >
                  DAFTAR
                </button>
                {/* Indikator geser (Shared Layout) */}
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 h-[2px] w-1/2 bg-fuchsia-500 shadow-[0_0_10px_#d946ef]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ left: activeTab === 'LOGIN' ? '0%' : '50%' }}
                />
              </div>

              <form onSubmit={handleAuthenticate} className="space-y-5">
                {/* Field yang selalu ada (Username & Password) */}
                <div className="space-y-4">
                  <div className="relative group">
                    <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="NAMA PENGGUNA" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-xs text-white outline-none focus:border-cyan-500/50 transition-all" 
                    />
                  </div>
                  <div className="relative group">
                    <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" />
                    <input 
                      type="password" 
                      placeholder="KATA SANDI" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-xs text-white outline-none focus:border-fuchsia-500/50 transition-all" 
                    />
                  </div>
                </div>

                {/* ANIMASI PEMUNCULAN FIELD REGISTER (SANGAT SMOOTH) */}
                <AnimatePresence initial={false}>
                  {activeTab === 'REGISTER' && (
                    <motion.div 
                      key="register-fields"
                      initial={{ height: 0, opacity: 0, y: -10 }} 
                      animate={{ height: 'auto', opacity: 1, y: 0 }} 
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="overflow-hidden space-y-4"
                    >
                      <div className="relative group">
                        <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
                        <input type="text" placeholder="ASAL / KOTA" value={asal} onChange={(e) => setAsal(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[10px] text-white outline-none focus:border-cyan-500/30" />
                      </div>
                      <div className="relative group">
                        <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
                        <input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} style={{ colorScheme: 'dark' }} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[10px] text-white outline-none focus:border-cyan-500/30" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {status === 'error' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold">
                    <AlertTriangle size={14} /> {errorMessage}
                  </motion.div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className={`w-full py-4 rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 ${status === 'success' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-fuchsia-500/20'}`}
                >
                   {status === 'loading' ? 'MENYINKRONKAN...' : status === 'success' ? 'BERHASIL' : 'OTENTIKASI SISTEM'} 
                   <Zap size={14} className={status === 'loading' ? 'animate-spin' : ''} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-x { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 5s ease infinite; }
        @keyframes scanner { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scanner { animation: scanner 3s linear infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#22d3ee, #d946ef); border-radius: 10px; }
        ::-webkit-scrollbar-track { background: #020108; }

        @keyframes scanner { 
          0% { top: -10%; opacity: 0; } 
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; } 
        }
        .animate-scanner { 
          position: absolute;
          animation: scanner 3s cubic-bezier(0.4, 0, 0.2, 1) infinite; 
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.5) drop-shadow(0 0 10px #22d3ee); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .bg-grid-static { 
          background-image: 
            linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px); 
          background-size: 60px 60px; 
        }

        .scanline-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.1) 50%
          );
          background-size: 100% 4px;
          z-index: 9998;
          pointer-events: none;
          opacity: 0.3;
        }

        ::-webkit-scrollbar { 
          width: 5px; 
        }
        ::-webkit-scrollbar-track { 
          background: #020108; 
        }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(to bottom, #22d3ee, #d946ef); 
          border-radius: 20px; 
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #22d3ee;
        }

        ::selection { 
          background: rgba(34, 211, 238, 0.3); 
          color: #ffffff; 
        }

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px #050505 inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #22d3ee;
          border-radius: 10px;
        }

        .perspective-2000 {
          perspective: 2000px;
        }
      `}} />

    </div>
  );
} 