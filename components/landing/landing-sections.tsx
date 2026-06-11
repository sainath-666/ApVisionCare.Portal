import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "./section-head";
import {
  Target,
  Stethoscope,
  Cpu,
  FilePlus,
  BookOpen,
  Eye,
  Video,
  Route,
  Glasses,
  Factory,
  LayoutGrid,
  FileText,
  IdCard,
  Shield,
  Medal,
  User,
  Check,
  ArrowRight,
  Tent,
  SlidersHorizontal,
  CheckCircle2,
  Truck,
  Pin,
  Package,
  Flame,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

function CompCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  desc,
}: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="landing-feature-card p-[26px_22px]">
      <div
        className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-[13px]"
        style={{ background: iconBg, color: iconColor }}
      >
        <Icon className="h-[23px] w-[23px]" strokeWidth={1.8} />
      </div>
      <h4 className="mb-[7px] text-[15.5px] font-bold text-[var(--navy)]">
        {title}
      </h4>
      <p className="text-[13px] leading-[1.55] text-[var(--muted)]">{desc}</p>
    </div>
  );
}

const roleLoginMap: Record<string, string> = {
  admin: "super_admin",
  nodal: "nodal_officer",
  team: "screening_team",
  patient: "patient",
};

function RoleCard({
  roleKey,
  icon: Icon,
  iconBg,
  iconColor,
  title,
  scope,
  items,
}: {
  roleKey: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  scope: string;
  items: string[];
}) {
  const loginRole = roleLoginMap[roleKey];
  return (
    <Link href={`/login?role=${loginRole}`} className="landing-role-card group">
      <div
        className="landing-role-icon"
        style={{ background: iconBg, color: iconColor }}
      >
        <Icon className="h-[26px] w-[26px]" strokeWidth={1.8} />
      </div>
      <h4 className="mb-[7px] text-lg font-bold text-[var(--on-dark-text)]">
        {title}
      </h4>
      <p className="landing-role-scope">{scope}</p>
      <ul className="landing-role-list">
        {items.map((item) => (
          <li key={item}>
            <Check className="h-[15px] w-[15px]" strokeWidth={2.2} />
            {item}
          </li>
        ))}
      </ul>
      <span className="landing-role-cta">
        Open portal <ArrowRight className="h-[15px] w-[15px]" />
      </span>
    </Link>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="landing-section-light scroll-mt-24 px-4 py-20 sm:px-8 lg:px-[46px] lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          tag="About the Program"
          title={
            <>
              Beyond spectacles — a public
              <br />
              health intelligence platform.
            </>
          }
          subtitle="The initiative aims to eliminate avoidable visual impairment, improve educational outcomes, enhance workforce productivity, and strengthen public health planning across Andhra Pradesh."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CompCard
            icon={Target}
            iconBg="var(--teal-soft)"
            iconColor="var(--teal-d)"
            title="Universal Screening"
            desc="Universal vision screening across villages, tribal areas, urban slums, schools, and industrial zones — detecting refractive errors and eye disease early."
          />
          <CompCard
            icon={Stethoscope}
            iconBg="var(--blue-soft)"
            iconColor="var(--blue)"
            title="End-to-End Care"
            desc="From ABHA-based registration to tele-ophthalmology, referral management, and affordable high-quality spectacle delivery to every eligible beneficiary."
          />
          <CompCard
            icon={Cpu}
            iconBg="var(--amber-soft)"
            iconColor="var(--amber)"
            title="AI-Driven Insights"
            desc="Actionable public health intelligence — disease hotspots, demand forecasting, and resource allocation — supporting evidence-based government decisions."
          />
        </div>
      </div>
    </section>
  );
}

export function ComponentsSection() {
  const items = [
    {
      icon: Stethoscope,
      bg: "var(--teal-soft)",
      color: "var(--teal-d)",
      title: "Community Screening",
      desc: "Mobile camps across the state.",
    },
    {
      icon: FilePlus,
      bg: "var(--blue-soft)",
      color: "var(--blue)",
      title: "Digital Registration",
      desc: "ABHA, mobile & QR-based capture.",
    },
    {
      icon: BookOpen,
      bg: "var(--amber-soft)",
      color: "var(--amber)",
      title: "Electronic Medical Records",
      desc: "Paperless, timestamped records.",
    },
    {
      icon: Eye,
      bg: "var(--green-soft)",
      color: "var(--green)",
      title: "Vision & Refraction",
      desc: "UCDVA / BCDVA assessment.",
    },
    {
      icon: Video,
      bg: "var(--blue-soft)",
      color: "var(--blue)",
      title: "Tele-Ophthalmology",
      desc: "Remote specialist consultations.",
    },
    {
      icon: Route,
      bg: "var(--red-soft)",
      color: "var(--red)",
      title: "Referral Management",
      desc: "Priority-based hospital referrals.",
    },
    {
      icon: Glasses,
      bg: "var(--teal-soft)",
      color: "var(--teal-d)",
      title: "Spectacle Distribution",
      desc: "Order to last-mile delivery.",
    },
    {
      icon: Factory,
      bg: "var(--amber-soft)",
      color: "var(--amber)",
      title: "Vendor Management",
      desc: "Onboarding & SLA monitoring.",
    },
    {
      icon: LayoutGrid,
      bg: "var(--blue-soft)",
      color: "var(--blue)",
      title: "Monitoring Dashboards",
      desc: "Daily, district & mandal views.",
    },
    {
      icon: Cpu,
      bg: "var(--green-soft)",
      color: "var(--green)",
      title: "AI & Predictive Engine",
      desc: "Risk prediction & forecasting.",
    },
    {
      icon: FileText,
      bg: "var(--red-soft)",
      color: "var(--red)",
      title: "Automated Reporting",
      desc: "Government-accessible reports.",
    },
    {
      icon: IdCard,
      bg: "var(--teal-soft)",
      color: "var(--teal-d)",
      title: "ABHA Verification",
      desc: "Auto-fetch demographics.",
    },
  ];

  return (
    <section
      id="components"
      className="scroll-mt-24 px-4 py-20 sm:px-8 lg:px-[46px] lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          tag="Solution Overview"
          title={
            <>
              Twelve integrated components,
              <br />
              one unified platform.
            </>
          }
          subtitle="All activities are digitally tracked from patient registration to spectacle delivery and referral closure."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <CompCard
              key={item.title}
              icon={item.icon}
              iconBg={item.bg}
              iconColor={item.color}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function RolesSection() {
  return (
    <section
      id="roles"
      className="landing-section-roles scroll-mt-24 px-4 py-20 sm:px-8 lg:px-[46px] lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          dark
          tag="User Hierarchy & Governance"
          title="Four roles. Distinct workflows."
          subtitle="Each role logs in with OTP authentication and accesses a dashboard tailored to their responsibilities and access level. Click any role to preview its portal."
        />
        <div className="grid auto-rows-fr gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          <RoleCard
            roleKey="admin"
            icon={Shield}
            iconBg="var(--on-dark-accent-soft)"
            iconColor="var(--on-dark-accent)"
            title="Super Admin"
            scope="State Program Mgmt Unit"
            items={[
              "Statewide administration",
              "District & vendor onboarding",
              "AI model configuration",
              "Audit & compliance",
            ]}
          />
          <RoleCard
            roleKey="nodal"
            icon={Medal}
            iconBg="rgba(59, 111, 224, 0.18)"
            iconColor="var(--brand-blue)"
            title="Nodal Officer"
            scope="State / District Level"
            items={[
              "Team creation & assignment",
              "Camp monitoring",
              "Prescription approval",
              "Referral verification",
            ]}
          />
          <RoleCard
            roleKey="team"
            icon={Stethoscope}
            iconBg="rgba(238, 157, 30, 0.18)"
            iconColor="var(--brand-gray)"
            title="Screening Team"
            scope="Assigned Locations"
            items={[
              "Patient registration",
              "Vision screening",
              "Prescription generation",
              "Referral & teleconsult",
            ]}
          />
          <RoleCard
            roleKey="patient"
            icon={User}
            iconBg="rgba(31, 164, 99, 0.2)"
            iconColor="var(--brand-red)"
            title="Patient / Citizen"
            scope="Personal Records"
            items={[
              "View prescriptions",
              "Track spectacle status",
              "View referrals",
              "Teleconsultation",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  const steps = [
    {
      icon: Tent,
      title: "Community Outreach",
      desc: "Camps across villages, schools & tribal areas.",
    },
    {
      icon: FilePlus,
      title: "Registration",
      desc: "ABHA / mobile / QR auto-fetches demographics.",
    },
    {
      icon: Eye,
      title: "Clinical Assessment",
      desc: "Symptoms, history & vision exam in EMR.",
    },
    {
      icon: SlidersHorizontal,
      title: "Decision Engine",
      desc: "Spectacles, referral or teleconsult determined.",
    },
    {
      icon: CheckCircle2,
      title: "Approval & Order",
      desc: "Nodal officer approves; vendor order generated.",
    },
    {
      icon: Truck,
      title: "Delivery",
      desc: "OTP, photo & GPS-verified last-mile delivery.",
    },
  ];

  return (
    <section
      id="workflow"
      className="scroll-mt-24 px-4 py-20 sm:px-8 lg:px-[46px] lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHead
          tag="End-to-End Citizen Journey"
          title="From screening to spectacle delivery."
        />
        <div className="mx-auto flex max-w-[1140px] flex-col gap-8 lg:flex-row lg:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative flex-1 px-[13px] text-center"
              >
                {i < steps.length - 1 && (
                  <span
                    className="absolute right-0 top-[27px] hidden h-0.5 w-4 bg-[var(--line)] lg:block"
                    aria-hidden
                  />
                )}
                <div className="landing-feature-card mx-auto mb-[18px] flex h-14 w-14 items-center justify-center !p-0 text-[var(--brand-blue)]">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h4 className="mb-2 text-[15px] font-bold text-[var(--navy)]">
                  {step.title}
                </h4>
                <p className="text-[12.5px] leading-normal text-[var(--muted)]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AISection() {
  const hotspots = [
    { name: "Anantapur", val: 88, color: "var(--brand-red)" },
    { name: "Kurnool", val: 74, color: "var(--brand-gray)" },
    { name: "Chittoor", val: 61, color: "var(--on-dark-accent)" },
    { name: "Guntur", val: 45, color: "var(--brand-blue)" },
    { name: "Visakhapatnam", val: 33, color: "var(--chart-gray)" },
  ];

  const feats = [
    {
      icon: Cpu,
      title: "Disease Prediction",
      sub: "Cataract, glaucoma, DR risk",
    },
    {
      icon: Pin,
      title: "Hotspot Identification",
      sub: "High disease-burden zones",
    },
    {
      icon: Package,
      title: "Demand Forecasting",
      sub: "Spectacle & vendor planning",
    },
    {
      icon: Route,
      title: "Referral Prioritization",
      sub: "Critical / High / Routine",
    },
  ];

  return (
    <section
      id="ai"
      className="landing-section-ai scroll-mt-24 px-4 py-20 sm:px-8 lg:px-[46px] lg:py-24"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-12">
        <div>
          <span className="landing-ai-tag">AI & Advanced Analytics</span>
          <h2 className="mb-[18px] text-[clamp(28px,3.1vw,40px)] font-extrabold leading-[1.13] text-[var(--on-dark-text)]">
            Turning eye health data into statewide public health intelligence.
          </h2>
          <p className="landing-ai-lead">
            By combining eye health data with age, gender, occupation, location,
            diabetes, hypertension, and nutrition status, the platform becomes a
            strategic decision-support system for government.
          </p>
          <div className="grid gap-[15px] sm:grid-cols-2">
            {feats.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex gap-3">
                  <div className="landing-ai-feat-icon">
                    <Icon className="h-[19px] w-[19px]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--on-dark-text)]">
                      {f.title}
                    </p>
                    <p className="landing-ai-feat-sub">{f.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="landing-ai-panel">
          <div className="mb-[22px] flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-[15px] text-[var(--on-dark-text)]">
              <Flame className="h-[18px] w-[18px] text-[var(--brand-red)]" />
              District Disease-Burden Hotspots
            </h4>
            <span className="landing-ai-badge">AI Generated</span>
          </div>
          {hotspots.map((h) => (
            <div key={h.name} className="mb-[15px] flex items-center gap-3.5">
              <span className="landing-ai-hotspot-label">{h.name}</span>
              <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${h.val}%`, background: h.color }}
                />
              </div>
              <span className="landing-ai-hotspot-value">{h.val}</span>
            </div>
          ))}
          <div className="landing-ai-rec">
            <AlertTriangle className="h-[17px] w-[17px] shrink-0 text-[var(--brand-red)]" />
            <span>
              <strong>Recommendation:</strong> Prioritize cataract camps &
              diabetes screening in Anantapur and Kurnool districts.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="px-4 py-20 sm:px-8 lg:px-[46px] lg:py-24">
      <div
        className="relative mx-auto max-w-[980px] overflow-hidden rounded-[var(--r-xl)] px-8 py-14 text-center text-white shadow-[0_20px_60px_rgba(0,73,144,0.2)] sm:px-[54px] sm:py-16"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-blue) 0%, var(--primary-700) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-[8%] -top-1/2 h-[380px] w-[380px] rounded-full bg-white/8"
          aria-hidden
        />
        <h2 className="relative mb-3.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-tight">
          Every citizen&apos;s journey,
          <br />
          digitally tracked and transparent.
        </h2>
        <p className="relative mx-auto mb-[30px] max-w-[560px] text-[16.5px] text-white/88">
          Register as a patient to access your records, or log in as staff to
          manage screening, approvals, and statewide analytics.
        </p>
        <div className="relative flex flex-wrap justify-center gap-[13px]">
          <Link
            href="/register"
            className="landing-btn-ghost inline-flex items-center !border-white/30 !bg-white px-6 py-3 text-[14.5px] !text-[var(--ink)] hover:!shadow-lg"
          >
            Patient Registration
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center rounded-[var(--r-md)] bg-black/20 px-6 py-3 text-[14.5px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/28"
          >
            Staff Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="bg-[var(--primary-900)] px-4 py-[50px] text-white/50 sm:px-8 lg:px-[46px]">
      <div className="mx-auto grid max-w-[1200px] gap-10 border-b border-white/8 pb-[34px] sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/apvision.png"
              alt="AP Vision Care"
              width={42}
              height={42}
              className="h-[42px] w-[42px] rounded-xl object-contain"
            />
            <p className="font-[family-name:var(--font-jakarta)] text-[16.5px] font-extrabold text-white">
              AP Vision Care
            </p>
          </div>
          <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed">
            Andhra Pradesh Statewide Digital Vision Care & Public Health
            Intelligence Platform. A clearer future for every citizen.
          </p>
        </div>
        <div>
          <h5 className="mb-[15px] text-[13px] font-semibold text-white">
            Platform
          </h5>
          <a
            href="#components"
            className="mb-2.5 block text-[13px] hover:text-[var(--teal)]"
          >
            Components
          </a>
          <a
            href="#workflow"
            className="mb-2.5 block text-[13px] hover:text-[var(--teal)]"
          >
            Workflow
          </a>
          <a
            href="#ai"
            className="mb-2.5 block text-[13px] hover:text-[var(--teal)]"
          >
            AI Analytics
          </a>
          <a
            href="#roles"
            className="mb-2.5 block text-[13px] hover:text-[var(--teal)]"
          >
            User Roles
          </a>
        </div>
        <div>
          <h5 className="mb-[15px] text-[13px] font-semibold text-white">
            Access
          </h5>
          <Link
            href="/login"
            className="mb-2.5 block text-[13px] hover:text-[var(--teal)]"
          >
            Staff Login
          </Link>
          <Link
            href="/register"
            className="mb-2.5 block text-[13px] hover:text-[var(--teal)]"
          >
            Patient Registration
          </Link>
          <Link
            href="/login?role=patient"
            className="mb-2.5 block text-[13px] hover:text-[var(--teal)]"
          >
            Patient Portal
          </Link>
        </div>
        <div>
          <h5 className="mb-[15px] text-[13px] font-semibold text-white">
            Departments
          </h5>
          <span className="mb-2.5 block text-[13px]">Health</span>
          <span className="mb-2.5 block text-[13px]">Education</span>
          <span className="mb-2.5 block text-[13px]">Women & Child</span>
          <span className="mb-2.5 block text-[13px]">Social Welfare</span>
        </div>
      </div>
      <div className="mx-auto mt-[22px] flex max-w-[1200px] flex-col justify-between gap-2 text-[12.5px] sm:flex-row">
        <span>© 2026 Government of Andhra Pradesh · All rights reserved</span>
        <span>Privacy · Terms · ABHA Compliance</span>
      </div>
    </footer>
  );
}
