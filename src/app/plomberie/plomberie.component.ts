import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Nécessaire si le composant est standalone
import { FormsModule } from '@angular/forms';
import {User} from '../models';
import {PrestatairesService} from '../services/prestataires.service'; // Nécessaire pour [(ngModel)]



@Component({
  selector: 'app-plomberie',
  // Si vous utilisez un module, vous pouvez commenter ou supprimer 'standalone: true' et les 'imports'
  // Si standalone: false, assurez-vous que ce composant est dans les 'declarations' de votre AppModule
  // Et que FormsModule est dans les 'imports' de votre AppModule
  standalone: false, // laissé à 'false' comme dans votre dernière version
  templateUrl: './plomberie.component.html',
  styleUrls: ['./plomberie.component.css']
})
export class PlomberieComponent implements OnInit {
  applyFilters($event: any) {
      throw new Error('Method not implemented.');
  }

  // --- Propriétés de gestion de l'état des Vues et Modales ---
  public showDetailSection: boolean = false;
  public showReservationModal: boolean = false;
  public showPaymentModal: boolean = false;
  public showMessageModal: boolean = false;

  public messageTitle: string = '';
  public messageContent: string = '';

  // --- Data & États du Plombier ---
  plombiers: User[] = [];
  plombierSelectionne:User | null = null;


  reservationStatus: 'initial' | 'accepted' = 'initial'; // État de la réservation
  validationCode: string | null = null; // Code généré à l'acceptation

  // --- États du Paiement ---
  selectedPaymentMethod: string = '';
  paymentErrorMessage: string | null = null;

  // --- Propriétés de Formulaire (Filtres) ---
  public filterLocation: string = '';
  public filterService: string = 'all';
  public filterUrgent: boolean = false;

  // --- Propriétés de Formulaire (Réservation) ---
  public reservationNom: string = '';
  public reservationTelephone: string = '';
  public reservationDescription: string = '';

  // --- Propriétés de Formulaire (Paiement) ---
  public paymentAmount: number | null = 5000;
  // Mobile Money
  public paymentPhoneNumber: string = '';
  // Carte Bancaire
  public cardName: string = '';
  public cardNumber: string = '';
  public cardExpiry: string = '';
  public cardCVC: string = '';
  // -----------------------------------------------------------

  constructor(private prestatairesServive:PrestatairesService) {
  }

  // --- Cycle de Vie Angular ---

  ngOnInit(): void {
    this.loadPlombiersData();
  }

  // --- Data Loading (MOCK) ---

  private loadPlombiersData() {
    this.prestatairesServive.getPrestataires('plomberie').subscribe({
      next:(data) =>{
        this.plombiers=data;
      },
      error :(err)=>{

      },
      complete:()=>{

      }
    })
  }

  // --- Fonction de Filtrage (Ajoutée) ---


  // --- Fonctions de VUE / Navigation ---

  showPlumberDetails(id: string) {
    //const plombier = this.plombiers.find(p => p.id === id);
    const plombier=null;

    if (plombier) {
      //this.plombierSelectionne = plombier;

      this.showDetailSection = true;
      this.reservationStatus = 'initial';
      this.validationCode = null;

      // Réinitialiser les états du paiement
      this.selectedPaymentMethod = '';
      this.paymentErrorMessage = null;
      this.paymentAmount = 5000;

      this.closeAllModals();
    } else {
      console.error(`Plombier avec l'ID ${id} non trouvé.`);
    }
  }

  showListView() {
    this.showDetailSection = false;
   // this.plombierSelectionne = null;
    this.reservationStatus = 'initial';
    this.validationCode = null;
    this.closeAllModals();
    //this.applyFilters(new Event('submit')); // Réappliquer les filtres si existants
  }

  // --- Gestion des Modales ---

  private closeAllModals() {
    this.showReservationModal = false;
    this.showPaymentModal = false;
    this.showMessageModal = false;
  }

  openReservationModal() {
    if (this.reservationStatus === 'accepted') return;
    this.showReservationModal = true;

    // Réinitialiser les champs du formulaire lors de l'ouverture
    this.reservationNom = '';
    this.reservationTelephone = '';
    this.reservationDescription = '';
  }

  closeReservationModal() {
    this.showReservationModal = false;
  }

  openPaymentModal() {
    // Initialisation des champs de paiement
    this.selectedPaymentMethod = '';
    this.paymentErrorMessage = null;
    this.paymentAmount = 5000;
    this.paymentPhoneNumber = '';
    this.cardName = '';
    this.cardNumber = '';
    this.cardExpiry = '';
    this.cardCVC = '';

    this.showPaymentModal = true;
  }

  closePaymentModal() {
    this.showPaymentModal = false;
  }

  showMessage(title: string, message: string) {
    this.messageTitle = title;
    this.messageContent = message;
    this.showMessageModal = true;
  }

  closeMessageModal() {
    this.showMessageModal = false;
  }

  // --- Logique du Formulaire / Paiement ---

  onPaymentMethodChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedPaymentMethod = target.value;
    this.paymentErrorMessage = null;
    // Réinitialiser le numéro de téléphone pour éviter les confusions entre OM et Wave
    this.paymentPhoneNumber = '';
  }

  submitReservation(event: Event) {
    event.preventDefault();

   /* if (!this.plombierSelectionne) {
      this.showMessage("Erreur", "Aucun plombier sélectionné pour la réservation.");
      return;
    }*/

    if (!this.reservationNom || !this.reservationTelephone || !this.reservationDescription) {
      this.showMessage("Champs Manquants", "Veuillez remplir tous les champs du formulaire de réservation.");
      return;
    }

    this.closeReservationModal();

    // Simuler l'acceptation immédiate et générer un code de validation à 4 chiffres
    this.validationCode = (Math.floor(1000 + Math.random() * 9000)).toString();
    this.reservationStatus = 'accepted';

    /*this.showMessage("Demande de Réservation Acceptée ✅",
      `Le plombier **${this.plombierSelectionne.nom}** a accepté votre demande ! Procédez au paiement de l'acompte. Votre code de validation est : <strong>${this.validationCode}</strong>.`);*/
  }

  submitPayment(event: Event) {
    event.preventDefault();
    this.paymentErrorMessage = null;

    /*if (!this.validationCode || !this.plombierSelectionne) {
      this.paymentErrorMessage = "Erreur critique : Code de validation ou Plombier manquant.";
      return;
    }*/
    if (!this.paymentAmount || this.paymentAmount <= 0) {
      this.paymentErrorMessage = "Veuillez entrer un montant d'acompte valide (min 1 XOF).";
      return;
    }
    if (!this.selectedPaymentMethod) {
      this.paymentErrorMessage = "Veuillez sélectionner une méthode de paiement.";
      return;
    }

    let validationOK = false;
    let confirmationMessage = '';

    // --- Validation selon la méthode ---
    if (this.selectedPaymentMethod === 'orange_money' || this.selectedPaymentMethod === 'wave') {
      if (!this.paymentPhoneNumber || this.paymentPhoneNumber.length < 8) {
        this.paymentErrorMessage = "Veuillez entrer un numéro de téléphone valide (min. 8 chiffres).";
        return;
      }
      // Simulation: L'utilisateur confirme la transaction sur son téléphone.
      // On utilise le code de validation pour simuler le code secret du Mobile Money
      const codeSaisi = prompt(`Veuillez entrer le code de validation à 4 chiffres (**${this.validationCode}**) pour confirmer la transaction Mobile Money.`);

      if (codeSaisi && codeSaisi.trim() === this.validationCode) {
        validationOK = true;
      } else {
        this.paymentErrorMessage = "Code de confirmation incorrect. Annulation du paiement.";
        return;
      }
      confirmationMessage = `sur le numéro ${this.paymentPhoneNumber}`;

    } else if (this.selectedPaymentMethod === 'carte') {
      if (!this.cardName || !this.cardNumber || !this.cardExpiry || !this.cardCVC) {
        this.paymentErrorMessage = "Veuillez remplir toutes les informations de la carte.";
        return;
      }
      // Simulation 3D Secure
      const code3dSecure = prompt(`Simulateur 3D Secure: Veuillez entrer le code de validation à 4 chiffres (**${this.validationCode}**) pour confirmer le paiement.`);

      if (code3dSecure && code3dSecure.trim() === this.validationCode) {
        validationOK = true;
      } else {
        this.paymentErrorMessage = "Code 3D Secure incorrect. Annulation du paiement.";
        return;
      }
      confirmationMessage = `avec la carte se terminant par **${this.cardNumber.slice(-4)}**`;
    }

    // --- Finalisation du Paiement ---
    if (validationOK) {
      this.closePaymentModal();
      this.showMessage("Paiement Réussi ! 💰",
        `L'acompte de **${this.paymentAmount} XOF** a été réglé avec succès ${confirmationMessage}. Le prestataire est en route. Présentez-lui ce code à son arrivée : <strong>${this.validationCode}</strong>.`);

      // Réinitialiser les états post-paiement
      this.reservationStatus = 'initial';
      this.validationCode = null;
    }
  }

}
