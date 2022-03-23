import {Component, OnInit} from '@angular/core';
import {Doc} from '../documents/document';


@Component({
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [],
})
export class RequestsComponent implements OnInit {
  documents: Doc[] = [];
  listOfCategories: String[];

  constructor() {}

  public ngOnInit() {
  }
}
