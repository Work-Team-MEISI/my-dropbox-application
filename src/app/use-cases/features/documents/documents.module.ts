import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DocumentsPageRoutingModule } from './documents-routing.module';
import { DocumentsPage } from './documents.page';
import { DocumentComponent } from './components/document/document.component';
import { AddDocumentComponent } from './components/add-document/add-document.component';
import { DocumentsService } from './services/documents.service';
import { DocumentDetailsComponent } from './components/document-details/document-details.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DocumentsPageRoutingModule],
  declarations: [
    DocumentsPage,
    DocumentComponent,
    AddDocumentComponent,
    DocumentDetailsComponent,
  ],
  providers: [DocumentsService],
})
export class DocumentsPageModule {}
