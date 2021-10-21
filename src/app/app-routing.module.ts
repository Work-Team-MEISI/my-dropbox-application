import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import(
        './use-cases/features/users/features/authentication/authentication.module'
      ).then((m) => m.AuthenticationModule),
  },
  {
    path: 'authentication',
    redirectTo: 'authentication/sign-in',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'authentication/sign-in',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
