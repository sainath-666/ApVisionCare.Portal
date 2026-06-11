interface SectionHeadProps {
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  dark?: boolean;
}

export function SectionHead({ tag, title, subtitle, dark }: SectionHeadProps) {
  return (
    <div className="mb-12 text-center lg:mb-14">
      <span
        className={`mb-3.5 inline-block text-xs font-bold uppercase tracking-[0.12em] ${dark ? "text-[var(--on-dark-accent)]" : "text-[var(--teal-d)]"}`}
      >
        {tag}
      </span>
      <h2
        className={`text-[clamp(28px,3.3vw,42px)] font-extrabold leading-[1.12] ${dark ? "text-white" : "text-[var(--navy)]"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-[620px] text-[16.5px] leading-relaxed ${dark ? "text-[var(--on-dark-muted)]" : "text-[var(--muted)]"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
