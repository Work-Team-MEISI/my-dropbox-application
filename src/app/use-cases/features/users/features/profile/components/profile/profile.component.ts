import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserRoutes } from '../../../../constants/user-routes.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private readonly _storageService: StorageService,
    private readonly _router: Router
  ) {}

  ngOnInit() {}

  public disconnectUser(): void {
    this._storageService.deleteBulk();
    this._router.navigateByUrl('authentication/sign-in');
  }
}
