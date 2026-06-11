"use client";

import { useState } from "react";
import { Search, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auditLogs } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

const ACTION_VARIANT: Record<
  string,
  "success" | "warning" | "danger" | "default" | "secondary"
> = {
  CREATE: "default",
  SUBMIT: "default",
  APPROVE: "success",
  REJECT: "danger",
  SUSPEND: "danger",
  SLA_BREACH: "danger",
  COMPLETE: "success",
  SCHEDULE: "warning",
  CARE_CONTEXT_LINK: "secondary",
};

export default function AuditPage() {
  const [q, setQ] = useState("");
  const [entity, setEntity] = useState("all");
  const entities = Array.from(new Set(auditLogs.map((l) => l.entityType)));

  const rows = auditLogs.filter((l) => {
    const matchQ = `${l.entityId} ${l.performedBy} ${l.summary} ${l.action}`
      .toLowerCase()
      .includes(q.toLowerCase());
    const matchE = entity === "all" || l.entityType === entity;
    return matchQ && matchE;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Log"
        description="Immutable record of every state mutation (DPDP / ABDM compliance)"
        actions={
          <Badge variant="success">
            <ShieldCheck className="mr-1 size-3" />
            Tamper-evident
          </Badge>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 size-4 text-neutral-400" />
          <Input
            placeholder="Search by entity, user, action…"
            className="pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select
          value={entity}
          onChange={(e) => setEntity(e.target.value)}
          className="sm:w-48"
        >
          <option value="all">All entities</option>
          {entities.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </Select>
      </div>

      <Card>
        <CardContent className="px-0 py-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="whitespace-nowrap text-xs text-neutral-500">
                    {formatDateTime(l.timestamp)}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{l.entityType}</p>
                    <p className="text-xs text-neutral-500">{l.entityId}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={ACTION_VARIANT[l.action] ?? "secondary"}>
                      {l.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{l.performedBy}</p>
                    <p className="text-xs text-neutral-500">
                      {String(l.performedByRole)}
                    </p>
                  </TableCell>
                  <TableCell className="max-w-xs text-sm text-neutral-500">
                    {l.summary}
                  </TableCell>
                  <TableCell className="text-xs text-neutral-500">
                    {l.ipAddress}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
