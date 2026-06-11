"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Platform", href: "#components" },
  { label: "Roles", href: "#roles" },
  { label: "Workflow", href: "#workflow" },
  { label: "AI Analytics", href: "#ai" },
];

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    smoothScrollTo(href);
    setMobileOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[100] flex h-[70px] items-center justify-between px-4 transition-all duration-500 ease-out sm:px-8 lg:px-[46px]",
        scrolled
          ? "border-b border-black/[0.04] bg-white/92 shadow-[0_4px_30px_rgba(0,73,144,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/60 backdrop-blur-md",
      )}
    >
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/assets/images/apvision.png"
          alt="AP Vision Care"
          width={42}
          height={42}
          className="h-[42px] w-[42px] rounded-xl object-contain"
          priority
        />
        <div>
          <p className="font-[family-name:var(--font-jakarta)] text-[16.5px] font-extrabold leading-none text-[var(--ink)]">
            AP Vision Care
          </p>
          <p className="mt-0.5 text-[10.5px] text-[var(--muted)]">
            Digital Vision Care & Health Intelligence
          </p>
        </div>
      </Link>

      <div className="hidden items-center gap-0.5 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="rounded-[var(--r-sm)] px-[15px] py-[9px] text-sm font-medium text-[var(--muted)] transition-colors duration-200 hover:bg-white/70 hover:text-[var(--brand-blue)]"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="hidden items-center gap-[11px] md:flex">
        <Link
          href="/login"
          className="landing-btn-ghost px-[15px] py-2 text-[13px]"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="landing-btn-primary px-[15px] py-2 text-[13px]"
        >
          Patient Registration
        </Link>
      </div>

      <button
        type="button"
        className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-white/60 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-[70px] border-b border-black/5 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-[var(--r-sm)] px-3 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--primary-50)]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-[var(--line)] pt-4">
            <Link
              href="/login"
              className="landing-btn-ghost py-2.5 text-center text-sm"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="landing-btn-primary py-2.5 text-center text-sm"
            >
              Patient Registration
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
