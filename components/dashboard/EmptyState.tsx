type Props = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export default function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-donafy-light/30 text-donafy-dark">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2" />
          <path
            d="M9 14h10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-donafy-text">{title}</h3>
      <p className="mt-2 text-sm text-donafy-text/70">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
