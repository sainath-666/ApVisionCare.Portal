"use client";

import Link from "next/link";
import { Clock, FileText, UserPlus, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { camps, patients } from "@/lib/mock-data";

const ACTIVE_CAMP_ID = "CMP-3401";

export default function ScreeningDashboard() {
  const camp = camps.find((c) => c.id === ACTIVE_CAMP_ID)!;
  const screened = camp.screenedCount;
  const target = camp.patientCount;
  const campPatients = patients.filter((p) => p.campId === ACTIVE_CAMP_ID);
  const todaysPatients = campPatients.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">
            Today&apos;s Camp
          </h2>
          <p className="text-sm text-neutral-500">
            {camp.name} — {camp.district} District
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1">
            <Wifi className="h-4 w-4 text-primary-600" />
            <span className="text-xs font-medium text-primary-700">Online</span>
          </div>
        </div>
      </div>

      <Card className="border-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="mb-1 text-sm text-primary-100">
                Camp Progress —{" "}
                {new Date(camp.scheduledDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="flex items-end gap-4">
                <div>
                  <p className="text-5xl font-bold">{screened}</p>
                  <p className="text-sm text-primary-200">Screened</p>
                </div>
                <div className="text-2xl text-primary-200">/</div>
                <div>
                  <p className="text-3xl font-bold text-primary-100">
                    {target}
                  </p>
                  <p className="text-sm text-primary-200">Target</p>
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-bold text-primary-300">
                    {target - screened}
                  </p>
                  <p className="text-sm text-primary-200">Remaining</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-48">
              <p className="mb-2 text-sm text-primary-100">
                {Math.round((screened / target) * 100)}% complete
              </p>
              <div className="h-3 rounded-full bg-primary-500">
                <div
                  className="h-3 rounded-full bg-white transition-all"
                  style={{
                    width: `${Math.round((screened / target) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/portal/screening-team/register">
          <Card className="cursor-pointer border-primary-200 transition-shadow hover:border-primary-400 hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                <UserPlus className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">
                  Register Patient
                </p>
                <p className="text-xs text-neutral-500">
                  New patient enrollment
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/portal/screening-team/emr/p001">
          <Card className="cursor-pointer border-primary-200 transition-shadow hover:border-primary-400 hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Start EMR</p>
                <p className="text-xs text-neutral-500">Eye Medical Record</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Registered",
            value: campPatients.filter((p) => p.status === "Registered").length,
            color: "text-primary-700",
          },
          {
            label: "EMR Done",
            value: campPatients.filter((p) => p.status === "EMR Done").length,
            color: "text-neutral-700",
          },
          {
            label: "Submitted",
            value: campPatients.filter((p) => p.status === "Submitted").length,
            color: "text-primary-700",
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-3 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="mt-0.5 text-xs text-neutral-500">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-neutral-400" />
            Recent Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {todaysPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between rounded-lg p-2 hover:bg-neutral-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {patient.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {patient.age}y • {patient.gender} • {patient.village}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      patient.status === "Submitted"
                        ? "success"
                        : patient.status === "EMR Done"
                          ? "warning"
                          : "secondary"
                    }
                  >
                    {patient.status}
                  </Badge>
                  <Link href={`/portal/screening-team/emr/${patient.id}`}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      EMR
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50">
              <Wifi className="h-5 w-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900">
                Internet Connected
              </p>
              <p className="text-xs text-neutral-500">
                All data syncing in real-time. {screened} records uploaded
                successfully.
              </p>
            </div>
            <Badge variant="success">Synced</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
