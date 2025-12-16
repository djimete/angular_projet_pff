// src/app/signup/signup.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // Service d'authentification importé

@Component({
  selector: 'app-signup',
  // Le template est intégré ici (template littéral) pour le composant standalone
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un nouveau compte
        </h2>

        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">

          <div *ngIf="message" class="p-3 rounded-md text-sm"
               [ngClass]="{'bg-green-100 text-green-700': isSuccess, 'bg-red-100 text-red-700': !isSuccess}">
            {{ message }}
          </div>

          <div>
            <label for="email" class="sr-only">Adresse e-mail</label>
            <input id="email" name="email" type="email" autocomplete="email" required
                   class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                   placeholder="Adresse e-mail"
                   [(ngModel)]="email">
          </div>

          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input id="password" name="password" type="password" autocomplete="new-password" required
                   class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                   placeholder="Mot de passe"
                   [(ngModel)]="password">
          </div>

          <div *ngIf="!validatePasswordStrength(password) && password.length > 0" class="text-xs text-red-500">
            Le mot de passe doit contenir au moins 6 caractères, des lettres et des chiffres (sans caractères spéciaux).
          </div>

          <div>
            <button type="submit"
                    [disabled]="loading || !email || !password || !validatePasswordStrength(password)"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              S'inscrire
            </button>
          </div>
        </form>

        <div class="text-sm text-center">
          Déjà un compte ?
          <a [routerLink]="['/login']" class="font-medium text-indigo-600 hover:text-indigo-500">
            Connectez-vous ici
          </a>
        </div>
      </div>
    </div>
  `,
  // Les styles sont intégrés pour le composant standalone (ajoutez-les ici si nécessaire)
  styles: [`
    /* Ajoutez des styles spécifiques si besoin, sinon laissez vide */
  `],
  standalone: true,
  // Le composant importe ses propres dépendances (FormsModule, Router, CommonModule, etc.)
  imports: [FormsModule, RouterModule, CommonModule]
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  message: string = '';
  isSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Validation des règles : lettres et chiffres, sans caractères spéciaux. Longueur >= 6.
   */
  validatePasswordStrength(password: string): boolean {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const isOnlyAlphaNumeric = /^[a-zA-Z0-9]+$/.test(password);
    return hasLetter && hasDigit && isOnlyAlphaNumeric && password.length >= 6;
  }

  /**
   * Gère la soumission du formulaire d'inscription.
   */
  onSubmit(): void {
    this.loading = true;
    this.message = '';

    if (!this.validatePasswordStrength(this.password)) {
      this.loading = false;
      this.message = "Le mot de passe ne respecte pas les règles de complexité.";
      this.isSuccess = false;
      return;
    }

    // Simulation de l'appel d'inscription asynchrone (1 seconde)
    setTimeout(() => {
      if (this.authService.register(this.email, this.password)) {
        this.isSuccess = true;
        this.message = 'Inscription réussie ! Vous allez être redirigé vers la connexion.';

        // Redirection vers la page de connexion après 2 secondes
        setTimeout(() => {
          // Utilisation de queryParams pour préremplir l'email sur la page de connexion
          this.router.navigate(['/login'], { queryParams: { email: this.email } });
        }, 2000);
      } else {
        this.isSuccess = false;
        this.message = `L'e-mail ${this.email} est déjà utilisé.`;
      }
      this.loading = false;
    }, 1000);
  }
}
