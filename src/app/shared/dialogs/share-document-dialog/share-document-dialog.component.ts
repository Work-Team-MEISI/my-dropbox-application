import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateDocumentDTO } from 'src/app/use-cases/features/documents/dtos/update-document.dto';

@Component({
  selector: 'app-share-document-dialog',
  templateUrl: './share-document-dialog.component.html',
  styleUrls: ['./share-document-dialog.component.scss'],
})
export class ShareDocumentDialogComponent implements OnInit {
  @Input() documentId: string;

  private _email: string = '';

  constructor(private readonly _modalController: ModalController) {}

  ngOnInit() {}

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public updateDocument(): void {
    const updateDocumentDTO = {
      documentId: this.documentId,
      email: this._email,
    };

    this._modalController.dismiss(updateDocumentDTO);
  }
}
