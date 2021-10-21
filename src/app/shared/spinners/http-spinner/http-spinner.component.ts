import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpSpinnerService } from './http-spinner.service';

@Component({
  selector: 'app-http-spinner',
  templateUrl: './http-spinner.component.html',
  styleUrls: ['./http-spinner.component.scss'],
})
export class HttpSpinnerComponent implements OnInit {
  private readonly _spinnerState$: Observable<boolean>;

  constructor(private readonly _httpSpinnerService: HttpSpinnerService) {
    this._spinnerState$ = this._httpSpinnerService.state$;
  }

  ngOnInit() {}

  public get spinnerState$(): Observable<boolean> {
    return this._spinnerState$;
  }
}
