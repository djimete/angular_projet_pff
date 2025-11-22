import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  standalone: false
})
export class InscriptionComponent {

  constructor(private router: Router) {}

  /**
   * Gère la soumission du formulaire d'inscription
   */
  onSubmit(event: Event) {
    event.preventDefault();

    const nom = (document.getElementById('nom') as HTMLInputElement).value;
    const prenom = (document.getElementById('prenom') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;

    this.showMessage(`Inscription réussie pour ${prenom} ${nom} (${email}) !`, false);
    console.log('Formulaire d\'inscription soumis.');

    // Redirection après inscription réussie
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }

  /**
   * Gère le clic sur les boutons d'inscription sociale
   */
  handleSocialSignIn(provider: string) {
    console.log(`Tentative d'inscription via ${provider}...`);

    let authUrl;

    switch (provider) {
      case 'Google':
        authUrl = 'https://www.google.com/';
        break;
      case 'Facebook':
        authUrl = 'https://www.facebook.com/';
        break;
      case 'Apple':
        authUrl = 'https://www.apple.com/';
        break;
      default:
        console.error('Fournisseur d\'authentification inconnu.');
        return;
    }

    window.open(authUrl, '_blank');
  }

  /**
   * Affiche un message de feedback
   */
  showMessage(text: string, isError: boolean = false) {
    const messageBox = document.getElementById('message-box');
    if (messageBox) {
      messageBox.textContent = text;
      messageBox.classList.remove('hidden', 'bg-red-100', 'text-red-800', 'bg-green-100', 'text-green-800');

      if (isError) {
        messageBox.classList.add('bg-red-100', 'text-red-800');
      } else {
        messageBox.classList.add('bg-green-100', 'text-green-800');
      }

      messageBox.classList.remove('hidden');

      setTimeout(() => {
        messageBox.classList.add('hidden');
      }, 5000);
    }
  }
}
