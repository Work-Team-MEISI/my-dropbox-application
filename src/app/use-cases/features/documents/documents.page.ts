import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { NetworkService } from 'src/app/core/services/network.service';
import { StateService } from 'src/app/core/services/state.service';
import { HttpDialogComponent } from 'src/app/shared/dialogs/http-dialog/http-dialog.component';
import { HttpSpinnerService } from 'src/app/shared/spinners/http-spinner/http-spinner.service';
import { Document } from './types/document.type';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  private _documents$: Observable<Array<Document>>;
  private _userId: string;

  constructor(
    private readonly _stateService: StateService,
    public readonly _networkService: NetworkService,
    private readonly _httpSpinnerService: HttpSpinnerService,
    private readonly _modalController: ModalController
  ) {
    this._initializeDocuments();
  }

  ngOnInit() {}

  private _initializeDocuments(): void {
    this._documents$ = this._stateService.state$.pipe(
      map((data) => {
        this._userId = data.user.userId;

        const docs = data.documents.filter((doc) => {
          const belongsToUser = doc.users.findIndex((sharedDoc) => {
            return sharedDoc === this._userId;
          });
          if (belongsToUser === -1) {
            return;
          }

          return doc;
        });

        console.log(docs);

        return docs;
      })
    );
  }

  public get userId(): string {
    return this._userId;
  }

  public get documents$(): Observable<Array<Document>> {
    return this._documents$;
  }

  public fetchDocuments(event): void {
    this._networkService.fetchNetworkStatus().subscribe(async (data) => {
      if (data.connected === false) {
        this._httpSpinnerService.hideSpinner();

        const modal = await this._modalController.create({
          component: HttpDialogComponent,
          cssClass: '',
          componentProps: {
            success: false,
            message: 'Error: Not internet connection established!',
          },
        });

        event.target.complete();

        return await modal.present();
      }

      this._stateService.refreshDocuments().subscribe(() => {
        return event.target.complete();
      });
    });
  }
}
