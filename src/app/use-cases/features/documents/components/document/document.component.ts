import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShareDocumentDialogComponent } from 'src/app/shared/dialogs/share-document-dialog/share-document-dialog.component';
import { DocumentsService } from '../../services/documents.service';
import { Document } from '../../types/document.type';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  @Input() document: Document;

  constructor(
    private readonly _documentsService: DocumentsService,
    private readonly _modalController: ModalController
  ) {}

  ngOnInit() {
    console.log(this.document);
  }

  public fetchDocument(): void {
    this._documentsService
      .fetchDocument(this.document.documentId)
      .subscribe((data) => console.log(data));
  }

  public removeDocument(): void {
    this._documentsService.deleteDocument(this.document.documentId).subscribe();
  }

  public isFile(extension: string): boolean {
    const files = ['pdf', 'doc'];

    for (const file of files) {
      if (extension === file) {
        return true;
      }
    }

    return false;
  }

  public isPhoto(extension: string): boolean {
    const photos = ['svg', 'png', 'jpg'];

    for (const photo of photos) {
      if (extension === photo) {
        return true;
      }
    }

    return false;
  }

  public async openShareDocumentDialog(documentId: string): Promise<void> {
    const modal = await this._modalController.create({
      component: ShareDocumentDialogComponent,
      cssClass: '',
      componentProps: {
        documentId: documentId,
      },
    });

    await modal.present();

    const onDismissProps = await modal.onDidDismiss();

    const data = onDismissProps.data;

    if (data === undefined) {
      return;
    }

    this._documentsService.updateDocument(data).subscribe();
  }
}
