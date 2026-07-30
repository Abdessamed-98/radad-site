/* Inner markup for each 24x24 stroke icon. Rendered into an <svg> shell by
   <Icon/>; these are static author-controlled path data, never user input. */
export const icons = {
phone:'<path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.03 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.9Z"/>',
mic:'<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5 11.5a7 7 0 0 0 14 0M12 18.5V21"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
dots3:'<circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none"/>',
panel:'<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M15 3v18"/>',
voice:'<path d="M15.6 3.6a9 9 0 0 1 0 16.8M13.4 7.1a5 5 0 0 1 0 9.8"/><path d="M3 10.5v3a1.5 1.5 0 0 0 1.5 1.5h1.8L10 18.5v-13L6.3 9H4.5A1.5 1.5 0 0 0 3 10.5Z"/>',
book:'<path d="M4 4.8A1.8 1.8 0 0 1 5.8 3H19v14.5H5.8A1.8 1.8 0 0 0 4 19.3Z"/><path d="M4 19.3A1.8 1.8 0 0 0 5.8 21H19v-3.5"/><path d="M8 7.5h7M8 11h5"/>',
table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9.5h18M9.5 9.5V20M3 15h18"/>',
eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3.2"/>',
zap:'<path d="M13.2 2 4.6 13.1h6.1L10.2 22l8.6-11.1h-6.1L13.2 2Z"/>',
sheet:'<path d="M6 2.8h7.4L19 8.4V21a1.2 1.2 0 0 1-1.2 1.2H6A1.2 1.2 0 0 1 4.8 21V4A1.2 1.2 0 0 1 6 2.8Z"/><path d="M13.2 2.8V8.6H19"/><path d="M8.4 13h7.2M8.4 16.6h7.2"/>',
wa:'<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.6 9.6 0 0 1-2.7-.4L4 21l1.4-4.1A8.2 8.2 0 0 1 3.6 11.5C3.6 6.8 7.4 3.4 12 3.4s9 3.4 9 8.1Z"/>',
tg:'<path d="M21 5 3.5 11.4l4.9 1.6L19 7l-8.4 8.1.3 4.4 2.9-3.4 3.9 2.8L21 5Z"/>',
msgr:'<path d="M12 3c-5 0-9 3.7-9 8.3 0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.2 1.8.4 2.7.4 5 0 9-3.7 9-8.4S17 3 12 3Z"/><path d="m7.5 13.5 3-3.2 2 2 3-2.2"/>',
chat:'<path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1Z"/>',
store:'<path d="M4 9h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9Z"/><path d="M3 9 5 4h14l2 5M9 20v-6h6v6"/>',
code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
chart:'<path d="M4 20V11M10 20V4M16 20v-6M22 20H2"/>',
inbox:'<path d="M3 13h4l2 3h6l2-3h4M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>',
spark:'<path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M5.9 5.9l2.5 2.5M15.6 15.6l2.5 2.5M18.1 5.9l-2.5 2.5M8.4 15.6l-2.5 2.5"/><circle cx="12" cy="12" r="2.6"/>',
check:'<path d="m4 12.5 5 5L20 6.5"/>',
arrow:'<path d="M7 17 17 7M9 7h8v8"/>',
info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.1"/>',
shield:'<path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Z"/>',
lock:'<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
send:'<path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z"/>',
cart:'<path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.8L20 8H6"/><circle cx="9" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/>',
box:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
team:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M17 11a3 3 0 1 0-2-5.2M21 20a5.5 5.5 0 0 0-3.5-5"/>',
palette:'<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="8" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10" r="1.2" fill="currentColor" stroke="none"/>'
} as const;

export type IconName = keyof typeof icons;
