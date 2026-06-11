"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AbhaEnrollment } from "@/components/abha/abha-enrollment";
import { districtKPIs } from "@/lib/mock-data";
import { CheckCircle } from "lucide-react";

type RegisterTab = "citizen" | "abha";

export default function RegisterPage() {
  const [tab, setTab] = useState<RegisterTab>("citizen");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="py-12">
            <CheckCircle className="mx-auto h-12 w-12 text-primary-600" />
            <h2 className="mt-4 text-xl font-bold">Registration Submitted</h2>
            <p className="mt-2 text-neutral-500">
              OTP verification and ABHA linking processed via Patient Service
              API (POST /api/v1/patients).
            </p>
            <Link href="/login" className="mt-6 inline-block">
              <Button>Login to Patient Portal</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b bg-white px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Image
            src="/assets/images/apvision.png"
            alt="AP Vision Care"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <span className="font-bold">Citizen Registration</span>
          <Link
            href="/"
            className="ml-auto text-sm text-primary-600 hover:underline"
          >
            Home
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-8">
        <div className="flex gap-2">
          <Button
            variant={tab === "citizen" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setTab("citizen")}
          >
            Citizen Register
          </Button>
          <Button
            variant={tab === "abha" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setTab("abha")}
          >
            Create ABHA (M1)
          </Button>
        </div>

        {tab === "abha" ? (
          <AbhaEnrollment onComplete={() => setSubmitted(true)} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Register for AP Vision Care</CardTitle>
              <CardDescription>
                Register with your mobile number. Link an existing ABHA or
                create one via the ABHA tab.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      required
                      placeholder="Enter full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mobile Number</label>
                    <Input
                      required
                      placeholder="10-digit mobile"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Age</label>
                    <Input
                      required
                      type="number"
                      min={1}
                      max={120}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Gender</label>
                    <Select required className="mt-1">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">District</label>
                    <Select required className="mt-1">
                      <option value="">Select district</option>
                      {districtKPIs.map((d) => (
                        <option key={d.district} value={d.district}>
                          {d.district}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mandal</label>
                    <Input required placeholder="Mandal" className="mt-1" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium">
                      Village / Ward
                    </label>
                    <Input
                      required
                      placeholder="Village or ward name"
                      className="mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium">
                      ABHA Number (optional)
                    </label>
                    <Input placeholder="91-XXXX-XXXX-XXXX" className="mt-1" />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Send OTP & Register
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
