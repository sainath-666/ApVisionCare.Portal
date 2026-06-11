"use client";

import { useState } from "react";
import { Search, UserPlus, Edit, UserX } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { users } from "@/lib/mock-data";
import type { UserRole } from "@/lib/types";
import { initials } from "@/lib/utils";

const ROLE_DISPLAY: Record<UserRole, string> = {
  super_admin: "Super Admin",
  nodal_officer: "Nodal Officer",
  screening_team: "Optometrist",
  patient: "Patient",
};

const ROLE_FILTER_OPTIONS = [
  "All",
  "Super Admin",
  "Nodal Officer",
  "Optometrist",
  "Patient",
] as const;

function roleBadge(role: UserRole) {
  const label = ROLE_DISPLAY[role];
  const styles: Record<UserRole, string> = {
    super_admin: "bg-primary-100 text-primary-800",
    nodal_officer: "bg-primary-50 text-primary-700",
    screening_team: "bg-primary-100 text-primary-600",
    patient: "bg-neutral-100 text-neutral-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${styles[role]}`}
    >
      {label}
    </span>
  );
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const filtered = users.filter((u) => {
    const district = u.district ?? "";
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      district.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole =
      roleFilter === "All" || ROLE_DISPLAY[u.role] === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">
            User Management
          </h2>
          <p className="text-sm text-neutral-500">
            Manage all portal users across roles and districts
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="px-4 pb-3 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-48 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search by name, district, email..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              {ROLE_FILTER_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role === "All" ? "All Roles" : role}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[min(560px,calc(100vh-14rem))] overflow-auto scrollbar-thin">
            <Table className="relative">
              <TableHeader className="sticky top-0 z-10 bg-neutral-50 shadow-sm">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Email / Mobile</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                          {initials(user.name)}
                        </div>
                        <span className="text-sm font-medium text-neutral-900">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{roleBadge(user.role)}</TableCell>
                    <TableCell className="text-sm text-neutral-600">
                      {user.district || "—"}
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-neutral-700">{user.email}</p>
                      <p className="text-xs text-neutral-500">{user.mobile}</p>
                    </TableCell>
                    <TableCell>
                      {user.status === "active" ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-neutral-500">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          aria-label="Edit user"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-danger-500 hover:text-danger-700"
                          aria-label="Deactivate user"
                        >
                          <UserX className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="border-t border-neutral-100 px-4 py-3">
            <p className="text-xs text-neutral-500">
              Showing {filtered.length} of {users.length} users
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
