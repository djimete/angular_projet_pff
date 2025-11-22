import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false // ← CETTE LIGNE EST MAINTENANT OBLIGATOIRE
})
export class LoginComponent {
  email: string = '';

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Email soumis:', this.email);
  }

  handleSocialSignIn(provider: string) {
    // ... le reste de votre code existant ...
  }
}
