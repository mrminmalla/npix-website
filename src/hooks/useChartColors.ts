"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

export interface ChartColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  text: string;
  textSecondary: string;
  border: string;
  isDark: boolean;
}

const LIGHT: ChartColors = {
  primary: "#0B1F3A",
  secondary: "#0EA5E9",
  accent: "#DC143C",
  success: "#10B981",
  text: "#0F172A",
  textSecondary: "#64748B",
  border: "#E2E8F0",
  isDark: false,
};

const DARK: ChartColors = {
  primary: "#38BDF8",
  secondary: "#38BDF8",
  accent: "#DC143C",
  success: "#10B981",
  text: "#F8FAFC",
  textSecondary: "#94A3B8",
  border: "#334155",
  isDark: true,
};

export function useChartColors(): ChartColors {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return LIGHT;
  return resolvedTheme === "dark" ? DARK : LIGHT;
}
