import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const GATEWAY = process.env.API_GATEWAY_URL ?? "http://localhost:3000";

async function proxy(
  request: NextRequest,
  params: { path: string[] },
): Promise<NextResponse> {
  const session = await auth();
  const path = params.path.join("/");
  const url = new URL(`/api/v1/${path}`, GATEWAY);
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

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
      /* empty body */
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
      {
        error: "API Gateway unavailable",
        message: `Could not reach ${GATEWAY}. Start backend services or use mock data.`,
      },
      { status: 503 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(request, params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(request, params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(request, params);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(request, params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(request, params);
}
