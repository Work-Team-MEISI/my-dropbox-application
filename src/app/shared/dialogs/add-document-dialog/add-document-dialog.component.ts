import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddDocumentDTO } from 'src/app/use-cases/features/documents/dtos/add-document.dto';
import { DocumentsService } from 'src/app/use-cases/features/documents/services/documents.service';

@Component({
  selector: 'app-add-document-dialog',
  templateUrl: './add-document-dialog.component.html',
  styleUrls: ['./add-document-dialog.component.scss'],
})
export class AddDocumentDialogComponent implements OnInit {
  @Input() userId: string;

  private _addDocumentDTO: AddDocumentDTO | undefined;
  private _docName: string = '';

  constructor(private readonly _modalController: ModalController) {}

  ngOnInit() {}

  public get docName(): string {
    return this._docName;
  }

  public set docName(docName: string) {
    this._docName = docName;
  }

  public get addDocumentDTO(): AddDocumentDTO | undefined {
    return this._addDocumentDTO;
  }

  public changeDocument(event: Event): void {
    const { name, type, size } = event.target['files'][0];

    this._addDocumentDTO = {
      name: name,
      type: type,
      size: size,
      userId: this.userId,
    };
  }

  public addDocument(): void {
    this._addDocumentDTO.name = this._docName;

    this._modalController.dismiss(this.addDocumentDTO);
  }
}
