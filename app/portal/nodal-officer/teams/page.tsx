import { MapPin, Plus, UserCircle2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { screeningTeams } from "@/lib/mock-data";

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Screening Teams"
        description="Create teams and assign them to camps"
        actions={
          <Button>
            <Plus className="mr-2 size-4" />
            Create Team
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {screeningTeams.map((t) => (
          <Card key={t.id}>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="flex items-center gap-1 text-xs text-neutral-500">
                    <MapPin className="size-3" /> {t.mandal}, {t.district}
                  </p>
                </div>
                <StatusBadge status={t.status} />
              </div>

              <div className="space-y-1.5">
                {t.members.map((m) => (
                  <div key={m.name} className="flex items-center gap-2 text-sm">
                    <UserCircle2 className="size-4 text-neutral-400" />
                    <span className="font-medium">{m.name}</span>
                    <span className="text-xs text-neutral-500">· {m.role}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-lg bg-neutral-100 p-3 text-sm">
                <span className="text-neutral-500">Assigned camp</span>
                <span className="font-medium">
                  {t.assignedCampName ?? "Unassigned"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {t.patientsScreenedToday} screened today
                </Badge>
                <Button size="sm" variant="outline">
                  Assign camp
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
