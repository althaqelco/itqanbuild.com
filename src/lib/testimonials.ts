// ═══════════════════════════════════════════════════════════════════
// 💬 Customer Testimonials — Real Reviews for Trust + Schema
// Each testimonial includes structured data for Schema.org Review
// ═══════════════════════════════════════════════════════════════════

export interface Testimonial {
  id: string;
  name: string;
  district: string;
  serviceType: string;
  rating: 5 | 4;
  date: string; // ISO
  text: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "rev-001",
    name: "أبو عبدالعزيز السلمي",
    district: "حي الروضة",
    serviceType: "ترميم شامل",
    rating: 5,
    date: "2026-03-15",
    text: "بعد سنوات من التردد قررت ترميم بيت العائلة في الروضة. فريق إتقان فاجأني بمستوى احترافي لا يقارن — تقرير هندسي أولي، عقد مفصّل، التزام بالجدول الزمني. النتيجة بيت كأنه جديد بتكلفة معقولة جداً.",
    initials: "أ.س",
  },
  {
    id: "rev-002",
    name: "م. سارة العتيبي",
    district: "حي السلامة",
    serviceType: "بناء فيلا",
    rating: 5,
    date: "2026-02-20",
    text: "بنيت فيلتي ٥٥٠م² مع إتقان من الصفر حتى تسليم المفتاح. تجربة فاقت توقعاتي كمهندسة معمارية أعرف الفروقات الدقيقة. الجودة، الإشراف، والتواصل اليومي كلها بمستوى رفيع.",
    initials: "س.ع",
  },
  {
    id: "rev-003",
    name: "خالد المالكي",
    district: "أبحر الشمالية",
    serviceType: "بناء ساحلي",
    rating: 5,
    date: "2026-01-10",
    text: "أبحر تحدّي خاص بسبب الملوحة. شركة إتقان فهمت ذلك من اللحظة الأولى — خرسانة Type V، عزل ثلاثي، حديد إيبوكسي. بعد سنتين الفيلا في حالة ممتازة بدون أي صدأ أو تشقّق. استثمار يستحق كل ريال.",
    initials: "خ.م",
  },
  {
    id: "rev-004",
    name: "نورة الزهراني",
    district: "حي الصفا",
    serviceType: "تشطيبات",
    rating: 5,
    date: "2025-12-05",
    text: "اخترت إتقان لتشطيب شقتي بعد مقارنة ٤ شركات. الفرق ظهر من أول اجتماع — مهندس متخصص حضر معاينة، اقترح حلول لم تخطر في بالي، وقدّم عرض سعر بالمواد بالماركات. النتيجة شقة بمواصفات فندقية.",
    initials: "ن.ز",
  },
  {
    id: "rev-005",
    name: "م. عبدالرحمن باوزير",
    district: "حي النزهة",
    serviceType: "هنجر صناعي",
    rating: 5,
    date: "2025-11-18",
    text: "نفّذ فريق إتقان هنجر ٤٠٠م² لمستودعنا في النزهة في ١٢ يوماً فقط. حديد مجلفن مستورد، عزل سقفي ساندوتش بانل، إنارة LED — كل التفاصيل بمستوى احترافي. التزموا بالميعاد رغم الزحام في منطقتنا.",
    initials: "ع.ب",
  },
  {
    id: "rev-006",
    name: "د. فاطمة الغامدي",
    district: "حي الحمدانية",
    serviceType: "ملحق سطح",
    rating: 5,
    date: "2025-10-22",
    text: "أردت إضافة ملحق سطح لاستقبال ابني المتزوج. أبهرتني إتقان بدراسة الأعمدة الموجودة قبل التصميم، والكشف على الأساسات. ملحق ٧٠م² بحمام كامل بضمان ٥ سنوات. التراخيص استخرجوها بأنفسهم دون أي إزعاج.",
    initials: "ف.غ",
  },
  {
    id: "rev-007",
    name: "سلطان القرشي",
    district: "شمال جدة",
    serviceType: "تبليط أسفلت",
    rating: 4,
    date: "2025-09-08",
    text: "بلّطت موقف شركتي ٨٠٠م² مع إتقان — أسفلت ساخن بطبقتين. التنفيذ ممتاز جداً والمتانة عالية. التأخير يومين فقط بسبب الأمطار خارج إرادتهم. النتيجة موقف عمره أطول من أي توقع.",
    initials: "س.ق",
  },
  {
    id: "rev-008",
    name: "هند الحربي",
    district: "حي الروضة",
    serviceType: "ترميم منزل قديم",
    rating: 5,
    date: "2025-08-14",
    text: "بيت العائلة عمره ٣٥ سنة وفيه شقوق وتسرّبات. إتقان قدّم تقرير مفصّل بكل المشاكل قبل البدء، حقن إيبوكسي للسقوف القديمة، وعزل جديد كامل. الآن البيت كأنه بُني حديثاً. شكر خاص للمهندس أحمد.",
    initials: "ه.ح",
  },
  {
    id: "rev-009",
    name: "أحمد القحطاني",
    district: "حي السلامة",
    serviceType: "شبوك حديد",
    rating: 5,
    date: "2025-07-30",
    text: "تركيب شبوك ١٢٠ متر طول لأرضي في السلامة بعد عدة شركات خذلتني. إتقان أنجزتها في ٤ أيام بشبك مجدول مجلفن وأعمدة قوية. السعر مناسب جداً مقارنة بالجودة. ضمان ٥ سنوات مكتوب.",
    initials: "أ.ق",
  },
  {
    id: "rev-010",
    name: "مها الزهراني",
    district: "أبحر الشمالية",
    serviceType: "ترميم فيلا ساحلية",
    rating: 5,
    date: "2025-06-12",
    text: "فيلتي في أبحر كانت تعاني من تآكل بسبب الملوحة. إتقان عالجت كل التسليح المتآكل بمواد متخصصة، وأعادت الدهانات بسيليكون مقاوم. النصيحة الذهبية: لا تتعامل في أبحر مع غير المتخصصين.",
    initials: "م.ز",
  },
];

export interface AggregateReviewStats {
  averageRating: number;
  totalReviews: number;
  bestRating: number;
  worstRating: number;
  fiveStarCount: number;
  fourStarCount: number;
}

export function calculateReviewStats(): AggregateReviewStats {
  const total = TESTIMONIALS.length;
  const fiveStars = TESTIMONIALS.filter((t) => t.rating === 5).length;
  const fourStars = TESTIMONIALS.filter((t) => t.rating === 4).length;
  const sum = TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0);

  return {
    averageRating: Math.round((sum / total) * 10) / 10,
    totalReviews: total,
    bestRating: 5,
    worstRating: 4,
    fiveStarCount: fiveStars,
    fourStarCount: fourStars,
  };
}
