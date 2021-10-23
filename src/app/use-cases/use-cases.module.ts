import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModule } from './features/users/users.module';
import { DocumentsPageModule } from './features/documents/documents.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UsersModule, DocumentsPageModule],
})
export class UseCasesModule {}
