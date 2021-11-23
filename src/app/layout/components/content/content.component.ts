import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkService } from 'src/app/core/services/network.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  private readonly _state$: Observable<boolean>;

  constructor(private readonly _networkService: NetworkService) {
    this._state$ = this._networkService.state$;
  }

  ngOnInit() {}

  public get state$(): Observable<boolean> {
    return this._state$;
  }
}
