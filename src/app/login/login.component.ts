// src/app/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // Service d'authentification

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class LoginComponent implements OnInit {

  // Propriétés du formulaire
  email: string = '';
  password: string = '';

  // Variables d'état pour la gestion du flux de connexion
  emailEntered: boolean = false;
  emailVerified: boolean = false;
  showPassword: boolean = false;
  loading: boolean = false;
  loginError: string = '';
  simulationMessage: string = '';
  isSimulationSuccess: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute // Pour récupérer l'email après l'inscription
  ) { }

  ngOnInit(): void {
    // Vérifie si un email a été passé en paramètre d'URL (après une inscription réussie)
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
        this.emailEntered = true;
        this.simulationMessage = `Inscription réussie pour ${this.email}. Veuillez saisir votre mot de passe pour vous connecter.`;
        this.isSimulationSuccess = true;
      }
    });
  }

  // Gère la soumission du formulaire (transition de l'étape 1 à 2, ou connexion)
  onSubmit(event: Event): void {
    event.preventDefault();
    this.loading = true;
    this.loginError = '';
    this.simulationMessage = '';

    if (!this.emailVerified) {
      // Étape 1 : Vérification de l'existence de l'utilisateur
      if (this.email && this.email.includes('@')) {
        this.simulateEmailVerification(this.email);
      } else {
        this.isSimulationSuccess = false;
        this.simulationMessage = "Veuillez entrer une adresse e-mail valide.";
        this.loading = false;
      }
    } else {
      // Étape 2 : Tenter la connexion
      this.simulateLogin();
    }
  }

  /**
   * Simule la vérification de l'existence de l'e-mail (Étape 1), en utilisant AuthService.
   */
  simulateEmailVerification(email: string): void {
    setTimeout(() => {
      this.loading = false;

      if (this.authService.isEmailRegistered(email)) {
        this.emailVerified = true;
        this.isSimulationSuccess = true;
        this.simulationMessage = `Compte trouvé pour l'e-mail ${email}. Veuillez saisir votre mot de passe.`;
      } else {
        this.emailVerified = false;
        this.isSimulationSuccess = false;
        this.simulationMessage = `Aucun compte trouvé pour l'e-mail: ${email}. Veuillez vérifier ou vous inscrire.`;
      }
    }, 1000);
  }

  /**
   * Simule la connexion avec le mot de passe (Étape 2), en utilisant AuthService.
   */
  simulateLogin(): void {

    if (!this.password) {
      this.loading = false;
      this.loginError = 'Veuillez saisir votre mot de passe.';
      this.isSimulationSuccess = false;
      return;
    }

    setTimeout(() => {
      this.loading = false;

      // Vérification finale de l'authentification
      if (this.authService.login(this.email, this.password)) {
        this.isSimulationSuccess = true;
        this.loginError = '';
        this.simulationMessage = `Connexion réussie pour ${this.email} ! Redirection vers la page d'accueil...`;
        // En production, ce serait ici : this.router.navigate(['/dashboard']);
      } else {
        this.loginError = "Mot de passe incorrect.";
        this.isSimulationSuccess = false;
        this.simulationMessage = "Échec de la connexion.";
      }
    }, 1500);
  }

  /**
   * Fonction MANQUANTE réintégrée : Simule la connexion via les fournisseurs sociaux (Google/Facebook).
   * @param provider Le nom du fournisseur social.
   */
  handleSocialSignIn(provider: string): void {
    this.emailVerified = false;
    this.loading = true;
    this.simulationMessage = `Tentative de connexion via ${provider} (simulation)...`;
    this.isSimulationSuccess = false;

    setTimeout(() => {
      this.loading = false;
      this.isSimulationSuccess = true;
      this.simulationMessage = `Connexion avec ${provider} réussie (simulation) !`;
    }, 1500);
  }

  // Gère le changement d'e-mail pour réinitialiser l'état du formulaire
  onEmailChange(): void {
    if (this.emailVerified) {
      this.emailVerified = false;
      this.password = '';
    }
    this.loginError = '';
    this.simulationMessage = '';
    this.emailEntered = !!this.email;
  }
}
