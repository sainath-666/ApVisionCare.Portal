import { CheckCircle, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  { label: "Ordered", date: "Jun 10, 2024", done: true },
  { label: "Manufacturing", date: "Jun 11, 2024", done: true },
  {
    label: "Quality Check",
    date: "Expected Jun 13",
    done: false,
    current: true,
  },
  { label: "Dispatched", date: "Expected Jun 14", done: false },
  { label: "Delivered", date: "Expected Jun 17", done: false },
];

export default function PatientSpectaclesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">
          Spectacle Order Tracking
        </h2>
        <p className="text-sm text-neutral-500">
          Track your spectacle order status
        </p>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-3 text-sm text-neutral-700">
        ℹ️ This order is not applicable for you as your case has been referred.
        However, here is a sample order tracking view.
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Order #SO001</CardTitle>
            <Badge variant="warning">In Progress</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => (
                <div
                  key={step.label}
                  className="relative flex flex-col items-center"
                  style={{ flex: 1 }}
                >
                  {i < steps.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-4 h-0.5 w-full ${
                        steps[i + 1].done || (step.current && !step.done)
                          ? "bg-primary-300"
                          : step.done
                            ? "bg-primary-500"
                            : "bg-neutral-200"
                      }`}
                      style={{ transform: "translateY(-50%)" }}
                    />
                  )}
                  <div
                    className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      step.done
                        ? "border-primary-600 bg-primary-600"
                        : step.current
                          ? "border-dashed border-primary-600 bg-white"
                          : "border-neutral-200 bg-white"
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : step.current ? (
                      <div className="h-3 w-3 animate-pulse rounded-full bg-primary-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-neutral-300" />
                    )}
                  </div>
                  <p
                    className={`mt-2 text-center text-xs font-medium ${
                      step.done
                        ? "text-primary-700"
                        : step.current
                          ? "text-primary-600"
                          : "text-neutral-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p
                    className={`mt-0.5 text-center text-xs ${
                      step.done ? "text-neutral-600" : "text-neutral-400"
                    }`}
                  >
                    {step.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-neutral-50 p-4">
            <h4 className="mb-3 text-sm font-semibold text-neutral-900">
              Order Details
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-neutral-500">Order ID</p>
                <p className="font-mono font-semibold">SO001</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Vendor</p>
                <p>Vision Optics Hyderabad</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Ordered On</p>
                <p>June 10, 2024</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">Expected Delivery</p>
                <p className="font-semibold text-primary-700">June 17, 2024</p>
              </div>
            </div>
            <div className="mt-3 border-t pt-3">
              <p className="mb-2 text-xs text-neutral-500">Prescription</p>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="rounded border bg-white p-2">
                  <p className="mb-1 font-semibold text-primary-700">
                    Right Eye
                  </p>
                  <p>Sph: -2.00 / Cyl: -0.50</p>
                  <p>Axis: 180° / Add: +1.50</p>
                </div>
                <div className="rounded border bg-white p-2">
                  <p className="mb-1 font-semibold text-primary-700">
                    Left Eye
                  </p>
                  <p>Sph: -1.75 / Cyl: -0.25</p>
                  <p>Axis: 175° / Add: +1.50</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-primary-50 p-3 text-xs text-primary-700">
            <p className="font-medium">Delivery Information:</p>
            <p className="mt-1">
              Spectacles will be delivered at the next camp or at your village
              Panchayat office. You will receive an SMS notification when
              dispatched.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
