/* Marketing content ported verbatim from the prototype. Every string stays a
   [arabic, english] pair so getP(locale) can pick a side without reshaping. */
import type { IconName } from "./icons";
import type { DictKey } from "./dictionary";

type Pair = readonly [string, string];


export type Step = { t: Pair; d: Pair; m: Pair };
export type Plan = {
  n: Pair; a: Pair; f2: Pair; f: readonly Pair[];
  cta: DictKey; free?: number; hot?: number;
};
export type Faq = { q: Pair; a: Pair };
export type Integration = {
  i: IconName; n: Pair; d: Pair; k?: number; live?: number;
};
export type Channel = { i: IconName; n: Pair; k?: number };

export const STEPS: readonly Step[] = [
 {t:["اربط قنواتك","Connect your channels"],
  d:["ثبّت رداد من متجر تطبيقات سلة أو زد بنقرة واحدة، أو امسح رمز واتساب لربط رقمك.",
     "Install Radad from the Salla or Zid app store in one click, or scan a WhatsApp code."],m:["دقيقتان","2 minutes"]},
 {t:["درّب رداد","Train Radad"],
  d:["يسحب كتالوجك وأسعارك وسياسة الاسترجاع تلقائياً ويبني قاعدة معرفته. راجعها وأضف ما ينقصها.",
     "It pulls your catalogue, prices, and return policy automatically. Review and add what's missing."],m:["نصف ساعة","30 minutes"]},
 {t:["راقب، ثم تدخّل","Watch, then step in"],
  d:["شغّله على قناة واحدة أولاً وراقب الردود. حين تطمئن، وسّعه على بقية القنوات.",
     "Run it on one channel first and watch. Once comfortable, extend to the rest."],m:["مستمر","Ongoing"]}];

export const PLANS: readonly Plan[] = [
 {n:["الأساسية","Basic"],a:["0","0"],free:1,cta:"p_start",
  f2:["لتجربة رداد على متجر واحد دون التزام.","To try Radad on one store with no commitment."],
  f:[["مؤسسة واحدة","1 organisation"],["موظفان","2 agents"],["500 رصيد ذكاء شهرياً","500 AI credits/mo"],["500 محادثة شهرياً","500 conversations/mo"],["كل القنوات","All channels"],["دعم عبر البريد","Email support"]]},
 {n:["الاحترافية","Professional"],a:["179","179"],hot:1,cta:"p_choose",
  f2:["للمتاجر النامية التي تدير أكثر من علامة أو فرع.","For growing stores running more than one brand."],
  f:[["3 مؤسسات","3 organisations"],["5 موظفين لكل مؤسسة","5 agents each"],["5,000 رصيد ذكاء شهرياً","5,000 AI credits/mo"],["10,000 محادثة شهرياً","10,000 conversations/mo"],["تجاوز بـ 0.10 لكل رصيد","Overage at 0.10/credit"],["قاعدة معرفة","Knowledge base"],["بناء المسارات بدون كود","No-code flows"],["دعم ذو أولوية","Priority support"]]},
 {n:["المتقدّمة","Advanced"],a:["349","349"],cta:"p_choose",
  f2:["لفرق خدمة العملاء الكبيرة وحجم المحادثات المرتفع.","For larger teams and high conversation volume."],
  f:[["10 مؤسسات","10 organisations"],["20 موظفاً لكل مؤسسة","20 agents each"],["25,000 رصيد ذكاء شهرياً","25,000 AI credits/mo"],["50,000 محادثة شهرياً","50,000 conversations/mo"],["تجاوز بـ 0.08 لكل رصيد","Overage at 0.08/credit"],["وصول كامل لواجهة البرمجة","Full API access"],["تحليلات متقدّمة","Advanced analytics"]]},
 {n:["المؤسسات","Enterprise"],a:["999","999"],cta:"p_talk",
  f2:["لمن يحتاج حدوداً مفتوحة واتفاقية مستوى خدمة.","For teams needing open limits and an SLA."],
  f:[["بلا حدّ للمؤسسات والموظفين","Unlimited orgs and agents"],["رصيد ذكاء مفتوح","Open AI credits"],["محادثات بلا حدّ","Unlimited conversations"],["مدير حساب مخصّص","Dedicated manager"],["اتفاقية مستوى خدمة","SLA guarantee"],["إعداد ونقل بيانات","Onboarding and migration"]]}];

export const FAQ: readonly Faq[] = [
 {q:["هل يفهم رداد اللهجة الخليجية فعلاً؟","Does Radad really understand Gulf dialect?"],
  a:["نعم. دُرّب على محادثات تجارة إلكترونية عربية حقيقية، ويتعامل مع الخليجية والمصرية والشامية والفصحى. وحين لا يفهم سؤالاً لا يخمّن — يحوّله إلى موظّف.","Yes. Trained on real Arabic e-commerce conversations, handling Gulf, Egyptian, Levantine, and MSA. When it doesn't understand, it hands over rather than guessing."]},
 {q:["ما هو “رصيد الذكاء”؟","What is an “AI credit”?"],
  a:["كل رد يولّده الذكاء الاصطناعي يستهلك رصيداً واحداً. الردود الجاهزة والمسارات اليدوية لا تستهلك رصيداً. متجر متوسط يستهلك بين 1,500 و4,000 شهرياً.","Each AI-generated reply uses one credit. Canned replies and manual flows use none. A mid-sized store typically uses 1,500–4,000 a month."]},
 {q:["ماذا يحدث حين ينفد الرصيد؟","What happens when credits run out?"],
  a:["لا تتوقّف المحادثات. تتحوّل تلقائياً إلى فريقك، ويصلك تنبيه قبل النفاد بوقت كافٍ للترقية.","Conversations don't stop — they route to your team automatically, and you're alerted well before you run out."]},
 {q:["هل أحتاج مبرمجاً للتركيب؟","Do I need a developer to install it?"],
  a:["لا، إن كان متجرك على سلة أو زد — التثبيت بنقرة. تحتاج مبرمجاً فقط لربط رداد بنظام داخلي عبر واجهة البرمجة.","No, if your store is on Salla or Zid — one click. You only need a developer to wire Radad into an internal system via the API."]},
 {q:["أين تُخزَّن بيانات عملائي؟","Where is my customer data stored?"],
  a:["مشفّرة أثناء النقل والتخزين، مع توافق مع اللائحة العامة لحماية البيانات. لمتطلّبات الإقامة المحلية للبيانات في السعودية، تواصل معنا قبل الاشتراك.","Encrypted in transit and at rest, with GDPR alignment. For Saudi data-residency requirements, contact us before subscribing."]},
 {q:["هل أستطيع الإلغاء في أي وقت؟","Can I cancel any time?"],
  a:["نعم، دون رسوم إلغاء ودون التزام سنوي. تبقى محادثاتك متاحة للتصدير 30 يوماً بعد الإلغاء.","Yes — no cancellation fee, no annual lock-in. Conversations stay exportable for 30 days."]}];

export const INTS: readonly Integration[] = [
 {i:"store",k:1,n:["سلة","Salla"],live:1,d:["تكامل أصلي من متجر تطبيقات سلة. يقرأ رداد المنتجات والطلبات والعملاء مباشرة.","Native install from the Salla app store. Radad reads products, orders and customers directly."]},
 {i:"store",k:1,n:["زد","Zid"],live:1,d:["ربط مباشر بمتجر زد: مزامنة الكتالوج وحالة الطلب داخل المحادثة.","Direct Zid connection: catalogue sync and order status inside the conversation."]},
 {i:"store",k:1,n:["Shopify","Shopify"],live:1,d:["اربط متجرك على Shopify لإدارة المنتجات والطلبات والعملاء من خلال المساعد الذكي.","Connect your Shopify store to manage products, orders and customers through the AI agent."]},
 {i:"store",k:1,n:["WooCommerce","WooCommerce"],live:1,d:["اربط متجرك على WooCommerce لإدارة المنتجات والطلبات والعملاء من خلال المساعد الذكي.","Connect your WooCommerce store to manage products, orders and customers through the AI agent."]},
 {i:"wa",k:1,n:["واتساب للأعمال","WhatsApp Business"],live:1,d:["عبر واجهة واتساب الرسمية للأعمال، مع قوالب معتمدة وردود آلية بالعربي.","Through the official WhatsApp Business API, with approved templates and Arabic auto-replies."]},
 {i:"wa",n:["واتساب ويب","WhatsApp Web"],live:1,d:["اربط رقمك بمسح رمز QR — مناسب للمشاريع الصغيرة قبل اعتماد الواجهة الرسمية.","Link your number by scanning a QR code — suited to small teams before adopting the official API."]},
 {i:"msgr",n:["ماسنجر","Messenger"],live:1,d:["محادثات صفحة فيسبوك بكامل سياقها، مع نفس مسارات الأتمتة.","Facebook Page conversations with full context and the same automation flows."]},
 {i:"tg",n:["تيليجرام","Telegram"],live:1,d:["بوت تيليجرام مربوط بكتالوجك، مناسب لإشعارات الطلب والتذكيرات.","A Telegram bot wired to your catalogue — good for order notifications and reminders."]},
 {i:"mail",n:["البريد الإلكتروني","Email"],live:1,d:["أرسل واستقبل من عنوانك عبر SMTP أو SendGrid أو Mailgun، في نفس صندوق الوارد.","Send and receive from your own address over SMTP, SendGrid or Mailgun — same inbox."]},
 {i:"chat",n:["شات الموقع","Web chat"],live:1,d:["ودجت خفيفة تُضاف بسطر واحد في إعدادات متجرك، بلا أثر يُذكر على سرعة الصفحة.","A light widget added with one line in your storefront settings, with negligible page-speed cost."]},
 {i:"voice",n:["المكالمات الصوتية","Voice calls"],live:0,d:["وكيل صوتي يرد على المكالمات بالعربي، مع تسجيل وتحليلات. قيد التجربة حالياً.","A voice agent that answers calls in Arabic, with recording and analytics. Currently in beta."]},
 {i:"sheet",n:["جداول Google","Google Sheets"],live:1,d:["اربط جداولك ليقرأ منها الوكيل ويحدّثها — أسعار، مخزون، حجوزات.","Connect your sheets so the agent can read and update them — prices, stock, bookings."]},
 {i:"code",n:["واجهة البرمجة","REST API"],live:1,d:["واجهة برمجة كاملة وويب هوكس لربط رداد بنظامك الداخلي أو مخزونك أو شركة الشحن.","A full REST API and webhooks to wire Radad into your internal system, inventory or courier."]}
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
