import { CampsView } from "@/components/shared/camps-view";
import { camps } from "@/lib/mock-data";

export default function CampsPage() {
  return <CampsView camps={camps} />;
}
