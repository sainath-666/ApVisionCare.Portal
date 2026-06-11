import { EMRForm } from "@/components/emr/emr-form";
import { getPatientById, patients } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  params: { patientId: string };
}

export default function EMRPage({ params }: Props) {
  let patient = getPatientById(params.patientId);

  if (!patient && params.patientId === "pat-new-001") {
    patient = {
      id: "pat-new-001",
      name: "Rama Devi",
      mobile: "9876500000",
      age: 35,
      gender: "Female",
      district: "Visakhapatnam",
      mandal: "Anakapalle",
      village: "Anakapalle",
      abhaNumber: "91-9999-8888-7777",
    };
  }

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <Link
        href="/portal/screening-team/patients"
        className="inline-flex items-center text-sm text-primary-600 hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to patients
      </Link>
      <div>
        <h1 className="text-2xl font-bold">EMR — {patient.name}</h1>
        <p className="text-neutral-500">
          {patient.age}y / {patient.gender} — {patient.village},{" "}
          {patient.mandal}
        </p>
      </div>
      <EMRForm patient={patient} />
    </div>
  );
}
