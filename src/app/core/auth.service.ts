import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseError } from '@firebase/util';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material/snack-bar';


interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
    private realTimeDB: AngularFireDatabase,
    private snackBar: MatSnackBar) { }

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      return this.updateUserData(user);
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
      this.handleError(error);
    });
  }

  googleLogin(){
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(googleProvider);
  }

  githubLogin(){
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(githubProvider);
  }

  facebookLogin() {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(facebookProvider);
  }

  twitterLogin() {
    const twitterProvider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(twitterProvider);
  }

  signOut() {
    this.afAuth.auth.signOut()
    .then(() => { console.log('logout'); });
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.snackBar.open('Welcome to Firestarter!!!');
      return this.updateUserData(credential.user);
    })
    .catch((error) => { 
      this.handleError(error);
     });
  }

  private handleError(error: Error) {
    console.error(error);
    this.snackBar.open(error.message);
  }

  //sets user data to firestore after success
  private updateUserData(user: User) {
    const userRef: AngularFireObject<User> = this.realTimeDB.object(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'Fluffy McFly',
      photoURL: user.photoURL || 'https://yt3.ggpht.com/-V92UP8yaNyQ/AAAAAAAAAAI/AAAAAAAAAAA/zOYDMx8Qk3c/s900-c-k-no-mo-rj-c0xffffff/photo.jpg'
    };

    return userRef.set(data);
  }

}
