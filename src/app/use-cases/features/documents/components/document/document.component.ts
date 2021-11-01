import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../../types/document.type';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  @Input() document: Document;

  constructor() {}

  ngOnInit() {}
}
