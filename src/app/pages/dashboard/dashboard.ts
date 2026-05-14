import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { StatCardComponent } from '../../components/stat-card/stat-card';
import { ExpenseTableComponent } from '../../components/expense-table/expense-table';
import { WasteWarningComponent } from '../../components/waste-warning/waste-warning';
import { MoneyTrashComponent } from '../../components/money-trash/money-trash';
import { MonthlyBarChartComponent } from '../../components/monthly-bar-chart/monthly-bar-chart';
import { CategoryPieChartComponent } from '../../components/category-pie-chart/category-pie-chart';
import { CumulativeChartComponent } from '../../components/cumulative-chart/cumulative-chart';
import { MonthSummaryComponent } from '../../components/month-summary/month-summary';
import { ScrollTopComponent } from '../../components/scroll-top/scroll-top';
import { FutureImageComponent } from '../../components/future-image/future-image';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StatCardComponent,
    ExpenseTableComponent,
    WasteWarningComponent,
    MoneyTrashComponent,
    MonthlyBarChartComponent,
    CategoryPieChartComponent,
    CumulativeChartComponent,
    MonthSummaryComponent,
    ScrollTopComponent,
    FutureImageComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  protected readonly svc = inject(ExpenseService);
  protected readonly monthlyExpanded = signal(false);
}
