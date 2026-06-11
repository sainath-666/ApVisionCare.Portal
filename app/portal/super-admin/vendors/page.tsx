"use client";

import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { vendors } from "@/lib/mock-data";

export default function VendorsPage() {
  const [showModal, setShowModal] = useState(false);

  const avgSla =
    vendors.length > 0
      ? (vendors.reduce((a, v) => a + v.slaPct, 0) / vendors.length).toFixed(1)
      : "0";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Vendor Management</h2>
          <p className="text-sm text-neutral-500">
            Spectacle manufacturing and delivery vendors
          </p>
        </div>
        <Button className="gap-2" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Onboard Vendor
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Vendors",
            value: vendors.length,
            color: "text-primary-700",
          },
          {
            label: "Active",
            value: vendors.filter((v) => v.status === "active").length,
            color: "text-primary-700",
          },
          {
            label: "Total Orders",
            value: vendors
              .reduce((a, v) => a + v.orders, 0)
              .toLocaleString("en-IN"),
            color: "text-neutral-700",
          },
          {
            label: "Avg SLA %",
            value: `${avgSla}%`,
            color: "text-neutral-700",
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
                <TableHead>Vendor Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Delivered</TableHead>
                <TableHead className="text-right">SLA %</TableHead>
                <TableHead className="text-right">Breaches</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <p className="font-medium text-neutral-900">{vendor.name}</p>
                    <p className="text-xs text-neutral-500">{vendor.email}</p>
                  </TableCell>
                  <TableCell className="text-sm text-neutral-700">
                    {vendor.location}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary-700">
                    {vendor.orders.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary-700">
                    {vendor.delivered.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-semibold ${
                        vendor.slaPct >= 95
                          ? "text-primary-700"
                          : vendor.slaPct >= 90
                            ? "text-neutral-700"
                            : "text-danger-700"
                      }`}
                    >
                      {vendor.slaPct}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-semibold ${
                        vendor.breaches > 50 ? "text-danger-700" : "text-neutral-700"
                      }`}
                    >
                      {vendor.breaches}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-primary-500 text-primary-500" />
                      <span className="text-sm font-semibold">
                        {vendor.rating}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        vendor.status === "active" ? "success" : "danger"
                      }
                    >
                      {vendor.status === "active"
                        ? "Active"
                        : vendor.status.charAt(0).toUpperCase() +
                          vendor.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-4 pb-2 pt-4">
          <CardTitle className="text-base">SLA Configuration</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { label: "Standard SLA (days)", value: "7" },
              { label: "Urgent SLA (days)", value: "3" },
              { label: "Breach Penalty (₹/day)", value: "500" },
            ].map((cfg) => (
              <div key={cfg.label} className="space-y-2">
                <Label>{cfg.label}</Label>
                <Input defaultValue={cfg.value} type="number" />
              </div>
            ))}
          </div>
          <Button className="mt-4">Save SLA Config</Button>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Onboard New Vendor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Vendor Name</Label>
              <Input placeholder="Enter vendor name" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="City, District" />
            </div>
            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input placeholder="Phone number" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="Email address" type="email" />
            </div>
            <div className="space-y-2">
              <Label>SLA Days</Label>
              <Input defaultValue="7" type="number" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowModal(false)}>Onboard Vendor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
