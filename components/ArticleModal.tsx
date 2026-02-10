import React from 'react';
import { X, ScrollText, Feather } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f172a] border border-amber-900/30 w-full max-w-3xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Decorative pattern */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Feather size={120} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/80">
          <h2 className="text-2xl font-bold text-amber-500 font-amiri flex items-center gap-3">
            <ScrollText size={24} />
            التأصيل الشرعي لمنهج الاستشراف
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#0b1121] custom-scrollbar text-lg leading-relaxed text-slate-300 font-amiri text-justify">
          
          <div className="mb-8 border-b border-slate-800 pb-6">
            <h1 className="text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-600 mb-6">
              هندسة السنن: من فقه التوقع إلى حتمية النتيجة
            </h1>
            <p className="text-slate-400 text-center text-base italic">
              "قراءة في القوانين الكونية بلغة الشرع لا بلغة الرقم"
            </p>
          </div>

          <div className="space-y-10">
            
            {/* Section 1 */}
            <section>
              <h3 className="text-xl font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span className="text-amber-500">❖</span>
                أولاً: التحليل الاستشرافي (فقه المآلات وبصيرة السنن)
              </h3>
              <p className="mb-4">
                إن ما نطلق عليه في لغة العصر "التحليل الاستشرافي" ليس ضرباً من التنجيم أو ادعاءً للغيب المحجوب، بل هو في ميزان الشرع باب من أبواب <strong>"فقه المآلات"</strong> و <strong>"الاعتبار"</strong>. 
                فقد أمر الله عباده بالسير في الأرض والنظر في عواقب الأمم، لا لمجرد السرد التاريخي، بل لاستنباط <strong>"السنن الجارية"</strong> التي لا تتبدل ولا تتحول.
              </p>
              <p>
                إن الاستشراف هنا يعني تلمّس مواقع أقدام السنن في واقع الناس؛ فمن رأى مقدمات الطغيان والفساد (وهي المُدخلات)، أيقن بحلول العقاب أو الزوال (وهي المخرجات)، يقيناً كيقيننا بأن النار تحرق، عملاً بقاعدة: <strong>"إذا وُجد السبب وانتفى المانع، وجب المسبَّب"</strong>. هو علم يبحث في سنن الله التي أجراها في خلقه، ليكون المؤمن على بصيرة من أمره، غير متفاجئ بنوازل الدهر.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="text-xl font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span className="text-amber-500">❖</span>
                ثانياً: النمذجة (الميزان القسط وقانون التلازم)
              </h3>
              <p className="mb-4">
                حين نتحدث عن "النمذجة الرياضية" للسنن، فإننا نعني بها شرعاً <strong>"ضبط التلازم بين المقدمات والنتائج"</strong>. فالكون ليس متروكاً للعبث، بل قام بـ <strong>"الميزان"</strong>.
                كل حركة في هذا الوجود، سواء كانت إيماناً أو كفراً، عدلاً أو ظلماً، هي "وزن" يوضع في كفة ميزان الحضارة.
              </p>
              <p>
                ويمكن التعبير عن التفاعلات المعقدة بمفهوم <strong>"الشروط والموانع"</strong>:
                <br />
                - <strong>اجتماع الخصال (الجمع):</strong> كقولنا أن التمكين لا يحصل إلا باجتماع "الإيمان" مع "العمل الصالح"، فلا يغني أحدهما عن الآخر.
                <br />
                - <strong>تدافع القوى (الضرب والتفاعل):</strong> كاجتماع "العلم" مع "الظلم"، فإنه يولد طغياناً مركباً أشد نكالة، وهو ما نسميه بلغة العصر "التفاعل السنني".
                <br />
                إن المعادلات هنا ليست إلا ترجمة لقوله تعالى: ﴿إِنَّ اللَّهَ لا يُغَيِّرُ مَا بِقَوْمٍ حَتَّى يُغَيِّرُوا مَا بِأَنفُسِهِمْ﴾، فهي علاقة شرطية صارمة بين متغير داخلي وحال خارجي.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="text-xl font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span className="text-amber-500">❖</span>
                ثالثاً: المسارات التصحيحية (واجبات الاستدراك وفقه الإصلاح)
              </h3>
              <p className="mb-4">
                لا يكتفي هذا العلم بتوصيف الداء، بل غايته القصوى هي <strong>"الإصلاح"</strong>. المسارات التصحيحية هي الترجمة العملية لمفهوم <strong>"التوبة الحضارية"</strong> و <strong>"الاستدراك"</strong>.
              </p>
              <p>
                فإذا أشارت السنن إلى قرب الهلاك بسبب شيوع الظلم (وهو مؤشر خطر)، فإن المسار التصحيحي يكون بـ <strong>"الأمر بالمعروف والنهي عن المنكر"</strong> و <strong>"إقامة القسط"</strong>، لتفكيك أسباب الهلاك قبل وقوعه.
                إن القدر المعلق بالدعاء والعمل الصالح يدافع القدر النازل بالذنب والتقصير، وهذه هي حقيقة "المسارات التصحيحية": الفرار من قدر الله إلى قدر الله، ومن سخطه إلى رضاه، عبر تفعيل أدوات التغيير التي أمر بها الوحي.
              </p>
            </section>

            <div className="bg-slate-800/50 p-6 rounded-xl border-r-4 border-amber-600 mt-8">
              <h4 className="font-bold text-amber-500 mb-2">الخلاصة</h4>
              <p className="text-sm text-slate-400">
                هذا النظام هو محاولة لترجمة "فقه السنن" إلى لغة العصر المنضبطة، لننتقل من الوعظ العاطفي المجرد إلى الوعي السنني المنضبط، فندرك كيف تجري مقادير الله في الأمم، وكيف نتقي مصارع السوء بفقه الأسباب.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
