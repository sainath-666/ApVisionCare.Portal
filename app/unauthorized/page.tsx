import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <ShieldX className="mx-auto h-12 w-12 text-danger-500" />
          <CardTitle className="mt-2">Access Denied</CardTitle>
          <CardDescription>
            You do not have permission to access this portal section. Contact
            your administrator if you believe this is an error.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Link href="/login">
            <Button className="w-full">Return to Login</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
