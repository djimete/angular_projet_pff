import { Component, OnInit } from '@angular/core';

// --- INTERFACE DE DONNÉES ---
interface Provider {
  id: string;
  name: string;
  specialty: string;
  description: string;
  rate: number; // Tarif suggéré en EUR
  rating: number;
  reviews: number;
  status: 'Disponible' | 'Réservation sur délai' | 'Non disponible';
  statusClass: string;
  btnText: string;
  imgText: string;
  imgColor: string;
  btnColor: string;
}

interface AppState {
  step: 'list' | 'check_availability' | 'select_payment' | 'payment_form' | 'complete';
  selectedProvider: Provider | null;
  selectedPaymentMethod: 'wave' | 'orange-money' | 'card' | null;
  reservationDetails: {
    providerId: string;
    time: string;
    id: string;
    amount: number; // Montant final en XOF (après conversion)
  } | null;
}


@Component({
  selector: 'app-beaute',
  standalone: false, // Garder selon votre configuration
  templateUrl: './beaute.component.html',
  styleUrl: './beaute.component.css'
})
export class BeauteComponent implements OnInit {

  // --- 1. DONNÉES ET ÉTAT ---
  providers: Provider[] = [
    { id: 'F001', name: 'Fatou Diop', specialty: 'Thérapeute en Massages Certifiée', description: '**Spécialité :** Massage Californien et Suédois à domicile.', rate: 70, rating: 4.9, reviews: 155, status: 'Disponible', statusClass: 'bg-green-100 text-green-800', btnText: 'Réserver un soin', imgText: 'F.D', imgColor: 'ec4899', btnColor: 'bg-pink-600' },
    { id: 'K002', name: 'Khadija Mbaye', specialty: 'Esthéticienne et Soins du Visage', description: '**Spécialité :** Soins hydratants, anti-âge et maquillage professionnel.', rate: 55, rating: 4.7, reviews: 89, status: 'Réservation sur délai', statusClass: 'bg-yellow-100 text-yellow-800', btnText: 'Voir les services', imgText: 'K.M', imgColor: '10b981', btnColor: 'bg-green-600' },
    { id: 'I003', name: 'Ibrahima Cissé', specialty: 'Coiffeur Styliste à Domicile', description: '**Spécialité :** Coupes modernes, coloration, et mariage. Hommes/Femmes.', rate: 40, rating: 5.0, reviews: 210, status: 'Disponible', statusClass: 'bg-green-100 text-green-800', btnText: 'Prendre RDV', imgText: 'I.C', imgColor: '6366f1', btnColor: 'bg-indigo-600' },
    { id: 'A004', name: 'Aïssatou Ba', specialty: 'Praticienne en Réflexologie', description: '**Spécialité :** Réflexologie plantaire et palmaire pour la gestion du stress.', rate: 65, rating: 4.6, reviews: 45, status: 'Non disponible', statusClass: 'bg-red-100 text-red-800', btnText: 'Indisponible', imgText: 'A.B', imgColor: 'f59e0b', btnColor: 'bg-gray-400' },
  ]; // J'ai réduit à 4 pour coller au format de votre exemple de liste.

  appState: AppState = {
    step: 'list', // list, check_availability, select_payment, payment_form, complete
    selectedProvider: null,
    selectedPaymentMethod: null,
    reservationDetails: null
  };

  // Les données du formulaire de paiement (pour la liaison [(ngModel)])
  paymentFormData = {
    amountEUR: 0,
    wave_phone: '',
    om_phone: '',
    card_number: '',
    card_expiry: '',
    card_cvv: '',
    card_name: '',
  };


  constructor() { }

  ngOnInit(): void {
    // Initialiser le montant suggéré (basé sur le premier prestataire) au démarrage pour le champ de formulaire
    if (this.providers.length > 0) {
      this.paymentFormData.amountEUR = this.providers[0].rate;
    }
  }


  // ------------------------------------------------------------------
  // --- UTILS ET LOGIQUE DE NAVIGATION ---
  // ------------------------------------------------------------------

  /**
   * Change l'étape de l'application.
   * @param step La nouvelle étape.
   */
  changeStep(step: AppState['step']): void {
    this.appState.step = step;
    window.scrollTo(0, 0); // Facilite la navigation sur les petites vues
  }

  /**
   * Simule l'affichage d'un message d'alerte (dans un vrai projet, utilisez un service de notification).
   */
  displayMessage(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    console.log(`[MESSAGE - ${type.toUpperCase()}]: ${message}`);
    // Ici, vous ajouteriez la logique pour afficher le message dans le DOM si vous le souhaitez.
  }

  /**
   * Gère le clic sur le bouton Réserver/Prendre RDV.
   * @param id L'identifiant du prestataire.
   */
  handleBookProvider(id: string): void {
    const provider = this.providers.find(p => p.id === id);

    if (!provider) return;

    if (provider.status === 'Non disponible') {
      this.displayMessage("Ce prestataire n'est pas disponible pour le moment.", 'error');
      return;
    }

    // Réinitialisation des détails spécifiques
    this.appState.selectedProvider = provider;
    this.appState.reservationDetails = null;

    // Mettre à jour le montant par défaut pour l'étape de paiement
    this.paymentFormData.amountEUR = provider.rate;

    this.changeStep('check_availability');
    this.displayMessage(`Réservation pour ${provider.name}. Choisissez la date et l'heure.`, 'info');
  }

  /**
   * Gère la sélection du mode de paiement (étape 2).
   * @param method La méthode de paiement sélectionnée.
   */
  selectPaymentMethod(method: 'wave' | 'orange-money' | 'card'): void {
    this.appState.selectedPaymentMethod = method;
    this.changeStep('payment_form');
  }


  // ------------------------------------------------------------------
  // --- LOGIQUE DE VÉRIFICATION ET PAIEMENT ---
  // ------------------------------------------------------------------

  /**
   * Simule la vérification de disponibilité (étape 1).
   * @param timeInput La date et l'heure souhaitées.
   */
  handleAvailabilityCheck(timeInput: string): void {
    if (!timeInput) {
      this.displayMessage("Veuillez sélectionner une date et une heure.", 'error');
      return;
    }

    this.displayMessage(`Vérification en cours pour ${this.appState.selectedProvider!.name}...`, 'info');

    // Simulation de l'appel API asynchrone
    setTimeout(() => {
      const isAvailable = Math.random() > 0.3; // 70% de chance d'être disponible

      if (isAvailable) {
        // Initialiser les détails de la réservation avant le paiement
        const suggestedAmount = this.appState.selectedProvider!.rate * 1000; // Conversion simulée EUR -> XOF

        this.appState.reservationDetails = {
          providerId: this.appState.selectedProvider!.id,
          time: timeInput,
          id: 'RES-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
          amount: suggestedAmount // Montant initial en XOF
        };
        this.changeStep('select_payment');
        this.displayMessage(`Félicitations ! Disponible. Veuillez choisir votre mode de paiement.`, 'success');
      } else {
        this.changeStep('check_availability');
        this.displayMessage(`Désolé, ${this.appState.selectedProvider!.name} est indisponible à cette heure. Veuillez choisir un autre créneau.`, 'error');
      }
    }, 1500);
  }

  /**
   * Gère la soumission finale du paiement (étape 3).
   */
  handlePaymentSubmission(): void {
    const method = this.appState.selectedPaymentMethod;

    // 1. Validation du Montant (du formulaire)
    const baseAmountEUR = Number(this.paymentFormData.amountEUR);

    if (!baseAmountEUR || baseAmountEUR <= 0) {
      this.displayMessage("Veuillez saisir un montant valide et supérieur à zéro.", 'error');
      return;
    }

    // 2. Validation des champs spécifiques (Téléphone, Carte)
    let isSpecificDataValid = false;

    switch (method) {
      case 'wave':
        isSpecificDataValid = !!this.paymentFormData.wave_phone && /^(77|78)\s?\d{3}\s?\d{2}\s?\d{2}$/.test(this.paymentFormData.wave_phone);
        break;
      case 'orange-money':
        isSpecificDataValid = !!this.paymentFormData.om_phone && /^(77|78)\s?\d{3}\s?\d{2}\s?\d{2}$/.test(this.paymentFormData.om_phone);
        break;
      case 'card':
        // Vérification simple que tous les champs carte sont remplis (sans validation de format stricte)
        isSpecificDataValid = !!this.paymentFormData.card_number &&
          !!this.paymentFormData.card_expiry &&
          !!this.paymentFormData.card_cvv &&
          !!this.paymentFormData.card_name;
        break;
    }

    if (!isSpecificDataValid) {
      this.displayMessage(`Veuillez vérifier et remplir correctement toutes les informations requises pour le paiement par ${this.getFriendlyMethodName(method)}`, 'error');
      return;
    }

    // 3. Simulation du Traitement
    const finalAmountXOF = baseAmountEUR * 1000;
    this.appState.reservationDetails!.amount = finalAmountXOF;

    this.displayMessage(`Traitement du paiement de ${finalAmountXOF.toLocaleString('fr-FR')} XOF en cours...`, 'info');

    // Simulation de l'attente et du résultat de l'API de paiement
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% de chance de succès

      if (isSuccess) {
        this.changeStep('complete');
        this.displayMessage(`Paiement de ${finalAmountXOF.toLocaleString('fr-FR')} XOF réussi !`, 'success');
      } else {
        // En cas d'échec, revenir à la sélection pour réessayer
        this.changeStep('select_payment');
        this.displayMessage("Échec du paiement. Veuillez vérifier vos informations ou essayer une autre méthode.", 'error');
      }
    }, 2500);
  }


  // ------------------------------------------------------------------
  // --- UTILS POUR LE TEMPLATE (HTML) ---
  // ------------------------------------------------------------------

  /**
   * Convertit l'identifiant de la méthode de paiement en nom convivial.
   */
  getFriendlyMethodName(method: string | null): string {
    switch (method) {
      case 'card': return 'Carte Bancaire';
      case 'orange-money': return 'Orange Money';
      case 'wave': return 'Wave';
      default: return 'Méthode Inconnue';
    }
  }

  /**
   * Génère le HTML pour les étoiles de notation.
   * (Utilisé par [innerHTML] dans le template HTML)
   */
  generateRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const maxStars = 5;
    let starsHtml = '';

    // Étoiles pleines (jaunes)
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<span class="rating-star text-yellow-400 text-xl">&#9733;</span>';
    }
    // Étoiles vides ou partielles (grises)
    for (let i = fullStars; i < maxStars; i++) {
      starsHtml += '<span class="rating-star text-gray-300 text-xl">&#9733;</span>';
    }
    return starsHtml;
  }
}
