"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { camps, patients } from "@/lib/mock-data";

const ACTIVE_CAMP_ID = "CMP-3401";

export default function PatientsPage() {
  const camp = camps.find((c) => c.id === ACTIVE_CAMP_ID)!;
  const campPatients = patients.filter((p) => p.campId === ACTIVE_CAMP_ID);
  const [search, setSearch] = useState("");
  const filtered = campPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.abhaNumber || "").includes(search) ||
      p.village.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Patient List</h2>
          <p className="text-sm text-neutral-500">
            Today&apos;s camp patients —{" "}
            {new Date(camp.scheduledDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <Link href="/portal/screening-team/register">
          <Button size="sm" className="gap-1.5">
            + Register Patient
          </Button>
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
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search by name, ABHA, village..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Age / Gender</TableHead>
                <TableHead>ABHA Number</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Registered At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-neutral-900">
                        {patient.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-700">
                    {patient.age}y / {patient.gender}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-neutral-600">
                    {patient.abhaNumber || (
                      <span className="text-neutral-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-neutral-700">{patient.village}</p>
                    <p className="text-xs text-neutral-500">
                      {patient.mandal}, {patient.district}
                    </p>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-500">
                    {patient.registeredAt
                      ? new Date(patient.registeredAt).toLocaleTimeString(
                          "en-IN",
                          { hour: "2-digit", minute: "2-digit" },
                        )
                      : "—"}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Link href={`/portal/screening-team/emr/${patient.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        EMR
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="border-t px-4 py-3">
            <p className="text-xs text-neutral-500">
              Showing {filtered.length} patients
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
