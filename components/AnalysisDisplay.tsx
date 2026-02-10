
import React, { useState, useEffect } from 'react';
import { QSPAnalysisResult } from '../types';
import { EquationCard } from './EquationCard';
import { SymbolicChart } from './SymbolicChart';
import { 
  AlertTriangle, CheckCircle, XOctagon, Activity, FileText, 
  ChevronDown, ChevronUp, Copy, Check, Maximize2, Minimize2, ArrowRight, BookOpen, Scroll
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
    const varsText = variables.map(v => `- ${v.symbol} (${v.name}): ${v.value}`).join('\n');
    const textToCopy = `
=== تقرير QSP: ${result.title} ===
الحالة: ${result.status}
الآية المحورية: ${result.coreVerse}

[الملخص التحليلي]
${result.analysisText}

[المقال العلمي الشرعي كاملاً]
-- مقدمة:
${article.intro}

-- 1. التحليل الاستشرافي (فقه المآلات):
${article.forecasting}

-- 2. النمذجة السننية (فقه الأسباب والعلل):
${article.modeling}

-- 3. المسارات التصحيحية (فقه الاستدراك):
${article.remedies}

-- التوصيات والمسارات:
${recommendations.join('\n')}

-- إخلاء مسؤولية:
${result.disclaimer}

تم الاستخراج والتحليل بواسطة مشروع الاستشراف القرآني المرمّز (QSP)
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
      
      {/* Header Section */}
      <div className="border-b border-slate-700 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-cyan-400 mb-2 leading-tight">
              {result.title}
              </h2>
              <div className="font-mono text-[10px] md:text-xs text-slate-500 tracking-[0.3em] uppercase">QSP_CORE_NODE_PROGNOSIS</div>
          </div>
          <StatusBadge status={result.status} />
      </div>

      {/* Core Verse Card */}
      <div className="bg-slate-900/60 p-8 md:p-12 rounded-3xl border-r-8 border-emerald-500 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
           <BookOpen size={120} />
        </div>
        <div className="text-emerald-500 text-[10px] md:text-xs font-bold mb-4 uppercase tracking-[0.3em] font-mono">DIVINE_AXIOM_REVELATION</div>
        <p className="text-3xl md:text-5xl leading-relaxed font-amiri text-white text-center md:text-right drop-shadow-2xl select-all font-bold">
          ﴿ {result.coreVerse} ﴾
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-slate-800/20 p-8 rounded-2xl border border-slate-700/50 shadow-xl h-fit backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <Activity size={24} className="text-emerald-400" />
            الملخص التحليلي
          </h3>
          <p className="text-xl leading-relaxed text-slate-300 text-justify font-amiri font-medium">
            {result.analysisText}
          </p>
        </div>

        <div className="space-y-6">
            <SymbolicChart data={variables} />
        </div>
      </div>

      {/* Main Control Buttons */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 pt-6">
          <button 
            onClick={() => { setIsFullscreen(true); }}
            className="w-full md:w-auto group flex items-center justify-center gap-4 bg-gradient-to-br from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white px-12 py-6 rounded-2xl font-bold transition-all shadow-2xl shadow-amber-900/40 active:scale-95 border-b-4 border-amber-950"
          >
             <Scroll size={28} className="group-hover:rotate-12 transition-transform" />
             <span className="text-2xl font-amiri">فتح المقال العلمي المستقل</span>
             <Maximize2 size={20} />
          </button>

          <button 
            onClick={handleCopy}
            className={`w-full md:w-auto flex items-center justify-center gap-3 px-10 py-6 rounded-2xl border-2 transition-all duration-300 transform active:scale-95 shadow-xl ${
              copied 
                ? 'bg-emerald-900/30 border-emerald-500 text-emerald-400' 
                : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500'
            }`}
          >
            {copied ? <Check size={24} /> : <Copy size={24} />}
            <span className="font-bold text-xl">{copied ? 'تم نسخ التقرير' : 'نسخ التقرير كاملاً'}</span>
          </button>
      </div>

      {/* Symbolic Model View */}
      <div className="pt-10">
        <h3 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-3">
             <span className="font-mono text-emerald-500 text-3xl">∑</span>
             النمذجة الرياضية الرمزية (QSP Framework)
        </h3>
        <EquationCard equations={algebra} />
      </div>

      {/* Independent Page View Mode (Fullscreen Journal Article) */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-[#0b1121] overflow-hidden animate-fadeIn flex flex-col">
           {/* Navigation Toolbar - Fixed High Z-Index */}
           <div className="flex-none bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 p-4 md:px-16 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-[10001]">
              <button 
                onClick={() => { setIsFullscreen(false); }}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-all bg-slate-800 hover:bg-slate-700 px-4 py-2 md:px-5 md:py-2.5 rounded-xl border border-slate-700"
              >
                <ArrowRight size={22} />
                <span className="font-bold font-amiri text-lg">خروج</span>
              </button>
              
              <div className="hidden lg:flex flex-col items-center">
                 <h1 className="text-amber-500 font-bold font-amiri text-2xl drop-shadow-md">دراسة شرعية تأصيلية</h1>
                 <span className="text-[10px] font-mono text-slate-500 tracking-[0.5em] uppercase mt-1">QSP_SUNNAN_MANUSCRIPT_L24</span>
              </div>

              <div className="flex items-center gap-3">
                 <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-xl transition-all font-bold"
                 >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    <span className="hidden sm:inline">نسخ المقال</span>
                 </button>
              </div>
           </div>

           {/* Scrollable Content Container - With Top Padding for Header */}
           <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0b1121]">
             <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-20 lg:py-28 space-y-24">
                
                {/* Journal Title Page - Extra spacing to avoid overlap */}
                <div className="text-center space-y-10 pb-20 border-b border-slate-800/50 animate-fadeInUp mt-4">
                   <div className="inline-flex items-center gap-3 px-6 py-2 bg-amber-600/10 text-amber-500 border border-amber-600/30 rounded-full text-sm font-bold tracking-[0.2em] uppercase font-mono mb-4">
                      <Scroll size={16} />
                      Research Manuscript
                   </div>
                   <h2 className="text-4xl md:text-7xl font-bold text-white font-amiri leading-[1.2] tracking-tight">{result.title}</h2>
                   <div className="flex flex-col items-center gap-4">
                      <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">Center for Quranic Strategic Studies</p>
                      <div className="w-24 h-1 bg-amber-600 rounded-full"></div>
                      <p className="text-slate-400 font-amiri text-3xl md:text-5xl italic font-bold opacity-90 py-8">
                          ﴿ {result.coreVerse} ﴾
                      </p>
                   </div>
                </div>

                {/* 1. Introduction - Fiqh Style */}
                <article className={`transition-all duration-1000 transform ${animStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                   <div className="flex items-center gap-6 mb-12 group cursor-default">
                      <div className="w-2 h-12 bg-amber-600 group-hover:h-16 transition-all duration-500 rounded-full"></div>
                      <h4 className="text-3xl md:text-4xl font-bold text-amber-500 font-amiri group-hover:translate-x-2 transition-transform hover:text-amber-400">توطئة المقال والتأصيل الكلي</h4>
                   </div>
                   <div className="text-2xl md:text-3xl text-slate-200 leading-[2.3] text-justify font-amiri space-y-10">
                      {article.intro.split('\n').map((para, i) => (
                        <p key={i} className="font-medium indent-8">{para}</p>
                      ))}
                   </div>
                </article>

                {/* 2. Forecasting (فقه المآلات) */}
                <article className={`transition-all duration-1000 delay-200 transform ${animStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                   <div className="flex items-center gap-6 mb-12 group cursor-default">
                      <div className="w-2 h-12 bg-emerald-600 group-hover:h-16 transition-all duration-500 rounded-full"></div>
                      <h4 className="text-3xl md:text-4xl font-bold text-emerald-500 font-amiri group-hover:translate-x-2 transition-transform hover:text-emerald-400">المبحث الأول: الاستبصار السنني وفقه المآلات</h4>
                   </div>
                   <div className="bg-slate-900/40 p-10 md:p-16 rounded-[3rem] border border-slate-800 text-slate-300 text-2xl md:text-3xl leading-[2.3] text-justify font-amiri shadow-inner relative">
                      <div className="absolute top-0 right-0 p-6 opacity-5"><Activity size={80} /></div>
                      {article.forecasting.split('\n').map((para, i) => (
                        <p key={i} className="mb-8 last:mb-0 font-medium">{para}</p>
                      ))}
                   </div>
                </article>

                {/* 3. Modeling (فقه الأسباب) */}
                <article className={`transition-all duration-1000 delay-400 transform ${animStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                   <div className="flex items-center gap-6 mb-12 group cursor-default">
                      <div className="w-2 h-12 bg-cyan-600 group-hover:h-16 transition-all duration-500 rounded-full"></div>
                      <h4 className="text-3xl md:text-4xl font-bold text-cyan-500 font-amiri group-hover:translate-x-2 transition-transform hover:text-cyan-400">المبحث الثاني: النمذجة السننية وفقه الأسباب والعلل</h4>
                   </div>
                   <div className="bg-slate-900/40 p-10 md:p-16 rounded-[3rem] border border-slate-800 text-slate-300 text-2xl md:text-3xl leading-[2.3] text-justify font-amiri shadow-inner relative border-r-8 border-r-cyan-600/30">
                      <div className="absolute bottom-0 left-0 p-6 opacity-5"><FileText size={80} /></div>
                      {article.modeling.split('\n').map((para, i) => (
                        <p key={i} className="mb-8 last:mb-0 font-medium">{para}</p>
                      ))}
                   </div>
                </article>

                {/* 4. Remedies (فقه الاستدراك) */}
                <article className={`transition-all duration-1000 delay-600 transform ${animStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                   <div className="flex items-center gap-6 mb-12 group cursor-default">
                      <div className="w-2 h-12 bg-amber-500 group-hover:h-16 transition-all duration-500 rounded-full"></div>
                      <h4 className="text-3xl md:text-4xl font-bold text-amber-500 font-amiri group-hover:translate-x-2 transition-transform hover:text-amber-400">المبحث الثالث: مسارات النجاة وفقه الاستدراك والإنابة</h4>
                   </div>
                   <div className="bg-amber-900/5 p-10 md:p-16 rounded-[3rem] border border-amber-900/20 text-slate-200 text-2xl md:text-3xl leading-[2.3] text-justify font-amiri shadow-2xl relative">
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 p-6 opacity-5"><CheckCircle size={100} /></div>
                      {article.remedies.split('\n').map((para, i) => (
                        <p key={i} className="mb-8 last:mb-0 font-medium">{para}</p>
                      ))}
                   </div>
                </article>

                {/* Recommendations Footer */}
                <div className={`pt-24 border-t border-slate-800 flex flex-col items-center gap-16 pb-32 transition-all duration-1000 ${animStep >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                   <div className="text-center space-y-4">
                      <h5 className="text-white font-bold text-3xl md:text-4xl font-amiri">توصيات إضافية للمسار الحضاري الآمن</h5>
                      <div className="w-32 h-1 bg-emerald-500 mx-auto rounded-full"></div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      {recommendations.map((rec, i) => (
                         <div key={i} className="flex items-start gap-6 bg-slate-800/40 p-8 rounded-3xl border border-slate-800 transition-all hover:bg-slate-800/60 hover:border-emerald-500/40 group">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 font-bold shrink-0 mt-1 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg">
                               {i+1}
                            </div>
                            <p className="text-slate-300 text-xl md:text-2xl font-amiri leading-relaxed">{rec}</p>
                         </div>
                      ))}
                   </div>
                   
                   <div className="flex flex-col items-center gap-6 mt-12 pb-12">
                       <button 
                          onClick={() => { setIsFullscreen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-16 py-6 rounded-2xl font-bold transition-all shadow-2xl border border-slate-700 text-xl font-amiri"
                       >
                          <ArrowRight size={24} />
                          إغلاق صفحة المقال والعودة
                       </button>
                       <p className="text-slate-600 font-mono text-xs uppercase tracking-widest pb-10">End of Manuscript — QSP Project 2025</p>
                   </div>
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
