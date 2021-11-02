import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DocumentsRoutes } from './../../../use-cases/features/documents/constants/documents-routes.enum';
import { UserProfileRoutes } from './../../../use-cases/features/users/features/profile/constants/user-profile-routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private readonly _navController: NavController) {}

  ngOnInit() {}

  public navigateToDocuments(): void {
    const { DOCUMENTS } = DocumentsRoutes;

    this._navController.navigateForward(DOCUMENTS);
  }

  public navigateToUserProfile(): void {
    const { PROFILE } = UserProfileRoutes;

    this._navController.navigateForward(PROFILE);
  }
}
