import { Injectable, OnDestroy } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NetworkService implements OnDestroy {
  private readonly _state: BehaviorSubject<boolean>;
  private readonly _state$: Observable<boolean>;

  constructor() {
    this._state = new BehaviorSubject<boolean>(true);
    this._state$ = this._state.asObservable();

    this._initializeState();
  }

  private _initializeState(): void {
    const networkStatusPromisse = Network.getStatus();
    const networkStatus$ = from(networkStatusPromisse);

    networkStatus$
      .pipe(
        map((data) => {
          this._state.next(data.connected);
        })
      )
      .subscribe();
  }

  public get state$(): Observable<boolean> {
    return this._state$;
  }

  public fetchNetworkStatus(): Observable<ConnectionStatus> {
    const networkStatusPromisse = Network.getStatus();
    const networkStatus$ = from(networkStatusPromisse);

    return networkStatus$;
  }

  public networkStatusListner(): void {
    Network.addListener('networkStatusChange', (data) => {
      this._state.next(data.connected);
    });
  }

  ngOnDestroy(): void {
    this._state.unsubscribe();
    this._state.complete();
  }
}
