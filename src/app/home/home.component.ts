import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Ajouté pour la redirection
import { AuthService } from '../services/auth.service';
import { User } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {

  // Stocke les informations de l'utilisateur connecté
  public user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router // Injecté pour rediriger après déco
  ) {}

  ngOnInit() {
    // Récupération de l'utilisateur au chargement du composant
    this.user = this.authService.getUser();
  }

  /**
   * Gère la déconnexion de l'utilisateur
   */
  deconnection() {
    // 1. Appel de la méthode de nettoyage dans le service
    this.authService.deconnection();

    // 2. Réinitialisation de l'état local
    this.user = null;

    // 3. Redirection vers la page de login pour sécuriser l'accès
    this.router.navigate(['/login']);
  }
}
