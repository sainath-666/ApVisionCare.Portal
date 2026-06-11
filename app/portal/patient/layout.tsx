import { PortalLayout } from "@/components/layout/portal-layout";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalLayout role="patient" userName="Rama Rao">
      {children}
    </PortalLayout>
  );
}
