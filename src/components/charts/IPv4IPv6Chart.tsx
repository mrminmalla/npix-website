"use client";

import ReactEChartsCore from "echarts-for-react/lib/core";
import { echarts } from "@/lib/echarts";
import { useChartColors } from "@/hooks/useChartColors";
import { IPV4_IPV6_SHARE } from "@/data/charts";

export function IPv4IPv6Chart({ height = 320 }: { height?: number }) {
  const colors = useChartColors();

  const option = {
    backgroundColor: "transparent",
    textStyle: { color: colors.textSecondary, fontFamily: "inherit" },
    tooltip: {
      trigger: "item",
      backgroundColor: colors.isDark ? "#0F172A" : "#FFFFFF",
      borderColor: colors.border,
      textStyle: { color: colors.text },
      valueFormatter: (value: number) => `${value}%`,
    },
    legend: {
      bottom: 0,
      textStyle: { color: colors.textSecondary },
      icon: "circle",
    },
    series: [
      {
        name: "Traffic Share",
        type: "pie",
        radius: ["55%", "80%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: colors.isDark ? "#020617" : "#FFFFFF",
          borderWidth: 3,
        },
        label: {
          show: true,
          position: "outside",
          formatter: "{b}\n{d}%",
          color: colors.textSecondary,
          fontSize: 12,
        },
        labelLine: {
          show: true,
          lineStyle: { color: colors.border },
        },
        data: [
          { value: IPV4_IPV6_SHARE[0].value, name: "IPv4", itemStyle: { color: colors.primary } },
          { value: IPV4_IPV6_SHARE[1].value, name: "IPv6", itemStyle: { color: colors.secondary } },
        ],
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
