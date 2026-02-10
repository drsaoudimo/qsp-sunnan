
import React, { useState, useRef, useEffect } from 'react';
import { analyzeQSP } from './services/geminiService';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { ReferenceModal } from './components/ReferenceModal';
import { ArticleModal } from './components/ArticleModal';
import { QSPAnalysisResult, AnalysisStatus } from './types';
import { BrainCircuit, Search, Sparkles, BookOpen, AlertCircle, PlayCircle, FileText, ChevronDown, ListFilter, X, Scroll } from 'lucide-react';
import { DEMO_RESULT_AL_ASR } from './data/demoAnalysis';
import { QURAN_SURAHS } from './constants';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<QSPAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'methodology' | 'axioms' | 'theories'>('methodology');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openModal = (tab: 'methodology' | 'axioms' | 'theories') => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const handleAnalyze = async (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const textToProcess = directText || inputText;
    if (!textToProcess.trim()) return;

    setStatus(AnalysisStatus.LOADING);
    setErrorMsg('');
    setResult(null);
    setShowDropdown(false);
    if (directText) setInputText(directText);

    try {
      const data = await analyzeQSP(textToProcess);
      setResult(data);
      setStatus(AnalysisStatus.SUCCESS);
      // Auto-scroll to results
      setTimeout(() => {
        const displayEl = document.getElementById('analysis-result');
        if (displayEl) displayEl.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      console.error(err);
      setStatus(AnalysisStatus.ERROR);
      const msg = err?.message || "";
      if (msg.includes("xhr error") || msg.includes("500")) {
        setErrorMsg("عذراً، تعذر الاتصال بخوادم QSP (خطأ في الشبكة). يرجى التأكد من اتصالك والمحاولة مرة أخرى.");
      } else {
        setErrorMsg("حدث خطأ أثناء معالجة القوانين السننية. يرجى المحاولة لاحقاً.");
      }
    }
  };

  const selectSuggestion = (text: string) => {
    setInputText(text);
    handleAnalyze(undefined, text);
  };

  const filteredSurahs = QURAN_SURAHS.filter(s => 
    !inputText || s.toLowerCase().includes(inputText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b1121] text-slate-200 font-amiri selection:bg-emerald-500/30 pb-16">
      <ReferenceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialTab={modalTab} 
      />
      
      <ArticleModal
        isOpen={isArticleOpen}
        onClose={() => setIsArticleOpen(false)}
      />

      {/* Navbar */}
      <header className="border-b border-slate-800 bg-[#0f172a]/90 backdrop-blur-md sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { setStatus(AnalysisStatus.IDLE); setInputText(''); setResult(null); }}>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-900/40 group-hover:scale-110 transition-transform">
              <BrainCircuit className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white leading-none">
                QSP <span className="text-emerald-500">Engine</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-mono tracking-[0.2em] uppercase mt-1">Quranic Symbolic Prognostics</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8 text-sm md:text-base font-bold text-slate-400">
            <button onClick={() => setIsArticleOpen(true)} className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-all hover:scale-105">
                <Scroll size={20} />
                <span className="hidden md:inline">التأصيل الفقهي</span>
            </button>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <button onClick={() => openModal('methodology')} className="hover:text-emerald-400 transition-colors hidden md:block">منهج QSP</button>
            <button onClick={() => openModal('axioms')} className="hover:text-emerald-400 transition-colors">المسلمات</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 md:py-20">
        
        {/* Hero / Input Section */}
        <div className={`transition-all duration-1000 ${status === AnalysisStatus.SUCCESS ? 'mb-20' : 'min-h-[60vh] flex flex-col justify-center'}`}>
          
          {status === AnalysisStatus.IDLE && (
            <div className="text-center mb-16 space-y-8 animate-fadeIn">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-emerald-900/20 border border-emerald-900/40 text-emerald-400 text-sm md:text-base font-medium mb-4 shadow-inner">
                <Sparkles size={18} />
                <span className="tracking-wide">نظام استنباط القوانين السننية والاجتماعية - QSP AI CORE</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 leading-tight">
                استشراف المسارات<br/>بمنطق الوحي
              </h2>
              <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
                حلل الظواهر الحضارية والسنن الإلهية من خلال الجبر الرمزي ونمذجة تدفقات الوحي في حركة التاريخ.
              </p>
            </div>
          )}

          <div className="max-w-4xl mx-auto w-full relative" ref={dropdownRef}>
            <form onSubmit={handleAnalyze} className="relative group">
              <input
                type="text"
                value={inputText}
                onChange={(e) => { setInputText(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                placeholder="أدخل آية، سورة، أو ظاهرة حضارية (مثال: سورة الرعد)..."
                className="w-full bg-slate-900/40 border-2 border-slate-800 rounded-3xl py-6 md:py-8 pr-16 pl-24 md:pl-48 text-xl md:text-3xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-8 focus:ring-emerald-500/5 transition-all shadow-2xl font-amiri font-bold"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-all scale-125">
                <Search size={30} />
              </div>
              
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                {inputText && (
                    <button 
                        type="button" 
                        onClick={() => { setInputText(''); setShowDropdown(false); }}
                        className="p-2 text-slate-500 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                )}
                <button
                  type="submit"
                  disabled={status === AnalysisStatus.LOADING || !inputText.trim()}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white font-bold py-3 md:py-5 px-6 md:px-12 rounded-2xl transition-all shadow-2xl shadow-emerald-900/30 active:scale-95 flex items-center gap-3 text-lg md:text-2xl border-b-4 border-emerald-700"
                >
                  {status === AnalysisStatus.LOADING ? (
                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Sparkles size={24} />
                      تحليل
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Dropdown Suggestions */}
            {showDropdown && filteredSurahs.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-[#0f172a] border border-slate-700 rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden z-[60] max-h-[400px] overflow-y-auto custom-scrollbar animate-zoomIn border-t-emerald-500/30">
                <div className="p-4 bg-slate-800/60 border-b border-slate-700/50 text-xs font-bold text-slate-500 flex items-center justify-between uppercase tracking-[0.2em] font-mono">
                   <span>نطاقات الاستشراف المقترحة</span>
                   <ListFilter size={14} />
                </div>
                {filteredSurahs.map((surah, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectSuggestion(surah)}
                    className="w-full text-right px-8 py-5 hover:bg-emerald-600/10 hover:text-emerald-400 transition-all border-b border-slate-800/30 flex items-center justify-between group"
                  >
                    <span className="text-xl md:text-2xl font-amiri font-bold group-hover:translate-x-2 transition-transform">{surah}</span>
                    <PlayCircle size={22} className="text-emerald-500/20 group-hover:text-emerald-500 group-hover:scale-125 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {status === AnalysisStatus.IDLE && (
            <div className="mt-16 flex flex-wrap justify-center gap-6 animate-fadeInUp delay-300">
               <button onClick={() => openModal('axioms')} className="flex items-center gap-3 text-base text-slate-400 hover:text-white transition-all bg-slate-800/40 px-6 py-3 rounded-2xl border border-slate-700 hover:border-emerald-500/30 hover:shadow-lg active:scale-95">
                 <BookOpen size={20} className="text-emerald-500" /> المسلمات السننية
               </button>
               <button onClick={() => openModal('theories')} className="flex items-center gap-3 text-base text-slate-400 hover:text-white transition-all bg-slate-800/40 px-6 py-3 rounded-2xl border border-slate-700 hover:border-blue-500/30 hover:shadow-lg active:scale-95">
                 <AlertCircle size={20} className="text-blue-500" /> نظرية الفتنة (SCPT)
               </button>
               <button onClick={() => handleAnalyze(undefined, "تحليل سورة العصر")} className="flex items-center gap-3 text-base text-slate-400 hover:text-white transition-all bg-slate-800/40 px-6 py-3 rounded-2xl border border-slate-700 hover:border-amber-500/30 hover:shadow-lg active:scale-95">
                 <PlayCircle size={20} className="text-amber-500" /> تحليل تجريبي
               </button>
            </div>
          )}
        </div>

        {/* Status Messages */}
        <div className="max-w-5xl mx-auto mb-16">
          {status === AnalysisStatus.LOADING && (
            <div className="text-center space-y-12 py-20 animate-pulse">
              <div className="relative w-32 h-32 mx-auto">
                 <div className="absolute inset-0 border-8 border-emerald-500/10 rounded-full"></div>
                 <div className="absolute inset-0 border-8 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                 <div className="absolute inset-4 border-4 border-emerald-400/20 border-b-transparent rounded-full animate-spin-slow"></div>
              </div>
              <div className="space-y-4">
                <p className="text-4xl font-bold text-emerald-400 font-amiri">جاري استنباط القوانين السننية ومعايرة الميزان...</p>
                <p className="text-slate-500 font-mono text-sm tracking-[0.5em] uppercase">Processing Core Axioms — Matrix Calibration</p>
              </div>
            </div>
          )}

          {status === AnalysisStatus.ERROR && (
            <div className="bg-red-900/10 border-2 border-red-900/40 p-10 md:p-16 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10 animate-zoomIn shadow-2xl">
              <div className="w-24 h-24 bg-red-600/20 rounded-3xl flex items-center justify-center text-red-500 shrink-0 shadow-inner">
                <AlertCircle size={56} />
              </div>
              <div className="text-center md:text-right flex-1">
                <h3 className="text-3xl font-bold text-red-400 mb-4">تعذر استكمال التحليل السنني</h3>
                <p className="text-slate-400 text-xl mb-8 leading-relaxed font-medium">{errorMsg}</p>
                <button 
                    onClick={handleAnalyze} 
                    className="bg-red-600 hover:bg-red-500 text-white px-12 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-2xl shadow-red-900/40 text-lg"
                >
                    إعادة محاولة الربط بالمحرك
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Display */}
        {status === AnalysisStatus.SUCCESS && result && (
          <div id="analysis-result" className="max-w-7xl mx-auto">
            <AnalysisDisplay result={result} />
          </div>
        )}
      </main>

      {/* Sticky Footer */}
      <footer className="container mx-auto px-6 mt-32 text-center space-y-10">
         <div className="flex justify-center items-center gap-10 opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4">
               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
               <span className="text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase text-slate-400">QSP_STABLE_NODE_BUILD_V25</span>
            </div>
         </div>
         <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-loose font-medium italic font-amiri">
           "هذا المحرك لا يقرأ الغيب، بل يقرأ السنن التي هي قوانين الله في كونه وتاريخه، فمن عرف السنن عرف عواقب الأمور قبل وقوعها."
         </p>
         <div className="text-[10px] text-slate-800 font-mono font-bold tracking-widest pb-10">© 2025 QSP STRATEGIC PROJECT — ALL SYSTEMS OPERATIONAL</div>
      </footer>
    </div>
  );
};

export default App;
