import { Mail, Phone, Star } from "lucide-react";
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
import { vendors } from "@/lib/mock-data";

function isActive(status: string) {
  return status.toLowerCase() === "active";
}

export default function NodalVendorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Vendor Directory</h2>
        <p className="text-sm text-neutral-500">
          Spectacle manufacturing vendors serving your district
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="transition-shadow hover:shadow-md">
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-neutral-900">{vendor.name}</h3>
                <Badge variant={isActive(vendor.status) ? "success" : "danger"}>
                  {isActive(vendor.status) ? "Active" : vendor.status}
                </Badge>
              </div>
              <p className="text-sm text-neutral-600">{vendor.location}</p>
              <div className="flex items-center gap-4 text-xs text-neutral-600">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {vendor.contact}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-600">
                <Mail className="h-3 w-3" />
                {vendor.email}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded bg-primary-50 p-1.5">
                  <p className="font-bold text-primary-700">{vendor.orders}</p>
                  <p className="text-neutral-500">Orders</p>
                </div>
                <div className="rounded bg-primary-50 p-1.5">
                  <p className="font-bold text-primary-700">{vendor.slaPct}%</p>
                  <p className="text-neutral-500">SLA %</p>
                </div>
                <div className="rounded bg-neutral-100 p-1.5">
                  <p className="flex items-center justify-center gap-0.5 font-bold text-neutral-700">
                    <Star className="h-3 w-3 fill-primary-500 text-primary-500" />
                    {vendor.rating}
                  </p>
                  <p className="text-neutral-500">Rating</p>
                </div>
              </div>
              <p className="text-xs text-neutral-400">
                Onboarded:{" "}
                {new Date(vendor.onboardedDate).toLocaleDateString("en-IN", {
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">SLA %</TableHead>
                <TableHead className="text-right">Breaches</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="text-sm font-medium text-neutral-900">
                    {vendor.name}
                  </TableCell>
                  <TableCell className="text-sm text-neutral-700">
                    {vendor.location}
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold text-primary-700">
                    {vendor.orders}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`text-sm font-semibold ${vendor.slaPct >= 95 ? "text-primary-700" : "text-neutral-700"}`}
                    >
                      {vendor.slaPct}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold text-danger-700">
                    {vendor.breaches}
                  </TableCell>
                  <TableCell className="text-xs text-neutral-600">
                    {vendor.contact}
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
