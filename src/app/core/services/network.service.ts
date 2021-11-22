import { Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor() {}

  public fetchNetworkStatus(): Observable<ConnectionStatus> {
    const networkStatusPromisse = Network.getStatus();
    const networkStatus$ = from(networkStatusPromisse);

    return networkStatus$;
  }
}
