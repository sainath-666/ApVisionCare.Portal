import {
  AlertCircle,
  Calendar,
  FileText,
  MapPin,
  Stethoscope,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patientPortalData } from "@/lib/mock-data";

const documents = [
  "ABHA card (Ayushman Bharat Health Account card)",
  "Original Aadhaar Card",
  "AP Vision Care Referral Letter (printable from below)",
  "Blood glucose records / Diabetic reports (last 3 months)",
  "Any previous spectacle prescription",
  "Previous eye examination reports (if any)",
];

const instructions = [
  "Report to OPD Registration counter by 9:30 AM",
  "Fasting for 4 hours before the appointment (pupil dilation)",
  "Bring a companion — driving not recommended after eye drops",
  "Contact: 0877-2287777 for queries",
];

function formatAppointmentDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function splitCondition(condition: string) {
  const withIndex = condition.indexOf(" with ");
  if (withIndex === -1) {
    return { primary: condition, secondary: null };
  }
  return {
    primary: condition.slice(0, withIndex),
    secondary: condition.slice(withIndex),
  };
}

export default function PatientReferralsPage() {
  const referral = patientPortalData.referral;

  if (!referral) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">My Referral</h2>
          <p className="text-sm text-neutral-500">
            Hospital referral details and appointment information
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <Stethoscope className="h-12 w-12 text-neutral-300" />
            <p className="mt-4 text-neutral-500">No active referrals</p>
            <p className="text-sm text-neutral-400">
              Referrals will appear here when recommended during screening
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const condition = splitCondition(referral.condition);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">My Referral</h2>
        <p className="text-sm text-neutral-500">
          Hospital referral details and appointment information
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-danger-200 bg-danger-50 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger-600" />
        <div>
          <p className="font-semibold text-danger-700">
            {referral.priority} Priority Referral
          </p>
          <p className="mt-0.5 text-sm text-danger-600">
            Please attend your appointment. Early treatment is important for
            your eye condition.
          </p>
        </div>
      </div>

      <Card className="border-danger-100">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base">
                Referral to {referral.hospital}
              </CardTitle>
              <p className="mt-1 text-sm text-neutral-500">
                {referral.department}
              </p>
            </div>
            <Badge variant="danger">{referral.priority} Priority</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-danger-600" />
                <div>
                  <p className="text-xs text-neutral-500">Hospital</p>
                  <p className="font-semibold text-neutral-900">
                    SVIMS — Sri Venkateswara Institute of Medical Sciences
                  </p>
                  <p className="text-sm text-neutral-600">
                    Tirupati, Chittoor District, Andhra Pradesh
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                <div>
                  <p className="text-xs text-neutral-500">Appointment</p>
                  <p className="font-semibold text-neutral-900">
                    {referral.appointmentDate
                      ? `${formatAppointmentDate(referral.appointmentDate)} — 10:30 AM`
                      : "To be scheduled"}
                  </p>
                  <Badge variant="info" className="mt-1">
                    {referral.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-neutral-500">
                  Condition / Diagnosis
                </p>
                <p className="text-sm font-semibold text-neutral-900">
                  {condition.primary}
                </p>
                {condition.secondary && (
                  <p className="text-sm text-neutral-700">
                    {condition.secondary}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs text-neutral-500">Referred by</p>
                <p className="text-sm text-neutral-700">
                  Dr. Prasad Kumar, AP Vision Care
                </p>
                <p className="text-xs text-neutral-500">
                  Narasaraopet Camp, June 10, 2024
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-neutral-100 p-4">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-neutral-600" />
              <p className="text-sm font-semibold text-neutral-700">
                Documents to Carry
              </p>
            </div>
            <ul className="space-y-2">
              {documents.map((doc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-neutral-700"
                >
                  <span className="mt-0.5 font-bold text-neutral-600">•</span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-primary-50 p-4 text-sm">
            <p className="mb-2 font-semibold text-primary-700">
              Important Instructions
            </p>
            <ul className="space-y-1 text-neutral-700">
              {instructions.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="h-10 flex-1 rounded-md border border-primary-300 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50"
            >
              Download Referral Letter
            </button>
            <button
              type="button"
              className="h-10 flex-1 rounded-md bg-primary-600 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              Get Directions
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
