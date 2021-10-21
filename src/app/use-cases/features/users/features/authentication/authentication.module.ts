import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from './service/authentication.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  providers: [AuthenticationService],
  declarations: [SignInComponent, SignUpComponent, ForgotPasswordComponent],
  imports: [CommonModule, AuthenticationRoutingModule, SharedModule],
  exports: [AuthenticationRoutingModule],
})
export class AuthenticationModule {}
