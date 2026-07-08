"use client";

import ReactEChartsCore from "echarts-for-react/lib/core";
import { echarts } from "@/lib/echarts";
import { useChartColors } from "@/hooks/useChartColors";
import { TRAFFIC_GROWTH, TRAFFIC_TRENDS_DAILY } from "@/data/charts";

interface TrafficChartProps {
  variant?: "growth" | "trends";
  height?: number;
}

export function TrafficChart({ variant = "growth", height = 360 }: TrafficChartProps) {
  const colors = useChartColors();
  const isGrowth = variant === "growth";

  const xData = isGrowth
    ? TRAFFIC_GROWTH.map((d) => d.label)
    : TRAFFIC_TRENDS_DAILY.map((d) => d.time);

  const series = isGrowth
    ? [
        {
          name: "IPv4 Traffic (Gbps)",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 6,
          areaStyle: { opacity: 0.12 },
          lineStyle: { width: 3, color: colors.secondary },
          itemStyle: { color: colors.secondary },
          data: TRAFFIC_GROWTH.map((d) => d.ipv4),
        },
        {
          name: "IPv6 Traffic (Gbps)",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 6,
          areaStyle: { opacity: 0.12 },
          lineStyle: { width: 3, color: colors.accent },
          itemStyle: { color: colors.accent },
          data: TRAFFIC_GROWTH.map((d) => d.ipv6),
        },
      ]
    : [
        {
          name: "Traffic (Gbps)",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 6,
          areaStyle: {
            opacity: 0.15,
          },
          lineStyle: { width: 3, color: colors.secondary },
          itemStyle: { color: colors.secondary },
          data: TRAFFIC_TRENDS_DAILY.map((d) => d.traffic),
        },
      ];

  const option = {
    backgroundColor: "transparent",
    textStyle: { color: colors.textSecondary, fontFamily: "inherit" },
    grid: { left: 8, right: 16, top: 48, bottom: 8, containLabel: true },
    tooltip: {
      trigger: "axis",
      backgroundColor: colors.isDark ? "#0F172A" : "#FFFFFF",
      borderColor: colors.border,
      textStyle: { color: colors.text },
    },
    legend: isGrowth
      ? { top: 0, textStyle: { color: colors.textSecondary }, icon: "circle" }
      : undefined,
    xAxis: {
      type: "category",
      data: xData,
      axisLine: { lineStyle: { color: colors.border } },
      axisLabel: { color: colors.textSecondary },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      name: "Gbps",
      nameTextStyle: { color: colors.textSecondary },
      splitLine: { lineStyle: { color: colors.border, type: "dashed" } },
      axisLabel: { color: colors.textSecondary },
    },
    series,
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      style={{ height, width: "100%" }}
      notMerge
      lazyUpdate
    />
  );
}
