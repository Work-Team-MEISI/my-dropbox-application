import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { IonicModule } from '@ionic/angular';
import { HttpSpinnerComponent } from './spinners/http-spinner/http-spinner.component';
import { RouterModule } from '@angular/router';
import { HttpDialogComponent } from './dialogs/http-dialog/http-dialog.component';

@NgModule({
  declarations: [
    FormBuilderComponent,
    HttpSpinnerComponent,
    HttpDialogComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RouterModule],
  exports: [FormBuilderComponent, HttpSpinnerComponent],
})
export class SharedModule {}
