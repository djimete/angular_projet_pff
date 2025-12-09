// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class LoginComponent implements OnInit {
  email: string = ''; // Initialisation vide
  password: string = ''; // <-- NOUVEAU : Variable pour le mot de passe

  // 🚩 NOUVEAU : État pour contrôler l'étape de connexion
  emailVerified: boolean = false;

  simulationMessage: string = '';
  isSimulationSuccess: boolean = false;
  emailEntered: boolean = false;

  constructor(private router: Router) { } // Ajout de Router pour une redirection simulée

  ngOnInit(): void {
    // Si vous voulez pré-remplir l'e-mail, faites-le ici
    // this.email = 'djimou.meta081@gmail.com';
    if (this.email) {
      this.emailEntered = true;
    }
  }

  // Gère la soumission du formulaire
  onSubmit(event: Event): void {
    event.preventDefault();

    if (!this.emailVerified) {
      // 1. Étape de l'e-mail
      if (this.email) {
        this.simulateEmailVerification(this.email);
      } else {
        this.isSimulationSuccess = false;
        this.simulationMessage = "Veuillez entrer une adresse e-mail valide.";
        this.emailEntered = false;
      }
      console.log('Email soumis:', this.email);

    } else {
      // 2. Étape du mot de passe
      this.simulateLogin();
    }
  }

  // Simule la vérification de l'e-mail
  simulateEmailVerification(email: string): void {
    // Simule la vérification réussie (par exemple, l'utilisateur existe)
    this.emailEntered = true;
    this.isSimulationSuccess = true;
    this.emailVerified = true; // <-- PASSER À L'ÉTAPE DU MOT DE PASSE

    this.simulationMessage = `E-mail (${email}) vérifié ! Veuillez saisir votre mot de passe.`;
  }

  // 🚩 NOUVEAU : Simule la connexion
  simulateLogin(): void {
    if (this.password && this.password.length >= 6) {
      this.isSimulationSuccess = true;
      this.simulationMessage = `Connexion réussie pour ${this.email} ! Redirection...`;
      console.log('Mot de passe soumis:', this.password);
      // Simuler une redirection après un court délai
      // setTimeout(() => { this.router.navigate(['/home']); }, 1500);

    } else {
      this.isSimulationSuccess = false;
      this.simulationMessage = "Mot de passe invalide (6 caractères minimum pour la simulation).";
    }
  }

  // Gère les clics sur les boutons de connexion sociale
  handleSocialSignIn(provider: string): void {
    // La connexion sociale contourne les étapes e-mail/mdp, donc réinitialisation de l'état
    this.emailVerified = false;
    console.log(`Tentative de connexion avec ${provider}.`);
    this.simulationMessage = `Tentative de connexion via ${provider}.`;
    this.isSimulationSuccess = false;
  }

  // Met à jour l'état de l'input lors de la saisie
  onEmailChange(): void {
    this.simulationMessage = '';
    this.emailEntered = !!this.email;
  }
}
