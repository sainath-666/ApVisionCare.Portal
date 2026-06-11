"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { referrals } from "@/lib/mock-data";

function priorityBadge(priority: string) {
  if (priority === "Critical") return <Badge variant="danger">Critical</Badge>;
  if (priority === "High") return <Badge variant="warning">High</Badge>;
  return <Badge variant="secondary">Routine</Badge>;
}

function statusBadge(status: string) {
  if (status === "Visited") return <Badge variant="success">Visited</Badge>;
  if (status === "Appointment Booked")
    return <Badge variant="info">Appt. Booked</Badge>;
  if (status === "Follow-up") return <Badge variant="warning">Follow-up</Badge>;
  return <Badge variant="warning">Pending</Badge>;
}

export default function NodalReferralsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Referral Tracking</h2>
        <p className="text-sm text-neutral-500">
          Monitor patient referrals to specialist hospitals
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Referrals",
            value: referrals.length,
            color: "text-primary-700",
          },
          {
            label: "Critical",
            value: referrals.filter((r) => r.priority === "Critical").length,
            color: "text-danger-700",
          },
          {
            label: "Pending",
            value: referrals.filter((r) => r.status === "Pending").length,
            color: "text-neutral-700",
          },
          {
            label: "Visited",
            value: referrals.filter((r) => r.status === "Visited").length,
            color: "text-primary-700",
          },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="mt-1 text-sm text-neutral-500">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>EMR Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Appointment</TableHead>
                <TableHead>Days Pending</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...referrals]
                .sort((a, b) => {
                  const p: Record<string, number> = {
                    Critical: 0,
                    High: 1,
                    Routine: 2,
                  };
                  return p[a.priority] - p[b.priority];
                })
                .map((ref) => (
                  <TableRow
                    key={ref.id}
                    className={
                      ref.priority === "Critical"
                        ? "bg-danger-50"
                        : ref.priority === "High"
                          ? "bg-neutral-100"
                          : ""
                    }
                  >
                    <TableCell>
                      <p className="text-sm font-medium text-neutral-900">
                        {ref.patientName}
                      </p>
                      <p className="text-xs text-neutral-500">{ref.district}</p>
                    </TableCell>
                    <TableCell className="max-w-[180px] text-xs text-neutral-700">
                      {ref.condition}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-neutral-700">{ref.hospital}</p>
                      <p className="text-xs text-neutral-500">{ref.department}</p>
                    </TableCell>
                    <TableCell className="text-sm text-neutral-600">
                      {new Date(ref.emrDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </TableCell>
                    <TableCell>{priorityBadge(ref.priority)}</TableCell>
                    <TableCell className="text-xs text-neutral-600">
                      {ref.appointmentDate ? (
                        new Date(ref.appointmentDate).toLocaleDateString(
                          "en-IN",
                          { day: "2-digit", month: "short" },
                        )
                      ) : (
                        <span className="text-neutral-600">Not booked</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-sm font-semibold ${ref.daysPending > 7 ? "text-danger-700" : ref.daysPending > 3 ? "text-neutral-700" : "text-primary-700"}`}
                      >
                        {ref.daysPending}d
                      </span>
                    </TableCell>
                    <TableCell>{statusBadge(ref.status)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
