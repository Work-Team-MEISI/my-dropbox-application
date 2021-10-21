import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule } from './features/authentication/authentication.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationModule],
})
export class UsersModule {}
