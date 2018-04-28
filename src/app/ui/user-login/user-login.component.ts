import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {

  constructor (public auth: AuthService,
    private router: Router) { }

  /// Social Login

  signInWithGithub() {
    this.auth.githubLogin()
      .then(() => this.afterSignIn());
  }

  signInWithGoogle() {
    this.auth.googleLogin()
      .then(() => this.afterSignIn());
  }

  signInWithFacebook() {
    this.auth.facebookLogin()
      .then(() => this.afterSignIn());
  }

  signInWithTwitter() {
    this.auth.twitterLogin()
      .then(() => this.afterSignIn());
  }

  signInAnonymously() {
    this.auth.anonymousLogin()
      .then(() => this.afterSignIn());
  }

  private afterSignIn() {
    this.router.navigate(['/']);
  }

}
