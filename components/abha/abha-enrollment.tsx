"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import type { ABHAProfile } from "@/lib/types";
import { CheckCircle, CreditCard, IdCard, Smartphone } from "lucide-react";

type EnrollMethod = "aadhaar" | "mobile" | "dl";
type EnrollStep = "method" | "otp" | "address" | "complete";

const MOCK_ADDRESSES = ["rama.devi@abdm", "rama_devi91@abdm", "rdevi@abdm"];

interface AbhaEnrollmentProps {
  onComplete?: (profile: ABHAProfile) => void;
  compact?: boolean;
}

export function AbhaEnrollment({ onComplete, compact }: AbhaEnrollmentProps) {
  const [method, setMethod] = useState<EnrollMethod>("aadhaar");
  const [step, setStep] = useState<EnrollStep>("method");
  const [txnId, setTxnId] = useState("");
  const [loginId, setLoginId] = useState("");
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(MOCK_ADDRESSES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<ABHAProfile | null>(null);

  const requestOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.abhaRequestOtp({
        method: method === "mobile" ? "mobile" : "aadhaar",
        loginId,
      });
      setTxnId(res.txnId);
      setStep("otp");
    } catch {
      setTxnId(`demo-txn-${Date.now()}`);
      setStep("otp");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      if (method === "mobile") {
        await apiClient.abhaVerifyMobile({ txnId, otp });
      } else {
        await apiClient.abhaVerifyAadhaar({
          txnId,
          otp,
          mobile: mobile || undefined,
        });
      }
    } catch {
      /* demo fallback */
    }
    setStep("address");
    setLoading(false);
  };

  const setAbhaAddress = async () => {
    setLoading(true);
    setError("");
    try {
      await apiClient.abhaSetAddress({ txnId, abhaAddress: selectedAddress });
    } catch {
      /* demo fallback */
    }
    const demoProfile: ABHAProfile = {
      abhaNumber: "91-1234-5678-9012",
      abhaAddress: selectedAddress,
      name: "Rama Devi",
      dob: "1990-05-15",
      gender: "Female",
      mobile: mobile || "9876500000",
      address: "Anakapalle, Visakhapatnam, AP",
    };
    setProfile(demoProfile);
    setStep("complete");
    onComplete?.(demoProfile);
    setLoading(false);
  };

  if (step === "complete" && profile) {
    return (
      <Card className={compact ? "" : "max-w-lg mx-auto"}>
        <CardContent className="py-8 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-primary-600" />
          <h3 className="mt-4 text-lg font-bold">ABHA Created Successfully</h3>
          <div className="mt-4 space-y-2 text-left text-sm">
            <p>
              <span className="text-neutral-500">ABHA Number:</span>{" "}
              <strong>{profile.abhaNumber}</strong>
            </p>
            <p>
              <span className="text-neutral-500">ABHA Address:</span>{" "}
              <strong>{profile.abhaAddress}</strong>
            </p>
            <p>
              <span className="text-neutral-500">Name:</span> {profile.name}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={compact ? "" : "max-w-lg mx-auto"}>
      <CardHeader>
        <CardTitle>ABHA Enrollment (M1)</CardTitle>
        <CardDescription>
          Create ABHA via Aadhaar OTP, mobile OTP, or driving licence (ABDM V3)
        </CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          {(["method", "otp", "address"] as const).map((s, i) => (
            <Badge
              key={s}
              variant={
                step === s || (step === "complete" && s === "address")
                  ? "info"
                  : "default"
              }
            >
              {i + 1}.{" "}
              {s === "method" ? "Details" : s === "otp" ? "OTP" : "Address"}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <p className="rounded-lg bg-danger-50 px-3 py-2 text-sm text-danger-700">
            {error}
          </p>
        )}

        {step === "method" && (
          <>
            <div className="flex gap-2">
              {(
                [
                  { id: "aadhaar" as const, label: "Aadhaar", icon: IdCard },
                  { id: "mobile" as const, label: "Mobile", icon: Smartphone },
                  { id: "dl" as const, label: "DL", icon: CreditCard },
                ] as const
              ).map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  type="button"
                  variant={method === id ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setMethod(id)}
                >
                  <Icon className="mr-1 h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div>

            {method === "aadhaar" && (
              <div>
                <label className="text-sm font-medium">Aadhaar Number</label>
                <Input
                  className="mt-1"
                  placeholder="12-digit Aadhaar"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  maxLength={12}
                />
              </div>
            )}
            {method === "mobile" && (
              <div>
                <label className="text-sm font-medium">Mobile Number</label>
                <Input
                  className="mt-1"
                  placeholder="10-digit mobile"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  maxLength={10}
                />
              </div>
            )}
            {method === "dl" && (
              <div>
                <label className="text-sm font-medium">
                  Driving Licence Number
                </label>
                <Input
                  className="mt-1"
                  placeholder="DL number"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                />
              </div>
            )}

            {(method === "aadhaar" || method === "dl") && (
              <div>
                <label className="text-sm font-medium">
                  Mobile (for ABHA communication)
                </label>
                <Input
                  className="mt-1"
                  placeholder="10-digit"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            )}

            <Button
              className="w-full"
              disabled={!loginId || loading}
              onClick={requestOtp}
            >
              {loading ? "Sending…" : "Send OTP"}
            </Button>
          </>
        )}

        {step === "otp" && (
          <>
            <p className="text-sm text-neutral-500">
              OTP sent to registered mobile for{" "}
              {method === "aadhaar"
                ? "Aadhaar"
                : method === "mobile"
                  ? "mobile"
                  : "DL"}{" "}
              verification.
            </p>
            <div>
              <label className="text-sm font-medium">Enter OTP</label>
              <Input
                className="mt-1"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep("method")}>
                Back
              </Button>
              <Button
                className="flex-1"
                disabled={otp.length < 4 || loading}
                onClick={verifyOtp}
              >
                {loading ? "Verifying…" : "Verify OTP"}
              </Button>
            </div>
          </>
        )}

        {step === "address" && (
          <>
            <p className="text-sm text-neutral-500">
              Select your preferred ABHA address:
            </p>
            <div className="space-y-2">
              {MOCK_ADDRESSES.map((addr) => (
                <label
                  key={addr}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 ${
                    selectedAddress === addr
                      ? "border-primary-500 bg-primary-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="abhaAddress"
                    checked={selectedAddress === addr}
                    onChange={() => setSelectedAddress(addr)}
                  />
                  <span className="text-sm font-medium">{addr}</span>
                </label>
              ))}
            </div>
            <Button
              className="w-full"
              disabled={loading}
              onClick={setAbhaAddress}
            >
              {loading ? "Creating ABHA…" : "Create ABHA"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
