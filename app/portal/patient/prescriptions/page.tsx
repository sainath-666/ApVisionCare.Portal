import { Download, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patientPortalData } from "@/lib/mock-data";

function outcomeVariant(outcome: string) {
  if (outcome === "Referral") return "danger" as const;
  if (outcome === "Spectacles") return "info" as const;
  return "success" as const;
}

export default function PrescriptionsPage() {
  const { prescriptions } = patientPortalData;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">My Prescriptions</h2>
        <p className="text-sm text-neutral-500">
          Eye prescriptions from your screenings
        </p>
      </div>

      {prescriptions.map((rx) => (
        <Card key={rx.id} className="transition-shadow hover:shadow-md">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">
                  Prescription — {rx.date}
                </CardTitle>
                <p className="mt-1 text-sm text-neutral-500">Camp: {rx.camp}</p>
                <p className="text-sm text-neutral-500">
                  Optometrist: {rx.optometrist}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={outcomeVariant(rx.outcome)}>{rx.outcome}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border-collapse border border-neutral-200 text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="border border-neutral-200 p-3 text-left font-semibold text-primary-700">
                      Eye
                    </th>
                    <th className="border border-neutral-200 p-3 text-center font-semibold text-neutral-700">
                      Sph (D)
                    </th>
                    <th className="border border-neutral-200 p-3 text-center font-semibold text-neutral-700">
                      Cyl (D)
                    </th>
                    <th className="border border-neutral-200 p-3 text-center font-semibold text-neutral-700">
                      Axis (°)
                    </th>
                    <th className="border border-neutral-200 p-3 text-center font-semibold text-neutral-700">
                      Add Power
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-200 p-3 font-semibold text-primary-700">
                      Right Eye (RE)
                    </td>
                    <td className="border border-neutral-200 p-3 text-center font-mono">
                      {rx.rightEye.sph > 0 ? "+" : ""}
                      {rx.rightEye.sph.toFixed(2)}
                    </td>
                    <td className="border border-neutral-200 p-3 text-center font-mono">
                      {rx.rightEye.cyl.toFixed(2)}
                    </td>
                    <td className="border border-neutral-200 p-3 text-center font-mono">
                      {rx.rightEye.axis}°
                    </td>
                    <td className="border border-neutral-200 p-3 text-center font-mono">
                      +{rx.rightEye.add.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-200 p-3 font-semibold text-primary-700">
                      Left Eye (LE)
                    </td>
                    <td className="border border-neutral-200 p-3 text-center font-mono">
                      {rx.leftEye.sph > 0 ? "+" : ""}
                      {rx.leftEye.sph.toFixed(2)}
                    </td>
                    <td className="border border-neutral-200 p-3 text-center font-mono">
                      {rx.leftEye.cyl.toFixed(2)}
                    </td>
                    <td className="border border-neutral-200 p-3 text-center font-mono">
                      {rx.leftEye.axis}°
                    </td>
                    <td className="border border-neutral-200 p-3 text-center font-mono">
                      +{rx.leftEye.add.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {rx.note && (
              <div className="mb-4 rounded-lg bg-primary-50 p-3 text-sm text-primary-700">
                <strong>Note:</strong> {rx.note}
              </div>
            )}

            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 p-4 text-center">
                <QrCode className="mb-1 h-8 w-8 text-neutral-400" />
                <p className="text-xs text-neutral-400">QR Code</p>
              </div>
              <div className="flex-1">
                <p className="mb-3 text-xs text-neutral-500">
                  Scan QR code at any government hospital or optical shop to
                  access this prescription
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Download className="h-3.5 w-3.5" />
                    Download PDF
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <QrCode className="h-3.5 w-3.5" />
                    View QR
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {prescriptions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-neutral-500">
              No prescriptions found. Complete an eye screening to get your
              prescription.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
