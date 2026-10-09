"use client";

import { useState } from "react";

const chartRanges = {
  "1W": [1.139, 1.141, 1.138, 1.144, 1.142, 1.149],
  "1M": [1.121, 1.126, 1.124, 1.135, 1.139, 1.149],
  "1Y": [1.062, 1.078, 1.091, 1.108, 1.129, 1.149],
  ALL: [1.005, 1.036, 1.067, 1.094, 1.123, 1.149],
} as const;

type ChartRange = keyof typeof chartRanges;

const chartWidth = 680;
const chartHeight = 370;
const chartLeft = 66;
const chartRight = 670;
const chartTop = 22;
const chartBottom = 326;
const minValue = 1;
const maxValue = 1.16;

function getChartPoints(values: readonly number[]) {
  return values.map((value, index) => ({
    x: chartLeft + (index * (chartRight - chartLeft)) / (values.length - 1),
    y: chartBottom - ((value - minValue) / (maxValue - minValue)) * (chartBottom - chartTop),
  }));
}

export default function IdryYieldChart() {
  const [selectedRange, setSelectedRange] = useState<ChartRange>("ALL");
  const points = getChartPoints(chartRanges[selectedRange]);
  const linePath = points.map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const areaPath = `${linePath} L ${chartRight} ${chartBottom} L ${chartLeft} ${chartBottom} Z`;

  return (
    <div className="idry-chart" aria-label="Illustrative IDRY value chart">
      <div className="idry-chart-header">
        <div className="idry-chart-price">
          <span>$1.1490</span>
          <small>+$0.0001 today</small>
        </div>
        <div className="idry-chart-ranges" aria-label="Chart range">
          {(Object.keys(chartRanges) as ChartRange[]).map((range) => (
            <button
              type="button"
              key={range}
              aria-pressed={selectedRange === range}
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <svg
        className="idry-chart-svg"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        role="img"
        aria-label={`Illustrative value progression for ${selectedRange} range`}
      >
        <defs>
          <linearGradient id="idry-chart-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#172d50" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#172d50" stopOpacity="0.015" />
          </linearGradient>
        </defs>
        {[1.16, 1.14, 1.12, 1.10, 1.08, 1.06, 1.04, 1.02, 1].map((value) => {
          const y = chartBottom - ((value - minValue) / (maxValue - minValue)) * (chartBottom - chartTop);
          return (
            <g key={value}>
              <line x1={chartLeft} x2={chartRight} y1={y} y2={y} className="idry-chart-grid" />
              <text x={chartLeft - 10} y={y + 4} textAnchor="end" className="idry-chart-axis">
                ${value.toFixed(4)}
              </text>
            </g>
          );
        })}
        <path d={areaPath} fill="url(#idry-chart-fill)" />
        <path d={linePath} fill="none" className="idry-chart-line" />
        {["Start", "20%", "40%", "60%", "80%", "Latest"].map((label, index) => (
          <text
            key={label}
            x={chartLeft + (index * (chartRight - chartLeft)) / 5}
            y={chartBottom + 21}
            textAnchor="middle"
            className="idry-chart-axis"
          >
            {label}
          </text>
        ))}
      </svg>
      <p className="idry-chart-note">Illustrative visualization, not historical price data.</p>
    </div>
  );
}
