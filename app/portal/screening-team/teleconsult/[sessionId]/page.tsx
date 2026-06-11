import { teleconsultSessions } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { TeleconsultRoom } from "@/components/teleconsult/teleconsult-room";

interface Props {
  params: { sessionId: string };
}

export default function TeleconsultRoomPage({ params }: Props) {
  const session = teleconsultSessions.find((s) => s.id === params.sessionId);
  if (!session) notFound();
  return <TeleconsultRoom session={session} />;
}
