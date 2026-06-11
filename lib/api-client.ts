const DEFAULT_BASE =
  typeof window !== "undefined"
    ? "/api/v1"
    : `${process.env.API_GATEWAY_URL ?? "http://localhost:3000"}/api/v1`;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiClientOptions {
  baseUrl?: string;
  accessToken?: string;
}

export class ApiClient {
  private baseUrl: string;
  private accessToken?: string;

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE;
    this.accessToken = options.accessToken;
  }

  setAccessToken(token: string | undefined) {
    this.accessToken = token;
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string>),
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers,
    });

    if (!res.ok) {
      const body = await res.text();
      throw new ApiError(res.status, body || res.statusText);
    }

    if (res.status === 204) {
      return undefined as T;
    }

    return res.json() as Promise<T>;
  }

  get<T>(path: string) {
    return this.request<T>(path, { method: "GET" });
  }

  post<T>(path: string, body?: unknown) {
    return this.request<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(path: string, body?: unknown) {
    return this.request<T>(path, {
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  patch<T>(path: string, body?: unknown) {
    return this.request<T>(path, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(path: string) {
    return this.request<T>(path, { method: "DELETE" });
  }

  // Patient
  searchPatients(params: { abha?: string; mobile?: string; qr?: string }) {
    const q = new URLSearchParams();
    if (params.abha) q.set("abha", params.abha);
    if (params.mobile) q.set("mobile", params.mobile);
    if (params.qr) q.set("qr", params.qr);
    return this.get<unknown[]>(`/patients/search?${q.toString()}`);
  }

  // EMR
  submitEmr(emrId: string) {
    return this.post<{ outcome: string }>(`/emr/${emrId}/submit`);
  }

  // ABHA (via Next.js BFF at /api/abha)
  private abhaPost<T>(path: string, body?: unknown) {
    return fetch(`/api/abha/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }).then(async (res) => {
      if (!res.ok) throw new ApiError(res.status, await res.text());
      return res.json() as Promise<T>;
    });
  }

  abhaRequestOtp(payload: { method: "aadhaar" | "mobile"; loginId: string }) {
    return this.abhaPost<{ txnId: string }>("enroll/request-otp", payload);
  }

  abhaVerifyAadhaar(payload: { txnId: string; otp: string; mobile?: string }) {
    return this.abhaPost<unknown>("enroll/verify-aadhaar", payload);
  }

  abhaVerifyMobile(payload: { txnId: string; otp: string }) {
    return this.abhaPost<unknown>("enroll/verify-mobile", payload);
  }

  abhaSetAddress(payload: { txnId: string; abhaAddress: string }) {
    return this.abhaPost<unknown>("enroll/abha-address", payload);
  }

  abhaVerifyAtDesk(payload: { abhaNumber: string; otp: string }) {
    return this.abhaPost<unknown>("verify", payload);
  }

  fetchPriorRecords(patientId: string) {
    return this.get<unknown>(`/patients/${patientId}/prior-records`);
  }
}

export const apiClient = new ApiClient();
