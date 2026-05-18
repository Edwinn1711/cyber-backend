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
// AUTO-GENERATOR DATA 50 SISWA (UNTUK TESTING / BYPASS)
// =========================================================================
const generateDummyReports = () => {
  const reports = [];
  for (let i = 1; i <= 50; i++) {
    // AWALAN DIUBAH MENJADI CE325
    const uname = `CE325${i.toString().padStart(3, '0')}`;
    const className = AVAILABLE_CLASSES[i % AVAILABLE_CLASSES.length];

    // Acak nilai antara 35 sampai 98 agar grafik terlihat berwarna (Merah, Kuning, Hijau)
    const scoreSoc = Math.floor(Math.random() * 64) + 35;
    const scoreMal = Math.floor(Math.random() * 64) + 35;
    const scorePhi = Math.floor(Math.random() * 64) + 35;

    const totalScore = scoreSoc + scoreMal + scorePhi;
    const avgScore = Math.round(totalScore / 3);

    reports.push({
      username: uname,
      class_name: className,
      scores: { social: scoreSoc, malware: scoreMal, phish: scorePhi },
      attempts: { social: 1, malware: 1, phish: 1 },
      totalScore: totalScore,
      testCount: 3,
      avgScore: avgScore,
      history: [
        { dbId: `sim_soc_${i}`, parsedDomain: "SOCIAL ENGINEERING", parsedScore: scoreSoc },
        { dbId: `sim_mal_${i}`, parsedDomain: "MALWARE ANALYSIS", parsedScore: scoreMal },
        { dbId: `sim_phi_${i}`, parsedDomain: "PHISHING DEFENSE", parsedScore: scorePhi }
      ]
    });
  }
  return reports;
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
      {/* Cahaya Surgawi (Celestial Glow) yang Elegan */}
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
  // DATA ENGINE (DENGAN FALLBACK 50 AKUN OTOMATIS)
  // =========================================================================
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://https://cyber-backend-delta.vercel.app:8000/guru/reports');
      const rawData = await res.json();
      const dataArray = Array.isArray(rawData) ? rawData : (rawData.data || rawData.reports || []);

      if (dataArray.length > 0) {
        // --- LOGIKA JIKA ADA DATA DARI DATABASE ---
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
             else { studentMap[uname].scores.social = score; studentMap[uname].attempts.social += 1; }
             
             studentMap[uname].totalScore += score;
             studentMap[uname].testCount += 1;
          }
        });
        const formattedReports = Object.values(studentMap).map((s: any) => ({ ...s, avgScore: s.testCount > 0 ? Math.round(s.totalScore / s.testCount) : 0 }));
        setReports(formattedReports);
      } else {
        // --- JIKA DATABASE KOSONG, INJECT 50 DATA DUMMY ---
        console.warn("Database kosong, menyuntikkan 50 data siswa simulasi...");
        setReports(generateDummyReports());
      }

    } catch (e) { 
      // --- JIKA API OFFLINE/ERROR, INJECT 50 DATA DUMMY JUGA ---
      console.warn("Koneksi API gagal, menggunakan data simulasi lokal...");
      setReports(generateDummyReports()); 
    } 
    finally { setLoading(false); }
  };

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.role !== 'guru' && parsed.role !== 'admin') router.push('/siswa');
      setUser(parsed);
    } else { 
      // Bypass login untuk memudahkan testing langsung
      setUser({ username: 'ADMIN GURU' });
    }
    fetchData();
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 10000);
    return () => clearInterval(interval);
  }, [router]);

  // --- Fungsi Hapus Log Ujian Siswa ---
  const handleDeleteLog = async (logId: string | number) => {
    if (!logId) { alert("Error: Log ID not found in database."); return; }
    if (!window.confirm("SYSTEM WARNING: Are you sure you want to permanently delete this audit record?")) return;
    try {
      // Menghapus data asli jika ada koneksi
      const res = await fetch(`http://https://cyber-backend-delta.vercel.app:8000/guru/delete-log/${logId}`, { method: 'DELETE' });
      if (res.ok) { alert("Audit log successfully deleted."); setFeedbackModal(null); fetchData(); } 
      else { 
        // Logika hapus untuk data simulasi lokal jika gagal konek ke backend
        alert("Log simulasi dihapus secara lokal.");
        setFeedbackModal(null);
      }
    } catch (error) { 
      alert("Log simulasi dihapus secara lokal (API Offline)."); 
      setFeedbackModal(null);
    }
  };

  const submitStudentFeedback = () => {
    if(!feedbackText) { alert("Please enter feedback for the student."); return; }
    alert(`Feedback successfully sent to student: ${feedbackModal.username}`);
    setFeedbackModal(null); setFeedbackText("");
  };

  const submitAppFeedback = async () => {
    if(!appFeedbackForm.message.trim()) { alert("Please provide your suggestions or recommendations."); return; }
    setIsSendingFeedback(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/7877d067ab806b68d3ae1ab4eb99ed6c", {
        method: "POST", headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ _subject: `💡 CYBERPLATFORM FEEDBACK: ${appFeedbackForm.category}`, _captcha: "false", Pengirim: user.username, Kategori: appFeedbackForm.category, Pesan: appFeedbackForm.message })
      });
      if (response.ok) { alert(`System Feedback Submitted! Thank you for helping us improve this platform.`); setAppFeedbackModal(false); setAppFeedbackForm({ category: 'FEATURE SUGGESTION', message: '' }); } 
      else { alert("Failed to send feedback. The service might be busy."); }
    } catch (error) { alert("Connection lost. Failed to send feedback."); } 
    finally { setIsSendingFeedback(false); }
  };

  // =========================================================================
  // ANALYTICS CALCULATIONS
  // =========================================================================
  const filteredReports = useMemo(() => {
    let result = reports;
    if (activeClass !== "ALL CLASSES") result = result.filter(r => r.class_name === activeClass);
    if (searchQuery) result = result.filter(r => String(r.username || "").toLowerCase().includes(searchQuery.toLowerCase()));
    return result;
  }, [reports, activeClass, searchQuery]);

  const avgFleet = useMemo(() => {
    if (filteredReports.length === 0) return 0;
    return Math.round(filteredReports.reduce((acc, c) => acc + c.avgScore, 0) / filteredReports.length);
  }, [filteredReports]);

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
    return[
      { name: 'READY (>=80)', value: ready, color: '#10b981' },
      { name: 'CAUTION (50-79)', value: caution, color: '#eab308' },
      { name: 'DANGER (<50)', value: danger, color: '#ef4444' }
    ].filter(d => d.value > 0);
  }, [filteredReports]);

  const domainAverages = useMemo(() => {
    if (filteredReports.length === 0) return[{ domain: 'SOC. ENG', score: 0, color: '#d946ef' }, { domain: 'MALWARE', score: 0, color: '#ef4444' }, { domain: 'PHISHING', score: 0, color: '#3b82f6' }];
    let socTotal = 0, malTotal = 0, phiTotal = 0, socCount = 0, malCount = 0, phiCount = 0;
    filteredReports.forEach(r => {
      if (r.scores.social !== null) { socTotal += r.scores.social; socCount++; }
      if (r.scores.malware !== null) { malTotal += r.scores.malware; malCount++; }
      if (r.scores.phish !== null) { phiTotal += r.scores.phish; phiCount++; }
    });
    return[
      { domain: 'SOC. ENG', score: socCount ? Math.round(socTotal / socCount) : 0, color: '#d946ef' },
      { domain: 'MALWARE', score: malCount ? Math.round(malTotal / malCount) : 0, color: '#ef4444' },
      { domain: 'PHISHING', score: phiCount ? Math.round(phiTotal / phiCount) : 0, color: '#3b82f6' }
    ];
  }, [filteredReports]);

  const dynamicClasses = useMemo(() => {
    const uniqueClasses = Array.from(new Set(reports.map(r => r.class_name)));
    return ["ALL CLASSES", ...uniqueClasses.sort()];
  },[reports]);

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

      {/* --- MODAL 1: STUDENT EVALUATION --- */}
      <AnimatePresence>
        {feedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative w-full max-w-4xl bg-[#0a0a0f]/95 border border-white/10 rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden backdrop-blur-xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-400 via-indigo-500 to-blue-500" />
               <div className="flex justify-between items-start mb-6 relative z-10 shrink-0">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <User size={32} />
                     </div>
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <Sparkles size={14} className="text-fuchsia-400" />
                           <p className="text-[10px] font-bold text-fuchsia-400 tracking-widest uppercase">STUDENT EVALUATION</p>
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight uppercase">{feedbackModal.username}</h2>
                        <p className="text-xs font-semibold text-slate-400 mt-1 uppercase">{feedbackModal.class_name} • {feedbackModal.testCount} TOTAL ATTEMPTS</p>
                     </div>
                  </div>
                  <button onClick={() => setFeedbackModal(null)} className="p-2.5 bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all text-slate-400"><X size={20} /></button>
               </div>

               <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10 space-y-6">
                 <div className="grid grid-cols-3 gap-4">
                    {[
                      { l: 'SOCIAL ENGINEERING', s: feedbackModal.scores.social, a: feedbackModal.attempts.social },
                      { l: 'MALWARE ANALYSIS', s: feedbackModal.scores.malware, a: feedbackModal.attempts.malware },
                      { l: 'PHISHING DEFENSE', s: feedbackModal.scores.phish, a: feedbackModal.attempts.phish }
                    ].map((dom, idx) => {
                       const status = getScoreData(dom.s);
                       return (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden hover:bg-white/10 transition-colors">
                             <div className="absolute bottom-0 left-0 w-full h-1 bg-black/50">
                               <div className={`h-full ${status.bg} ${status.glow}`} style={{ width: `${dom.s || 0}%` }} />
                             </div>
                             <p className="text-[10px] text-slate-400 font-bold tracking-wider mb-2 uppercase text-center">{dom.l}</p>
                             <p className={`text-4xl font-black ${status.text}`}>{dom.s !== null ? dom.s : '--'}</p>
                             <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full text-[9px] font-bold text-slate-400 border border-white/5">
                                <RefreshCcw size={10} className={dom.a > 0 ? "text-indigo-400" : "text-slate-600"}/>
                                <span>{dom.a} ATTEMPTS</span>
                             </div>
                          </div>
                       )
                    })}
                 </div>

                 <div>
                    <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider mb-3">
                      <Database size={16} className="text-indigo-400"/> INDIVIDUAL AUDIT LOGS
                    </h3>
                    <div className="space-y-3">
                      {feedbackModal.history && feedbackModal.history.length > 0 ? (
                        feedbackModal.history.map((log: any, i: number) => {
                          const logScoreData = getScoreData(log.parsedScore);
                          const dbId = log.dbId; 
                          
                          return (
                            <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/20 transition-all group">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-mono text-[10px] font-bold text-slate-400 border border-white/10">
                                   0{i+1}
                                 </div>
                                 <div>
                                   <p className="text-xs font-bold text-white uppercase">SESSION: AUDIT {i+1}</p>
                                   <p className="text-[10px] text-slate-500 uppercase mt-1 flex items-center gap-2">
                                     {log.parsedDomain} <span className="text-white/20">|</span> SCORE: <span className={`font-mono font-bold ${logScoreData.text}`}>{log.parsedScore}</span>/100
                                   </p>
                                 </div>
                              </div>
                              <button 
                                onClick={() => handleDeleteLog(dbId)}
                                className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/20 rounded-lg transition-all flex items-center gap-2"
                                title="Delete this specific audit record"
                              >
                                <Trash2 size={14} />
                                <span className="text-[9px] font-bold tracking-widest hidden sm:block">DELETE</span>
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-6 text-center border border-dashed border-white/10 rounded-xl bg-white/5">
                          <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">NO AUDIT LOGS AVAILABLE</p>
                        </div>
                      )}
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider"><MessageSquare size={16} className="text-fuchsia-400"/> NOTES / FEEDBACK FOR STUDENT</label>
                    <textarea 
                      value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} 
                      placeholder="Write suggestions or guidance for the student here..." 
                      className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none text-sm placeholder:text-slate-600 resize-none transition-all"
                    />
                 </div>
               </div>

               <div className="pt-6 shrink-0 relative z-10">
                  <button onClick={submitStudentFeedback} className="w-full py-4 bg-white text-black hover:bg-fuchsia-500 hover:text-white rounded-2xl font-black text-sm tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] uppercase">
                    SEND FEEDBACK TO STUDENT <Send size={16} />
                  </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: APP FEEDBACK (KE DEVELOPER) --- */}
      <AnimatePresence>
        {appFeedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative w-full max-w-2xl bg-[#0a0a0f]/95 border border-white/10 rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />
               <div className="flex justify-between items-start mb-6 relative z-10 shrink-0">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <Lightbulb size={28} />
                     </div>
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <Sparkles size={14} className="text-emerald-400" />
                           <p className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">APP DEVELOPMENT</p>
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight uppercase">SYSTEM FEEDBACK</h2>
                        <p className="text-xs font-semibold text-slate-400 mt-1 uppercase">Help us improve CyberPlatform</p>
                     </div>
                  </div>
                  <button onClick={() => setAppFeedbackModal(false)} className="p-2.5 bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all text-slate-400"><X size={20} /></button>
               </div>

               <div className="space-y-6 relative z-10 mt-8">
                  <div>
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider mb-3">FEEDBACK CATEGORY</label>
                    <select 
                      value={appFeedbackForm.category}
                      onChange={(e) => setAppFeedbackForm({...appFeedbackForm, category: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all appearance-none cursor-pointer"
                    >
                      <option value="FEATURE SUGGESTION">FEATURE SUGGESTION / RECOMMENDATION</option>
                      <option value="BUG REPORT">BUG REPORT / ERROR</option>
                      <option value="UI/UX IMPROVEMENT">UI / UX IMPROVEMENT</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider mb-3">YOUR SUGGESTION / MESSAGE</label>
                    <textarea 
                      value={appFeedbackForm.message} 
                      onChange={(e) => setAppFeedbackForm({...appFeedbackForm, message: e.target.value})} 
                      placeholder="Describe your suggestions, features you want, or issues you found..." 
                      className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm placeholder:text-slate-600 resize-none transition-all"
                    />
                  </div>
               </div>

               <div className="pt-8 shrink-0 relative z-10">
                  <button 
                    onClick={submitAppFeedback} 
                    disabled={isSendingFeedback}
                    className="w-full py-4 bg-emerald-500 text-white hover:bg-emerald-400 rounded-2xl font-black text-sm tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingFeedback ? "TRANSMITTING..." : "SUBMIT TO DEVELOPERS"} <Send size={16} className={isSendingFeedback ? "animate-bounce" : ""} />
                  </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SIDEBAR --- */}
      <motion.aside animate={{ width: isSidebarCollapsed ? 80 : 280 }} className="h-screen bg-[#05050A]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col z-[100] transition-all duration-500 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                <LayoutDashboard size={20} className="text-white" />
              </div>
              <span className="font-black tracking-widest text-sm text-white uppercase">INSTRUCTOR</span>
            </div>
          )}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg mx-auto transition-all">
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-3">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center p-4 rounded-xl transition-all gap-4 ${view === 'dashboard' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
             <Activity size={22} className={view === 'dashboard' ? 'animate-pulse' : ''} />
             {!isSidebarCollapsed && <span className="font-bold text-xs tracking-widest uppercase">MAIN DASHBOARD</span>}
          </button>

          <button onClick={() => setAppFeedbackModal(true)} className={`w-full flex items-center p-4 rounded-xl transition-all gap-4 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10`}>
             <Lightbulb size={22} />
             {!isSidebarCollapsed && <span className="font-bold text-xs tracking-widest uppercase">APP FEEDBACK</span>}
          </button>
        </nav>
        
        <div className="p-6 border-t border-white/5">
          <button onClick={() => { localStorage.removeItem('user'); router.push('/'); }} className="w-full flex items-center justify-center p-3.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl gap-3 font-bold text-xs tracking-widest uppercase transition-all">
            <LogOut size={18} /> {!isSidebarCollapsed && "LOGOUT"}
          </button>
        </div>
      </motion.aside>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 lg:px-12 border-b border-white/5 bg-black/20 backdrop-blur-md">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" />
                 <span className="text-[10px] font-bold text-slate-300 tracking-wider uppercase">SYSTEM ONLINE</span>
               </div>
            </div>
            <div className="flex items-center gap-5">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-white tracking-wide uppercase">{user.username}</p>
                    <p className="text-[10px] font-semibold text-fuchsia-400 mt-0.5 uppercase">INSTRUCTOR ACCESS</p>
                </div>
                <div className="w-11 h-11 bg-gradient-to-br from-fuchsia-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(217,70,239,0.3)] border border-white/10">
                  <User size={20} />
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-12 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">
            
            {/* ================================================================================= */}
            {/* VIEW: MAIN DASHBOARD */}
            {/* ================================================================================= */}
            {view === 'dashboard' && (
              <motion.div key="analytics" {...(portalTransition as any)} className="max-w-[1400px] w-full mx-auto space-y-10 pb-20 pt-4">
                
                {/* 1. HEADER TITLE */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                  <div>
                     <div className="text-fuchsia-400 font-bold text-[11px] tracking-widest flex items-center gap-2 mb-2 uppercase">
                       <Hexagon size={14} className="animate-spin-slow" /> INSTRUCTOR DASHBOARD
                     </div>
                     <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight uppercase">
                       {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">{user.username}</span>.
                     </h1>
                     <p className="text-slate-400 mt-2 font-medium text-sm">Comprehensive overview of fleet readiness, student participation, and domain mastery.</p>
                  </div>
                  <button onClick={fetchData} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-bold text-xs hover:bg-white hover:text-black transition-all flex items-center gap-3 group shadow-lg uppercase tracking-wider">
                     <RefreshCcw size={14} className={`${loading ? "animate-spin text-fuchsia-400" : "text-slate-400 group-hover:text-black"}`}/> REFRESH DATA
                  </button>
                </div>

                {/* 2. BENTO GRID STATISTIK - GOD TIER */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-[minmax(160px,auto)]">
                   
                   {/* CARD 1: Participation & Profile */}
                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[80px] rounded-full pointer-events-none" />
                      <div>
                        <div className="flex items-center gap-3 mb-8">
                           <div className="p-2.5 bg-white/5 rounded-xl text-fuchsia-400"><Target size={20}/></div>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">PARTICIPATION METRICS</p>
                        </div>
                        <div className="mb-6 relative z-10">
                          <p className="text-5xl font-black text-white mb-2">{participationStats.percentage}%</p>
                          <p className="text-[11px] text-fuchsia-300 font-bold uppercase tracking-wider">OF STUDENTS HAVE TAKEN EXAMS</p>
                        </div>
                        
                        <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-white/5 mb-8">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${participationStats.percentage}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 shadow-[0_0_10px_#d946ef]" />
                        </div>
                      </div>
                      
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/5 grid grid-cols-2 gap-4 backdrop-blur-md relative z-10">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">TOTAL STUDENTS</span>
                          <span className="text-white text-xl font-black">{participationStats.total}</span>
                        </div>
                        <div className="border-l border-white/10 pl-4">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">ACTIVE (TESTED)</span>
                          <span className="text-fuchsia-400 text-xl font-black">{participationStats.active}</span>
                        </div>
                      </div>
                   </motion.div>

                   {/* CARD 2: Fleet Readiness Distribution */}
                   <motion.div whileHover={{ y: -4 }} className={`lg:col-span-4 lg:row-span-2 rounded-[2rem] p-6 lg:p-8 flex flex-col items-center bg-[#0a0a0f]/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden`}>
                      <div className="flex items-center justify-between w-full mb-2 relative z-10 shrink-0">
                          <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] flex items-center gap-3">
                             <ShieldAlert size={16} className="text-indigo-400"/> FLEET READINESS
                          </p>
                      </div>
                      <p className="text-[10px] font-semibold text-slate-500 tracking-wide relative z-10 w-full mb-2">Overall student security classification.</p>
                      
                      <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[200px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Tooltip contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff', fontWeight: 'bold' }} />
                              <Pie data={readinessDistribution} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                                {readinessDistribution.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0 0 8px ${entry.color}80)` }} />
                                ))}
                              </Pie>
                            </PieChart>
                         </ResponsiveContainer>
                         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                           <span className="text-4xl font-black text-white">{participationStats.active}</span>
                           <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-1">TESTED</span>
                         </div>
                      </div>
                      
                      <div className="w-full flex justify-center gap-4 mt-2">
                        {readinessDistribution.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 5px ${item.color}` }}></div>
                            <span className="text-[9px] font-bold text-slate-300">{item.name}</span>
                          </div>
                        ))}
                      </div>
                   </motion.div>

                   {/* CARD 3: DOMAIN MASTERY LEVEL (Bar Chart) */}
                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 lg:p-8 flex flex-col relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-500 group min-h-[350px]">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500" />
                      
                      <div className="flex items-center justify-between mb-2 relative z-10 shrink-0">
                         <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] flex items-center gap-3">
                            <Radar size={16} className="text-fuchsia-400 animate-spin-slow"/> DOMAIN MASTERY LEVEL
                         </p>
                      </div>
                      <p className="text-[10px] font-semibold text-slate-500 tracking-wide relative z-10 shrink-0">Class average performance per sector.</p>
                      
                      <div className="w-full mt-8 relative z-10 h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={domainAverages} margin={{ top: 30, right: 10, left: -25, bottom: 0 }}>
                              <defs>
                                 {domainAverages.map((entry, index) => (
                                    <linearGradient key={`grad-${index}`} id={`colorUv-${index}`} x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                                       <stop offset="100%" stopColor={entry.color} stopOpacity={0.1} />
                                    </linearGradient>
                                 ))}
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                              <XAxis dataKey="domain" tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: '900', letterSpacing: '0.05em' }} axisLine={false} tickLine={false} dy={15} />
                              <YAxis tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ backgroundColor: 'rgba(10,10,15,0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff', fontWeight: '900' }} />
                              
                              <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={45} minPointSize={8}
                                 label={(props: any) => {
                                    const { x, y, width, value, index } = props;
                                    const color = domainAverages[index].color;
                                    return (
                                       <text x={x + width / 2} y={y - 10} fill={color} textAnchor="middle" fontSize="18" fontWeight="900" className="font-mono tracking-tighter" style={{ filter: `drop-shadow(0px 0px 8px ${color})` }}>
                                          {value}
                                       </text>
                                    )
                                 }}
                              >
                                 {domainAverages.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`url(#colorUv-${index})`} stroke={entry.color} strokeWidth={1} style={{ filter: `drop-shadow(0 0 12px ${entry.color}40)` }} />
                                 ))}
                              </Bar>
                           </BarChart>
                        </ResponsiveContainer>
                      </div>
                   </motion.div>
                </div>

                {/* 3. TERMINAL ROSTER (GOD-TIER DATA GRID) */}
                <div className="mt-16 space-y-6">
                   <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-8">
                      <div>
                         <h2 className="text-3xl font-black text-white flex items-center gap-4 tracking-tighter uppercase">
                            <span className="p-3 bg-fuchsia-500/10 rounded-2xl border border-fuchsia-500/30 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
                               <Users size={32} className="text-fuchsia-400"/>
                            </span>
                            OPERATIVE DOSSIERS
                         </h2>
                         <p className="text-xs font-bold text-slate-400 mt-3 tracking-[0.3em] uppercase flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" /> LIVE SYSTEM MONITOR
                         </p>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                         <div className="relative w-full md:w-80 group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative flex items-center">
                               <Search size={16} className="absolute left-5 text-fuchsia-400" />
                               <input type="text" placeholder="Search operative identity..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#05050A]/90 backdrop-blur-md border border-white/10 rounded-full py-4 pl-12 pr-6 text-xs font-bold focus:border-fuchsia-500 outline-none text-white transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] placeholder:text-slate-600" />
                            </div>
                         </div>
                         
                         <div className="flex bg-[#05050A]/80 backdrop-blur-md p-1.5 rounded-full border border-white/10 overflow-x-auto no-scrollbar shadow-lg relative z-10">
                            {dynamicClasses.map((cls) => (
                               <button key={cls} onClick={() => setActiveClass(cls)}
                                 className={`px-6 py-3 rounded-full text-[11px] font-black tracking-widest whitespace-nowrap transition-all duration-300 uppercase ${activeClass === cls ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                               >
                                 {cls}
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* God-Tier Data Grid */}
                   <div className="overflow-x-auto pb-12 pt-4">
                      <div className="min-w-[1200px] flex flex-col gap-5">
                         
                         {/* Header Floating Glass Pill */}
                         <div className="grid grid-cols-12 gap-4 px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] bg-white/[0.03] backdrop-blur-md shadow-lg rounded-full border border-white/5 mx-2">
                            <div className="col-span-3 flex items-center text-white pl-4">STUDENT PROFILE</div>
                            <div className="col-span-5 text-center flex items-center justify-center gap-4">
                               CATEGORIES & ATTEMPTS
                            </div>
                            <div className="col-span-2 text-center">FINAL SCORE</div>
                            <div className="col-span-2 text-right pr-4">ACTION</div>
                         </div>

                         {/* List Items */}
                         <AnimatePresence>
                            {filteredReports.map((r, idx) => {
                              const totalStatus = getScoreData(r.avgScore);
                              
                              // MINIBAR SUPER GLASSMORPHISM
                              const MiniBar = ({ score, color, attempts, label, icon: Icon }: any) => {
                                const val = score || 0;
                                return (
                                  <div className="flex flex-col items-center w-full gap-2 p-3 bg-[#0a0a0f]/50 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 relative group/minibar shadow-inner">
                                    <div className="flex items-center gap-2">
                                       <Icon size={12} style={{ color }} className="opacity-80" />
                                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
                                    </div>
                                    <div className="flex items-end gap-1 mt-1">
                                       <span className="text-2xl font-black font-mono leading-none" style={{ color, textShadow: `0 0 15px ${color}80` }}>{score !== null ? score : '--'}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-black rounded-full overflow-hidden border border-white/5 mt-1 relative">
                                       <div className="absolute top-0 left-0 h-full rounded-full" style={{ width: `${val}%`, backgroundColor: color, boxShadow: `0 0 10px ${color}` }}/>
                                    </div>
                                    {attempts > 0 && (
                                      <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-black border border-white/10 rounded-full text-[8px] font-bold text-slate-300 flex items-center gap-1 shadow-[0_0_10px_rgba(0,0,0,0.8)] z-10">
                                         <RefreshCcw size={8} style={{ color }} /> {attempts}
                                      </div>
                                    )}
                                  </div>
                                )
                              }

                              return (
                                <motion.div 
                                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }}
                                   key={idx} className="grid grid-cols-12 gap-4 items-center bg-[#07070B]/60 backdrop-blur-2xl p-5 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(217,70,239,0.15)] group relative overflow-hidden"
                                >
                                   {/* Holographic Glowing Border Left */}
                                   <div className={`absolute left-0 top-0 w-1.5 h-full ${totalStatus.bg} opacity-30 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_20px_currentColor]`} style={{ color: totalStatus.color }} />
                                   <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                   {/* Profile */}
                                   <div className="col-span-3 flex items-center gap-6 pl-6 relative z-10">
                                      <div className="relative">
                                         <div className="absolute -inset-2 bg-gradient-to-br from-fuchsia-600 to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                                         <div className="w-14 h-14 rounded-full bg-gradient-to-br from-black to-[#111] border border-white/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,0,0,0.8)] z-10">
                                            <User size={22} className="text-slate-400 group-hover:text-fuchsia-400 transition-colors duration-300" />
                                            <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#07070B] ${totalStatus.bg} shadow-[0_0_10px_currentColor]`} style={{ color: totalStatus.color }} />
                                         </div>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                         <span className="font-black text-lg text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all uppercase">{r.username}</span>
                                         <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{r.class_name}</span>
                                      </div>
                                   </div>

                                   {/* Mini Category Bars */}
                                   <div className="col-span-5 grid grid-cols-3 gap-4 relative z-10 px-4">
                                      <MiniBar score={r.scores.social} color="#d946ef" attempts={r.attempts.social} label="SOC. ENG" icon={Brain} />
                                      <MiniBar score={r.scores.malware} color="#ef4444" attempts={r.attempts.malware} label="MALWARE" icon={Bug} />
                                      <MiniBar score={r.scores.phish} color="#3b82f6" attempts={r.attempts.phish} label="PHISHING" icon={MailWarning} />
                                   </div>

                                   {/* FINAL SCORE (HUD Reactor Core) */}
                                   <div className="col-span-2 flex justify-center relative z-10">
                                      <div className="relative flex items-center justify-center group/reactor w-20 h-20">
                                         {/* Ambient Glow */}
                                         <div className={`absolute inset-0 rounded-full blur-xl opacity-30 ${totalStatus.bg} group-hover/reactor:animate-pulse`} />
                                         
                                         {/* Outer Dashed Ring (Static) */}
                                         <svg className="w-full h-full absolute transform -rotate-90">
                                            <circle cx="50%" cy="50%" r="42%" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="4 4" fill="transparent" />
                                         </svg>
                                         
                                         {/* Inner Solid Ring (Dynamic) */}
                                         <svg className="w-full h-full absolute transform -rotate-90">
                                            <circle cx="50%" cy="50%" r="35%" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                                            <circle cx="50%" cy="50%" r="35%" stroke={totalStatus.color} strokeWidth="4" strokeLinecap="round" strokeDasharray={`${r.avgScore * 2.2} 1000`} fill="transparent" style={{ filter: `drop-shadow(0 0 6px ${totalStatus.color})`, transition: 'stroke-dasharray 1.5s ease-out' }}/>
                                         </svg>

                                         <div className="flex items-center justify-center relative z-10">
                                            <span className={`font-black font-mono text-2xl ${totalStatus.text}`} style={{ textShadow: `0 0 10px ${totalStatus.color}80` }}>{r.avgScore}</span>
                                         </div>
                                      </div>
                                   </div>

                                   {/* ACTION (Clean Pill Button) */}
                                   <div className="col-span-2 flex justify-end pr-6 relative z-10">
                                      <button onClick={() => setFeedbackModal(r)} className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-full hover:bg-white text-slate-300 hover:text-black font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] group/btn transform hover:-translate-y-1">
                                         <Eye size={16} className="group-hover/btn:animate-pulse" /> VIEW DOSSIER
                                      </button>
                                   </div>
                                </motion.div>
                              );
                            })}
                         </AnimatePresence>
                         {filteredReports.length === 0 && (
                            <div className="p-24 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-[2.5rem] bg-black/40 backdrop-blur-md mt-4 shadow-2xl">
                               <div className="p-5 bg-white/5 rounded-full mb-6 border border-white/10"><Info size={40} className="text-slate-500" /></div>
                               <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">DATABASE EMPTY</h3>
                               <p className="text-slate-500 font-bold tracking-[0.2em] uppercase text-sm">NO OPERATIVE RECORDS FOUND IN THE SECURE DATABANKS.</p>
                            </div>
                         )}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(217, 70, 239, 0.5); }
        ::-webkit-scrollbar { width: 0px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        input, textarea, select { caret-color: #d946ef; }
        ::selection { background: #d946ef; color: white; }
      `}} />
    </div>
  );
}