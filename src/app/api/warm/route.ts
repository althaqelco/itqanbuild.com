// /api/warm — هدف طلب الإحماء الدوري (Cloud Scheduler كل 5 دقائق).
// الغرض: إبقاء خادم Cloud Run ساخناً مع minInstances: 0 (انظر apphosting.yaml).
// يجب أن يصل الطلب إلى الخادم في كل مرة — لذلك force-dynamic + no-store كي لا
// يردّ عليه الـCDN من الكاش (ردّ مخزَّن = خادم لم يُلمَس = يبرد).
export const dynamic = "force-dynamic";

export function GET() {
  return new Response(null, {
    status: 204,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
