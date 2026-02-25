import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
  });

  // --- VARIABLES D'ÉTAT ATTENDUES PAR LE HTML ---
  emailVerified: boolean = false;
  loading: boolean = false;
  showPassword: boolean = false;

  // Correction de l'erreur : Ajout de loginError
  loginError: string | null = null;

  simulationMessage: string | null = null;
  isSimulationSuccess: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.loginForm.get('email')?.setValue(params['email']);
        this.isSimulationSuccess = true;
        this.simulationMessage = "Inscription réussie ! Connectez-vous.";
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.loginError = null; // Réinitialisation au clic

    if (!this.emailVerified) {
      this.verifyEmail();
    } else {
      this.login();
    }
  }

  verifyEmail(): void {
    const email = this.loginForm.get('email')?.value;
    if (!email) return;

    this.loading = true;
    this.authService.verifieEmailExiste(email).subscribe({
      next: () => {
        this.loading = false;
        this.emailVerified = true;
      },
      error: (err) => {
        this.loading = false;
        this.loginError = "Cet e-mail n'existe pas dans notre base.";
      }
    });
  }

  login(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email && password) {
      this.loading = true;
      this.authService.authentification({ email, motDePasse: password }).subscribe({
        next: () => {
          this.loading = false;
          // Redirection basée sur le rôle stocké dans le service
          if (this.authService.isPrestataire()) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/reservation-form']);
          }
        },
        error: (err) => {
          this.loading = false;
          this.loginError = "Mot de passe incorrect.";
        }
      });
    }
  }

  handleSocialSignIn(provider: string): void {
    console.log(`Connexion via ${provider}`);
  }
}
