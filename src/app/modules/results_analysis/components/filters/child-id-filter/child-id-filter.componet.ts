import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TestReportDataService } from '../../../../../core/services/results_analisis/test-report.service';
import { Subscription } from 'rxjs';
import { TestsReportDto } from '../../../../../core/models/rest/dtos/response/get-test-report.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'child-id-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-id-filter.component.html',
  styleUrls: ['./child-id-filter.component.scss'],
})
export class FilterChildIDComponent implements OnInit {
  @Output() childIDFilterChanged = new EventEmitter<number>();
  private subscriptions: Subscription = new Subscription();
  testReportData: TestsReportDto[] = [];

  constructor(private dataService: TestReportDataService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.dataService.testData$.subscribe((data: TestsReportDto[]) => {
        this.testReportData = data;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onChildIDFilterChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const childID = parseInt(target.value); // Parse input value to integer
    if (!isNaN(childID)) {
      // Check if age is a valid number
      this.childIDFilterChanged.emit(childID);
    }
  }
}
