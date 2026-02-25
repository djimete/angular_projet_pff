import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const registrationValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pwd1 = control.get('pwd1');
  const pwd2 = control.get('pwd2');
  const tarif = control.get('tarif');
  const metier = control.get('metier');

  const errors: any = {};

  if (pwd1 && pwd2 && pwd1.value !== pwd2.value) {
    errors['mismatch'] = true;
  }

  // Correction : On vérifie si tarif a une valeur (même 0 est une valeur)
  if (tarif?.value !== null && tarif?.value !== '' && (!metier?.value || metier.value === '')) {
    errors['metierObligatoire'] = true;
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  standalone: false
})
export class InscriptionComponent {
  isLoading = false;

  inscriptionForm: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    adresse_e_mail: new FormControl('', [Validators.required, Validators.email]),
    pwd1: new FormControl('', [Validators.required, Validators.minLength(6)]),
    pwd2: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    dateNaissance: new FormControl('', Validators.required),
    metier: new FormControl(''),
    tarif: new FormControl(null),
    genre: new FormControl('', Validators.required)
  }, { validators: registrationValidator });

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(event: Event) {
    if (this.inscriptionForm.valid) {
      this.register();
    }
  }

  register() {
    this.isLoading = true;
    const val = this.inscriptionForm.value;

    // Construction propre de l'objet de requête
    const request: any = {
      email: val.adresse_e_mail,
      motDePasse: val.pwd1,
      nom: val.nom,
      prenom: val.prenom,
      telephone: val.telephone,
      adresse: val.adresse,
      genre: val.genre,
      dateNaissance: val.dateNaissance
    };

    // Si c'est un prestataire (tarif rempli)
    if (val.tarif !== null && val.tarif !== '') {
      request.tarif = Number(val.tarif); // Conversion forcée en nombre
      request.metier = val.metier;
      request.role = 'PRESTATAIRE';
    } else {
      request.role = 'CLIENT';
    }

    this.authService.register(request).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (request.role === 'PRESTATAIRE') {
          // Un prestataire va sur l'accueil (où il verra sa propre carte dans la liste)
          this.router.navigate(['/']);
        } else {
          // Un client est redirigé vers la création de réservation
          this.router.navigate(['/reservation-form']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        alert("Erreur lors de l'enregistrement. Vérifiez vos données.");
      }
    });
  }
}
