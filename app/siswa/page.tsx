"use client";

import React, { useState } from 'react';
import { Shield, Zap, Activity, BookOpen, Cpu, Globe, ArrowRight, Lock, Mail, CheckCircle, ShieldCheck, Headphones } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white font-sans text-slate-900">
      {/* SISI KIRI: CONTENT (Scrollable) */}
      <div className="lg:w-3/5 w-full overflow-y-auto px-8 lg:px-20 py-12">
        <div className="flex items-center gap-2 mb-16">
          <div className="bg-blue-600 p-2 rounded-xl"><Shield className="text-white w-6 h-6" /></div>
          <span className="text-xl font-bold tracking-tight">CyberResilience Index</span>
        </div>

        <div className="space-y-32">
          {/* Section 1: Hero */}
          <section>
            <span className="px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6 inline-block">Platform Infrastruktur Sekolah</span>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">Mengkaji Ketahanan <span className="text-blue-600">Siber Sekolah.</span></h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl">Platform terintegrasi untuk menguji ketahanan digital dan monitoring energi hibrida sekolah secara real-time.</p>
          </section>

          {/* Section 2: Tentang Kami */}
          <section id="about">
            <h2 className="text-3xl font-bold mb-6">Tentang Platform</h2>
            <p className="text-slate-600 leading-relaxed text-lg">Kami hadir untuk memastikan SMA/SMK memiliki infrastruktur digital yang tangguh melalui audit berkala dan sistem energi mandiri terbarukan.</p>
          </section>

          {/* Section 3: Layanan (3 Domain) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
              <ShieldCheck className="text-blue-600 mb-4" size={32} />
              <h3 className="font-bold text-xl mb-2">Asesmen Siber</h3>
              <p className="text-slate-500">Uji ketahanan terhadap Social Engineering, Malware, dan Phishing.</p>
            </div>
            <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
              <Zap className="text-orange-500 mb-4" size={32} />
              <h3 className="font-bold text-xl mb-2">Monitoring ATS</h3>
              <p className="text-slate-500">Sistem catu daya otomatis untuk mesin tetas dan pencahayaan.</p>
            </div>
          </section>

          {/* Section 4-7: (Diringkas agar Ringan) */}
          <section className="space-y-8 bg-slate-900 text-white p-12 rounded-[3rem]">
            <h2 className="text-3xl font-bold">Infrastruktur Modern</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <CheckCircle className="text-blue-400 shrink-0" />
                <p>Sistem Catu Daya Hibrida dengan energi surya terintegrasi.</p>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle className="text-blue-400 shrink-0" />
                <p>Pencahayaan Otomatis berbasis sensor LDR untuk efisiensi.</p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-40 pt-8 border-t text-slate-400 text-sm">
          <p>© 2024 CyberResilience Hub. Professional School Infrastructure.</p>
        </footer>
      </div>

      {/* SISI KANAN: LOGIN FORM (Fixed) */}
      <div className="lg:w-2/5 w-full bg-slate-50 flex items-center justify-center p-8 lg:sticky lg:top-0 lg:h-screen border-l">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center">
          <h2 className="text-2xl font-bold mb-2">{isLogin ? 'Selamat Datang' : 'Pendaftaran Siswa'}</h2>
          <p className="text-slate-500 mb-8 italic text-sm">Gunakan akun sekolah untuk mengakses portal.</p>
          
          <div className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Sekolah</label>
              <input className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all" placeholder="nisn@sekolah.id" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
              <input type="password" className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all" placeholder="••••••••" />
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-slate-200">
              {isLogin ? 'Masuk Sekarang' : 'Buat Akun'}
            </button>
            <button onClick={() => setIsLogin(!isLogin)} className="w-full text-sm font-semibold text-slate-500 mt-4 hover:text-blue-600">
              {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}