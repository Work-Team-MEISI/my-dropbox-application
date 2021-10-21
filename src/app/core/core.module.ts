import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [HttpService, StorageService],
})
export class CoreModule {}
