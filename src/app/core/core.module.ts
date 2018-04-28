import { NgModule } from '@angular/core';

// import { AuthService } from './auth.service';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from './auth.service';


@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatSnackBarModule,
  ],
  providers: [AuthService],
})
export class CoreModule { }
