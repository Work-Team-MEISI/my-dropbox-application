import { Component, OnInit } from '@angular/core';
import { FormField } from 'src/app/shared/components/form-builder/types/form-builder';
import { ForgotPasswordDTO } from '../../dtos/forgot-password.dto';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  ngOnInit() {}

  public fetchFormFields(): Array<FormField> {
    const formFields: Array<FormField> = [
      {
        name: 'Email',
        controlName: 'email',
        type: 'email',
        rules: ['required', 'email'],
      },
      {
        name: 'Password',
        controlName: 'password',
        type: 'password',
        rules: ['required'],
      },
      {
        name: 'Confirm Password',
        controlName: 'confirmPassword',
        type: 'password',
        rules: ['required'],
      },
    ];

    return formFields;
  }

  public onSubmit(formControls): void {
    const forgotPasswordDTO: ForgotPasswordDTO = {
      email: formControls['email'].value,
      password: formControls['password'].value,
      confirmPassword: formControls['confirmPassword'].value,
    };

    this._authenticationService.signIn(forgotPasswordDTO).subscribe();
  }
}
