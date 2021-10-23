import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly _httpClient: HttpClient) {}

  /** Fetch Bulk */

  public fetchBulk<T>(routeURL: string): Observable<Array<T>> {
    return this._httpClient.get<Array<T>>(`${environment.apiURL}/${routeURL}`);
  }

  public fetchBulkByParams<T>(
    routeURL: string,
    params: HttpParams
  ): Observable<Array<T>> {
    return this._httpClient.get<Array<T>>(`${environment.apiURL}/${routeURL}`, {
      params: params,
    });
  }

  public fetchBulkByResourceId<T>(
    routeURL: string,
    resourceId: string
  ): Observable<Array<T>> {
    return this._httpClient.get<Array<T>>(
      `${environment.apiURL}/${routeURL}/${resourceId}`
    );
  }

  public fetchBulkByResourceBody<T, K>(
    routeURL: string,
    resource: K
  ): Observable<Array<T>> {
    return this._httpClient.get<Array<T>>(
      `${environment.apiURL}/${routeURL}`,
      resource
    );
  }

  /** Fetch Single */

  public fetchByParams<T>(routeURL: string, params: HttpParams): Observable<T> {
    return this._httpClient.get<T>(`${environment.apiURL}/${routeURL}`, {
      params: params,
    });
  }

  public fetchByResourceId<T>(
    routeURL: string,
    resourceId: string
  ): Observable<T> {
    return this._httpClient.get<T>(
      `${environment.apiURL}/${routeURL}/${resourceId}`
    );
  }

  public fetchByResourceBody<T, K>(routeURL: string, data: K): Observable<T> {
    return this._httpClient.get<T>(`${environment.apiURL}/${routeURL}`, data);
  }

  /** Create */

  public create<T, K>(routeURL: string, data: K): Observable<T> {
    return this._httpClient.post<T>(`${environment.apiURL}/${routeURL}`, data);
  }

  /** Update */

  public updateBulk<T, K>(routeURL: string, data: K): Observable<T> {
    return this._httpClient.put<T>(`${environment.apiURL}/${routeURL}`, data);
  }

  public updateByParams<T, K>(
    routeURL: string,
    params: HttpParams,
    data: K
  ): Observable<T> {
    return this._httpClient.put<T>(`${environment.apiURL}/${routeURL}`, data, {
      params: params,
    });
  }

  public updateByResourceId<T, K>(
    routeURL: string,
    resourceId: string,
    data: K
  ): Observable<T> {
    return this._httpClient.put<T>(
      `${environment.apiURL}/${routeURL}/${resourceId}`,
      data
    );
  }

  /** Deletes */

  public deleteBulk<T>(routeURL: string): Observable<T> {
    return this._httpClient.delete<T>(`${environment.apiURL}/${routeURL}`);
  }

  public deleteByParams<T>(
    routeURL: string,
    params: HttpParams
  ): Observable<T> {
    return this._httpClient.delete<T>(`${environment.apiURL}/${routeURL}`, {
      params: params,
    });
  }

  public deleteByResourceId<T>(
    routeURL: string,
    resourceId: string
  ): Observable<T> {
    return this._httpClient.delete<T>(
      `${environment.apiURL}/${routeURL}/${resourceId}`
    );
  }
}
