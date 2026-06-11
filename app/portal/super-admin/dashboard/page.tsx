import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartComponent } from "@/components/charts/bar-chart";
import {
  DonutChart,
  TrendAreaChart,
  VerticalBarChart,
} from "@/components/charts/charts";
import { DistrictMap } from "@/components/maps/district-map";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CHART_COLORS } from "@/lib/chart-colors";
import {
  CAMP_TYPE_BREAKDOWN,
  DISTRICT_PERFORMANCE,
  MONTHLY_TREND,
  OUTCOME_BREAKDOWN,
  SLA_BREACH_ORDERS,
} from "@/lib/dashboard-data";
import { districtKPIs } from "@/lib/mock-data";
import { Users, Glasses, Send, AlertTriangle, Tent, Video } from "lucide-react";

const slaBreaches = SLA_BREACH_ORDERS.filter((o) => o.slaBreached);

const cardHeaderClass = "px-4 py-3 pb-1";
const cardContentClass = "px-4 pb-4 pt-0";

const kpiCards = [
  {
    label: "Total Screened",
    value: "1,42,847",
    icon: Users,
    color: "text-primary-600",
    bg: "bg-primary-50",
    change: "+12.4%",
  },
  {
    label: "Spectacles Ordered",
    value: "38,291",
    icon: Glasses,
    color: "text-primary-600",
    bg: "bg-primary-50",
    change: "+8.2%",
  },
  {
    label: "Referrals",
    value: "12,847",
    icon: Send,
    color: "text-danger-600",
    bg: "bg-danger-50",
    change: "+5.1%",
  },
  {
    label: "Teleconsults",
    value: "8,234",
    icon: Video,
    color: "text-danger-600",
    bg: "bg-danger-50",
    change: "+18.7%",
  },
  {
    label: "SLA Breaches",
    value: "127",
    icon: AlertTriangle,
    color: "text-neutral-600",
    bg: "bg-neutral-100",
    change: "-3.2%",
  },
  {
    label: "Active Camps",
    value: "23",
    icon: Tent,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    change: "+2",
  },
];

const districtChartData = DISTRICT_PERFORMANCE.map((d) => ({
  name: d.name.replace(" ", "\n"),
  screened: d.screened,
  spectacles: d.spectacles,
}));

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Row 1 — Statewide KPIs */}
      <section>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card
                key={kpi.label}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-3">
                  <div
                    className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg ${kpi.bg}`}
                  >
                    <Icon className={`h-4 w-4 ${kpi.color}`} />
                  </div>
                  <p className={`text-xl font-bold ${kpi.color}`}>
                    {kpi.value}
                  </p>
                  <p className="mt-0.5 text-xs leading-tight text-neutral-500">
                    {kpi.label}
                  </p>
                  <p
                    className={`mt-1 text-xs font-medium ${kpi.change.startsWith("+") ? "text-primary-600" : "text-danger-600"}`}
                  >
                    {kpi.change} vs last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Row 2 — Programme trends */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className={cardHeaderClass}>
            <CardTitle className="text-base">
              Screening &amp; Service Trend
            </CardTitle>
          </CardHeader>
          <CardContent className={cardContentClass}>
            <TrendAreaChart
              data={MONTHLY_TREND}
              series={[
                { key: "screened", name: "Screened", color: CHART_COLORS[0] },
                {
                  key: "spectacles",
                  name: "Spectacles",
                  color: CHART_COLORS[1],
                },
                { key: "referrals", name: "Referrals", color: CHART_COLORS[3] },
              ]}
              height={280}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className="text-base">Outcome Mix</CardTitle>
          </CardHeader>
          <CardContent className={cardContentClass}>
            <DonutChart data={OUTCOME_BREAKDOWN} height={280} />
          </CardContent>
        </Card>
      </section>

      {/* Row 3 — Camp performance & alerts */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className={cardHeaderClass}>
            <CardTitle className="text-base">
              Performance by Camp Type
            </CardTitle>
          </CardHeader>
          <CardContent className={cardContentClass}>
            <VerticalBarChart
              data={CAMP_TYPE_BREAKDOWN}
              series={[
                { key: "screened", name: "Screened", color: CHART_COLORS[0] },
                {
                  key: "spectacles",
                  name: "Spectacles",
                  color: CHART_COLORS[1],
                },
              ]}
              height={260}
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className={cardHeaderClass}>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-primary-500" />
              SLA Breach Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className={`${cardContentClass} flex flex-1 flex-col`}>
            {slaBreaches.length === 0 ? (
              <div className="flex flex-1 items-center justify-center py-4 text-center">
                <div>
                  <p className="font-medium text-primary-600">
                    No active SLA breaches
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    All orders are on track
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Over</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {slaBreaches.map((order) => (
                      <TableRow key={order.id} className="bg-danger-50">
                        <TableCell className="font-mono text-xs">
                          {order.id.toUpperCase()}
                        </TableCell>
                        <TableCell className="text-xs">
                          {order.patientName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="danger">
                            {order.daysElapsed - order.slaDays}d
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="mt-auto rounded-lg bg-neutral-100 p-2.5">
              <p className="text-xs font-medium text-neutral-700">
                127 total SLA breaches this month
              </p>
              <p className="mt-0.5 text-xs text-neutral-600">
                Primary cause: Manufacturing delays at Vizag vendor
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Row 4 — District comparison & geographic intelligence */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className="text-base">
              District-wise Performance
            </CardTitle>
          </CardHeader>
          <CardContent className={cardContentClass}>
            <BarChartComponent
              data={districtChartData}
              xKey="name"
              bars={[
                { key: "screened", color: CHART_COLORS[0], name: "Screened" },
                {
                  key: "spectacles",
                  color: CHART_COLORS[1],
                  name: "Spectacles",
                },
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={cardHeaderClass}>
            <CardTitle className="text-base">Disease Burden Map</CardTitle>
          </CardHeader>
          <CardContent className={cardContentClass}>
            <DistrictMap districts={districtKPIs} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
