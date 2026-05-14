import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-cumulative-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
  template: `
    <div class="chart-card">
      <h3 class="chart-title">Cumulative Spending Over Time</h3>
      <canvas baseChart [type]="'line'" [data]="chartData()" [options]="chartOptions"></canvas>
    </div>
  `,
  styles: `
    .chart-card { background: #1e1e2e; border-radius: 16px; padding: 20px; border: 1px solid #333; }
    .chart-title { color: #ccc; font-size: 1rem; margin: 0 0 16px; }
    canvas { max-height: 350px; }
  `,
})
export class CumulativeChartComponent {
  readonly cumulativeData = input.required<{ label: string; cumulative: number; monthTotal: number }[]>();

  readonly chartData = computed<ChartConfiguration<'line'>['data']>(() => {
    const data = this.cumulativeData();
    return {
      labels: data.map((d) => d.label),
      datasets: [
        {
          label: 'Cumulative Total (₹)',
          data: data.map((d) => d.cumulative),
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.15)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#e74c3c',
        },
        {
          label: 'Monthly Total (₹)',
          data: data.map((d) => d.monthTotal),
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.15)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3498db',
        },
      ],
    };
  });

  readonly chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#aaa' } },
    },
    scales: {
      x: { ticks: { color: '#888' }, grid: { color: '#2a2a3a' } },
      y: { ticks: { color: '#888' }, grid: { color: '#2a2a3a' } },
    },
  };
}
