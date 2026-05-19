"use client"
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, LogOut, ShieldAlert, Activity, 
  RefreshCcw, Search, LayoutDashboard, 
  Brain, Bug, MailWarning, 
  MessageSquare, Send, X, Hexagon, Sparkles, GraduationCap, Terminal,
  ChevronLeft, ChevronRight, Trash2, Database, Radar, Target, Lightbulb, User, Eye, Info
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid,
  PieChart, Pie
} from 'recharts'

// --- ASSET GALAXY HD ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// =========================================================================
// AUTO-GENERATOR DATA 50 SISWA (DIHAPUS LOGIKANYA TAPI FUNGSI TETAP ADA AGAR TIDAK BREAK)
// =========================================================================
const generateDummyReports = () => {
  return []; // Mengembalikan array kosong agar tidak ada CE325 yang muncul
};

// --- 1. CLICK EFFECT ---
const ParticleBurstClickEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const handleInteraction = (e: any) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      const numParticles = 12; 
      const newParticles = Array.from({ length: numParticles }).map(() => {
        const angle = Math.random() * Math.PI * 2; 
        const velocity = Math.random() * 60 + 20;  
        const size = Math.random() * 6 + 3;       
        return { id: Math.random(), x, y, dx: Math.cos(angle) * velocity, dy: Math.sin(angle) * velocity, size };
      });

      setParticles((prev) => [...prev, ...newParticles]);
      setTimeout(() => setParticles((p) => p.filter((x) => !newParticles.find((n) => n.id === x.id))), 800);
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  },[]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ top: p.y - p.size / 2, left: p.x - p.size / 2, scale: 0, opacity: 1 }}
            animate={{ top: p.y - p.size / 2 + p.dy, left: p.x - p.size / 2 + p.dx, scale: [0, 1, 0.2], opacity:[1, 0.8, 0] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1),0_0_30px_rgba(217,70,239,0.8)] blur-[1px]"
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. BACKGROUND ENGINE MEGAH ---
const CosmicEngine = React.memo(({ bgIdx }: { bgIdx: number }) => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    setStars([...Array(70)].map((_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 + 0.5, duration: Math.random() * 4 + 2
    })));
  }, []);
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-[#020108]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[90vw] h-[80vh] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_70%)] opacity-80 blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.1),transparent_60%)] opacity-50 blur-3xl mix-blend-screen" />
      
      <AnimatePresence mode="wait">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 0.15, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 5, ease: "easeInOut" }} className="absolute inset-0 w-full h-full object-cover mix-blend-screen" />
      </AnimatePresence>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      {stars.map((s) => (
        <motion.div key={s.id} animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }} transition={{ duration: s.duration, repeat: Infinity }} className="absolute bg-fuchsia-100 rounded-full shadow-[0_0_12px_#d946ef]" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }} />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020108_100%)]" />
    </div>
  );
});
CosmicEngine.displayName = 'CosmicEngine';

// --- HELPER: STATUS COLORS ---
const getScoreData = (score: number | null) => {
  if (score === null || score === undefined || isNaN(score)) return { color: "#475569", bg: "bg-slate-800", text: "text-slate-500", glow: "shadow-[0_0_0px_transparent]", label: "NO DATA", border: "border-slate-700/30" };
  if (score >= 80) return { color: "#10b981", bg: "bg-emerald-500", text: "text-emerald-400", glow: "shadow-[0_0_25px_rgba(16,185,129,0.5)]", label: "READY", border: "border-emerald-500/50" };
  if (score >= 50) return { color: "#eab308", bg: "bg-yellow-500", text: "text-yellow-400", glow: "shadow-[0_0_25px_rgba(234,179,8,0.5)]", label: "CAUTION", border: "border-yellow-500/50" };
  return { color: "#ef4444", bg: "bg-red-500", text: "text-red-400", glow: "shadow-[0_0_25px_rgba(239,68,68,0.5)]", label: "DANGER", border: "border-red-500/50" };
};

// FIX TYPE ERROR: Menggunakan 'as any' agar Vercel tidak error saat compile
const portalTransition = { initial: { opacity: 0, scale: 0.98, y: 15 }, animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring", bounce: 0.2 } }, exit: { opacity: 0, scale: 1.02 } };

export default function DashboardGuruZenith() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // States Utama
  const [view, setView] = useState<'dashboard'>('dashboard'); 
  const [reports, setReports] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [bgIdx, setBgIdx] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState({ username: 'INSTRUCTOR' });
  
  // Interaction States
  const [activeClass, setActiveClass] = useState("ALL CLASSES"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackModal, setFeedbackModal] = useState<any>(null); 
  const [feedbackText, setFeedbackText] = useState("");
  const [appFeedbackModal, setAppFeedbackModal] = useState(false);
  const [appFeedbackForm, setAppFeedbackForm] = useState({ category: 'FEATURE SUGGESTION', message: '' });
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  // =========================================================================
  // DATA ENGINE (DIAMBIL DARI DATABASE ASLI - DUMMY DIMATIKAN)
  // =========================================================================
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://cyber-backend-delta.vercel.app/guru/reports');
      const rawData = await res.json();
      const dataArray = Array.isArray(rawData) ? rawData : (rawData.data || rawData.reports || []);

      if (dataArray.length > 0) {
        const studentMap: Record<string, any> = {};
        dataArray.forEach((item: any, i: number) => {
          const keys = Object.keys(item);
          const idKey = keys.find(k => /^(id|_id|id_report|id_log|log_id|id_nilai)$/i.test(k));
          const unameKey = keys.find(k => /name|user|siswa|id_siswa/i.test(k));
          const classKey = keys.find(k => /class|kelas|rombel/i.test(k));
          const scoreKey = keys.find(k => /score|nilai|poin/i.test(k));
          const domainKey = keys.find(k => /domain|kategori|tipe/i.test(k));

          const actualId = idKey ? item[idKey] : null;
          const uname = unameKey ? String(item[unameKey]) : `STUDENT_${i}`;
          const className = (classKey && item[classKey]) ? String(item[classKey]).toUpperCase() : "UNASSIGNED";
          const score = scoreKey ? Number(item[scoreKey]) : 0;
          const dom = domainKey ? String(item[domainKey]).toLowerCase() : 'social engineering';

          if (!studentMap[uname]) {
             studentMap[uname] = { username: uname, class_name: className, scores: { social: null, malware: null, phish: null }, attempts: { social: 0, malware: 0, phish: 0 }, totalScore: 0, testCount: 0, history:[] };
          }

          let parsedDomain = "UNKNOWN DOMAIN";
          if (dom.includes('soc') || dom.includes('eng')) parsedDomain = "SOCIAL ENGINEERING";
          else if (dom.includes('mal')) parsedDomain = "MALWARE ANALYSIS";
          else if (dom.includes('phis')) parsedDomain = "PHISHING DEFENSE";

          studentMap[uname].history.push({ ...item, dbId: actualId, parsedDomain, parsedScore: isNaN(score) ? 0 : score });
          
          if (!isNaN(score)) {
             if (parsedDomain === "SOCIAL ENGINEERING") { studentMap[uname].scores.social = score; studentMap[uname].attempts.social += 1; }
             else if (parsedDomain === "MALWARE ANALYSIS") { studentMap[uname].scores.malware = score; studentMap[uname].attempts.malware += 1; }
             else if (parsedDomain === "PHISHING DEFENSE") { studentMap[uname].scores.phish = score; studentMap[uname].attempts.phish += 1; }
             
             studentMap[uname].totalScore += score;
             studentMap[uname].testCount += 1;
          }
        });
        const formattedReports = Object.values(studentMap).map((s: any) => ({ ...s, avgScore: s.testCount > 0 ? Math.round(s.totalScore / s.testCount) : 0 }));
        setReports(formattedReports);
      } else {
        setReports([]); // Tampilkan kosong jika database kosong
      }

    } catch (e) { 
      console.warn("Backend API tidak merespons, database kosong.");
      setReports([]); 
    } 
    finally { setLoading(false); }
  };

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.role !== 'guru' && parsed.role !== 'admin') router.push('/siswa');
      setUser(parsed);
    }
    fetchData();
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 10000);
    return () => clearInterval(interval);
  }, [router]);

  const handleDeleteLog = async (logId: string | number) => {
    if (!logId) return;
    if (!window.confirm("SYSTEM WARNING: Hapus log audit ini permanen?")) return;
    try {
      const res = await fetch(`https://cyber-backend-delta.vercel.app/guru/delete-log/${logId}`, { method: 'DELETE' });
      if (res.ok) { alert("Record deleted."); setFeedbackModal(null); fetchData(); } 
    } catch (error) { alert("API Offline."); }
  };

  const submitStudentFeedback = () => {
    if(!feedbackText) return;
    alert(`Feedback sent to student: ${feedbackModal.username}`);
    setFeedbackModal(null); setFeedbackText("");
  };

  const submitAppFeedback = async () => {
    if(!appFeedbackForm.message.trim()) return;
    setIsSendingFeedback(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/7877d067ab806b68d3ae1ab4eb99ed6c", {
        method: "POST", headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ Pengirim: user.username, Kategori: appFeedbackForm.category, Pesan: appFeedbackForm.message })
      });
      if (response.ok) { alert(`Feedback Submitted!`); setAppFeedbackModal(false); setAppFeedbackForm({ category: 'FEATURE SUGGESTION', message: '' }); } 
    } catch (error) { alert("Failed to send."); } 
    finally { setIsSendingFeedback(false); }
  };

  // ANALYTICS CALCULATIONS
  const filteredReports = useMemo(() => {
    let result = reports;
    if (activeClass !== "ALL CLASSES") result = result.filter(r => r.class_name === activeClass);
    if (searchQuery) result = result.filter(r => String(r.username || "").toLowerCase().includes(searchQuery.toLowerCase()));
    return result;
  }, [reports, activeClass, searchQuery]);

  const participationStats = useMemo(() => {
    const total = filteredReports.length;
    const active = filteredReports.filter(r => r.testCount > 0).length;
    const percentage = total === 0 ? 0 : Math.round((active / total) * 100);
    return { total, active, percentage };
  }, [filteredReports]);

  const readinessDistribution = useMemo(() => {
    let ready = 0, caution = 0, danger = 0;
    filteredReports.forEach(r => {
      if(r.testCount === 0) return;
      if (r.avgScore >= 80) ready++;
      else if (r.avgScore >= 50) caution++;
      else danger++;
    });
    if(ready === 0 && caution === 0 && danger === 0) return[{ name: 'NO DATA', value: 1, color: '#1e293b' }];
    return[{ name: 'READY', value: ready, color: '#10b981' }, { name: 'CAUTION', value: caution, color: '#eab308' }, { name: 'DANGER', value: danger, color: '#ef4444' }].filter(d => d.value > 0);
  }, [filteredReports]);

  const domainAverages = useMemo(() => {
    if (filteredReports.length === 0) return[{ domain: 'SOC. ENG', score: 0, color: '#d946ef' }, { domain: 'MALWARE', score: 0, color: '#ef4444' }, { domain: 'PHISHING', score: 0, color: '#3b82f6' }];
    let s=0, m=0, p=0, sc=0, mc=0, pc=0;
    filteredReports.forEach(r => {
      if (r.scores.social !== null) { s += r.scores.social; sc++; }
      if (r.scores.malware !== null) { m += r.scores.malware; mc++; }
      if (r.scores.phish !== null) { p += r.scores.phish; pc++; }
    });
    return[{ domain: 'SOC. ENG', score: sc?Math.round(s/sc):0, color: '#d946ef' }, { domain: 'MALWARE', score: mc?Math.round(m/mc):0, color: '#ef4444' }, { domain: 'PHISHING', score: pc?Math.round(p/pc):0, color: '#3b82f6' }];
  }, [filteredReports]);

  const dynamicClasses = useMemo(() => ["ALL CLASSES", ...Array.from(new Set(reports.map(r => r.class_name))).sort()], [reports]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "GOOD MORNING";
    if (hour < 18) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  };

  return (
    <div className="flex h-screen w-full bg-[#020108] text-slate-200 overflow-hidden font-sans selection:bg-fuchsia-500/30 text-sm">
      <CosmicEngine bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      {/* MODAL STUDENT EVALUATION */}
      <AnimatePresence>
        {feedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative w-full max-w-4xl bg-[#0a0a0f]/95 border border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden backdrop-blur-xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 via-indigo-500 to-blue-500" />
               <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white"><User size={32} /></div>
                     <div><h2 className="text-3xl font-black text-white uppercase">{feedbackModal.username}</h2><p className="text-xs font-semibold text-slate-400 uppercase mt-1">{feedbackModal.class_name} • {feedbackModal.testCount} ATTEMPTS</p></div>
                  </div>
                  <button onClick={() => setFeedbackModal(null)} className="p-2.5 bg-white/5 rounded-full hover:bg-red-500/20 text-slate-400"><X size={20} /></button>
               </div>
               <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10 space-y-6">
                 <div className="grid grid-cols-3 gap-4">
                    {[
                      { l: 'SOC. ENG', s: feedbackModal.scores.social, a: feedbackModal.attempts.social, c: '#d946ef' },
                      { l: 'MALWARE', s: feedbackModal.scores.malware, a: feedbackModal.attempts.malware, c: '#ef4444' },
                      { l: 'PHISHING', s: feedbackModal.scores.phish, a: feedbackModal.attempts.phish, c: '#3b82f6' }
                    ].map((dom, i) => (
                       <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center">
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">{dom.l}</p>
                          <p className={`text-4xl font-black ${getScoreData(dom.s).text}`}>{dom.s ?? '--'}</p>
                          <div className="mt-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">{dom.a} ATTEMPTS</div>
                       </div>
                    ))}
                 </div>
                 <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider mb-3"><Database size={16} /> AUDIT LOGS</h3>
                    {feedbackModal.history.map((log: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl">
                          <div className="flex flex-col"><p className="text-xs font-bold text-white uppercase">AUDIT {i+1}</p><p className="text-[10px] text-slate-500 uppercase mt-1">{log.parsedDomain} | SCORE: <span className={getScoreData(log.parsedScore).text}>{log.parsedScore}</span></p></div>
                          <button onClick={() => handleDeleteLog(log.dbId)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={16} /></button>
                        </div>
                    ))}
                 </div>
                 <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider"><MessageSquare size={16} /> FEEDBACK</label>
                    <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Enter guidance..." className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-fuchsia-500 outline-none text-sm resize-none" />
                 </div>
               </div>
               <div className="pt-6 shrink-0 relative z-10">
                  <button onClick={submitStudentFeedback} className="w-full py-4 bg-white text-black hover:bg-fuchsia-500 hover:text-white rounded-2xl font-black text-sm tracking-widest uppercase transition-all">SEND FEEDBACK <Send size={16} /></button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.aside animate={{ width: isSidebarCollapsed ? 80 : 280 }} className="h-screen bg-[#05050A]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col z-[100] shadow-2xl">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-fuchsia-600 flex items-center justify-center shadow-lg"><LayoutDashboard size={20} className="text-white" /></div><span className="font-black text-white uppercase tracking-widest">INSTRUCTOR</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 mx-auto">{isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-3">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center p-4 rounded-xl transition-all gap-4 ${view === 'dashboard' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Activity size={22} />{!isSidebarCollapsed && <span className="font-bold text-xs tracking-widest uppercase">MAIN DASHBOARD</span>}</button>
          <button onClick={() => setAppFeedbackModal(true)} className="w-full flex items-center p-4 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all gap-4"><Lightbulb size={22} />{!isSidebarCollapsed && <span className="font-bold text-xs tracking-widest uppercase">APP FEEDBACK</span>}</button>
        </nav>
        <div className="p-6 border-t border-white/5"><button onClick={() => { localStorage.removeItem('user'); router.push('/'); }} className="w-full flex items-center justify-center p-3.5 bg-red-500/10 text-red-400 rounded-xl gap-3 font-bold text-xs tracking-widest uppercase"><LogOut size={18} /> {!isSidebarCollapsed && "LOGOUT"}</button></div>
      </motion.aside>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-black/20 backdrop-blur-md">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" /><span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">SYSTEM ONLINE</span></div>
            <div className="flex items-center gap-5"><div className="text-right hidden sm:block"><p className="text-xs font-bold text-white uppercase">{user.username}</p><p className="text-[10px] font-semibold text-fuchsia-400 uppercase">MASTER ACCESS</p></div><div className="w-11 h-11 bg-fuchsia-600 rounded-full flex items-center justify-center border border-white/10"><User size={20} /></div></div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-8 lg:px-12 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div key="analytics" {...portalTransition} className="max-w-[1400px] w-full mx-auto space-y-10 pb-20">
                
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                  <div><div className="text-fuchsia-400 font-bold text-[11px] tracking-widest mb-2 uppercase flex items-center gap-2"><Hexagon size={14} className="animate-spin-slow" /> FLEET MONITORING</div><h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">{getGreeting()}, <span className="text-fuchsia-500">{user.username}</span>.</h1><p className="text-slate-400 mt-2 font-medium text-sm">Comprehensive real-time overview from the secure Aiven Cloud databanks.</p></div>
                  <button onClick={fetchData} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-bold text-xs hover:bg-white hover:text-black transition-all flex items-center gap-3 uppercase shadow-lg"><RefreshCcw size={14} className={loading ? "animate-spin text-fuchsia-400" : ""}/> REFRESH DATA</button>
                </div>

                {/* BENTO GRID STATS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-[minmax(160px,auto)]">
                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 border border-white/10 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between">
                      <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">PARTICIPATION</p>
                      <p className="text-5xl font-black text-white mb-2">{participationStats.percentage}%</p>
                      <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5"><motion.div initial={{ width: 0 }} animate={{ width: `${participationStats.percentage}%` }} transition={{ duration: 1.5 }} className="h-full bg-fuchsia-500 shadow-[0_0_10px_#d946ef]" /></div>
                      <div className="mt-8 bg-white/5 p-4 rounded-xl flex justify-between uppercase text-[10px] font-bold"><span className="text-slate-500">TOTAL OPERATIVES</span><span className="text-white font-mono">{participationStats.total}</span></div>
                   </motion.div>
                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center shadow-xl">
                      <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2 w-full text-left">FLEET STATUS</p>
                      <div className="relative w-full h-[180px]"><ResponsiveContainer><PieChart><Pie data={readinessDistribution} innerRadius={60} outerRadius={75} dataKey="value" stroke="none">{readinessDistribution.map((e, i) => (<Cell key={i} fill={e.color} />))}</Pie></PieChart></ResponsiveContainer><div className="absolute inset-0 flex items-center justify-center text-3xl font-black text-white">{participationStats.active}</div></div>
                      <div className="flex gap-4 mt-2">{readinessDistribution.map((item, idx) => (<div key={idx} className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 5px ${item.color}` }} /><span className="text-[9px] font-bold text-slate-300 uppercase">{item.name}</span></div>))}</div>
                   </motion.div>
                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 border border-white/10 rounded-[2.5rem] p-8 shadow-xl h-[280px]">
                      <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-6">DOMAIN MASTERY</p>
                      <ResponsiveContainer><BarChart data={domainAverages} margin={{ left: -30 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="domain" tick={{ fontSize: 9, fontWeight: 'bold', fill: '#94a3b8' }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize: 9, fill: '#475569' }} domain={[0, 100]} axisLine={false} tickLine={false}/><Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>{domainAverages.map((e, i) => (<Cell key={i} fill={e.color} />))}</Bar></BarChart></ResponsiveContainer>
                   </motion.div>
                </div>

                {/* ROSTER TABLE */}
                <div className="mt-16 space-y-8 pb-20">
                   <div className="flex flex-col xl:flex-row justify-between items-end gap-6 mb-8">
                      <div><h2 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-4">OPERATIVE DOSSIERS <Database className="text-fuchsia-400" size={24} /></h2><p className="text-slate-500 font-bold text-[10px] tracking-[0.2em] uppercase mt-2">Authenticated operatives within the encrypted network.</p></div>
                      <div className="flex gap-4 w-full xl:w-auto">
                         <div className="relative flex-1 xl:w-80"><Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-fuchsia-400" /><input type="text" placeholder="SEARCH ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-black/90 border border-white/10 rounded-full py-4 pl-12 pr-6 text-[10px] font-bold text-white outline-none focus:border-fuchsia-500 transition-all placeholder:text-slate-700" /></div>
                         <select value={activeClass} onChange={(e) => setActiveClass(e.target.value)} className="bg-black/90 border border-white/10 rounded-full px-8 text-[10px] font-bold text-white outline-none cursor-pointer uppercase">{dynamicClasses.map(c => <option key={c} value={c}>{c}</option>)}</select>
                      </div>
                   </div>

                   <div className="flex flex-col gap-5">
                      <AnimatePresence>
                         {filteredReports.map((r, idx) => {
                            const totalStatus = getScoreData(r.avgScore);
                            return (
                               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} key={idx} className="flex items-center justify-between bg-[#07070B]/70 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/5 hover:border-fuchsia-500/20 transition-all group shadow-2xl relative overflow-hidden">
                                  <div className="absolute left-0 top-0 w-1.5 h-full opacity-30" style={{ backgroundColor: totalStatus.color }} />
                                  <div className="flex items-center gap-6"><div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center relative shadow-inner"><User size={24} className="text-slate-500 group-hover:text-white transition-all" /><div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#07070B] ${totalStatus.bg} shadow-[0_0_10px_currentColor]`} style={{ color: totalStatus.color }} /></div><div><p className="font-black text-xl text-white tracking-tight uppercase group-hover:text-fuchsia-400 transition-colors">{r.username}</p><p className="text-[10px] text-slate-500 font-black tracking-widest uppercase mt-1">{r.class_name}</p></div></div>
                                  <div className="flex items-center gap-8">
                                     <div className="hidden lg:grid grid-cols-3 gap-6">
                                        <div className="text-center"><p className="text-[8px] font-bold text-slate-500 uppercase mb-1">SOC. ENG</p><p className="text-lg font-black text-fuchsia-400" style={{textShadow:'0 0 10px #d946ef80'}}>{r.scores.social ?? '--'}</p></div>
                                        <div className="text-center"><p className="text-[8px] font-bold text-slate-500 uppercase mb-1">MALWARE</p><p className="text-lg font-black text-red-500" style={{textShadow:'0 0 10px #ef444480'}}>{r.scores.malware ?? '--'}</p></div>
                                        <div className="text-center"><p className="text-[8px] font-bold text-slate-500 uppercase mb-1">PHISHING</p><p className="text-lg font-black text-blue-500" style={{textShadow:'0 0 10px #3b82f680'}}>{r.scores.phish ?? '--'}</p></div>
                                     </div>
                                     <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-white/5 relative ml-4"><svg className="w-full h-full absolute -rotate-90"><circle cx="50%" cy="50%" r="45%" stroke={totalStatus.color} strokeWidth="3" fill="transparent" strokeDasharray={`${r.avgScore * 2.8} 1000`} className="opacity-80" style={{transition:'stroke-dasharray 1s ease-out'}}/></svg><span className={`text-2xl font-black ${totalStatus.text}`}>{r.avgScore}</span></div>
                                     <button onClick={() => setFeedbackModal(r)} className="px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white text-slate-400 hover:text-black font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3 group/btn"><Eye size={16} className="group-hover/btn:animate-pulse" /> VIEW DOSSIER</button>
                                  </div>
                               </motion.div>
                            )
                         })}
                      </AnimatePresence>
                      {filteredReports.length === 0 && (
                         <div className="p-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-black/40 backdrop-blur-md"><Info size={48} className="mx-auto text-slate-600 mb-6 animate-pulse" /><h3 className="text-2xl font-black text-white uppercase tracking-widest">DATABASE EMPTY</h3><p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-2">NO TESTED OPERATIVES DETECTED IN THE SECURE NETWORK.</p></div>
                      )}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {appFeedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
             <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                <div className="flex justify-between items-start mb-10"><div><h2 className="text-3xl font-black text-white uppercase tracking-tight">SYSTEM FEEDBACK</h2><p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">TRANSMIT SUGGESTIONS TO CORE DEVELOPERS</p></div><button onClick={() => setAppFeedbackModal(false)} className="p-2 bg-white/5 rounded-full text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition-all"><X size={20}/></button></div>
                <div className="space-y-6"><select value={appFeedbackForm.category} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, category: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-[10px] font-black text-white uppercase outline-none focus:border-emerald-500"><option value="FEATURE SUGGESTION">FEATURE SUGGESTION</option><option value="BUG REPORT">BUG REPORT / ERROR</option></select><textarea value={appFeedbackForm.message} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, message: e.target.value})} placeholder="TRANSMISSION CONTENT..." className="w-full h-40 bg-black border border-white/10 rounded-2xl p-4 text-xs font-bold text-white focus:border-emerald-500 outline-none resize-none" /><button onClick={submitAppFeedback} disabled={isSendingFeedback} className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs tracking-[0.3em] uppercase hover:bg-emerald-400 transition-all flex items-center justify-center gap-4">{isSendingFeedback ? "TRANSMITTING..." : "EXECUTE TRANSMISSION"} <Send size={16}/></button></div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        ::-webkit-scrollbar { width: 0px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.3); border-radius: 10px; }
        ::selection { background: #d946ef; color: white; }
        input, select, textarea { caret-color: #d946ef; }
      `}} />
    </div>
  );
}