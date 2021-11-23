import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DocumentsRoutes } from '../../constants/documents-routes.enum';
import { DocumentsService } from '../../services/documents.service';
import { Document } from '../../types/document.type';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  @Input() document: Document;
  @Input() userId: string;

  constructor(private readonly _router: Router) {}

  ngOnInit() {}

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

  public async openDocument(): Promise<void> {
    this._router.navigate(
      [`${DocumentsRoutes.DOCUMENTS}`, this.document.documentId],
      { state: { document: this.document, userId: this.userId } }
    );
  }
}
