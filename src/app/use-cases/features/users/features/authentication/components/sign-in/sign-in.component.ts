import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormField } from 'src/app/shared/components/form-builder/types/form-builder';
import { DocumentsRoutes } from 'src/app/use-cases/features/documents/constants/documents-routes.enum';
import { SignInDTO } from '../../dtos/sign-in.dto';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _router: Router
  ) {}

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
    ];

    return formFields;
  }

  public onSubmit(formControls): void {
    const signInDTO: SignInDTO = {
      email: formControls['email'].value,
      password: formControls['password'].value,
    };

    this._authenticationService.signIn(signInDTO).subscribe(() => {
      this._router.navigateByUrl(DocumentsRoutes.DOCUMENTS);
    });
  }
}
