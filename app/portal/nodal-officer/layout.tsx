import { PortalLayout } from "@/components/layout/portal-layout";

export default function NodalOfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalLayout role="nodal_officer" userName="Ramesh Naidu">
      {children}
    </PortalLayout>
  );
}
