import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { UiModule } from './ui/ui.module';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UiModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
