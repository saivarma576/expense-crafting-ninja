
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
  return React.createElement("span", { className: "text-xs font-medium" }, value);
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

/**
 * Get icon for an expense category
 */
export function getCategoryIcon(category: string): JSX.Element {
  const iconMap: Record<string, JSX.Element> = {
    'Hotel/Lodging': React.createElement("span", { className: "mr-1" }, "🏨"),
    'Air/Taxi/Uber': React.createElement("span", { className: "mr-1" }, "✈️"),
    'Rental Car': React.createElement("span", { className: "mr-1" }, "🚗"),
    'Baggage Fees': React.createElement("span", { className: "mr-1" }, "🧳"),
    'Business Meals': React.createElement("span", { className: "mr-1" }, "🍽️"),
    'Meals': React.createElement("span", { className: "mr-1" }, "🍲"),
    'Mileage': React.createElement("span", { className: "mr-1" }, "📏"),
    'Gasoline': React.createElement("span", { className: "mr-1" }, "⛽"),
    'Parking/Tolls': React.createElement("span", { className: "mr-1" }, "🅿️"),
    'Office Supplies': React.createElement("span", { className: "mr-1" }, "📌"),
    'Postage & Freight': React.createElement("span", { className: "mr-1" }, "📦"),
    'Professional Fees': React.createElement("span", { className: "mr-1" }, "👔"),
    'Auditing Serv Fees': React.createElement("span", { className: "mr-1" }, "📊"),
    'Registration Fees': React.createElement("span", { className: "mr-1" }, "📝"),
    'Dues Subscriptions': React.createElement("span", { className: "mr-1" }, "📚"),
    'Others': React.createElement("span", { className: "mr-1" }, "❓")
  };

  return iconMap[category] || React.createElement("span", { className: "mr-1" }, "📋");
}

