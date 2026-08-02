# Radad — marketing site

Arabic-first (RTL) Next.js App Router site for radad.online, ported from the
single-file prototype.

```bash
npm run dev     # http://localhost:3000 -> redirects to /ar
npm run build
npm start
```

## Layout

| path | what |
|---|---|
| `app/[locale]/` | the five pages; `locale` is `ar` or `en`, both prerendered |
| `components/` | shell (Header/Footer) and content blocks |
| `components/hero/MessageFlow.tsx` | the hero message band |
| `lib/dictionary.ts` | 158 string pairs, `[arabic, english]` |
| `lib/i18n.ts` | `getT(locale)`, routing helpers, direction |
| `lib/flow.ts` | rail geometry + lane data for the hero band |
| `styles/` | design tokens and component CSS, plain files |
| `public/fonts/` | self-hosted Alexandria + IBM Plex Sans Arabic |

Adding a page means a folder under `app/[locale]/` plus an entry in `routes`
in `lib/i18n.ts` — the navbar and footer read from there.

## Conventions

- **Western numerals only** (24, not ٢٤), including inside Arabic copy. The
  calculator formats with `en-US` regardless of locale for this reason.
- **Never letter-space Arabic text** — it breaks joining.
- Every string lives in `lib/dictionary.ts` as an `[ar, en]` pair.

## Hero animation

Chips ride CSS motion paths from the outer edge in toward the logo and back
out. Two constraints are easy to break by accident:

- `.fs-track` carries `transform-style: preserve-3d`. Adding **any** grouping
  property to it (`mask`, `filter`, `opacity < 1`, `clip-path`) silently
  collapses it to `flat`, and chips paint in DOM order instead of depth order.
  The feather mask lives on the `.fs-depth` wrapper for exactly this reason.
- Nothing in the band may animate a non-composited property. The beams once
  animated `stroke-dashoffset` on a full-width SVG, which forced a ~1M-pixel
  re-raster every frame; they are DOM streaks on `offset-distance` now.

No rail in `FS_LANES` may be `0` — a straight line has a 0° tangent, so a chip
riding it cannot bank.

## Kept in step with the product

Content is checked against the Laravel app (`nawayakhayr-project/radad`),
not invented:

- **Channels** come from `app/Enums/ContactChannelType.php` — phone, email,
  whatsapp, messenger, telegram, widget, voice. **Instagram is deliberately
  absent**: it appears nowhere in that repo's `app/` or `config/`, only in its
  own marketing copy. Do not add it back without an implementation.
- **Plan prices and limits** come from `database/seeders/PlanSeeder.php` —
  0 / 179 / 349 / 999 SAR, plus the conversation caps (500 / 10,000 / 50,000 /
  unlimited) and overage rates (0.10 on Pro, 0.08 on Advanced, none on Basic).
- **Inbox statuses and handoff wording** are lifted from `lang/ar/` so the site
  uses the same words as the app: نشطة / بانتظار موظف / مع موظف / منتهية,
  تولي المحادثة, إعادة للمساعد الآلي.
- **The app-window mockup is a replica of the real conversations screen**, not
  a restyled cousin. `styles/app-replica.css` (scoped under `.awin`) carries
  the app's own tokens verbatim from `resources/css/app.css` — canvas
  `#f5f7fb`, accent `#2A7BEE` with the `#7c5cff` gradient companion, hot-pink
  unread `#ff5e8a`, 20px floating panels — and the cockpit layout/classes from
  `resources/views/tenant/conversations.blade.php` (channel rail, list with
  search + status segments, thread with the handoff bar above the composer,
  context dock with Info/Summary tabs and the deals/purchases/channels stats).
  It renders in **Cairo**, the dashboard's font, self-hosted in
  `public/fonts/`. Only the sample conversation data is invented. If the app's
  design changes, update the replica from those two files.
- **Voice calling** sits behind the `beta_voice_calls` flag in the app, so it is
  presented here as beta rather than generally available.
- **The half-frame shots** (`components/blocks/Frames.tsx`, `styles/frames.css`)
  replicate two more real pages under the same `.awin` token scope:
  - the **abandoned-cart studio** — labels, journey strip (الحدث ← انتظار ←
    الإرسال), field names and even the WhatsApp preview's message are verbatim
    from `tenant/automations/partials/abandoned-cart-form.blade.php` +
    `lang/{ar,en}/automations.php`; the sample values (أحمد، 240 ر.س، SAVE10)
    are the product's own preview samples from `tenant_settings.php`. The
    marketing bullets claim exactly the three automations that exist:
    abandoned cart, order status, review request.
  - the **tenant dashboard home** — greeting, range picker and the four
    sparkline stat cards from `livewire/dashboard/stats.blade.php` +
    `lang/{ar,en}/dashboard.php` (sparkline paths copied verbatim). The stat
    numbers (1,284 / 8,952 / 342 / 4) are invented sample data, same license
    as the cockpit's sample conversations.

When the product changes, re-check these before editing copy.

## Still outstanding

Content the site is deliberately holding space for, rather than inventing:

- Testimonials render as **empty frames**; no quotes have been written.
- Partner/certification badges are **marked slots**.
- The `1.8s / 24% / 70%` figures carry an unverified-stats note.
- The WhatsApp QR is a placeholder pending a real `wa.me` link.
- Salla and Zid glyphs in `lib/hub.ts` are stand-ins pending official SVGs.
- The contact form has no backend; it acknowledges locally only.
- The comparison table compares *approaches*, not named competitors.

`radad-preview.html` is the original single-file prototype, kept for
side-by-side reference.
