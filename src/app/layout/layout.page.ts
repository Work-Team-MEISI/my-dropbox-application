import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Storage } from '../core/constants/storage.enum';
import { NetworkService } from '../core/services/network.service';
import { StorageService } from '../core/services/storage.service';
import { HttpSpinnerService } from '../shared/spinners/http-spinner/http-spinner.service';
import { DocumentsRoutes } from '../use-cases/features/documents/constants/documents-routes.enum';
import { UserAuthenticationRoutes } from '../use-cases/features/users/features/authentication/constants/user-authentication-routes.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  private readonly _spinnerState$: Observable<boolean>;
  private _navbarVisibility: boolean;
  private _footerVisibility: boolean;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _httpSpinnerService: HttpSpinnerService,
    private readonly _storageService: StorageService,
    private readonly _jwtHelperService: JwtHelperService
  ) {
    this._spinnerState$ = this._httpSpinnerService.state$;
    this._navbarVisibility = false;
    this._footerVisibility = false;
  }

  ngOnInit() {
    this._initializeRouteRedirection();
    this._initializeRoutesState();
  }

  public get spinnerState$(): Observable<boolean> {
    return this._spinnerState$;
  }

  public get navbarVisibility(): boolean {
    return this._navbarVisibility;
  }

  public get footerVisibility(): boolean {
    return this._footerVisibility;
  }

  public async _initializeRouteRedirection(): Promise<boolean> {
    const token = await this._storageService.fetchToken<string>(
      Storage.ID_TOKEN
    );

    if (
      token === null &&
      this._jwtHelperService.isTokenExpired(token) === true
    ) {
      return this._router.navigate([UserAuthenticationRoutes.SIGN_IN]);
    }

    return this._router.navigate([DocumentsRoutes.DOCUMENTS]);
  }

  private _initializeRoutesState(): void {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this._activatedRoute.firstChild;
          let child = route;

          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
              route = child;
            } else {
              child = null;
            }
          }

          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this._navbarVisibility = data.navbarVisibility;
        this._footerVisibility = data.footerVisibility;
      });
  }
}
