import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from 'src/app/core/services/state.service';
import { Document } from './types/document.type';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {
  private _documents$: Observable<Array<Document>>;
  private _userId: string;

  constructor(private readonly _stateService: StateService) {
    this._initializeDocuments();
  }

  ngOnInit() {}

  private _initializeDocuments(): void {
    this._documents$ = this._stateService.state$.pipe(
      map((data) => {
        this._userId = data.user.userId;

        console.log(data.documents);

        return data.documents;
      })
    );
  }

  public get userId(): string {
    return this._userId;
  }

  public get documents$(): Observable<Array<Document>> {
    return this._documents$;
  }
}
