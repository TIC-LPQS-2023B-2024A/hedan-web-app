import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestsReportDto } from '../../../../../core/models/rest/dtos/response/get-test-report.dto';
import { TestReportDataService } from '../../../../../core/services/results_analisis/test-report.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './age-filter.component.html',
  styleUrls: ['./age-filter.component.scss']
})
export class FilterAgeComponent implements OnInit {
  @Output() ageFilterChanged = new EventEmitter<number>();
  private subscriptions: Subscription = new Subscription();
  testReportData: TestsReportDto[] = [];
  uniqueAges: number[] = []; // Array to hold unique ages

  constructor(private dataService: TestReportDataService) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.dataService.testData$.subscribe((data: TestsReportDto[]) => {
        this.testReportData = data;
        this.getUniqueAges(); // Call function to get unique ages

      }),
    );
  }


  getUniqueAges() {
    const ageSet = new Set<number>(); // Use a Set to store unique ages
    this.testReportData.forEach(item => {
      ageSet.add(item.child_age); // Add each age to the Set
    });
    this.uniqueAges = Array.from(ageSet); // Convert Set back to an array
  }


  onAgeFilterChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const age = parseInt(target.value); // Parse input value to integer
    if (!isNaN(age)) { // Check if age is a valid number
      this.ageFilterChanged.emit(age);
    }  }
}
