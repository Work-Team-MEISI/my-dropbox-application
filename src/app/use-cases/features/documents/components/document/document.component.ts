import { Component, Input, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { Document } from '../../types/document.type';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit {
  @Input() document: Document;

  constructor(private readonly _documentsService: DocumentsService) {}

  ngOnInit() {}

  public openRemoveDocumentDialog(): void {
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
}
