import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardList,
  Eye,
  Glasses,
  TrendingUp,
  Truck,
  CheckCircle2,
} from "lucide-react";

const journeySteps = [
  {
    title: "Registered & Screened",
    subtitle: "Anantapur Camp · 09:14 AM",
    icon: ClipboardList,
    iconBg: "var(--accent-soft)",
    iconColor: "var(--accent-dark)",
    done: true,
  },
  {
    title: "Vision Examined",
    subtitle: "Refractive error detected",
    icon: Eye,
    iconBg: "var(--primary-50)",
    iconColor: "var(--brand-blue)",
    done: true,
  },
  {
    title: "Prescription Approved",
    subtitle: "Nodal Officer · 10:02 AM",
    icon: CheckCircle2,
    iconBg: "rgba(0,73,144,0.08)",
    iconColor: "var(--brand-blue)",
    done: true,
  },
  {
    title: "Spectacles in Manufacturing",
    subtitle: "Vendor: ClearView Optics",
    icon: Truck,
    iconBg: "rgba(109,110,113,0.08)",
    iconColor: "var(--brand-gray)",
    done: false,
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-[138px] sm:px-8 lg:px-[46px] lg:pb-28">
      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,73,144,0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(109,110,113,0.08) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1260px] items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,73,144,0.15)] bg-white/70 px-4 py-1.5 text-[12.5px] font-semibold text-[var(--brand-blue)] shadow-sm backdrop-blur-sm">
            <span className="landing-pill-dot h-1.5 w-1.5 rounded-full bg-[var(--brand-blue)]" />
            Government of Andhra Pradesh · Public Health Initiative
          </div>

          <h1 className="mt-7 text-[clamp(38px,4.8vw,60px)] font-extrabold leading-[1.08] tracking-tight text-[var(--ink)]">
            Universal eye care,{" "}
            <span className="text-[var(--brand-blue)]">digitally tracked</span>{" "}
            from screening to delivery.
          </h1>

          <p className="mt-6 max-w-[540px] text-lg leading-[1.7] text-[var(--muted)]">
            A statewide platform integrating mobile screening teams, EMR,
            tele-ophthalmology, AI analytics, and last-mile spectacle delivery —
            ensuring every citizen has equitable access to quality vision care.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="landing-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-[14.5px]"
            >
              Register as Patient
              <ArrowRight className="h-[17px] w-[17px]" />
            </Link>
            <Link
              href="/login"
              className="landing-btn-ghost inline-flex items-center px-6 py-3.5 text-[14.5px]"
            >
              Staff / Admin Login
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-10 border-t border-[rgba(0,73,144,0.08)] pt-10">
            {[
              { num: "26", suffix: "+", label: "Districts Covered" },
              { num: "100", suffix: "%", label: "Digital Workflow" },
              { num: "4", suffix: "", label: "User Roles" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-[family-name:var(--font-jakarta)] text-[30px] font-extrabold text-[var(--ink)]">
                  {s.num}
                  {s.suffix && (
                    <span className="text-[var(--brand-blue)]">{s.suffix}</span>
                  )}
                </p>
                <p className="mt-0.5 text-[12.5px] text-[var(--muted)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — journey visual */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none lg:py-4">
          <div className="landing-float-anim absolute -right-2 top-[-18px] z-[3] sm:right-[-8px]">
            <div className="landing-float-card flex items-center gap-3 p-3.5 pr-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--accent-soft)]">
                <TrendingUp className="h-[18px] w-[18px] text-[var(--brand-blue)]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-jakarta)] text-base font-bold text-[var(--ink)]">
                  12,480
                </p>
                <p className="text-[10.5px] text-[var(--muted)]">
                  Screened today
                </p>
              </div>
            </div>
          </div>

          <div className="landing-float-anim-delay absolute -left-4 bottom-[-12px] z-[3] sm:left-[-24px]">
            <div className="landing-float-card flex items-center gap-3 p-3.5 pr-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--primary-50)]">
                <Glasses className="h-[18px] w-[18px] text-[var(--brand-blue)]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-jakarta)] text-base font-bold text-[var(--ink)]">
                  8,912
                </p>
                <p className="text-[10.5px] text-[var(--muted)]">
                  Spectacles delivered
                </p>
              </div>
            </div>
          </div>

          <div className="landing-card relative z-[2] p-7">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-[family-name:var(--font-jakarta)] text-[14.5px] font-bold text-[var(--ink)]">
                Citizen Journey · Ramesh K.
              </p>
              <span className="flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[11px] font-bold text-[var(--brand-blue)]">
                <span className="landing-pill-dot h-1.5 w-1.5 rounded-full bg-[var(--brand-blue)]" />
                LIVE
              </span>
            </div>

            {journeySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`flex items-center gap-3.5 py-3.5 ${i < journeySteps.length - 1 ? "border-b border-[rgba(0,73,144,0.06)]" : ""}`}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px]"
                    style={{ background: step.iconBg, color: step.iconColor }}
                  >
                    <Icon className="h-[19px] w-[19px]" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold text-[var(--ink)]">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                      {step.subtitle}
                    </p>
                  </div>
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${step.done ? "bg-[var(--brand-blue)] text-white" : "bg-[rgba(0,73,144,0.08)]"}`}
                  >
                    {step.done && (
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="mt-16 flex justify-center lg:mt-20">
        <a
          href="#about"
          className="landing-scroll-hint group flex flex-col items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--brand-blue)]"
        >
          About the Program
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
