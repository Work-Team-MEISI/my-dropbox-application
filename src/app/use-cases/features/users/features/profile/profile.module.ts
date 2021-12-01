import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './services/profile.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { IonicModule } from '@ionic/angular';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, SharedModule, ProfileRoutingModule, IonicModule],
  providers: [ProfileService],
  exports: [ProfileRoutingModule],
})
export class ProfileModule {}
