import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { StorageService } from './services/storage.service';
import { NetworkService } from './services/network.service';
import { StateService } from './services/state.service';
import { StateResolverService } from './resolvers/state/state-resolver.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    HttpService,
    StorageService,
    NetworkService,
    StateService,
    StateResolverService,
  ],
})
export class CoreModule {}
