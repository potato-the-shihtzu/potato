import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SectionComponent } from './shared/section/section.component';
import { BioComponent } from './pages/bio/bio.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LogComponent } from './pages/log/log.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';

import { TooltipModule } from '@cloudfactorydk/ng2-tooltip-directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SectionComponent,
    BioComponent,
    GalleryComponent,
    FooterComponent,
    LogComponent,
    InstructionsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, TooltipModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
