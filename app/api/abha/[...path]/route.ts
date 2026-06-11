import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const GATEWAY = process.env.API_GATEWAY_URL ?? "http://localhost:3000";

async function proxyAbha(
  request: NextRequest,
  params: { path: string[] },
): Promise<NextResponse> {
  const session = await auth();
  const path = params.path.join("/");
  const url = new URL(`/api/v1/abha/${path}`, GATEWAY);

  const headers: Record<string, string> = {
    "Content-Type": request.headers.get("Content-Type") ?? "application/json",
  };

  if (session?.accessToken) {
    headers.Authorization = `Bearer ${session.accessToken}`;
  }

  const init: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      init.body = await request.text();
    } catch {
      /* empty */
    }
  }

  try {
    const res = await fetch(url.toString(), init);
    const body = await res.text();
    return new NextResponse(body, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "ABHA service unavailable", fallback: "demo" },
      { status: 503 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxyAbha(request, params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxyAbha(request, params);
}
