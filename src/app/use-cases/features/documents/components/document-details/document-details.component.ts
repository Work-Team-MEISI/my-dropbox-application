import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from 'src/app/core/services/state.service';
import { HttpSpinnerService } from 'src/app/shared/spinners/http-spinner/http-spinner.service';
import { ProfileService } from '../../../users/features/profile/services/profile.service';
import { User } from '../../../users/types/user';
import { DocumentsRoutes } from '../../constants/documents-routes.enum';
import { DocumentsService } from '../../services/documents.service';
import { Document } from '../../types/document.type';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { Browser } from '@capacitor/browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss'],
})
export class DocumentDetailsComponent implements OnInit {
  private _state$: Observable<{
    document: Document;
    user: string;
    sharedUsers: Array<User>;
  }>;

  private _selectedTab: string = 'file';
  public sharedUsers: Array<User> = [];
  public userId: string = '';

  constructor(
    private readonly _router: Router,
    private readonly _profileService: ProfileService,
    private readonly _documentsService: DocumentsService,
    private readonly _httpSpinnerService: HttpSpinnerService,
    private readonly _stateService: StateService,
    private readonly _previewAnyFile: PreviewAnyFile,
    private iab: InAppBrowser
  ) {}

  public get selectedTab(): string {
    return this._selectedTab;
  }

  public set selectedTab(value: string) {
    this._selectedTab = value;
  }

  ngOnInit() {
    this._state$ = new Observable(
      (
        observer: Observer<{
          document: Document;
          user: string;
          sharedUsers: Array<User>;
        }>
      ) => {
        if (this._router.getCurrentNavigation().extras.state) {
          const { document, userId } =
            this._router.getCurrentNavigation().extras.state;
          this.userId = userId;

          this._httpSpinnerService.showSpinner();

          const user = this._profileService.fetchUserById({
            userId: document.creator,
          });
          const sharedUsers$ = new Observable(
            (observer: Observer<Array<User>>) => {
              const users = [];

              for (const sharedUserId of document.users) {
                if (sharedUserId !== document.creator) {
                  this._profileService
                    .fetchUserById({ userId: sharedUserId })
                    .subscribe((data) => {
                      users.push(data);
                    });
                }
              }

              observer.next(users);
              return observer.complete();
            }
          );

          forkJoin([user, sharedUsers$]).subscribe((combinedResults) => {
            this._httpSpinnerService.hideSpinner();
            this.sharedUsers = combinedResults[1];

            observer.next({
              document: document,
              user: combinedResults[0].username,
              sharedUsers: combinedResults[1],
            });

            return observer.complete();
          });
        }
      }
    );
  }

  public get state$(): Observable<{
    document: Document;
    user: string;
    sharedUsers: Array<User>;
  }> {
    return this._state$;
  }

  public removeSharedUser(
    users: Array<string>,
    userId: string,
    documentId: string
  ) {
    const filteredUsers = users.filter((user) => user !== userId);

    this._documentsService
      .updateDocument({ documentId: documentId, users: filteredUsers })
      .subscribe((data) => {
        this._stateService.updateDocumentSharedUsers(filteredUsers, documentId);
        this.sharedUsers = this.sharedUsers.filter(
          (sharedUser) => sharedUser.userId !== userId
        );
      });
  }

  public removeUserFromFile(users: Array<string>, documentId: string) {
    const filteredUsers = users.filter((user) => user !== this.userId);

    this._documentsService
      .updateDocument({ documentId: documentId, users: filteredUsers })
      .subscribe((data) => {
        this._stateService.updateDocumentSharedUsers(filteredUsers, documentId);
        this._router.navigate([`${DocumentsRoutes.DOCUMENTS}`]);
      });
  }

  public deleteFile(documentId: string) {
    this._documentsService.deleteDocument(documentId).subscribe((data) => {
      this._router.navigate([`${DocumentsRoutes.DOCUMENTS}`]);
    });
  }

  public downloadFile(documentId: string) {
    window.open(`${environment.apiURL}/documents/${documentId}`);
  }

  public addUserToFile(event, users: Array<string>, documentId: string) {
    if (event.target.value !== '') {
      this._httpSpinnerService.showSpinner();

      this._profileService
        .fetchUserByEmail({ email: event.target.value })
        .subscribe((user: User | null) => {
          if (user) {
            users.push(user.userId);

            this._documentsService
              .updateDocument({
                documentId: documentId,
                users: users,
              })
              .subscribe((data) => {
                this._stateService.updateDocumentSharedUsers(users, documentId);
                this.sharedUsers.push(user);

                this._httpSpinnerService.hideSpinner();
              });
          }

          this._httpSpinnerService.hideSpinner();
        });
    }
  }
}
