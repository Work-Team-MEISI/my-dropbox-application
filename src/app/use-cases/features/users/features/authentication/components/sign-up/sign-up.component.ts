import { Component, OnInit } from '@angular/core';
import { FormField } from 'src/app/shared/components/form-builder/types/form-builder';
import { SignUpDTO } from '../../dtos/sign-up.dto';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private readonly _authenticationService: AuthenticationService) {}

  ngOnInit() {}

  public fetchFormFields(): Array<FormField> {
    const formFields: Array<FormField> = [
      {
        name: 'Username',
        controlName: 'username',
        type: 'text',
        rules: ['required'],
      },
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
    const signUpDTO: SignUpDTO = {
      username: formControls['username'].value,
      email: formControls['email'].value,
      password: formControls['password'].value,
      confirmPassword: formControls['confirmPassword'].value,
    };

    this._authenticationService.signUp(signUpDTO).subscribe();
  }
}
