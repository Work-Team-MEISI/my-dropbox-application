import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutPage } from './layout.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule],
  declarations: [
    LayoutPage,
    NavbarComponent,
    FooterComponent,
    ContentComponent,
  ],
  exports: [LayoutPage],
})
export class LayoutPageModule {}
