import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentDetailsComponent } from './components/document-details/document-details.component';

import { DocumentsPage } from './documents.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentsPage,
    data: { navbarVisibility: true, footerVisibility: true },
  },
  {
    path: ':documentId',
    component: DocumentDetailsComponent,
    data: { navbarVisibility: true, footerVisibility: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsPageRoutingModule {}
