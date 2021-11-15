import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { Document } from '../../types/document.type';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss'],
})
export class DocumentDetailsComponent implements OnInit {
  private _state$: Observable<{ document: Document; userId: string }>;

  private _selectedTab: string = 'file';

  constructor(private readonly _router: Router) {}

  public get selectedTab(): string {
    return this._selectedTab;
  }

  public set selectedTab(value: string) {
    this._selectedTab = value;
  }

  ngOnInit() {
    this._state$ = new Observable(
      (observer: Observer<{ document: Document; userId: string }>) => {
        const { document, userId } =
          this._router.getCurrentNavigation().extras.state;

        observer.next({ document: document, userId: userId });
        return observer.complete();
      }
    );
  }

  public get state$(): Observable<{ document: Document; userId: string }> {
    return this._state$;
  }
}
