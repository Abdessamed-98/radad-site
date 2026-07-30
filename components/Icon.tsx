import { icons, type IconName } from "@/lib/icons";

export function Icon({
  name,
  className,
  width = 1.7,
}: {
  name: IconName;
  className?: string;
  width?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}

/** The trailing arrow on primary buttons. Flips automatically in RTL via CSS. */
export function Arrow() {
  return (
    <svg
      className="ar"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
