
import React from 'react';
import { ChartConfig } from '@/components/ui/chart';

/**
 * Creates a chart configuration object for the ChartContainer from data points
 */
export function createChartConfig(data: Array<{name: string, color: string}>): ChartConfig {
  return data.reduce((config, item) => {
    return {
      ...config,
      [item.name]: {
        color: item.color
      }
    };
  }, {});
}

/**
 * Formats currency values for display
 */
export function formatCurrency(value: number, compact: boolean = false): string {
  if (compact && value >= 1000) {
    return `$${(value / 1000).toFixed(1)}k`;
  }
  return `$${value.toLocaleString()}`;
}

/**
 * Renders a legend text with consistent styling
 */
export function renderLegendText(value: string): JSX.Element {
  return <span className="text-xs font-medium">{value}</span>;
}

/**
 * Formats tooltip values for recharts tooltips
 */
export function formatTooltipValue(value: number): [string, string] {
  return [`$${value.toLocaleString()}`, 'Amount'];
}

/**
 * Formats Y-axis tick values
 */
export function formatYAxisTick(value: number): string {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}k`;
  }
  return value.toString();
}
