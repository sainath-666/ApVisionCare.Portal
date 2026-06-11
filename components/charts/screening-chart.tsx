"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BRAND_BLUE,
  BRAND_GRAY,
  BRAND_RED,
  NEUTRAL_200,
} from "@/lib/chart-colors";

interface ScreeningChartProps {
  data: {
    month: string;
    screened: number;
    spectacles: number;
    referrals: number;
  }[];
}

export function ScreeningChart({ data }: ScreeningChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorScreened" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={BRAND_BLUE} stopOpacity={0.3} />
            <stop offset="95%" stopColor={BRAND_BLUE} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={NEUTRAL_200} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis
          tick={{ fontSize: 12 }}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip formatter={(value: number) => value.toLocaleString("en-IN")} />
        <Legend />
        <Area
          type="monotone"
          dataKey="screened"
          stroke={BRAND_BLUE}
          fill="url(#colorScreened)"
          name="Screened"
        />
        <Area
          type="monotone"
          dataKey="spectacles"
          stroke={BRAND_GRAY}
          fill="none"
          name="Spectacles"
        />
        <Area
          type="monotone"
          dataKey="referrals"
          stroke={BRAND_RED}
          fill="none"
          name="Referrals"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
