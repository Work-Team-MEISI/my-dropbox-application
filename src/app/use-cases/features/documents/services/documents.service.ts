import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Storage } from 'src/app/core/constants/storage.enum';
import { HttpService } from 'src/app/core/services/http.service';
import { StateService } from 'src/app/core/services/state.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { HttpDialogComponent } from 'src/app/shared/dialogs/http-dialog/http-dialog.component';
import { HttpSpinnerService } from 'src/app/shared/spinners/http-spinner/http-spinner.service';
import { DocumentsRoutes } from '../constants/documents-routes.enum';
import { AddDocumentDTO } from '../dtos/add-document.dto';
import { UpdateDocumentDTO } from '../dtos/update-document.dto';
import { Document } from '../types/document.type';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _storageService: StorageService,
    private readonly _httpSpinnerService: HttpSpinnerService,
    private readonly _modalController: ModalController,
    private readonly _injector: Injector
  ) {}

  public fetchDocuments(): Observable<Array<Document>> {
    return new Observable((observer: Observer<Array<Document>>) => {
      const routeURL = `${DocumentsRoutes.DOCUMENTS}`;

      return this._httpService
        .fetchBulk(routeURL)
        .pipe(
          catchError((error) => {
            return of([]);
          })
        )
        .subscribe((data: Array<Document>) => {
          observer.next(data);
          return observer;
        });
    });
  }

  public fetchDocument(documentId: string): Observable<Document> {
    return new Observable((observer: Observer<Document>) => {
      const routeURL = `${DocumentsRoutes.DOCUMENTS}`;
      this._httpSpinnerService.showSpinner();

      return this._httpService
        .fetchByResourceId(routeURL, documentId)
        .pipe(
          catchError((error) => {
            return of(false);
          })
        )
        .subscribe(async (data: Document) => {
          this._httpSpinnerService.hideSpinner();

          const modal = await this._modalController.create({
            component: HttpDialogComponent,
            cssClass: '',
            componentProps: {
              success: data ? true : false,
              message: data
                ? 'Success: Document fetched with success!'
                : 'Error: Failure while fetching the document!',
            },
          });

          await modal.present();

          observer.next(data);
          return observer;
        });
    });
  }

  public createDocument(addDocumentDTO: AddDocumentDTO): Observable<Document> {
    return new Observable((observer: Observer<Document>) => {
      const routeURL = `${DocumentsRoutes.DOCUMENTS}`;

      this._httpSpinnerService.showSpinner();
      const stateService = this._injector.get(StateService);

      return this._httpService
        .create(routeURL, addDocumentDTO)
        .pipe(
          map(async (data: Document) => {
            const cachedDocs = await this._storageService.fetchToken<
              Array<Document>
            >(Storage.DOCUMENTS);

            cachedDocs.unshift(data);

            await this._storageService.setToken(Storage.DOCUMENTS, cachedDocs);
            stateService.updateDocumentsState(cachedDocs);

            return data;
          }),
          catchError((error) => {
            return of(false);
          })
        )
        .subscribe(async (data: Promise<Document>) => {
          this._httpSpinnerService.hideSpinner();

          const modal = await this._modalController.create({
            component: HttpDialogComponent,
            cssClass: '',
            componentProps: {
              success: data ? true : false,
              message: data
                ? 'Success: Document created with success!'
                : 'Error: Failure while creating the document!',
            },
          });

          await modal.present();

          observer.next(await data);
          return observer;
        });
    });
  }

  public updateDocument(
    updateDocumentDTO: UpdateDocumentDTO
  ): Observable<Document> {
    return new Observable((observer: Observer<Document>) => {
      const routeURL = `${DocumentsRoutes.DOCUMENTS}`;

      this._httpSpinnerService.showSpinner();
      const stateService = this._injector.get(StateService);

      return this._httpService
        .updateByResourceId(routeURL, updateDocumentDTO.documentId, {
          email: updateDocumentDTO.email,
        })
        .pipe(
          map(async (data: Document) => {
            const cachedDocs = await this._storageService.fetchToken<
              Array<Document>
            >(Storage.DOCUMENTS);

            const index = cachedDocs.findIndex(
              (cachedDoc) => cachedDoc.documentId === data.documentId
            );

            cachedDocs[index] = data;

            await this._storageService.setToken(Storage.DOCUMENTS, cachedDocs);
            stateService.updateDocumentsState(cachedDocs);

            return data;
          }),
          catchError((error) => {
            return of(false);
          })
        )
        .subscribe(async (data: Promise<Document>) => {
          this._httpSpinnerService.hideSpinner();

          const modal = await this._modalController.create({
            component: HttpDialogComponent,
            cssClass: '',
            componentProps: {
              success: data ? true : false,
              message: data
                ? 'Success: Document updated with success!'
                : 'Error: Failure while updating the document!',
            },
          });

          await modal.present();

          observer.next(await data);
          return observer;
        });
    });
  }

  public deleteDocument(documentId: string): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const routeURL = `${DocumentsRoutes.DOCUMENTS}`;
      const httpParams = new HttpParams().set('documentId', documentId);
      const stateService = this._injector.get(StateService);

      this._httpSpinnerService.showSpinner();

      return this._httpService
        .deleteByParams(routeURL, httpParams)
        .pipe(
          map(async (data) => {
            const cachedDocs = await this._storageService.fetchToken<
              Array<Document>
            >(Storage.DOCUMENTS);

            const newDocs = cachedDocs.filter(
              (doc) => doc.documentId !== documentId
            );

            await this._storageService.setToken(Storage.DOCUMENTS, newDocs);

            stateService.updateDocumentsState(newDocs);

            return true;
          }),
          catchError((error) => {
            return of(false);
          })
        )
        .subscribe(async (data: boolean) => {
          this._httpSpinnerService.hideSpinner();

          const modal = await this._modalController.create({
            component: HttpDialogComponent,
            cssClass: '',
            componentProps: {
              success: data ? true : false,
              message: data
                ? 'Success: Document removed with success!'
                : 'Error: Failure while removing the document!',
            },
          });

          await modal.present();

          observer.next(data);
          return observer;
        });
    });
  }
}
