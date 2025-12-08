// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // ⬅️ NOUVEL IMPORT NÉCESSAIRE POUR *ngIf

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  // CORRECTION : Ajout de CommonModule pour supporter *ngIf
  imports: [FormsModule, RouterModule, CommonModule]
})
export class LoginComponent implements OnInit {
  // E-mail pré-rempli pour correspondre à l'image
  email: string = 'djimou.meta081@gmail.com';

  // Variables pour gérer l'affichage du message de simulation
  simulationMessage: string = '';
  isSimulationSuccess: boolean = false;

  // Variable pour contrôler le style de l'input (bleu)
  emailEntered: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.email) {
      this.emailEntered = true;
    }
  }

  // Gère la soumission du formulaire
  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.email) {
      this.simulateEmailVerification(this.email);
    } else {
      this.isSimulationSuccess = false;
      this.simulationMessage = "Veuillez entrer une adresse e-mail valide.";
      this.emailEntered = false;
    }
    console.log('Email soumis:', this.email);
  }

  // Logique pour simuler la vérification et définir le message exact
  simulateEmailVerification(email: string): void {
    this.emailEntered = true;
    this.isSimulationSuccess = true;

    // Le message exact demandé
    this.simulationMessage = `Connexion simulée. Vérification de l'e-mail (${email}) réussie ! Vous seriez redirigé pour saisir votre mot de passe.`;
  }

  // Gère les clics sur les boutons de connexion sociale
  handleSocialSignIn(provider: string): void {
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
