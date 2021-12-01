import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { DocumentsPageModule } from '../documents/documents.module';
import { ProfileModule } from './features/profile/profile.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationModule,
    DocumentsPageModule,
    ProfileModule,
  ],
})
export class UsersModule {}
