import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ChatAssistant } from "@/components/ChatAssistant";
import { dirOf, getT, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getT(locale);
  /* Built from copy that already shipped — the prototype's <title> and the
     footer tagline — rather than inventing new marketing lines. */
  return {
    title: `${t("brand")} — ${t("hero_1")} ${t("hero_2")}`,
    description: t("ft_tag"),
  };
}

/* Applied before first paint so a dark-mode visitor never sees a white
   flash. Mirrors the boot logic the prototype ran inline. */
const themeBoot = `(function(){try{var t=localStorage.getItem("rd5-theme");if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <html lang={l} dir={dirOf(l)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <Header locale={l} />
        <main id="view">{children}</main>
        <Footer locale={l} />
        <RevealOnScroll />
        <ChatAssistant locale={l} />
      </body>
    </html>
  );
}
