"use client";

import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { camps, screeningTeams } from "@/lib/mock-data";
import type { CampStatus, CampType } from "@/lib/types";

function formatCampType(type: CampType) {
  const labels: Record<CampType, string> = {
    village: "Village",
    school: "School",
    tribal: "Tribal",
    industrial: "Industrial",
    urban_slum: "Urban Slum",
  };
  return labels[type];
}

function statusBadge(status: CampStatus) {
  if (status === "active") return <Badge variant="success">Active</Badge>;
  if (status === "completed") return <Badge variant="info">Completed</Badge>;
  if (status === "scheduled") return <Badge variant="warning">Scheduled</Badge>;
  return <Badge variant="secondary">Cancelled</Badge>;
}

export default function NodalCampsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const districtCamps = camps;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Camp Management</h2>
          <p className="text-sm text-neutral-500">
            Schedule and manage eye screening camps
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" />
          Schedule Camp
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarDays className="h-4 w-4 text-primary-600" />
            Upcoming & Recent Camps
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Camp Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districtCamps.map((camp) => (
                <TableRow key={camp.id}>
                  <TableCell>
                    <p className="text-sm font-medium text-neutral-900">
                      {camp.name}
                    </p>
                    <p className="text-xs text-neutral-500">ID: {camp.id}</p>
                  </TableCell>
                  <TableCell>
                    <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
                      {formatCampType(camp.type)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-neutral-700">{camp.district}</p>
                    <p className="text-xs text-neutral-500">{camp.mandal}</p>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-700">
                    {new Date(camp.scheduledDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-700">
                    {camp.teamName}
                  </TableCell>
                  <TableCell>{statusBadge(camp.status)}</TableCell>
                  <TableCell>
                    <div className="text-xs text-neutral-600">
                      {camp.screenedCount}/{camp.patientCount}
                      {camp.status === "completed" && (
                        <span className="ml-1 text-primary-600">✓</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule New Camp</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Camp Name</Label>
              <Input placeholder="e.g., Guntur East Village Camp" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Camp Type</Label>
                <Select defaultValue="village">
                  <option value="village">Village</option>
                  <option value="school">School</option>
                  <option value="tribal">Tribal</option>
                  <option value="industrial">Industrial</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Mandal</Label>
                <Input placeholder="Mandal name" />
              </div>
              <div className="space-y-2">
                <Label>Village</Label>
                <Input placeholder="Village name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Assign Team</Label>
              <Select defaultValue={screeningTeams[0]?.id}>
                {screeningTeams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.leadName}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Patients</Label>
              <Input type="number" defaultValue="80" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowCreate(false)}>Schedule Camp</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
