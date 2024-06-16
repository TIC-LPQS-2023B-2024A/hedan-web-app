import { Component, Input } from '@angular/core';
import { GetChildDto } from '../../../../core/models/rest/dtos/child/get-child.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-child-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl:'child-table.component.html',
  styleUrl: './child-table.component.scss',
})
export class ChildsTableComponent {

  // private _child: GetChildDto[] = [];
  // @Input() set child(child: GetChildDto[]) {
  //   this._child = child;
  // }

  // get child(): readonly GetChildDto[] {
  //   return this._child as readonly GetChildDto[];
  // }
}
