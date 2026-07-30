/* Scripted dialect demo. Labelled "عرض توضيحي" in the UI — these are
   authored sample exchanges, not recordings of a live model. */

type Pair = readonly [string, string];

export type DemoQ = { q: Pair; a: Pair };
export type Dialect = { k: Pair; qs: readonly DemoQ[] };

export const DIA: readonly Dialect[] = [
 {k:["خليجي","Gulf"],qs:[
   {q:["وين طلبي يالغالي؟","Where's my order?"],
    a:["طلبك رقم 4821 وصل الرياض اليوم، ويوصلك بكرة قبل 6 مساءً. تبي رابط التتبّع؟",
       "Order 4821 reached Riyadh today and arrives tomorrow before 6 PM. Want the tracking link?"]},
   {q:["عندكم توصيل نفس اليوم للدمام؟","Same-day delivery to Dammam?"],
    a:["للدمام التوصيل يومين عمل، والشحن مجاني فوق 200 ر.س 👍",
       "Dammam takes two working days, and shipping is free over SAR 200 👍"]},
   {q:["أبغى أرجع القطعة، ما ناسبتني","I want to return this, it doesn't fit"],
    a:["ولا يهمّك — الاستبدال والاسترجاع مجاني خلال 14 يوم. أرفع لك الطلب الحين؟",
       "No problem — returns and exchanges are free within 14 days. Shall I open the request now?"]}]},
 {k:["مصري","Egyptian"],qs:[
   {q:["الأوردر بتاعي وصل فين؟","Where has my order got to?"],
    a:["أوردرك رقم 4821 خرج من المخزن امبارح، ومتوقّع يوصلك بكره قبل 6 بالليل 🌿",
       "Order 4821 left the warehouse yesterday, expected to reach you tomorrow before 6 PM 🌿"]},
   {q:["فيه مقاس L لسه موجود؟","Is size L still available?"],
    a:["أيوه لسه متوفر، وده اللينك المباشر للمنتج 👇","Yes, still in stock — here's the direct link 👇"]}]},
 {k:["شامي","Levantine"],qs:[
   {q:["كيف بقدر إرجّع الطلبية؟","How can I return the order?"],
    a:["بتقدر ترجّعها خلال 14 يوم مجاناً. بس اكتبلي رقم الطلب وبفتحلك طلب إرجاع فوراً.",
       "You can return it free within 14 days. Just send me the order number and I'll open a return right away."]},
   {q:["شو أسعار الشحن عندكم؟","What are your shipping rates?"],
    a:["الشحن الداخلي 25 ر.س، ومجاني فوق 200 ر.س. الخليج 45 ر.س.",
       "Domestic shipping is SAR 25, free over SAR 200. Gulf countries SAR 45."]}]},
 {k:["فصحى","MSA"],qs:[
   {q:["ما هي سياسة الاستبدال لديكم؟","What is your exchange policy?"],
    a:["يمكنك الاستبدال أو الاسترجاع خلال 14 يوماً من الاستلام، بشرط أن تكون القطعة بحالتها الأصلية.",
       "You may exchange or return within 14 days of delivery, provided the item is in its original condition."]},
   {q:["هل تتوفّر خدمة الدفع عند الاستلام؟","Do you offer cash on delivery?"],
    a:["نعم، الدفع عند الاستلام متاح داخل المملكة برسوم إضافية قدرها 15 ر.س.",
       "Yes, cash on delivery is available inside the Kingdom for an extra SAR 15."]}]}
];

/** Routes a free-typed question to the nearest scripted answer.
    d = dialect index, i = question index within it. */
export const MATCH: readonly { re: RegExp; d: number; i: number }[] = [
 {re:/طلب|اورد|أورد|order|شحن|توصيل|deliver|ship|وين|فين/i,d:0,i:0},
 {re:/مقاس|size|متوفر|stock|لون|colou?r/i,d:1,i:1},
 {re:/ارجاع|إرجاع|ارجع|أرجع|استبدال|return|exchange|refund/i,d:2,i:0},
 {re:/سعر|price|كم|تكلف|cost|دفع|payment|فيزا|card/i,d:3,i:1}
];
