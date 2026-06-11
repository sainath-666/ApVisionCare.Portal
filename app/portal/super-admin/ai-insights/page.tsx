"use client";

import { AlertTriangle, Brain, TrendingUp } from "lucide-react";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { LineChartComponent } from "@/components/charts/line-chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BRAND_BLUE,
  BRAND_GRAY,
  BRAND_RED,
  PRIMARY_100,
  PRIMARY_200,
} from "@/lib/chart-colors";
import {
  aiHotspots,
  demandForecast,
  referralPriorities,
} from "@/lib/mock-data";

function riskBadge(level: string) {
  if (level === "Critical") return <Badge variant="danger">Critical</Badge>;
  if (level === "High") return <Badge variant="warning">High</Badge>;
  if (level === "Moderate")
    return (
      <Badge className="border-primary-200 bg-primary-100 text-primary-700">
        Moderate
      </Badge>
    );
  return <Badge variant="success">Low</Badge>;
}

function priorityBadge(priority: string) {
  if (priority === "Critical") return <Badge variant="danger">Critical</Badge>;
  if (priority === "High") return <Badge variant="warning">High</Badge>;
  return <Badge variant="secondary">Routine</Badge>;
}

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900">
          <Brain className="h-5 w-5 text-primary-600" />
          AI Analytics & Insights
        </h2>
        <p className="text-sm text-neutral-500">
          Disease hotspot prediction, demand forecasting, and referral
          prioritization
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: "High Risk Districts",
            value: aiHotspots.filter(
              (h) => h.riskLevel === "High" || h.riskLevel === "Critical",
            ).length,
            color: "text-danger-700",
          },
          {
            label: "Avg DR Prevalence",
            value:
              (
                aiHotspots.reduce((a, h) => a + h.drPrevalence, 0) /
                aiHotspots.length
              ).toFixed(1) + "%",
            color: "text-neutral-700",
          },
          {
            label: "Predicted Jul Demand",
            value: "4,200",
            color: "text-primary-700",
          },
          {
            label: "Critical Referrals",
            value: referralPriorities.filter((r) => r.priority === "Critical")
              .length,
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              DR Prevalence by District (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={aiHotspots.map((h) => ({
                district: h.district.substring(0, 6),
                drPrevalence: h.drPrevalence,
                cataractRisk: h.cataractRisk,
              }))}
              xKey="district"
              bars={[
                {
                  key: "drPrevalence",
                  color: BRAND_RED,
                  name: "DR Prevalence %",
                },
                {
                  key: "cataractRisk",
                  color: BRAND_GRAY,
                  name: "Cataract Risk %",
                },
              ]}
              height={260}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-primary-600" />
              Spectacle Demand Forecast (Next 3 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChartComponent
              data={demandForecast}
              xKey="month"
              lines={[
                {
                  key: "predicted",
                  color: BRAND_BLUE,
                  name: "Predicted Demand",
                },
                { key: "upper", color: PRIMARY_200, name: "Upper Bound" },
                { key: "lower", color: PRIMARY_100, name: "Lower Bound" },
              ]}
              height={260}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-primary-500" />
            Disease Burden Hotspot Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead className="text-right">Burden Score</TableHead>
                <TableHead className="text-right">DR %</TableHead>
                <TableHead className="text-right">Cataract Risk %</TableHead>
                <TableHead className="text-right">Glaucoma Risk %</TableHead>
                <TableHead className="text-right">Refractive Error %</TableHead>
                <TableHead className="text-right">Predicted Demand</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...aiHotspots]
                .sort((a, b) => b.burdenScore - a.burdenScore)
                .map((h) => (
                  <TableRow key={h.district}>
                    <TableCell className="font-medium text-neutral-900">
                      {h.district}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-bold ${h.burdenScore >= 75 ? "text-danger-700" : h.burdenScore >= 65 ? "text-neutral-700" : "text-primary-700"}`}
                      >
                        {h.burdenScore}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-danger-700">
                      {h.drPrevalence}%
                    </TableCell>
                    <TableCell className="text-right text-neutral-700">
                      {h.cataractRisk}%
                    </TableCell>
                    <TableCell className="text-right text-primary-700">
                      {h.glaucomaRisk}%
                    </TableCell>
                    <TableCell className="text-right text-primary-700">
                      {h.refractiveError}%
                    </TableCell>
                    <TableCell className="text-right text-neutral-700">
                      {h.predictedDemand.toLocaleString()}
                    </TableCell>
                    <TableCell>{riskBadge(h.riskLevel)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            Referral Prioritization Queue
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Days Pending</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...referralPriorities]
                .sort((a, b) => {
                  const p: Record<string, number> = {
                    Critical: 0,
                    High: 1,
                    Routine: 2,
                  };
                  return p[a.priority] - p[b.priority];
                })
                .map((r) => (
                  <TableRow
                    key={r.id}
                    className={
                      r.priority === "Critical"
                        ? "bg-danger-50"
                        : r.priority === "High"
                          ? "bg-neutral-100"
                          : ""
                    }
                  >
                    <TableCell>
                      <p className="text-sm font-medium text-neutral-900">
                        {r.patientName}
                      </p>
                      <p className="text-xs text-neutral-500">{r.district}</p>
                    </TableCell>
                    <TableCell className="max-w-xs text-sm text-neutral-700">
                      {r.condition}
                    </TableCell>
                    <TableCell className="text-sm text-neutral-700">
                      {r.hospital}
                    </TableCell>
                    <TableCell>{priorityBadge(r.priority)}</TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${r.daysPending > 7 ? "text-danger-700" : r.daysPending > 3 ? "text-neutral-700" : "text-primary-700"}`}
                      >
                        {r.daysPending} days
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          r.status === "Visited"
                            ? "success"
                            : r.status === "Appointment Booked"
                              ? "info"
                              : "warning"
                        }
                      >
                        {r.status}
                      </Badge>
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
