import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Storage } from '../constants/storage.enum';
import { StorageService } from '../services/storage.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private readonly _storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._storageService.fetchToken<string>(Storage.ID_TOKEN);
    const token$ = from(token);

    return token$.pipe(
      mergeMap((token) => {
        let cloneRequest = this._addToken(request, token);

        return next.handle(cloneRequest).pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
      })
    );
  }

  private _addToken(request: HttpRequest<any>, token: any): HttpRequest<any> {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return clone;
    }

    return request;
  }
}
