"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isKeycloakClientMode } from "@/lib/keycloak";
import { roleHomePath } from "@/lib/navigation";
import type { UserRole } from "@/lib/types";

const roles: UserRole[] = [
  "super_admin",
  "nodal_officer",
  "screening_team",
  "patient",
];

const roleConfig: Record<
  UserRole,
  { label: string; userName: string; tabLines: string[] }
> = {
  super_admin: {
    label: "Super Admin",
    userName: "Admin Suresh",
    tabLines: ["Super", "Admin"],
  },
  nodal_officer: {
    label: "Nodal Officer",
    userName: "Ramakrishna Murthy",
    tabLines: ["Nodal", "Officer"],
  },
  screening_team: {
    label: "Screening Team",
    userName: "Dr. Prasad Kumar",
    tabLines: ["Screening", "Team"],
  },
  patient: {
    label: "Patient",
    userName: "Ravi Kumar",
    tabLines: ["Patient"],
  },
};

const demoCredentials: Record<UserRole, { mobile: string; otp: string }> = {
  super_admin: { mobile: "9000000001", otp: "123456" },
  nodal_officer: { mobile: "9000000002", otp: "123456" },
  screening_team: { mobile: "9000000004", otp: "123456" },
  patient: { mobile: "9876543210", otp: "123456" },
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;

  const [selectedRole, setSelectedRole] = useState<UserRole>("super_admin");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [keycloakMode, setKeycloakMode] = useState(false);

  const activeRoleConfig = roleConfig[selectedRole];

  useEffect(() => {
    setKeycloakMode(isKeycloakClientMode());
  }, []);

  useEffect(() => {
    const role = searchParams.get("role") as UserRole | null;
    if (role && roles.includes(role)) {
      void handleLogin(role, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSendOTP = () => {
    if (!mobile || mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setOtpSent(true);
  };

  const handleLogin = async (role?: UserRole, skipValidation = false) => {
    const activeRole = role ?? selectedRole;

    if (keycloakMode && !skipValidation) {
      setLoading(true);
      setError("");
      void signIn("keycloak", {
        callbackUrl: callbackUrl ?? roleHomePath[activeRole],
      });
      return;
    }

    if (!skipValidation) {
      if (!mobile) {
        setError("Please enter mobile number");
        return;
      }
      if (!otp) {
        setError("Please enter OTP");
        return;
      }
    }

    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 800));

    document.cookie = `apvc_role=${activeRole};path=/;max-age=86400`;

    const dest = callbackUrl ?? roleHomePath[activeRole];
    try {
      await signIn("demo-role", {
        role: activeRole,
        redirect: false,
      });
    } catch {
      /* credentials provider optional */
    }

    router.push(dest);
    setLoading(false);
  };

  const fillDemo = () => {
    setMobile(demoCredentials[selectedRole].mobile);
    setOtp(demoCredentials[selectedRole].otp);
    setOtpSent(true);
    setError("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
      <header className="p-4 sm:p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 pb-10 pt-2">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/15 shadow-lg ring-1 ring-white/20 backdrop-blur-sm">
              <Image
                src="/assets/images/apvision.png"
                alt="AP Vision Care"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              AP Vision Care
            </h1>
            <p className="mt-1 text-sm text-primary-200">
              Government of Andhra Pradesh
            </p>
          </div>

          <Card className="overflow-hidden rounded-2xl border-0 shadow-[var(--shadow-lg)]">
            <CardHeader className="space-y-1.5 px-6 pb-2 pt-7 text-center">
              <CardTitle className="text-[1.125rem] font-bold text-neutral-900">
                Sign In to Your Portal
              </CardTitle>
              <CardDescription className="text-xs text-neutral-500">
                {keycloakMode
                  ? "Select your role and sign in with Keycloak OTP"
                  : "Select your role and login with OTP"}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-7 pt-4">
              <Tabs
                value={selectedRole}
                onValueChange={(v) => {
                  setSelectedRole(v as UserRole);
                  setOtpSent(false);
                  setError("");
                }}
              >
                <TabsList className="mb-5 grid h-auto w-full grid-cols-4 gap-1 rounded-[var(--radius-md)] bg-neutral-100 p-1.5">
                  {roles.map((role) => (
                    <TabsTrigger
                      key={role}
                      value={role}
                      className="flex h-auto min-h-[3.25rem] w-full flex-col items-center justify-center whitespace-normal rounded-[var(--radius-sm)] px-0.5 py-2 text-center text-[10px] font-medium leading-[1.15] text-neutral-500 sm:text-[11px]"
                    >
                      {roleConfig[role].tabLines.map((line) => (
                        <span key={line} className="block w-full">
                          {line}
                        </span>
                      ))}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleLogin();
                }}
              >
                <div className="rounded-[var(--radius-md)] bg-primary-50 px-3.5 py-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 shrink-0 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-800">
                      {activeRoleConfig.label} Portal
                    </span>
                  </div>
                  <p className="mt-1 pl-6 text-xs text-neutral-500">
                    Login as: {activeRoleConfig.userName}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-neutral-800">
                    Mobile Number / Username
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="mobile"
                      type="tel"
                      inputMode="numeric"
                      placeholder="Enter 10-digit mobile"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength={10}
                      className="min-w-0 flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendOTP}
                      className="h-10 shrink-0 whitespace-nowrap px-3 text-xs font-semibold"
                    >
                      Send OTP
                    </Button>
                  </div>
                </div>

                {otpSent && (
                  <div className="rounded-[var(--radius-sm)] border border-primary-200 bg-primary-50 px-3 py-2.5 text-xs leading-relaxed text-primary-700">
                    OTP sent to {mobile}. Use <strong>123456</strong> for demo.
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-neutral-800">
                    Enter OTP
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    maxLength={6}
                  />
                </div>

                {error && (
                  <p className="text-sm font-medium text-danger-600">{error}</p>
                )}

                <div className="space-y-2.5 pt-1">
                  <Button
                    type="submit"
                    className="h-11 w-full text-sm font-semibold"
                    disabled={loading}
                  >
                    {loading
                      ? "Signing in..."
                      : keycloakMode
                        ? `Sign in with Keycloak as ${activeRoleConfig.label}`
                        : `Login as ${activeRoleConfig.label}`}
                  </Button>

                  {!keycloakMode && (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 w-full text-xs font-medium text-neutral-700"
                      onClick={fillDemo}
                      disabled={loading}
                    >
                      Fill Demo Credentials
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-6 border-t border-neutral-100 pt-5 text-center text-[11px] leading-relaxed text-neutral-400">
                <p>Protected by Government of AP Security Standards</p>
                <p>ABDM Compliant | Data encrypted in transit</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
