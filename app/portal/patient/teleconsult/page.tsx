"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Star, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ophthalmologists,
  patientPortalData,
  teleconsultSessions,
} from "@/lib/mock-data";

export default function PatientTeleconsultPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const patientId = patientPortalData.patient.id;
  const upcomingSessions = teleconsultSessions.filter(
    (s) => s.patientId === patientId && s.status === "scheduled",
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">
          Tele-consultation
        </h2>
        <p className="text-sm text-neutral-500">
          Connect with specialist ophthalmologists online
        </p>
      </div>

      {upcomingSessions.slice(0, 1).map((session) => (
        <Card key={session.id} className="border-primary-200 bg-primary-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-primary-700">
              <Video className="h-4 w-4" />
              Upcoming Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-neutral-900">
                  {session.ophthalmologistName}
                </p>
                <p className="mt-0.5 text-sm text-neutral-600">
                  {new Date(session.scheduledAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <Badge variant="success" className="mt-2">
                  Scheduled
                </Badge>
              </div>
              <Link href={`/portal/patient/teleconsult/${session.id}`}>
                <Button className="gap-2">
                  <Video className="h-4 w-4" />
                  Join Session
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}

      <div>
        <h3 className="mb-3 font-semibold text-neutral-900">
          Available Ophthalmologists
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ophthalmologists.map((doc) => (
            <Card
              key={doc.id}
              className={`cursor-pointer transition-all ${
                selectedDoc === doc.id
                  ? "border-primary-500 ring-1 ring-primary-500"
                  : "hover:border-primary-300"
              } ${!doc.available ? "opacity-60" : ""}`}
              onClick={() => doc.available && setSelectedDoc(doc.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                      {doc.name
                        .split(" ")
                        .filter((n) => n !== "Dr.")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        {doc.name}
                      </p>
                      <p className="text-xs text-neutral-600">
                        {doc.specialization}
                      </p>
                      <p className="text-xs text-neutral-500">{doc.hospital}</p>
                      <div className="mt-1 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="h-3 w-3 fill-primary-400 text-primary-400"
                          />
                        ))}
                        <span className="ml-1 text-xs text-neutral-500">
                          4.8
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={doc.available ? "success" : "secondary"}>
                    {doc.available ? "Available" : "Busy"}
                  </Badge>
                </div>

                {doc.available && selectedDoc === doc.id && (
                  <div className="mt-3 border-t border-neutral-100 pt-3">
                    <Label className="mb-2 block text-xs font-medium text-neutral-700">
                      Select Time Slot (Today)
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {doc.slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSlot(slot);
                          }}
                          className={`rounded border px-3 py-1 text-xs font-medium transition-colors ${
                            selectedSlot === slot
                              ? "border-primary-600 bg-primary-600 text-white"
                              : "border-neutral-300 bg-white text-neutral-700 hover:border-primary-400"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedDoc && selectedSlot && !booked && (
        <Card className="border-primary-200 bg-primary-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-neutral-900">
                  Confirm Booking
                </p>
                <p className="mt-0.5 text-sm text-neutral-600">
                  {ophthalmologists.find((d) => d.id === selectedDoc)?.name} •
                  Today at {selectedSlot}
                </p>
              </div>
              <Button onClick={() => setBooked(true)} className="gap-2">
                <Calendar className="h-4 w-4" />
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {booked && (
        <Card className="border-primary-300 bg-primary-50">
          <CardContent className="p-4 text-center">
            <p className="mb-1 text-lg font-semibold text-primary-700">
              ✓ Appointment Booked!
            </p>
            <p className="text-sm text-primary-600">
              {ophthalmologists.find((d) => d.id === selectedDoc)?.name} at{" "}
              {selectedSlot} today
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              You will receive an SMS with the joining link
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
