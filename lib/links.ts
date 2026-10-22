/* Outbound links into the live product at atheerxai.com. The marketing pages
   here are the design source; sign-up, login and billing live there. */
const APP = "https://atheerxai.com";

export const LINKS = {
  register: `${APP}/register`,
  login: `${APP}/login`,
  salla: "https://apps.salla.sa/ar/app/1952002359",
  privacy: `${APP}/privacy-policy`,
  terms: `${APP}/terms`,
  refund: `${APP}/refund-policy`,
} as const;
