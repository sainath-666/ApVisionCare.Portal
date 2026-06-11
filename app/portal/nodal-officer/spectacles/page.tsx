"use client";

import { AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { spectacleOrders } from "@/lib/mock-data";
import type { SpectacleStatus } from "@/lib/types";

const steps: SpectacleStatus[] = [
  "Pending",
  "Manufacturing",
  "QA",
  "Dispatched",
  "Delivered",
];

function OrderPipeline({ status }: { status: SpectacleStatus }) {
  const idx = steps.indexOf(status);
  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          <div
            className={`h-2 w-2 rounded-full ${i <= idx ? "bg-primary-600" : "bg-neutral-200"}`}
          />
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 w-3 ${i < idx ? "bg-primary-600" : "bg-neutral-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function SpectaclesPage() {
  const breached = spectacleOrders.filter((o) => o.slaBreached);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">
          Spectacle Order Tracking
        </h2>
        <p className="text-sm text-neutral-500">
          Monitor orders through the manufacturing and delivery pipeline
        </p>
      </div>

      {breached.length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-danger-200 bg-danger-50 p-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger-600" />
          <div>
            <p className="text-sm font-semibold text-danger-700">
              {breached.length} SLA Breach{breached.length > 1 ? "es" : ""}{" "}
              Detected
            </p>
            <p className="mt-0.5 text-xs text-danger-600">
              Orders: {breached.map((o) => o.id.toUpperCase()).join(", ")}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {steps.map((step) => (
          <Card key={step} className="text-center">
            <CardContent className="p-3">
              <p className="text-xl font-bold text-primary-700">
                {spectacleOrders.filter((o) => o.status === step).length}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">{step}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-primary-600" />
            All Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Pipeline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>SLA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spectacleOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className={
                    order.slaBreached
                      ? "bg-danger-50"
                      : order.daysElapsed >= order.slaDays - 1
                        ? "bg-neutral-100"
                        : ""
                  }
                >
                  <TableCell className="font-mono text-xs font-semibold text-primary-700">
                    {order.id.toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium text-neutral-900">
                      {order.patientName}
                    </p>
                    <p className="text-xs text-neutral-500">{order.district}</p>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-700">
                    {order.vendorName}
                  </TableCell>
                  <TableCell className="text-xs text-neutral-600">
                    {new Date(order.orderedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell>
                    <OrderPipeline status={order.status} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "success"
                          : order.status === "Dispatched"
                            ? "info"
                            : "warning"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-neutral-600">
                    {new Date(order.expectedDelivery).toLocaleDateString(
                      "en-IN",
                      { day: "2-digit", month: "short" },
                    )}
                  </TableCell>
                  <TableCell>
                    {order.slaBreached ? (
                      <Badge variant="danger">Breached</Badge>
                    ) : order.status === "Delivered" ? (
                      <Badge variant="success">On Time</Badge>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Progress
                          value={Math.round(
                            (order.daysElapsed / order.slaDays) * 100,
                          )}
                          className="h-1.5 w-12"
                        />
                        <span className="text-xs">
                          {order.slaDays - order.daysElapsed}d
                        </span>
                      </div>
                    )}
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
