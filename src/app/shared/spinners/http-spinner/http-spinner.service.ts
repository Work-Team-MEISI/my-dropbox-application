import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpSpinnerService implements OnDestroy {
  private readonly _stateSubject: BehaviorSubject<boolean>;
  private readonly _state$: Observable<boolean>;

  constructor() {
    this._stateSubject = new BehaviorSubject<boolean>(false);
    this._state$ = this._stateSubject.asObservable();
  }

  public get state$(): Observable<boolean> {
    return this._state$;
  }

  public showSpinner(): void {
    this._stateSubject.next(true);
  }

  public hideSpinner(): void {
    this._stateSubject.next(false);
  }

  ngOnDestroy(): void {
    this._stateSubject.unsubscribe();
    this._stateSubject.complete();
  }
}
