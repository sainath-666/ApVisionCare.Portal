import Link from "next/link";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Glasses,
  Send,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patientPortalData } from "@/lib/mock-data";

const activities = [
  {
    date: "Jun 10, 2024",
    action: "Eye screening completed",
    detail: "Narasaraopet Village Camp",
    icon: CheckCircle,
    color: "text-primary-600",
  },
  {
    date: "Jun 10, 2024",
    action: "EMR submitted",
    detail: "Dr. Prasad Kumar — Outcome: Referral",
    icon: CheckCircle,
    color: "text-primary-600",
  },
  {
    date: "Jun 10, 2024",
    action: "Referral created",
    detail: "SVIMS Tirupati — Priority: High",
    icon: AlertCircle,
    color: "text-neutral-600",
  },
  {
    date: "Jun 11, 2024",
    action: "Appointment booked",
    detail: "SVIMS Tirupati — Jun 20, 2024",
    icon: Calendar,
    color: "text-danger-600",
  },
];

export default function PatientDashboard() {
  const { patient, referral } = patientPortalData;

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-1 text-sm text-primary-100">Welcome back,</p>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <p className="mt-1 text-sm text-primary-200">
                {patient.age} years • {patient.gender} • {patient.district}{" "}
                District
              </p>
              {patient.abhaNumber && (
                <div className="mt-3 inline-block rounded-lg bg-white/20 px-3 py-1.5">
                  <p className="text-xs text-primary-100">ABHA Number</p>
                  <p className="font-mono text-sm font-semibold">
                    {patient.abhaNumber}
                  </p>
                </div>
              )}
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Eye className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary-600" />
              <span className="text-xs font-medium text-neutral-500">
                Vision Score
              </span>
            </div>
            <p className="text-xl font-bold text-neutral-900">6/24 RE</p>
            <p className="text-xs text-neutral-500">6/18 LE (UCDVA)</p>
            <Badge variant="warning" className="mt-2 text-xs">
              Below Normal
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary-600" />
              <span className="text-xs font-medium text-neutral-500">
                Last Screened
              </span>
            </div>
            <p className="text-xl font-bold text-neutral-900">Jun 10</p>
            <p className="text-xs text-neutral-500">2024 • Narasaraopet</p>
            <Badge variant="success" className="mt-2 text-xs">
              Recent
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Glasses className="h-4 w-4 text-danger-600" />
              <span className="text-xs font-medium text-neutral-500">
                Spectacles
              </span>
            </div>
            <p className="text-xl font-bold text-neutral-900">N/A</p>
            <p className="text-xs text-neutral-500">Referral case</p>
            <Badge variant="secondary" className="mt-2 text-xs">
              Not Applicable
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Send className="h-4 w-4 text-danger-600" />
              <span className="text-xs font-medium text-neutral-500">
                Referral Status
              </span>
            </div>
            <p className="text-xl font-bold text-danger-700">
              {referral?.priority ?? "—"}
            </p>
            <p className="text-xs text-neutral-500">
              {referral?.hospital ?? "No active referral"}
            </p>
            <Badge variant="warning" className="mt-2 text-xs">
              {referral?.status ?? "None"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          {
            label: "View Prescription",
            href: "/portal/patient/prescriptions",
            icon: Eye,
            color: "bg-primary-50 text-primary-600",
          },
          {
            label: "Track Referral",
            href: "/portal/patient/referrals",
            icon: Send,
            color: "bg-danger-50 text-danger-600",
          },
          {
            label: "Book Teleconsult",
            href: "/portal/patient/teleconsult",
            icon: Clock,
            color: "bg-primary-50 text-primary-600",
          },
          {
            label: "Track Spectacles",
            href: "/portal/patient/spectacles",
            icon: Glasses,
            color: "bg-danger-50 text-danger-600",
          },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-neutral-700">
                    {action.label}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {referral && (
        <Card className="border-neutral-200 bg-neutral-100/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
              <AlertCircle className="h-4 w-4" />
              Upcoming Appointment — Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-neutral-900">
                  {referral.hospital} — {referral.department}
                </p>
                <p className="mt-0.5 text-sm text-neutral-600">
                  Date:{" "}
                  <strong>
                    {referral.appointmentDate
                      ? new Date(referral.appointmentDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )
                      : "TBD"}
                  </strong>{" "}
                  • Time: <strong>10:30 AM</strong>
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Condition: {referral.condition}
                </p>
                <div className="mt-2 text-xs text-neutral-600">
                  <p className="font-medium">Documents to carry:</p>
                  <ul className="mt-1 list-inside list-disc space-y-0.5">
                    <li>ABHA card / Aadhaar</li>
                    <li>Referral letter from AP Vision Care</li>
                    <li>Previous prescription (if any)</li>
                    <li>Blood glucose records</li>
                  </ul>
                </div>
              </div>
              <Link href="/portal/patient/referrals">
                <Button size="sm" className="whitespace-nowrap">
                  View Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-neutral-200" />
            <div className="space-y-4">
              {activities.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={i} className="relative flex gap-4">
                    <div
                      className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-neutral-200 bg-white ${activity.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-sm font-medium text-neutral-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {activity.detail}
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-400">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
