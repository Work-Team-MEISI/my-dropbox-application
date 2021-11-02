import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';
import { UserRoutes } from '../../../constants/user-routes.enum';
import { User } from '../../../types/user';
import { UserProfileRoutes } from '../constants/user-profile-routes';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly _httpService: HttpService) {}

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
}
