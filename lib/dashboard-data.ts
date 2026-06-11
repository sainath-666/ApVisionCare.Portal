import { BRAND_BLUE, BRAND_GRAY, BRAND_RED, PRIMARY_600 } from "./chart-colors";

export const MONTHLY_TREND = [
  {
    label: "Jul",
    screened: 98200,
    spectacles: 21400,
    referrals: 1820,
    teleconsults: 940,
  },
  {
    label: "Aug",
    screened: 112400,
    spectacles: 24800,
    referrals: 2010,
    teleconsults: 1080,
  },
  {
    label: "Sep",
    screened: 121800,
    spectacles: 27300,
    referrals: 2240,
    teleconsults: 1190,
  },
  {
    label: "Oct",
    screened: 134500,
    spectacles: 30100,
    referrals: 2480,
    teleconsults: 1340,
  },
  {
    label: "Nov",
    screened: 142900,
    spectacles: 32600,
    referrals: 2710,
    teleconsults: 1460,
  },
  {
    label: "Dec",
    screened: 151200,
    spectacles: 34900,
    referrals: 2980,
    teleconsults: 1590,
  },
  {
    label: "Jan",
    screened: 158700,
    spectacles: 36800,
    referrals: 3120,
    teleconsults: 1680,
  },
  {
    label: "Feb",
    screened: 149300,
    spectacles: 35100,
    referrals: 2890,
    teleconsults: 1610,
  },
  {
    label: "Mar",
    screened: 163400,
    spectacles: 38700,
    referrals: 3340,
    teleconsults: 1820,
  },
  {
    label: "Apr",
    screened: 171900,
    spectacles: 41200,
    referrals: 3580,
    teleconsults: 1960,
  },
  {
    label: "May",
    screened: 180600,
    spectacles: 43800,
    referrals: 3760,
    teleconsults: 2090,
  },
  {
    label: "Jun",
    screened: 188200,
    spectacles: 45900,
    referrals: 3920,
    teleconsults: 2210,
  },
];

export const OUTCOME_BREAKDOWN = [
  { name: "Normal", value: 61, color: PRIMARY_600 },
  { name: "Spectacles", value: 24, color: BRAND_BLUE },
  { name: "Teleconsult", value: 9, color: BRAND_GRAY },
  { name: "Referral", value: 6, color: BRAND_RED },
];

export const CAMP_TYPE_BREAKDOWN = [
  {
    label: "Village",
    screened: 642000,
    spectacles: 148000,
    referrals: 12400,
    teleconsults: 6200,
  },
  {
    label: "Tribal",
    screened: 184000,
    spectacles: 39000,
    referrals: 5100,
    teleconsults: 2800,
  },
  {
    label: "Urban Slum",
    screened: 271000,
    spectacles: 61000,
    referrals: 4800,
    teleconsults: 3100,
  },
  {
    label: "School",
    screened: 398000,
    spectacles: 92000,
    referrals: 3200,
    teleconsults: 1900,
  },
  {
    label: "Industrial",
    screened: 142000,
    spectacles: 31000,
    referrals: 1400,
    teleconsults: 980,
  },
];

export const DISTRICT_PERFORMANCE = [
  { name: "Srikakulam", screened: 9234, spectacles: 2456 },
  { name: "Vizianagaram", screened: 8102, spectacles: 2134 },
  { name: "Visakhapatnam", screened: 14823, spectacles: 3912 },
  { name: "East Godavari", screened: 13456, spectacles: 3567 },
  { name: "West Godavari", screened: 11234, spectacles: 2987 },
  { name: "Krishna", screened: 12567, spectacles: 3345 },
  { name: "Guntur", screened: 15234, spectacles: 4023 },
  { name: "Prakasam", screened: 10123, spectacles: 2678 },
  { name: "Nellore", screened: 11456, spectacles: 3023 },
  { name: "Kurnool", screened: 9876, spectacles: 2612 },
  { name: "Kadapa", screened: 8934, spectacles: 2367 },
  { name: "Anantapur", screened: 10234, spectacles: 2712 },
  { name: "Chittoor", screened: 7574, spectacles: 2020 },
];

export interface SlaBreachOrder {
  id: string;
  patientName: string;
  vendorName: string;
  slaDays: number;
  daysElapsed: number;
  slaBreached: boolean;
}

export const SLA_BREACH_ORDERS: SlaBreachOrder[] = [
  {
    id: "so006",
    patientName: "Saraswathi",
    vendorName: "VisionCare Nellore",
    slaDays: 7,
    daysElapsed: 8,
    slaBreached: true,
  },
];
