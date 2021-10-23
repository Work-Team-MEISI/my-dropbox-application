import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'documents',
    loadChildren: () =>
      import('./use-cases/features/documents/documents.module').then(
        (m) => m.DocumentsPageModule
      ),
  },
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
  {
    path: 'documents',
    loadChildren: () =>
      import('./use-cases/features/documents/documents.module').then(
        (m) => m.DocumentsPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
