import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { IonicModule } from '@ionic/angular';
import { HttpSpinnerComponent } from './spinners/http-spinner/http-spinner.component';
import { RouterModule } from '@angular/router';
import { HttpDialogComponent } from './dialogs/http-dialog/http-dialog.component';
import { AddDocumentDialogComponent } from './dialogs/add-document-dialog/add-document-dialog.component';
import { RemoveDocumentDialogComponent } from './dialogs/remove-document-dialog/remove-document-dialog.component';

@NgModule({
  declarations: [
    FormBuilderComponent,
    HttpSpinnerComponent,
    HttpDialogComponent,
    AddDocumentDialogComponent,
    RemoveDocumentDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    FormsModule,
  ],
  exports: [FormBuilderComponent, HttpSpinnerComponent],
})
export class SharedModule {}
