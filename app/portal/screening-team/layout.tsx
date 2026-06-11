import { PortalLayout } from "@/components/layout/portal-layout";

export default function ScreeningTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalLayout role="screening_team" userName="Team Alpha Lead">
      {children}
    </PortalLayout>
  );
}
