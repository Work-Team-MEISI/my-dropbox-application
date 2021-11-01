import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from 'src/app/core/constants/storage.enum';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserAuthenticationRoutes } from '../constants/user-authentication-routes.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardService implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _storageService: StorageService,
    private readonly _jsonWebTokenHelper: JwtHelperService
  ) {}

  public async canActivate(): Promise<boolean> {
    const token = await this._storageService.fetchToken<string>(
      Storage.ID_TOKEN
    );

    if (
      token === null &&
      this._jsonWebTokenHelper.isTokenExpired(token) === true
    ) {
      return this._router.navigate([UserAuthenticationRoutes.SIGN_IN]);
    }

    return true;
  }
}
