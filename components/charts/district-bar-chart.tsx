"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BRAND_BLUE, BRAND_GRAY, NEUTRAL_200 } from "@/lib/chart-colors";

interface DistrictBarChartProps {
  data: { district: string; screened: number; spectacles: number }[];
}

export function DistrictBarChart({ data }: DistrictBarChartProps) {
  const shortData = data.slice(0, 8).map((d) => ({
    ...d,
    district: d.district.split(" ")[0],
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={shortData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={NEUTRAL_200} />
        <XAxis dataKey="district" tick={{ fontSize: 11 }} />
        <YAxis
          tick={{ fontSize: 11 }}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip formatter={(value: number) => value.toLocaleString("en-IN")} />
        <Bar
          dataKey="screened"
          fill={BRAND_BLUE}
          name="Screened"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="spectacles"
          fill={BRAND_GRAY}
          name="Spectacles"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
