import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { DocumentsService } from 'src/app/use-cases/features/documents/services/documents.service';
import { Document } from 'src/app/use-cases/features/documents/types/document.type';
import { ProfileService } from 'src/app/use-cases/features/users/features/profile/services/profile.service';
import { User } from 'src/app/use-cases/features/users/types/user';
import { Storage } from '../constants/storage.enum';
import { State } from '../types/state.type';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  /* Subjects */
  private readonly _stateSubject: BehaviorSubject<State>;

  /* Observables */
  private readonly _state$: Observable<{
    documents: Array<Document>;
    user: User;
  }>;

  constructor(
    private readonly _documentsService: DocumentsService,
    private readonly _profileService: ProfileService,
    private readonly _storageService: StorageService
  ) {
    this._stateSubject = new BehaviorSubject<State>({
      documents: [],
      user: {
        userId: '',
        username: '',
        email: '',
        password: '',
      },
    });

    this._state$ = this._stateSubject.asObservable();
  }

  /* Getters */

  public get state$(): Observable<{
    documents: Array<Document>;
    user: User;
  }> {
    return this._state$;
  }

  /* Checkers */

  public checkDocuments(): boolean {
    if (this._stateSubject.value.documents.length > 0) {
      return true;
    }

    return false;
  }

  /* Refreshers */

  public refreshDocuments(): Observable<Array<Document>> {
    return new Observable((observer: Observer<Array<Document>>) => {
      return this._documentsService.fetchDocuments().subscribe(async (data) => {
        await this._storageService.setToken(Storage.DOCUMENTS, data);
        this.updateDocumentsState(data);

        observer.next(data);
        return observer.complete();
      });
    });
  }

  public refreshUser(): Observable<User> {
    return new Observable((observer: Observer<User>) => {
      return this._profileService.fetchUser().subscribe((data) => {
        this.updateUserState(data);

        observer.next(data);
        return observer.complete();
      });
    });
  }

  /* State Update Actions */

  public updateUserState(user: User) {
    const data = {
      documents: this._stateSubject.value.documents,
      user: user,
    };

    this._stateSubject.next(data);
  }

  public updateDocumentsState(documents: Array<Document>) {
    const data = {
      documents: documents,
      user: this._stateSubject.value.user,
    };

    this._stateSubject.next(data);
  }

  /* State Props Updaters Actions */
}
