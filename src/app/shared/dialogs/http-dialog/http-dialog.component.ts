import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-http-dialog',
  templateUrl: './http-dialog.component.html',
  styleUrls: ['./http-dialog.component.scss'],
})
export class HttpDialogComponent implements OnInit {
  @Input() success: boolean;
  @Input() message: string;

  constructor() {}

  ngOnInit() {}
}
