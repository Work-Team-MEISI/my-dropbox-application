import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddDocumentDialogComponent } from 'src/app/shared/dialogs/add-document-dialog/add-document-dialog.component';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss'],
})
export class AddDocumentComponent implements OnInit {
  @Input() userId: string;

  constructor(
    private readonly _modalController: ModalController,
    private readonly _documentsService: DocumentsService
  ) {}

  ngOnInit() {}

  public async openAddDocumentDialog(): Promise<void> {
    const modal = await this._modalController.create({
      component: AddDocumentDialogComponent,
      cssClass: '',
      componentProps: {
        userId: this.userId,
      },
    });

    await modal.present();

    const onDismissProps = await modal.onDidDismiss();

    const data = onDismissProps.data;

    this._documentsService.createDocument(data).subscribe();
  }
}
