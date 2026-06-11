import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingScrollEnhancer } from "@/components/landing/landing-scroll";
import { HeroSection } from "@/components/landing/hero-section";
import {
  AboutSection,
  AISection,
  ComponentsSection,
  CTASection,
  LandingFooter,
  RolesSection,
  WorkflowSection,
} from "@/components/landing/landing-sections";
import "../landing.css";

export default function LandingPage() {
  return (
    <div className="landing-page min-h-screen">
      <LandingScrollEnhancer />
      <LandingNavbar />
      <HeroSection />
      <AboutSection />
      <ComponentsSection />
      <RolesSection />
      <WorkflowSection />
      <AISection />
      <CTASection />
      <LandingFooter />
    </div>
  );
}
