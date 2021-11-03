import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StateResolverService } from './core/resolvers/state/state-resolver.service';
import { AuthenticationGuardService } from './use-cases/features/users/features/authentication/service/authentication-guard.service';

const routes: Routes = [
  {
    path: 'documents',
    loadChildren: () =>
      import('./use-cases/features/documents/documents.module').then(
        (m) => m.DocumentsPageModule
      ),
    canActivate: [AuthenticationGuardService],
    resolve: { data: StateResolverService },
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
