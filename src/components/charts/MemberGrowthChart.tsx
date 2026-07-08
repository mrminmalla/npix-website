"use client";

import ReactEChartsCore from "echarts-for-react/lib/core";
import { echarts } from "@/lib/echarts";
import { useChartColors } from "@/hooks/useChartColors";
import { MEMBER_GROWTH } from "@/data/charts";

export function MemberGrowthChart({ height = 360 }: { height?: number }) {
  const colors = useChartColors();

  const option = {
    backgroundColor: "transparent",
    textStyle: { color: colors.textSecondary, fontFamily: "inherit" },
    grid: { left: 8, right: 16, top: 48, bottom: 8, containLabel: true },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: colors.isDark ? "#0F172A" : "#FFFFFF",
      borderColor: colors.border,
      textStyle: { color: colors.text },
    },
    legend: { top: 0, textStyle: { color: colors.textSecondary }, icon: "circle" },
    xAxis: {
      type: "category",
      data: MEMBER_GROWTH.map((d) => d.label),
      axisLine: { lineStyle: { color: colors.border } },
      axisLabel: { color: colors.textSecondary },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: colors.border, type: "dashed" } },
      axisLabel: { color: colors.textSecondary },
    },
    series: [
      {
        name: "Members",
        type: "bar",
        barMaxWidth: 28,
        itemStyle: { color: colors.primary, borderRadius: [6, 6, 0, 0] },
        data: MEMBER_GROWTH.map((d) => d.members),
      },
      {
        name: "Connected ASNs",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { width: 3, color: colors.secondary },
        itemStyle: { color: colors.secondary },
        data: MEMBER_GROWTH.map((d) => d.asns),
      },
    ],
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
