
import React from 'react';

interface Props {
  equations: string[];
}

export const EquationCard: React.FC<Props> = ({ equations = [] }) => {
  if (!equations || equations.length === 0) {
    return (
      <div className="bg-black/40 border border-emerald-900/50 rounded-lg p-6 text-slate-500 text-center">
        لم يتم توليد معادلات جبرية لهذا التحليل
      </div>
    );
  }

  return (
    <div className="bg-black/40 border border-emerald-900/50 rounded-lg p-6 font-mono text-left w-full shadow-inner shadow-black/50">
      <h3 className="text-emerald-500 text-sm mb-4 border-b border-emerald-900/50 pb-2 text-right">
        الجبر السنني (Sunnah Algebra)
      </h3>
      <div className="space-y-4">
        {equations.map((eq, index) => (
          <div key={index} className="group relative">
            <div className="absolute -left-4 top-0 text-slate-700 select-none opacity-50 group-hover:opacity-100 transition-opacity">
              [{index + 1}]
            </div>
            <code className="block text-emerald-300 text-base md:text-lg tracking-wider bg-slate-900/30 p-2 rounded hover:bg-slate-900/60 transition-colors cursor-text overflow-x-auto whitespace-pre-wrap dir-ltr">
              {eq}
            </code>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-slate-500 text-right">
        الرموز: H (الحالة)، S (السنن)، ⊥ (الهلاك)، ↑ (التمكين)
      </div>
    </div>
  );
};
