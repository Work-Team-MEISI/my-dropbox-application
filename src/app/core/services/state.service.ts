import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DocumentsService } from 'src/app/use-cases/features/documents/services/documents.service';
import { Document } from 'src/app/use-cases/features/documents/types/document.type';
import { User } from 'src/app/use-cases/features/users/types/user';
import { State } from '../types/state.type';

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

  constructor(private readonly _documentsService: DocumentsService) {
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
      const userId = this._stateSubject.value.user.userId;

      return this._documentsService
        .fetchDocuments(userId)
        .pipe(
          catchError((error) => {
            return of([]);
          })
        )
        .subscribe((data) => {
          this.updateDocumentsState(data);

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
