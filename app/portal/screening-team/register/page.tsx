"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Smartphone, CreditCard, UserPlus } from "lucide-react";
import Link from "next/link";
import { AbhaEnrollment } from "@/components/abha/abha-enrollment";
import { apiClient } from "@/lib/api-client";

type RegMode = "mobile" | "abha" | "qr" | "enroll";

function AbhaVerifyForm({ onSuccess }: { onSuccess: () => void }) {
  const [abha, setAbha] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.abhaVerifyAtDesk({ abhaNumber: abha, otp });
    } catch {
      /* demo fallback */
    }
    onSuccess();
    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleVerify}>
      <div>
        <label className="text-sm font-medium">ABHA Number</label>
        <Input
          placeholder="91-XXXX-XXXX-XXXX"
          className="mt-1"
          value={abha}
          onChange={(e) => setAbha(e.target.value)}
          required
        />
      </div>
      {!otpSent ? (
        <Button
          type="button"
          className="w-full"
          onClick={() => setOtpSent(true)}
          disabled={!abha}
        >
          Send OTP to ABHA Mobile
        </Button>
      ) : (
        <>
          <div>
            <label className="text-sm font-medium">OTP</label>
            <Input
              placeholder="6-digit OTP"
              className="mt-1"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying…" : "Verify ABHA"}
          </Button>
        </>
      )}
    </form>
  );
}

export default function RegisterPatientPage() {
  const [mode, setMode] = useState<RegMode>("mobile");
  const [registered, setRegistered] = useState(false);

  if (registered) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="py-10 text-center">
          <p className="text-xl font-bold text-primary-700">
            Patient Registered
          </p>
          <p className="mt-2 text-neutral-500">ID: pat-new-001 — Rama Devi</p>
          <Link
            href="/portal/screening-team/emr/pat-new-001"
            className="mt-6 inline-block"
          >
            <Button>Start EMR</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Patient Registration</h1>
        <p className="text-neutral-500">
          Register via ABHA, mobile OTP, or QR scan-and-share
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: "mobile" as const, label: "Mobile OTP", icon: Smartphone },
          { id: "abha" as const, label: "ABHA Verify", icon: CreditCard },
          { id: "qr" as const, label: "QR Scan", icon: QrCode },
          { id: "enroll" as const, label: "New ABHA", icon: UserPlus },
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={mode === id ? "default" : "outline"}
            onClick={() => setMode(id)}
            className="flex-1"
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "mobile" && "Mobile Registration"}
            {mode === "abha" && "ABHA Verification"}
            {mode === "qr" && "QR Scan-and-Share"}
            {mode === "enroll" && "ABHA Enrollment (M1)"}
          </CardTitle>
          <CardDescription>
            {mode === "qr" &&
              "Scan patient ABHA QR code for instant demographic fetch (ABDM V3)"}
            {mode === "abha" &&
              "Verify existing ABHA number at registration desk"}
            {mode === "mobile" &&
              "Register with mobile number and OTP verification"}
            {mode === "enroll" &&
              "Create new ABHA via Aadhaar/mobile OTP at camp desk"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mode === "enroll" && (
            <AbhaEnrollment compact onComplete={() => setRegistered(true)} />
          )}
          {mode === "qr" && (
            <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-neutral-300 p-12">
              <QrCode className="h-24 w-24 text-neutral-300" />
              <p className="mt-4 text-sm text-neutral-500">
                Position ABHA QR code in frame
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => setRegistered(true)}
              >
                Simulate QR Scan
              </Button>
            </div>
          )}

          {mode === "abha" && (
            <AbhaVerifyForm onSuccess={() => setRegistered(true)} />
          )}

          {mode === "mobile" && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setRegistered(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input required className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Mobile</label>
                  <Input required placeholder="10-digit" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Age</label>
                  <Input type="number" required className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <Select required className="mt-1">
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Select>
                </div>
              </div>
              <Badge variant="info">
                OTP will be sent to registered mobile
              </Badge>
              <Button type="submit" className="w-full">
                Send OTP & Register
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
