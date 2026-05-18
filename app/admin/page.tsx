"use client"
import { useState, useEffect } from 'react'
import { PlusCircle, Layout, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [qs, setQs] = useState([]);
  const [newQ, setNewQ] = useState({ text: '', jawaban_ideal: '', bobot: 0 });
  const router = useRouter();

  const loadData = () => fetch('http://127.0.0.1:8000/questions').then(r => r.json()).then(d => setQs(d));
  useEffect(() => loadData(), []);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-10 lg:p-20 font-sans">
      <header className="flex justify-between items-center mb-16 border-b border-white/5 pb-10">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-white">Architect <span className="text-purple-500">Panel</span>.</h2>
        <button onClick={() => router.push('/')} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 transition-all"><LogOut /></button>
      </header>

      <div className="grid gap-10">
        <div className="bg-white/5 border border-white/10 p-12 rounded-[48px] shadow-2xl relative overflow-hidden group">
          <h3 className="text-2xl font-black mb-10 flex items-center gap-4 italic uppercase tracking-tighter text-white"><PlusCircle className="text-purple-500" size={32}/> Deploy Indikator</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-4">Pertanyaan</label>
              <input type="text" placeholder="..." className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-purple-500 text-white font-bold" onChange={e => setNewQ({...newQ, text: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-4">Standard Jawaban</label>
              <input type="text" placeholder="..." className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-pink-500 text-white font-bold" onChange={e => setNewQ({...newQ, jawaban_ideal: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-4">Bobot Skor</label>
              <input type="number" placeholder="0" className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-purple-500 text-white font-bold" onChange={e => setNewQ({...newQ, bobot: parseInt(e.target.value)})} />
            </div>
          </div>
          <button onClick={async () => {
             await fetch('http://127.0.0.1:8000/admin/questions', {
               method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newQ)
             });
             alert("DEPLOAYED!"); loadData();
          }} className="mt-12 px-16 py-6 bg-white text-black font-black rounded-3xl hover:bg-purple-500 hover:text-white transition-all tracking-[0.3em] text-xs shadow-xl">DEPLOY TO CORE</button>
        </div>

        <div className="bg-black/40 border border-white/5 p-10 rounded-[48px]">
          <h4 className="text-xl font-black mb-8 italic flex items-center gap-3 tracking-widest text-white uppercase"><Layout className="text-purple-500" /> Database Inventory</h4>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <th className="py-4">Indicator</th><th className="py-4">Standard</th><th className="py-4 text-center">Weight</th>
              </tr>
            </thead>
            <tbody>
              {qs.map((q:any, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="py-6 text-sm font-bold text-slate-300">{q.text}</td>
                  <td className="py-6"><span className="px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-[10px] font-black text-pink-500 uppercase tracking-widest">{q.jawaban_ideal}</span></td>
                  <td className="py-6 text-center font-black text-white">{q.bobot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}