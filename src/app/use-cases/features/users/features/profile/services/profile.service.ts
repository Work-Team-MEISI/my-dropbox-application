import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Observer, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpDialogComponent } from 'src/app/shared/dialogs/http-dialog/http-dialog.component';
import { UserRoutes } from '../../../constants/user-routes.enum';
import { User } from '../../../types/user';
import { UserProfileRoutes } from '../constants/user-profile-routes';
import { FetchUserByEmailDTO } from '../dtos/fetch-user-by-email.dto';
import { FetchUserByIdDTO } from '../dtos/fetch-user.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _modalController: ModalController
  ) {}

  public fetchUser(): Observable<User> {
    return new Observable((observer: Observer<User>) => {
      const routeURL = `${UserRoutes.USERS}/${UserProfileRoutes.PROFILE}`;

      return this._httpService
        .fetchByToken<User>(routeURL)
        .pipe(
          catchError((error) => {
            const user: User = {
              userId: '',
              username: '',
              email: '',
              password: '',
            };

            return of(user);
          })
        )
        .subscribe((data) => {
          observer.next(data);
          return observer.complete();
        });
    });
  }

  public fetchUserById(fetchUserByIdDTO: FetchUserByIdDTO): Observable<User> {
    return new Observable((observer: Observer<User>) => {
      const routeURL = `${UserRoutes.USERS}/${UserProfileRoutes.PROFILE}`;

      return this._httpService
        .fetchByResourceId<User>(routeURL, fetchUserByIdDTO.userId)
        .pipe(
          catchError((error) => {
            const user: User = {
              userId: '',
              username: '',
              email: '',
              password: '',
            };

            return of(user);
          })
        )
        .subscribe((data) => {
          observer.next(data);
          return observer.complete();
        });
    });
  }

  public fetchUserByEmail(
    fetchUserByEmail: FetchUserByEmailDTO
  ): Observable<User | boolean> {
    return new Observable((observer: Observer<User | boolean>) => {
      const routeURL = `${UserRoutes.USERS}/${UserProfileRoutes.PROFILE}/params`;

      const httpParams = new HttpParams().set('email', fetchUserByEmail.email);

      return this._httpService
        .fetchByParams<User>(routeURL, httpParams)
        .pipe(
          catchError((error) => {
            return of(false);
          })
        )
        .subscribe(async (data: User | false) => {
          if (data !== false) {
            observer.next(data);
            return observer.complete();
          }

          const modal = await this._modalController.create({
            component: HttpDialogComponent,
            cssClass: '',
            componentProps: {
              success: data ? true : false,
              message: 'Error: Failure while fetching the user!',
            },
          });

          await modal.present();

          observer.next(data);
          return observer.complete();
        });
    });
  }
}
