import { Component, OnInit } from '@angular/core';
import { ChildsTableComponent } from '../../components/patient-table/child-table.component';
import {NgModule} from '@angular/core';
@Component({
  selector: 'app-child-list-page',
  standalone: true,
  imports: [ChildsTableComponent],
  templateUrl: './child-list-page.component.html',
  styleUrl: './child-list-page.component.css',
})
export class ChildListPageComponent{
  title = 'Child List - hedan-web-app';
//   private _childs: GetchildDto[] = [];
//   private _canWrite = false;

//   //constructor(private childsService: childsService, private authService: AuthService) { }

//   ngOnInit(): void {
//     this.childsService.getchilds().subscribe({
//       next: childs => {
//         this._childs = childs;
//       },
//       error: () => { },
//     });

//     this.authService.canWrite().subscribe({
//       next: (canWrite: boolean) => {
//         this._canWrite = canWrite;
//       },
//       error: () => {
//         this._canWrite = false
//       },
//     });
//   }

//   get childs(): GetchildDto[] {
//     return this._childs;
//   }

//   get canWrite(): boolean {
//     return this._canWrite;
//   }
}
