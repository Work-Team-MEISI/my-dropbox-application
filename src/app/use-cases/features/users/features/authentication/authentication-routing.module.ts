import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    data: { navbarVisibility: false, footerVisibility: false },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: { navbarVisibility: false, footerVisibility: false },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { navbarVisibility: false, footerVisibility: false },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
