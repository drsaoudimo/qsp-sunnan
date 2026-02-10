
import React, { useState } from 'react';
import { X, Book, Scale, Zap } from 'lucide-react';
import { QSP_AXIOMS, QSP_SYMBOLS, CHAOS_THEORY } from '../data/qspContent';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'methodology' | 'axioms' | 'theories';
}

export const ReferenceModal: React.FC<Props> = ({ isOpen, onClose, initialTab = 'methodology' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-900/50">
          <h2 className="text-2xl font-bold text-emerald-400 font-amiri flex items-center gap-2">
            <Book size={24} />
            المرجع العلمي لنظام QSP
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700 bg-slate-800/30">
          <button
            onClick={() => setActiveTab('methodology')}
            className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'methodology' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-900/10' : 'text-slate-400 hover:text-slate-200'}`}
          >
            المنهجية والرموز
          </button>
          <button
            onClick={() => setActiveTab('axioms')}
            className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'axioms' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-900/10' : 'text-slate-400 hover:text-slate-200'}`}
          >
            الأكسيومات (المسلمات)
          </button>
          <button
            onClick={() => setActiveTab('theories')}
            className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'theories' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-900/10' : 'text-slate-400 hover:text-slate-200'}`}
          >
            النظريات العلمية (Theories)
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-900/50 custom-scrollbar">
          
          {activeTab === 'methodology' && (
            <div className="space-y-8 animate-fadeInUp">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4 border-r-4 border-emerald-500 pr-3">القاموس الرمزي (Symbolic Dictionary)</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  {QSP_SYMBOLS.map((s, i) => (
                    <div key={i} className="bg-slate-800 p-5 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition-colors">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="font-mono text-emerald-400 text-xl font-bold">{s.symbol}</span>
                        <span className="font-bold text-white text-lg">{s.name}</span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed text-justify">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'axioms' && (
            <div className="space-y-8 animate-fadeInUp">
              <div className="bg-emerald-900/10 border border-emerald-900/30 p-4 rounded-lg mb-6">
                <p className="text-emerald-300 text-sm">
                  هذه الأكسيومات (المسلمات) تمثل القوانين الحاكمة لنظام الاستشراف القرآني، وهي مستمدة من استقراء النصوص وتحليل السنن.
                </p>
              </div>
              {Object.entries(QSP_AXIOMS).map(([key, axioms]) => (
                <div key={key}>
                  <h3 className="text-lg font-bold text-emerald-400 mb-3 capitalize flex items-center gap-2 border-b border-slate-700 pb-2">
                    <Scale size={18} />
                    {key} Axioms
                  </h3>
                  <div className="space-y-3">
                    {axioms.map((ax: any, i: number) => (
                      <div key={i} className="flex gap-4 bg-slate-800/50 p-4 rounded-lg hover:bg-slate-800 transition-colors">
                        <span className="font-mono text-emerald-500/70 font-bold min-w-[35px] text-lg">{ax.code}</span>
                        <p className="text-slate-300 leading-relaxed">{ax.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'theories' && (
            <div className="space-y-8 animate-fadeInUp">
              <div className="bg-amber-900/10 border border-amber-900/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-amber-500 mb-2 flex items-center gap-2">
                   <Zap size={20} />
                   نظرية الفتنة والاضطراب السنني (SCPT)
                </h3>
                <p className="text-amber-200/80 leading-relaxed text-lg">
                  {CHAOS_THEORY.definition}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CHAOS_THEORY.types.map((type, i) => (
                  <div key={i} className="bg-slate-800 p-4 rounded-lg text-center border border-slate-700 hover:bg-slate-750 transition-colors">
                    <div className="text-emerald-400 font-bold mb-2">{type.type}</div>
                    <p className="text-xs text-slate-400">{type.desc}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4 border-r-4 border-blue-500 pr-3">الجواذب (Attractors) ومنطقة العمى</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {CHAOS_THEORY.attractors.map((att, i) => (
                    <div key={i} className="bg-slate-800/80 p-5 rounded-xl border border-slate-600 relative overflow-hidden group">
                      <div className={`absolute top-0 left-0 w-1 h-full ${i === 0 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                      <h4 className="font-bold text-lg mb-2 text-white">{att.name}</h4>
                      <p className="text-slate-400 leading-relaxed">{att.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700 text-sm text-slate-400 mt-4">
                  <strong>مبدأ عدم اليقين (Unpredictability):</strong> عندما يقترب النظام من العتبة الحرجة (Critical Threshold)، تصبح النتائج شديدة الحساسية للشروط الأولية، مما يجعل الاستشراف الدقيق مستحيلاً (منطقة الغيب النسبي)، وهنا يعمل الدعاء والصدقة كـ "مغيرات مسار" (Path Shifters) خارج الحسابات المادية.
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
