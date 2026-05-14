import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { MonthlyGroup } from '../../models/expense.model';

@Component({
  selector: 'app-monthly-bar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
  template: `
    <div class="chart-card">
      <h3 class="chart-title">Monthly Expense Comparison</h3>
      <canvas baseChart [type]="'bar'" [data]="chartData()" [options]="chartOptions"></canvas>
    </div>
  `,
  styles: `
    .chart-card { background: #1e1e2e; border-radius: 16px; padding: 20px; border: 1px solid #333; }
    .chart-title { color: #ccc; font-size: 1rem; margin: 0 0 16px; }
    canvas { max-height: 350px; }
  `,
})
export class MonthlyBarChartComponent {
  readonly monthlyGroups = input.required<MonthlyGroup[]>();

  readonly chartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const groups = [...this.monthlyGroups()].reverse();
    return {
      labels: groups.map((g) => g.label),
      datasets: [
        {
          label: 'Monthly Total (₹)',
          data: groups.map((g) => g.total),
          backgroundColor: groups.map((_, i) =>
            `hsla(${(i * 30) % 360}, 70%, 55%, 0.8)`
          ),
          borderColor: groups.map((_, i) =>
            `hsla(${(i * 30) % 360}, 70%, 55%, 1)`
          ),
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    };
  });

  readonly chartOptions: ChartConfiguration<'bar'>['options'] = {
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
