import { Component, OnInit } from '@angular/core';

interface Plombier {
  id: string;
  nom: string;
  initiales: string;
  specialite: string;
  experience: number;
  note: number;
  avisCount: number;
  tarif: string;
  description: string;
  zone: string;
  services: string[];
  disponible: boolean;
}

@Component({
  selector: 'app-plomberie',
  standalone: false,
  templateUrl: './plomberie.component.html',
  styleUrls: ['./plomberie.component.css']
})
export class PlomberieComponent implements OnInit {

  // --- Propriétés de gestion de l'état ---
  public showDetailSection: boolean = false;
  public showReservationModal: boolean = false;
  public showPaymentModal: boolean = false;
  public showMessageModal: boolean = false;

  public messageTitle: string = '';
  public messageContent: string = '';

  // --- Data ---
  plombiers: Plombier[] = [];

  // Déclaration sécurisée (pour corriger les erreurs NG1 dans le template)
  plombierSelectionne: Plombier | null = null;
  reservationStatus: 'initial' | 'accepted' = 'initial';
  validationCode: string | null = null;

  selectedPaymentMethod: string = '';
  paymentErrorMessage: string | null = null;

  // --- Propriétés de Formulaire (Utilisation de [(ngModel)]) ---
  public filterLocation: string = '';
  public filterService: string = 'all';
  public filterUrgent: boolean = false;

  // Formulaire Réservation : liées aux inputs dans le template
  public reservationNom: string = '';
  public reservationTelephone: string = '';
  public reservationDescription: string = '';
  // -----------------------------------------------------------


  // --- Cycle de Vie Angular ---

  ngOnInit(): void {
    this.loadPlombiersData();
  }

  // --- Data Loading (MOCK) ---

  private loadPlombiersData() {
    this.plombiers = [
      {
        id: '1',
        nom: 'Louis M.',
        initiales: 'LM',
        specialite: 'Expert en détection de fuites',
        experience: 12,
        note: 4.9,
        avisCount: 85,
        tarif: '10 000 XOF / heure',
        description: 'Louis est un plombier certifié avec plus de 12 ans d\'expérience. Spécialisé dans les urgences à Dakar et Rufisque.',
        zone: 'Dakar/Rufisque',
        services: ['Fuite d\'eau urgente', 'Installation robinetterie', 'Débouchage canalisation'],
        disponible: true,
      },
      {
        id: '2',
        nom: 'Marion T.',
        initiales: 'MT',
        specialite: 'Plombière certifiée RGE',
        experience: 5,
        note: 4.5,
        avisCount: 30,
        tarif: '15 000 XOF / forfait',
        description: 'Marion est spécialisée dans les installations écologiques et les rénovations de salle de bain.',
        zone: 'Dakar Ouest',
        services: ['Installation robinetterie', 'Débouchage canalisation'],
        disponible: false,
      },
      {
        id: '3',
        nom: 'Modou Diaw',
        initiales: 'MD',
        specialite: 'Réparation de robinet',
        experience: 2,
        note: 3.8,
        avisCount: 15,
        tarif: 'Prix sur devis',
        description: 'Jeune plombier dynamique offrant des services rapides de réparation de robinetterie et de petits travaux.',
        zone: 'Dakar Centre',
        services: ['Installation robinetterie'],
        disponible: false,
      },
    ];
  }


  // --- Fonctions de VUE / Navigation ---

  showPlumberDetails(id: string) {
    const plombier = this.plombiers.find(p => p.id === id);

    if (plombier) {
      this.plombierSelectionne = plombier;

      this.showDetailSection = true;
      this.reservationStatus = 'initial';
      this.validationCode = null;
      this.selectedPaymentMethod = '';
      this.paymentErrorMessage = null;

      // Fermer toutes les modales lors du changement de vue
      this.closeAllModals();
    } else {
      console.error(`Plombier avec l'ID ${id} non trouvé.`);
    }
  }

  showListView() {
    this.showDetailSection = false;
    this.plombierSelectionne = null;
    this.reservationStatus = 'initial';
    this.validationCode = null;
    this.selectedPaymentMethod = '';
    this.paymentErrorMessage = null;
    this.closeAllModals();
  }

  // --- Gestion des Modales (Angular Idiomatic) ---

  private closeAllModals() {
    this.showReservationModal = false;
    this.showPaymentModal = false;
    this.showMessageModal = false;
  }

  openReservationModal() {
    if (this.reservationStatus === 'accepted') return;
    this.showReservationModal = true;
    this.showDetailSection = true; // S'assurer que le fond est la vue détail
    // Réinitialiser les champs du formulaire lors de l'ouverture
    this.reservationNom = '';
    this.reservationTelephone = '';
    this.reservationDescription = '';
  }

  closeReservationModal() {
    this.showReservationModal = false;
  }

  openPaymentModal() {
    this.reservationStatus = 'accepted';
    this.selectedPaymentMethod = '';
    this.paymentErrorMessage = null;
    this.showPaymentModal = true;
    this.showDetailSection = true;
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
  }

  submitReservation(event: Event) {
    event.preventDefault();

    if (!this.plombierSelectionne) {
      console.error("Aucun plombier sélectionné pour la réservation.");
      return;
    }

    // ⭐️ CORRECTION : Utilisation des variables liées par [(ngModel)]
    if (!this.reservationNom || !this.reservationTelephone || !this.reservationDescription) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    this.closeReservationModal();

    // Simuler le code de validation (Code fixe pour la démonstration)
    this.validationCode = '5714';
    this.reservationStatus = 'accepted';

    this.showDetailSection = true;

    this.showMessage("Demande de Réservation Envoyée et Acceptée",
      `Le plombier ${this.plombierSelectionne.nom} a accepté votre demande ! Procédez au paiement de l'acompte. Votre code de validation est : <strong>${this.validationCode}</strong>.`);
  }

  submitPayment(event: Event) {
    event.preventDefault();
    this.paymentErrorMessage = null;

    if (!this.validationCode) {
      this.paymentErrorMessage = "Erreur: Le code de validation est manquant.";
      return;
    }

    const form = event.target as HTMLFormElement;
    let codeInput: HTMLInputElement | null = null;

    // NOTE : Si vous implémentez les champs dans le HTML, vous devez les lier à des variables TS
    // (via [(ngModel)] ) et utiliser ces variables ici pour la validation.
    // Le code ci-dessous repose toujours sur l'accès direct au DOM (form.elements)
    // que vous aviez dans la version précédente.

    if (this.selectedPaymentMethod === 'orange_money') {
      codeInput = form.elements.namedItem('om-code') as HTMLInputElement;
    } else if (this.selectedPaymentMethod === 'wave') {
      codeInput = form.elements.namedItem('wave-code') as HTMLInputElement;
    } else if (this.selectedPaymentMethod === 'carte') {
      codeInput = form.elements.namedItem('card-3d-code') as HTMLInputElement;
    }

    const codeSaisi = codeInput ? codeInput.value.trim() : '';

    if (codeSaisi !== this.validationCode) {
      this.paymentErrorMessage = "Erreur: Le code de validation/3D Secure entré est incorrect. Vérifiez le code à 4 chiffres.";
      return;
    }

    // Simulation de succès
    this.closePaymentModal();
    this.showMessage("Paiement Réussi!",
      `L'acompte a été réglé avec succès pour ${this.plombierSelectionne?.nom}. Il sera contacté immédiatement.`);
  }
}
