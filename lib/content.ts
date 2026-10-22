/* Marketing content ported verbatim from the prototype. Every string stays a
   [arabic, english] pair so getP(locale) can pick a side without reshaping. */
import type { IconName } from "./icons";

type Pair = readonly [string, string];


export type Step = { t: Pair; d: Pair; m: Pair };
/* lim = [organisations, agents, monthly AI credits]; null reads "Unlimited". */
export type Plan = {
  n: Pair; a: string; f2: Pair; lim: readonly (string | null)[];
  f: readonly Pair[]; trial?: number; hot?: number;
};
export type Faq = { q: Pair; a: Pair };
export type Integration = {
  i: IconName; n: Pair; d: Pair; k?: number; live?: number;
};
export type Channel = { i: IconName; n: Pair; k?: number };

export const STEPS: readonly Step[] = [
 {t:["اربط قنواتك","Connect your channels"],
  d:["ثبّت أثير من متجر تطبيقات سلة بنقرة واحدة، أو امسح رمز واتساب لربط رقمك.",
     "Install Atheer from the Salla app store in one click, or scan a WhatsApp code."],m:["دقيقتان","2 minutes"]},
 {t:["درّب أثير","Train Atheer"],
  d:["يسحب كتالوجك وأسعارك وسياسة الاسترجاع تلقائياً ويبني قاعدة معرفته. راجعها وأضف ما ينقصها.",
     "It pulls your catalogue, prices, and return policy automatically. Review and add what's missing."],m:["نصف ساعة","30 minutes"]},
 {t:["راقب، ثم تدخّل","Watch, then step in"],
  d:["شغّله على قناة واحدة أولاً وراقب الردود. حين تطمئن، وسّعه على بقية القنوات.",
     "Run it on one channel first and watch. Once comfortable, extend to the rest."],m:["مستمر","Ongoing"]}];

/* The three plans live on atheerxai.com, all billed through the Salla app. */
export const PLANS: readonly Plan[] = [
 {n:["الخطة الاحترافية","Pro Plan"],a:"99",trial:1,hot:1,
  f2:["مثالية للفرق الصغيرة التي تحتاج إلى أداء أعلى وميزات متقدمة.","Built for small teams that need more performance and advanced features."],
  lim:["1","5","5,000"],
  f:[["10,000 محادثة شهرياً","10,000 conversations / month"],["ردود مدعومة بالذكاء الاصطناعي","AI-powered responses"],["قاعدة معرفة","Knowledge base"],["أدوات مخصصة","Custom tools"],["تقارير متقدمة","Advanced reports"],["دعم عبر البريد والدردشة","Email and chat support"]]},
 {n:["الخطة المتقدمة","Advanced Plan"],a:"199",
  f2:["مخصصة للفرق الكبيرة التي تحتاج إلى ميزات أتمتة وذكاء اصطناعي موسعة.","Designed for larger teams needing expanded automation and AI capabilities."],
  lim:["1","20","25,000"],
  f:[["50,000 محادثة شهرياً","50,000 conversations / month"],["ردود متقدمة بالذكاء الاصطناعي","Advanced AI responses"],["قاعدة معرفة متقدمة","Advanced knowledge base"],["أدوات وتكاملات مخصصة","Custom tools and integrations"],["وصول API كامل","Full API access"],["تقارير مخصصة","Custom reports"],["دعم أولوية 24/7","24/7 priority support"]]},
 {n:["خطة المؤسسات","Enterprise Plan"],a:"299",
  f2:["للمؤسسات الكبيرة التي تحتاج إلى موارد غير محدودة ودعم مخصص.","For large organizations needing unlimited resources and dedicated support."],
  lim:[null,null,null],
  f:[["محادثات غير محدودة","Unlimited conversations"],["جميع الميزات المتقدمة","All advanced features"],["تكاملات مخصصة","Custom integrations"],["وصول API كامل","Full API access"],["مدير حساب مخصص","Dedicated account manager"],["اتفاقية مستوى الخدمة (SLA)","Service level agreement (SLA)"],["دعم أولوية 24/7","24/7 priority support"]]}];

/* Full list, in the live /faq order. The home page shows the first six. */
export const FAQ: readonly Faq[] = [
 {q:["على أي قنوات يعمل أثير؟","Which channels does Atheer work on?"],
  a:["اليوم على شات الموقع وواتساب — الرسمي وواتساب ويب — والبريد الإلكتروني، بحساب واحد وصندوق محادثات موحّد. ماسنجر وتيليجرام والمكالمات الصوتية قادمة.","Today: web chat, WhatsApp — both Business API and WhatsApp Web — and email, in one account with a single unified inbox. Messenger, Telegram, and voice calls are coming."]},
 {q:["هل يجب أن يكون لديّ متجر إلكتروني؟","Do I need an online store to use it?"],
  a:["لا. أثير يعمل لأي نشاط تجاري عبر شات الموقع أو واتساب. ربط المتجر — سلة اليوم، وزد وشوبيفاي ووكومرس قريباً — يضيف فقط معرفة بالمنتجات والطلبات.","No. Atheer works for any business through web chat or WhatsApp. Connecting a store — Salla today, Zid, Shopify and WooCommerce soon — only adds product and order awareness."]},
 {q:["ماذا يحدث حين يطلب العميل موظفاً؟","What happens when a customer asks for a human?"],
  a:["يدخل الطلب قائمة انتظار يستلمها أي عضو في فريقك، ويصمت الذكاء الاصطناعي طوال تدخّل الموظف. وخارج ساعات عملك يُخبَر العميل بالحقيقة — متى يعود الفريق — لا وعداً مبهماً.","The request enters a queue any member of your team can claim, and the AI stays silent for as long as the human is handling it. Outside your support hours the customer is told the truth — when your team is back — not a vague promise."]},
 {q:["كيف يتعلّم أثير معلومات نشاطي؟","How does Atheer learn about my business?"],
  a:["من قاعدة المعرفة: يقرأ موقعك، ويستوعب ملفاتك ومستنداتك، ويأخذ أسئلتك وأجوبتك الجاهزة. وإن كان متجرك مربوطاً فالكتالوج يُحدَّث تلقائياً.","From its knowledge base: it reads your website, ingests your files and documents, and takes your own Q&A. If a store is connected, the catalogue syncs automatically."]},
 {q:["هل أستطيع التجربة قبل الدفع؟","Can I try it before paying?"],
  a:["نعم. الخطة الأساسية مجانية: 500 رصيد ذكاء و500 محادثة شهرياً، مؤسسة واحدة ووكيلان. الترقية متى احتجت، دون إعادة إعداد.","Yes. The Basic plan is free: 500 AI credits and 500 conversations a month, one organisation and two agents. Upgrade whenever you need to, with no re-setup."]},
 {q:["هل يفهم أثير اللهجة الخليجية فعلاً؟","Does Atheer really understand Gulf dialect?"],
  a:["نعم. دُرّب على محادثات تجارة إلكترونية عربية حقيقية، ويتعامل مع الخليجية والمصرية والشامية والفصحى. وحين لا يفهم سؤالاً لا يخمّن — يحوّله إلى موظّف.","Yes. Trained on real Arabic e-commerce conversations, handling Gulf, Egyptian, Levantine, and MSA. When it doesn't understand, it hands over rather than guessing."]},
 {q:["ما هو “رصيد الذكاء”؟","What is an “AI credit”?"],
  a:["كل رد يولّده الذكاء الاصطناعي يستهلك رصيداً واحداً. الردود الجاهزة والمسارات اليدوية لا تستهلك رصيداً. متجر متوسط يستهلك بين 1,500 و4,000 شهرياً.","Each AI-generated reply uses one credit. Canned replies and manual flows use none. A mid-sized store typically uses 1,500–4,000 a month."]},
 {q:["ماذا يحدث حين ينفد الرصيد؟","What happens when credits run out?"],
  a:["لا تتوقّف المحادثات. تتحوّل تلقائياً إلى فريقك، ويصلك تنبيه قبل النفاد بوقت كافٍ للترقية.","Conversations don't stop — they route to your team automatically, and you're alerted well before you run out."]},
 {q:["هل أحتاج مبرمجاً للتركيب؟","Do I need a developer to install it?"],
  a:["لا، إن كان متجرك على سلة — التثبيت بنقرة. تحتاج مبرمجاً فقط لربط أثير بنظام داخلي عبر واجهة البرمجة.","No, if your store is on Salla — one click. You only need a developer to wire Atheer into an internal system via the API."]},
 {q:["أين تُخزَّن بيانات عملائي؟","Where is my customer data stored?"],
  a:["مشفّرة أثناء النقل والتخزين، مع توافق مع اللائحة العامة لحماية البيانات. لمتطلّبات الإقامة المحلية للبيانات في السعودية، تواصل معنا قبل الاشتراك.","Encrypted in transit and at rest, with GDPR alignment. For Saudi data-residency requirements, contact us before subscribing."]},
 {q:["هل أستطيع الإلغاء في أي وقت؟","Can I cancel any time?"],
  a:["نعم، دون رسوم إلغاء ودون التزام سنوي. تبقى محادثاتك متاحة للتصدير 30 يوماً بعد الإلغاء.","Yes — no cancellation fee, no annual lock-in. Conversations stay exportable for 30 days."]}];

export const PRICING_FAQ: readonly Faq[] = [
 {q:["كيف يتم تفعيل الاشتراك؟","How is the subscription activated?"],
  a:["بعد اختيار الخطة المناسبة، يتم إرسال طلبك للمراجعة وسيقوم فريقنا بتفعيل اشتراكك بعد تأكيد الدفع.","After choosing the right plan, your request is sent for review, and our team activates your subscription once payment is confirmed."]},
 {q:["هل يمكنني تغيير خطتي؟","Can I change my plan?"],
  a:["نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. سيتم تطبيق التغييرات في الفترة التالية للفوترة.","Yes, you can upgrade or downgrade at any time. Changes apply on the next billing cycle."]},
 {q:["ما هي طرق الدفع المتاحة؟","What payment methods are available?"],
  a:["حالياً نقبل الدفع النقدي والتحويل البنكي. سيتم إضافة طرق دفع إلكترونية قريباً.","We currently accept cash and bank transfer. Online payment methods will be added soon."]}];

export const INTS: readonly Integration[] = [
 {i:"store",k:1,n:["سلة","Salla"],live:1,d:["تكامل أصلي من متجر تطبيقات سلة. يقرأ أثير المنتجات والطلبات والعملاء مباشرة.","Native install from the Salla app store. Atheer reads products, orders and customers directly."]},
 {i:"store",k:1,n:["زد","Zid"],live:0,d:["ربط مباشر بمتجر زد: مزامنة الكتالوج وحالة الطلب داخل المحادثة.","Direct Zid connection: catalogue sync and order status inside the conversation."]},
 {i:"store",k:1,n:["Shopify","Shopify"],live:0,d:["اربط متجرك على Shopify لإدارة المنتجات والطلبات والعملاء من خلال المساعد الذكي.","Connect your Shopify store to manage products, orders and customers through the AI agent."]},
 {i:"store",k:1,n:["WooCommerce","WooCommerce"],live:0,d:["اربط متجرك على WooCommerce لإدارة المنتجات والطلبات والعملاء من خلال المساعد الذكي.","Connect your WooCommerce store to manage products, orders and customers through the AI agent."]},
 {i:"wa",k:1,n:["واتساب للأعمال","WhatsApp Business"],live:1,d:["عبر واجهة واتساب الرسمية للأعمال، مع قوالب معتمدة وردود آلية بالعربي.","Through the official WhatsApp Business API, with approved templates and Arabic auto-replies."]},
 {i:"wa",n:["واتساب ويب","WhatsApp Web"],live:1,d:["اربط رقمك بمسح رمز QR — مناسب للمشاريع الصغيرة قبل اعتماد الواجهة الرسمية.","Link your number by scanning a QR code — suited to small teams before adopting the official API."]},
 {i:"msgr",n:["ماسنجر","Messenger"],live:0,d:["محادثات صفحة فيسبوك بكامل سياقها، مع نفس مسارات الأتمتة.","Facebook Page conversations with full context and the same automation flows."]},
 {i:"tg",n:["تيليجرام","Telegram"],live:0,d:["بوت تيليجرام مربوط بكتالوجك، مناسب لإشعارات الطلب والتذكيرات.","A Telegram bot wired to your catalogue — good for order notifications and reminders."]},
 {i:"mail",n:["البريد الإلكتروني","Email"],live:1,d:["أرسل واستقبل من عنوانك عبر SMTP أو SendGrid أو Mailgun، في نفس صندوق الوارد.","Send and receive from your own address over SMTP, SendGrid or Mailgun — same inbox."]},
 {i:"chat",n:["شات الموقع","Web chat"],live:1,d:["ودجت خفيفة تُضاف بسطر واحد في إعدادات متجرك، بلا أثر يُذكر على سرعة الصفحة.","A light widget added with one line in your storefront settings, with negligible page-speed cost."]},
 {i:"voice",n:["المكالمات الصوتية","Voice calls"],live:0,d:["وكيل صوتي يرد على المكالمات بالعربي، مع تسجيل وتحليلات. قيد التجربة حالياً.","A voice agent that answers calls in Arabic, with recording and analytics. Currently in beta."]},
 {i:"sheet",n:["جداول Google","Google Sheets"],live:1,d:["اربط جداولك ليقرأ منها الوكيل ويحدّثها — أسعار، مخزون، حجوزات.","Connect your sheets so the agent can read and update them — prices, stock, bookings."]},
 {i:"code",n:["واجهة البرمجة","REST API"],live:1,d:["واجهة برمجة كاملة وويب هوكس لربط أثير بنظامك الداخلي أو مخزونك أو شركة الشحن.","A full REST API and webhooks to wire Atheer into your internal system, inventory or courier."]}
];

/* The real ContactChannelType enum from the product: phone, email, whatsapp,
   messenger, telegram, widget, voice. Instagram is deliberately absent — it
   is not implemented. */
export const CHANS: readonly Channel[] = [
 {i:"wa",n:["واتساب للأعمال","WhatsApp Business"],k:1},
 {i:"wa",n:["واتساب ويب","WhatsApp Web"],k:1},
 {i:"msgr",n:["ماسنجر","Messenger"]},
 {i:"tg",n:["تيليجرام","Telegram"]},
 {i:"mail",n:["البريد الإلكتروني","Email"]},
 {i:"chat",n:["شات الموقع","Web chat"]},
 {i:"voice",n:["المكالمات الصوتية","Voice calls"]},
 {i:"code",n:["واجهة البرمجة","API"]}
];

/* Business types, one per agent template the product offers when a tenant
   creates an organisation (general, clinic, real estate, restaurant, store).
   `photo` is a file in public/activities/; until it exists the card shows
   its gradient + icon. */
export type Activity = {
  id: string; i: IconName; photo: string;
  n: Pair; d: Pair;
};

export const ACTIVITIES: readonly Activity[] = [
 {id:"store",i:"cart",photo:"store.webp",
  n:["المتاجر الإلكترونية","E-commerce"],
  d:["يجيب المتسوّقين عن المنتجات والطلبات، ويسترجع السلات المتروكة.","Answers shoppers about products and orders, and wins back abandoned carts."]},
 {id:"clinic",i:"clinic",photo:"clinic.webp",
  n:["العيادات","Clinics"],
  d:["يجيب المرضى عن الخدمات والمواعيد، ويستقبل طلبات الحجز على مدار الساعة.","Answers patients about services and hours, and takes booking requests around the clock."]},
 {id:"restaurant",i:"food",photo:"restaurant.webp",
  n:["المطاعم","Restaurants"],
  d:["يرد على أسئلة القائمة وأوقات العمل، ويستقبل طلبات حجز الطاولات.","Handles menu and opening-hours questions, and takes table reservations."]},
 {id:"realestate",i:"building",photo:"realestate.webp",
  n:["العقارات","Real estate"],
  d:["يجيب عن العقارات المتاحة، ويؤهّل المشترين والمستأجرين قبل أن يصلوا لفريقك.","Answers questions on listings, and qualifies buyers and renters before they reach your team."]},
 {id:"general",i:"spark",photo:"general.webp",
  n:["أي نشاط آخر","Any other business"],
  d:["صالون، مكتب خدمات، مركز تدريب… يجيب عمّا تقدّمه ويجمع بيانات المهتمين.","Salons, service offices, training centres… it answers about what you offer and captures leads."]},
];
