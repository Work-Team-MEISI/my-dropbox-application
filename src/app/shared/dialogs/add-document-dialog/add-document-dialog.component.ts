import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-document-dialog',
  templateUrl: './add-document-dialog.component.html',
  styleUrls: ['./add-document-dialog.component.scss'],
})
export class AddDocumentDialogComponent implements OnInit {
  @Input() userId: string;

  private _addDocumentDTO: FormData | undefined;

  constructor(private readonly _modalController: ModalController) {}

  ngOnInit() {}

  public get addDocumentDTO(): FormData | undefined {
    return this._addDocumentDTO;
  }

  public changeDocument(event: Event): void {
    this._addDocumentDTO = new FormData();
    this._addDocumentDTO.append('file', event.target['files'][0]);

    this._modalController.dismiss(this._addDocumentDTO);
  }
}
