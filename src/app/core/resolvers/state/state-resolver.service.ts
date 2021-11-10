import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, from, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from 'src/app/use-cases/features/documents/types/document.type';
import { Storage } from '../../constants/storage.enum';
import { NetworkService } from '../../services/network.service';
import { StateService } from '../../services/state.service';
import { StorageService } from '../../services/storage.service';
import { State } from '../../types/state.type';

@Injectable({
  providedIn: 'root',
})
export class StateResolverService implements Resolve<State> {
  constructor(
    private readonly _stateService: StateService,
    private readonly _networkService: NetworkService,
    private readonly _storageService: StorageService
  ) {}

  resolve(): State | Observable<State> | Promise<State> {
    return new Observable((observer: Observer<State>) => {
      return this._networkService
        .fetchNetworkStatus()
        .pipe(
          map(async (data) => {
            if (data.connected === false) {
              const { DOCUMENTS } = Storage;

              const docsToken = await this._storageService.fetchToken<
                Array<Document>
              >(DOCUMENTS);

              this._stateService.updateDocumentsState(docsToken ?? []);
            }

            const documentsExist = this._stateService.checkDocuments();

            if (documentsExist === true) {
              const { DOCUMENTS } = Storage;

              const docsToken = await this._storageService.fetchToken<
                Array<Document>
              >(DOCUMENTS);

              observer.next({
                documents: docsToken,
                user: { userId: '', username: '', email: '', password: '' },
              });

              return observer.complete();
            }

            const documents$ = this._stateService.refreshDocuments();
            const user$ = this._stateService.refreshUser();

            forkJoin([documents$, user$])
              .pipe(
                map((combinedResults) => {
                  const state = {
                    documents: combinedResults[0],
                    user: combinedResults[1],
                  };

                  return state;
                })
              )
              .subscribe((data) => {
                observer.next(data);
                return observer.complete();
              });
          })
        )
        .subscribe();
    });
  }
}
