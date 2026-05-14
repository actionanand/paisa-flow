import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-category-pie-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
  template: `
    <div class="chart-card">
      <h3 class="chart-title">{{ title() }}</h3>
      <canvas baseChart [type]="'doughnut'" [data]="chartData()" [options]="chartOptions"></canvas>
    </div>
  `,
  styles: `
    .chart-card { background: #1e1e2e; border-radius: 16px; padding: 20px; border: 1px solid #333; }
    .chart-title { color: #ccc; font-size: 1rem; margin: 0 0 16px; }
    canvas { max-height: 350px; }
  `,
})
export class CategoryPieChartComponent {
  readonly categoryTotals = input.required<Record<string, number>>();
  readonly title = input('Category Breakdown');

  private readonly COLORS = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
    '#1abc9c', '#e67e22', '#34495e', '#e91e63', '#00bcd4',
    '#8bc34a', '#ff5722', '#607d8b', '#795548',
  ];

  readonly chartData = computed<ChartConfiguration<'doughnut'>['data']>(() => {
    const entries = Object.entries(this.categoryTotals()).sort((a, b) => b[1] - a[1]);
    return {
      labels: entries.map(([k]) => k),
      datasets: [
        {
          data: entries.map(([, v]) => v),
          backgroundColor: entries.map((_, i) => this.COLORS[i % this.COLORS.length]),
          borderWidth: 0,
        },
      ],
    };
  });

  readonly chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#aaa', padding: 12, font: { size: 11 } },
      },
    },
  };
}
