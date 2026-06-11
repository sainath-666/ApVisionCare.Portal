"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const AP_DISTRICTS = [
  "Srikakulam",
  "Vizianagaram",
  "Visakhapatnam",
  "East Godavari",
  "West Godavari",
  "Krishna",
  "Guntur",
  "Prakasam",
  "Nellore",
  "Kurnool",
  "Kadapa",
  "Anantapur",
  "Chittoor",
];

const NOTIFICATION_ITEMS = [
  { label: "SLA Breach Alerts (Email)", checked: true },
  { label: "SLA Breach Alerts (SMS)", checked: true },
  { label: "Critical Referral Created", checked: true },
  { label: "Camp Completion Summary", checked: true },
  { label: "Daily Report Email", checked: false },
  { label: "Weekly KPI Digest", checked: true },
  { label: "Vendor SLA Warning (at 80%)", checked: true },
  { label: "New User Registration", checked: false },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Settings</h2>
        <p className="text-sm text-neutral-500">
          System-wide configuration and preferences
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI Model Config</TabsTrigger>
          <TabsTrigger value="master">Master Data</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="abha">ABHA Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Program Name</Label>
                  <Input defaultValue="AP Vision Care Platform" />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input defaultValue="Andhra Pradesh" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Helpline Number</Label>
                  <Input defaultValue="1800-425-0082" />
                </div>
                <div className="space-y-2">
                  <Label>Program Email</Label>
                  <Input defaultValue="apvisioncare@ap.gov.in" />
                </div>
                <div className="space-y-2">
                  <Label>Financial Year</Label>
                  <Input defaultValue="2024-25" />
                </div>
                <div className="space-y-2">
                  <Label>Default Camp Target (patients)</Label>
                  <Input defaultValue="80" type="number" />
                </div>
              </div>
              <Button>Save General Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                AI Model Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>DR Detection Model Version</Label>
                  <Input defaultValue="v2.3.1" />
                </div>
                <div className="space-y-2">
                  <Label>Confidence Threshold (%)</Label>
                  <Input defaultValue="85" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Demand Forecast Horizon (months)</Label>
                  <Input defaultValue="3" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Risk Score Update Frequency</Label>
                  <Select defaultValue="Daily">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Model Notes</Label>
                <Textarea
                  defaultValue="Model trained on 1.2L annotated fundus images from AP camp data. Last retrained: May 2024. Next scheduled retraining: Aug 2024."
                  rows={3}
                />
              </div>
              <Button>Save AI Config</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="master">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Master Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium text-neutral-900">ICD-10 Codes</h4>
                  <div className="space-y-1 rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600">
                    <p>H35.0 - Background diabetic retinopathy</p>
                    <p>H36.0 - Diabetic retinopathy in diseases</p>
                    <p>H40.0 - Glaucoma suspect</p>
                    <p>H26.0 - Infantile and juvenile cataract</p>
                    <p>H52.0 - Hypermetropia</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage ICD Codes
                  </Button>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-neutral-900">
                    Visual Acuity Scale
                  </h4>
                  <div className="rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600">
                    <p>
                      6/6, 6/9, 6/12, 6/18, 6/24, 6/36, 6/60, CF, HM, PL, NPL
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage VA Scale
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Active AP Districts (13)</Label>
                <div className="flex flex-wrap gap-2">
                  {AP_DISTRICTS.map((d) => (
                    <span
                      key={d}
                      className="rounded bg-primary-100 px-2 py-1 text-xs text-primary-700"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {NOTIFICATION_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <Checkbox defaultChecked={item.checked} id={item.label} />
                    <label
                      htmlFor={item.label}
                      className="cursor-pointer text-sm text-neutral-700"
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Alert Email Recipients</Label>
                <Textarea
                  defaultValue="admin@apvision.gov.in, nodal@apvision.gov.in"
                  rows={2}
                />
              </div>
              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abha">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                ABHA Integration Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>ABHA Gateway URL</Label>
                  <Input defaultValue="https://healthidsbx.abdm.gov.in" />
                </div>
                <div className="space-y-2">
                  <Label>Client ID</Label>
                  <Input defaultValue="AP-VISION-CARE-PROD-001" />
                </div>
                <div className="space-y-2">
                  <Label>Client Secret</Label>
                  <Input type="password" defaultValue="*********************" />
                </div>
                <div className="space-y-2">
                  <Label>Environment</Label>
                  <Select defaultValue="production">
                    <option value="production">Production</option>
                    <option value="sandbox">Sandbox</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Consent Expiry (days)</Label>
                  <Input defaultValue="365" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>FHIR Version</Label>
                  <Input defaultValue="R4" disabled />
                </div>
              </div>
              <div className="flex gap-3">
                <Button>Save ABHA Config</Button>
                <Button variant="outline">Test Connection</Button>
              </div>
              <div className="rounded-lg border border-primary-200 bg-primary-50 p-3 text-sm text-primary-700">
                ✓ ABHA Gateway connection is active. Last verified: 2024-06-10
                08:00 IST
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
