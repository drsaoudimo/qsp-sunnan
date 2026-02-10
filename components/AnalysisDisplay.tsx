
import React, { useState, useEffect } from 'react';
import { QSPAnalysisResult } from '../types';
import { EquationCard } from './EquationCard';
import { SymbolicChart } from './SymbolicChart';
import { 
  AlertTriangle, CheckCircle, XOctagon, Activity, FileText, 
  Copy, Check, Maximize2, Minimize2, ArrowRight, BookOpen, Scroll
} from 'lucide-react';

interface Props {
  result: QSPAnalysisResult;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let color = "bg-slate-600";
  let Icon = Activity;
  let label = "غير محدد";

  switch (status) {
    case 'Safe':
      color = "bg-emerald-600 text-white";
      Icon = CheckCircle;
      label = "نطاق الأمان السنني (Safe)";
      break;
    case 'Warning':
      color = "bg-amber-600 text-white";
      Icon = AlertTriangle;
      label = "اضطراب متوسط (Warning)";
      break;
    case 'Critical':
      color = "bg-orange-600 text-white";
      Icon = Activity;
      label = "اضطراب حرج (Critical)";
      break;
    case 'Collapse':
      color = "bg-red-700 text-white";
      Icon = XOctagon;
      label = "جوار الهلاك (Collapse)";
      break;
  }

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow-lg ${color} mx-auto md:mx-0 w-fit shrink-0 transition-transform hover:scale-105`}>
      <Icon size={18} />
      <span>{label}</span>
    </div>
  );
};

export const AnalysisDisplay: React.FC<Props> = ({ result }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [animStep, setAnimStep] = useState(0);

  const variables = result?.variables || [];
  const algebra = result?.algebra || [];
  const recommendations = result?.recommendations || [];
  const article = result?.article || { intro: '', forecasting: '', modeling: '', remedies: '' };

  const handleCopy = () => {
    const textToCopy = `
=== تقرير QSP: ${result.title} ===
الحالة: ${result.status}
الآية المحورية: ${result.coreVerse}
[المقال العلمي الشرعي كاملاً]
-- مقدمة: ${article.intro}
-- 1. المآلات: ${article.forecasting}
-- 2. النمذجة: ${article.modeling}
-- 3. الاستدراك: ${article.remedies}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (isFullscreen) {
      const timer = setInterval(() => {
        setAnimStep(prev => (prev < 5 ? prev + 1 : prev));
      }, 200);
      return () => clearInterval(timer);
    } else {
      setAnimStep(0);
    }
  }, [isFullscreen]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isFullscreen]);

  return (
    <div className="space-y-10 animate-fadeInUp duration-700">
      
      {/* Dashboard View */}
      <div className="border-b border-slate-700 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-cyan-400 mb-2 leading-tight font-amiri">
                {result.title}
              </h2>
              <div className="font-mono text-[10px] md:text-xs text-slate-500 tracking-[0.3em] uppercase">QSP_CORE_NODE_PROGNOSIS</div>
          </div>
          <StatusBadge status={result.status} />
      </div>

      <div className="bg-slate-900/60 p-8 md:p-12 rounded-3xl border-r-8 border-emerald-500 shadow-2xl relative overflow-hidden group">
        <p className="text-3xl md:text-5xl leading-relaxed font-amiri text-white text-center md:text-right font-bold">
          ﴿ {result.coreVerse} ﴾
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-slate-800/20 p-8 rounded-2xl border border-slate-700/50 shadow-xl h-fit">
          <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3 font-amiri">
            <Activity size={24} className="text-emerald-400" />
            الملخص التحليلي
          </h3>
          <p className="text-xl leading-relaxed text-slate-300 text-justify font-amiri">
            {result.analysisText}
          </p>
        </div>
        <div className="space-y-6">
            <SymbolicChart data={variables} />
        </div>
      </div>

      <div className="flex justify-center pt-6">
          <button 
            onClick={() => setIsFullscreen(true)}
            className="group flex items-center justify-center gap-4 bg-gradient-to-br from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white px-12 py-6 rounded-2xl font-bold transition-all shadow-2xl active:scale-95 border-b-4 border-amber-950"
          >
             <Scroll size={28} />
             <span className="text-2xl font-amiri">فتح المقال العلمي المستقل</span>
             <Maximize2 size={20} />
          </button>
      </div>

      <div className="pt-10">
        <EquationCard equations={algebra} />
      </div>

      {/* FULLSCREEN ARTICLE OVERLAY - RE-ENGINEERED FOR MOBILE */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100000] bg-[#0b1121] flex flex-col overflow-hidden animate-fadeIn">
           
           {/* 1. FIXED HEADER: Guaranteed to never overlap content */}
           <div className="flex-none h-20 bg-slate-900 border-b border-slate-800 px-4 md:px-16 flex items-center justify-between shadow-2xl z-[100001]">
              <button 
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-all bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700"
              >
                <ArrowRight size={20} />
                <span className="font-bold font-amiri text-lg">رجوع</span>
              </button>
              
              <div className="hidden sm:block text-center">
                 <h1 className="text-amber-500 font-bold font-amiri text-xl">دراسة استشرافية تأصيلية</h1>
              </div>

              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-xl transition-all font-bold"
              >
                {copied ? <Check size={18} /> : <FileText size={18} />}
                <span className="text-sm">نسخ</span>
              </button>
           </div>

           {/* 2. SCROLLABLE BODY: Starts exactly where header ends */}
           <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0b1121]">
             <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-24">
                
                {/* Title Section */}
                <header className="text-center space-y-8 pb-16 border-b border-slate-800/50 animate-fadeInUp">
                   <div className="inline-flex items-center gap-3 px-6 py-2 bg-amber-600/10 text-amber-500 border border-amber-600/30 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase font-mono">
                      <Scroll size={14} />
                      Scientific Manuscript
                   </div>
                   <h2 className="text-3xl md:text-6xl font-bold text-white font-amiri leading-[1.4] block">
                     {result.title}
                   </h2>
                   <div className="flex flex-col items-center gap-6">
                      <div className="w-20 h-1 bg-amber-600 rounded-full"></div>
                      <p className="text-slate-400 font-amiri text-2xl md:text-4xl italic font-bold opacity-95 leading-relaxed bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
                          ﴿ {result.coreVerse} ﴾
                      </p>
                   </div>
                </header>

                {/* Introduction */}
                <article className={`transition-all duration-1000 transform ${animStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-1.5 h-10 bg-amber-600 rounded-full"></div>
                      <h4 className="text-3xl font-bold text-amber-500 font-amiri">توطئة المقال والتأصيل الكلي</h4>
                   </div>
                   <div className="text-xl md:text-2xl text-slate-200 leading-[2.3] text-justify font-amiri space-y-10">
                      {article.intro.split('\n').map((para, i) => (
                        <p key={i} className="font-medium indent-8">{para}</p>
                      ))}
                   </div>
                </article>

                {/* Forecasting */}
                <article className={`transition-all duration-1000 delay-200 transform ${animStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-1.5 h-10 bg-emerald-600 rounded-full"></div>
                      <h4 className="text-3xl font-bold text-emerald-500 font-amiri">المبحث الأول: الاستبصار وفقه المآلات</h4>
                   </div>
                   <div className="bg-slate-900/60 p-8 md:p-14 rounded-[2.5rem] border border-slate-800 text-slate-300 text-xl md:text-2xl leading-[2.3] text-justify font-amiri shadow-inner">
                      {article.forecasting.split('\n').map((para, i) => (
                        <p key={i} className="mb-6 last:mb-0">{para}</p>
                      ))}
                   </div>
                </article>

                {/* Modeling */}
                <article className={`transition-all duration-1000 delay-400 transform ${animStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-1.5 h-10 bg-cyan-600 rounded-full"></div>
                      <h4 className="text-3xl font-bold text-cyan-500 font-amiri">المبحث الثاني: النمذجة وفقه العلل</h4>
                   </div>
                   <div className="bg-slate-900/60 p-8 md:p-14 rounded-[2.5rem] border border-slate-800 text-slate-300 text-xl md:text-2xl leading-[2.3] text-justify font-amiri border-r-4 border-r-cyan-600/40">
                      {article.modeling.split('\n').map((para, i) => (
                        <p key={i} className="mb-6 last:mb-0">{para}</p>
                      ))}
                   </div>
                </article>

                {/* Remedies */}
                <article className={`transition-all duration-1000 delay-600 transform ${animStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-1.5 h-10 bg-amber-500 rounded-full"></div>
                      <h4 className="text-3xl font-bold text-amber-500 font-amiri">المبحث الثالث: فقه الاستدراك والإنابة</h4>
                   </div>
                   <div className="bg-amber-900/5 p-8 md:p-14 rounded-[2.5rem] border border-amber-900/20 text-slate-100 text-xl md:text-2xl leading-[2.3] text-justify font-amiri shadow-2xl">
                      {article.remedies.split('\n').map((para, i) => (
                        <p key={i} className="mb-6 last:mb-0">{para}</p>
                      ))}
                   </div>
                </article>

                {/* Footer Footer */}
                <div className={`pt-20 border-t border-slate-800 text-center pb-24 transition-all duration-1000 ${animStep >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                   <button 
                     onClick={() => { setIsFullscreen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                     className="bg-slate-800 hover:bg-slate-700 text-white px-16 py-6 rounded-2xl font-bold transition-all text-xl font-amiri flex items-center gap-3 mx-auto shadow-2xl"
                   >
                     <ArrowRight size={22} />
                     إغلاق والعودة للوحة البيانات
                   </button>
                   <p className="mt-10 text-slate-600 font-mono text-[10px] tracking-[0.5em] uppercase">End of QSP Manuscript — 2025</p>
                </div>

             </div>
           </div>
        </div>
      )}

      {/* Footer Meta */}
      <div className="text-center text-[10px] md:text-xs text-slate-600 mt-16 pt-10 border-t border-slate-800/50 font-mono tracking-[0.4em]">
        <p className="mb-3">⚠️ {result.disclaimer}</p>
        <p className="uppercase">QSP-CORE PROGNOSIS SYSTEM v1.2.4 — RESEARCH_MODE_ACTIVE</p>
      </div>
    </div>
  );
};
