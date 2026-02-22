import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {InscriptionRequest} from '../models';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  standalone: false
})
export class InscriptionComponent {

  inscriptionForm:FormGroup=new FormGroup({
    nom:new FormControl('',Validators.required),
    prenom:new FormControl('', Validators.required),
    adresse_e_mail:new FormControl('',Validators.required),
    pwd1:new FormControl('',Validators.required),
    pwd2:new FormControl('',Validators.required),
    telephone:new FormControl(''),
    adresse:new FormControl(''),
    dateNaissance:new FormControl(''),
    metier:new FormControl(''),
    genre:new FormControl('')
  })

  constructor(private router: Router,private authService:AuthService) {}

  /**
   * Gère la soumission du formulaire d'inscription
   */
  onSubmit(event: Event) {
    /*event.preventDefault();

    const nom = (document.getElementById('nom') as HTMLInputElement).value;
    const prenom = (document.getElementById('prenom') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;

    this.showMessage(`Inscription réussie pour ${prenom} ${nom} (${email}) !`, false);
    console.log('Formulaire d\'inscription soumis.');

    // Redirection après inscription réussie
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);*/
    this.register()
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

  register(){
    const request:InscriptionRequest={
      "email": this.inscriptionForm.get('adresse_e_mail')?.value,
      "motDePasse": this.inscriptionForm.get('pwd1')?.value,
      "nom": this.inscriptionForm.get('nom')?.value,
      "prenom": this.inscriptionForm.get('prenom')?.value,
      "telephone": this.inscriptionForm.get('telephone')?.value,
      "adresse":this.inscriptionForm.get('adresse')?.value,
      "metier":this.inscriptionForm.get('metier')?.value,
      "genre":this.inscriptionForm.get('genre')?.value,
      "dateNaissance":this.inscriptionForm.get('dateNaissance')?.value,

    }
    console.log('inscrption de ',request)
    this.authService.register(request).subscribe({
      error:(err)=>{
        console.log(err)
      },
      next:()=>{
        console.log('ok ')
      },
      complete:()=>{
        console.log("inscription ok");
        this.router.navigate(['/']);
      }
    });

  }
}
