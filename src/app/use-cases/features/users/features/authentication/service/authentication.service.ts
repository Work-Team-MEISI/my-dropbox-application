import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Observer, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Storage } from 'src/app/core/constants/storage.enum';
import { HttpService } from 'src/app/core/services/http.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { HttpDialogComponent } from 'src/app/shared/dialogs/http-dialog/http-dialog.component';
import { HttpSpinnerService } from 'src/app/shared/spinners/http-spinner/http-spinner.service';
import { UserRoutes } from '../../../constants/user-routes.enum';
import { User } from '../../../types/user';
import { UserAuthenticationRoutes } from '../constants/user-authentication-routes.enum';
import { ForgotPasswordDTO } from '../dtos/forgot-password.dto';
import { SignInDTO } from '../dtos/sign-in.dto';
import { SignUpDTO } from '../dtos/sign-up.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _storageService: StorageService,
    private readonly _httpSpinnerService: HttpSpinnerService,
    private readonly _modalController: ModalController
  ) {}

  public signIn(signIn: SignInDTO): Observable<User> {
    return new Observable((observer: Observer<User>) => {
      this._httpSpinnerService.showSpinner();

      const routeURL = `${UserRoutes.USERS}/${UserAuthenticationRoutes.SIGN_IN}`;
      const params = new HttpParams()
        .set('email', signIn.email)
        .set('password', signIn.password);

      return this._httpService
        .fetchByParams(routeURL, params)
        .pipe(
          map((user: { user: User; idToken: string }) => {
            this._storageService.setToken(Storage.ID_TOKEN, user.idToken);

            return user.user;
          }),
          catchError((error) => {
            return of(false);
          })
        )
        .subscribe(async (data: User) => {
          this._httpSpinnerService.hideSpinner();

          const modal = await this._modalController.create({
            component: HttpDialogComponent,
            cssClass: '',
            componentProps: {
              success: data ? true : false,
              message: data
                ? 'Redirecting To Dashboard'
                : 'Wrong User Information',
            },
          });

          await modal.present();

          observer.next(data);
          return observer.complete();
        });
    });
  }

  public signUp(signUp: SignUpDTO): Observable<User> {
    return new Observable((observer: Observer<User>) => {
      this._httpSpinnerService.showSpinner();

      const routeURL = `${UserRoutes.USERS}/${UserAuthenticationRoutes.SIGN_UP}`;

      return this._httpService
        .create(routeURL, signUp)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        )
        .subscribe((data: User) => {
          this._httpSpinnerService.hideSpinner();

          observer.next(data);
          return observer.complete();
        });
    });
  }

  public forgotPassword(forgotPassword: ForgotPasswordDTO): Observable<User> {
    return new Observable((observer: Observer<User>) => {
      this._httpSpinnerService.showSpinner();

      const routeURL = `${UserRoutes.USERS}/${UserAuthenticationRoutes.FORGOT_PASSWORD}`;

      const httpParams = new HttpParams().set('email', forgotPassword.email);

      return this._httpService
        .updateByParams(routeURL, httpParams, forgotPassword)
        .pipe(
          catchError((error) => {
            return throwError(error);
          })
        )
        .subscribe((data: User) => {
          this._httpSpinnerService.hideSpinner();

          observer.next(data);
          return observer.complete();
        });
    });
  }
}
