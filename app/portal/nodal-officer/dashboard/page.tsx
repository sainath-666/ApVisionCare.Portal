import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  Glasses,
  Tent,
  Users,
} from "lucide-react";
import { TrendAreaChart } from "@/components/charts/charts";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CHART_COLORS } from "@/lib/chart-colors";
import { MONTHLY_TREND } from "@/lib/dashboard-data";
import { camps, emrs, getDistrictKPI, spectacleOrders } from "@/lib/mock-data";
import { formatNumber, percent } from "@/lib/utils";

const DISTRICT = "Guntur";

export default function NodalDashboard() {
  const d = getDistrictKPI(DISTRICT)!;
  const campById = Object.fromEntries(camps.map((c) => [c.id, c]));
  const pending = emrs.filter(
    (e) =>
      e.status === "submitted" && campById[e.campId]?.district === DISTRICT,
  );
  const slaBreaches = spectacleOrders.filter(
    (o) => o.district === DISTRICT && o.slaBreached,
  ).length;
  const activeCamps = camps.filter(
    (c) => c.district === DISTRICT && c.status === "active",
  );
  const cov = percent(d.screened, d.target);

  const trend = MONTHLY_TREND.map((m) => ({
    label: m.label,
    screened: Math.round(m.screened * 0.105),
    spectacles: Math.round(m.spectacles * 0.105),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${DISTRICT} District Dashboard`}
        description="Your district at a glance"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pending Approvals"
          value={pending.length}
          icon={ClipboardCheck}
          tone="warning"
          hint="awaiting your action"
        />
        <StatCard
          label="Screened (district)"
          value={formatNumber(d.screened)}
          icon={Users}
          delta={6}
          tone="primary"
        />
        <StatCard
          label="Spectacles Delivered"
          value={formatNumber(d.spectacles)}
          icon={Glasses}
          delta={4}
          tone="accent"
        />
        <StatCard
          label="SLA Breaches"
          value={slaBreaches}
          icon={AlertTriangle}
          tone="destructive"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>District Trend</CardTitle>
            <CardDescription>
              Screened vs spectacles — last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TrendAreaChart
              data={trend}
              series={[
                { key: "screened", name: "Screened", color: CHART_COLORS[0] },
                {
                  key: "spectacles",
                  name: "Spectacles",
                  color: CHART_COLORS[1],
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coverage</CardTitle>
            <CardDescription>Annual target progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-3xl font-bold">{cov}%</span>
                <span className="text-sm text-neutral-500">
                  {formatNumber(d.screened)} / {formatNumber(d.target)}
                </span>
              </div>
              <Progress value={cov} indicatorClassName="bg-primary-600" />
            </div>
            <div className="rounded-lg bg-neutral-100 p-4">
              <p className="flex items-center gap-2 text-sm font-medium">
                <Tent className="size-4 text-primary-600" />{" "}
                {activeCamps.length} active camps today
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Approval Queue</CardTitle>
            <CardDescription>EMRs submitted for your review</CardDescription>
          </div>
          <Link href="/portal/nodal-officer/approvals">
            <Button variant="outline" size="sm">
              View all <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-2">
          {pending.length === 0 && (
            <p className="py-6 text-center text-sm text-neutral-500">
              No pending approvals 🎉
            </p>
          )}
          {pending.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="font-medium">{e.patientName}</p>
                <p className="text-xs text-neutral-500">
                  {e.id} · {e.campName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={e.outcome} />
                <Link href="/portal/nodal-officer/approvals">
                  <Button size="sm">Review</Button>
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
