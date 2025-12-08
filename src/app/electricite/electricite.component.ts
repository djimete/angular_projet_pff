import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// --- INTERFACES DE DONNÉES ---
interface Review {
  author: string;
  date: string;
  text: string;
}

interface Provider {
  id: string;
  name: string;
  title: string;
  location: string;
  rating: number;
  reviewsCount: number;
  availabilityCode: 'now' | 'soon' | 'booking';
  availabilityText: string;
  rate: string; // Ex: '50€ / heure'
  buttonText: string;
  services: string[];
  detailDescription: string;
  reviews: Review[];
  imgCode: string;
  borderColor: string;
  statusBg: string;
  statusText: string;
}

interface AppState {
  step: 'list' | 'detail';
  detailStep: 0 | 1 | 2 | 3; // 0: Initial, 1: En attente, 2: Paiement, 3: Succès
  currentBookingProvider: Provider | null;
  selectedPaymentMethod: 'Card' | 'OrangeMoney' | 'Wave' | null;
  filteredProviders: Provider[];
}

@Component({
  selector: 'app-electricite',
  standalone: false,
  templateUrl: './electricite.component.html',
  styleUrl: './electricite.component.css'
})
export class ElectriciteComponent implements OnInit {

  // --- 1. DONNÉES ET ÉTAT ---
  providersData: Provider[] = [
    {
      id: 'fatou',
      name: 'Fatou D.',
      title: 'Experte en dépannage urgent | 8 ans d\'expérience',
      location: 'Dakar',
      rating: 5.0,
      reviewsCount: 112,
      availabilityCode: 'now',
      availabilityText: 'DISPONIBLE MAINTENANT (URGENCE)',
      rate: '50€ / heure (déplacement inclus)',
      buttonText: 'Réserver pour intervention urgente',
      services: ['Panne électrique urgente', 'Installation de prise/lumière', 'Remplacement tableau électrique'],
      detailDescription: "Fatou est la meilleure de la région de Dakar pour toutes les urgences électriques. Certifiée et rapide, elle garantit une intervention sous 30 minutes pour les pannes...",
      reviews: [
        { author: "Moussa K.", date: "1 sem.", text: "Intervention ultra-rapide et problème résolu en 10 minutes. 5 étoiles méritées!" },
        { author: "Awa B.", date: "1 mois", text: "Professionnelle et très courtoise. Elle a pris le temps d'expliquer l'origine de la panne." },
      ],
      imgCode: '059669',
      borderColor: 'border-green-500',
      statusBg: 'bg-green-100',
      statusText: 'text-green-700'
    },
    {
      id: 'ibrahima',
      name: 'Ibrahima F.',
      title: 'Électricien certifié | Installation et rénovation',
      location: 'Rufisque',
      rating: 4.7,
      reviewsCount: 45,
      availabilityCode: 'soon',
      availabilityText: 'PROCHAIN CRÉNEAU : Aujourd\'hui 14h00',
      rate: '80€ / forfait installation',
      buttonText: 'Réserver ce créneau',
      services: ['Installation de prise/lumière', 'Remplacement tableau électrique'],
      detailDescription: "Ibrahima se concentre sur les projets planifiés, l'installation de nouveaux équipements et la rénovation complète. Il propose des forfaits clairs et précis...",
      reviews: [
        { author: "Khadija M.", date: "3 jours", text: "Excellent travail sur la rénovation de mon tableau électrique. Très propre et efficace." },
      ],
      imgCode: 'f97316',
      borderColor: 'border-orange-500',
      statusBg: 'bg-orange-100',
      statusText: 'text-orange-700'
    },
    {
      id: 'aicha',
      name: 'Aïcha G.',
      title: 'Spécialiste en petit appareillage et devis',
      location: 'Dakar',
      rating: 4.3,
      reviewsCount: 18,
      availabilityCode: 'booking',
      availabilityText: 'SUR RÉSERVATION (Délai de 1 semaine)',
      rate: 'Prix sur devis',
      buttonText: 'Demander un devis / Réserver',
      services: ['Installation de prise/lumière'],
      detailDescription: "Aïcha est l'experte pour les petits travaux d'appareillage, l'ajout de points lumineux ou le tirage de câbles simples. Elle travaille uniquement sur devis pour garantir la transparence des coûts...",
      reviews: [
        { author: "Jean L.", date: "1 mois", text: "Devis reçu rapidement et travail soigné. Elle a parfaitement installé les spots de ma cuisine." },
      ],
      imgCode: '9ca3af',
      borderColor: 'border-gray-400',
      statusBg: 'bg-gray-100',
      statusText: 'text-gray-700'
    }
  ];

  appState: AppState = {
    step: 'list',
    detailStep: 0,
    currentBookingProvider: null,
    selectedPaymentMethod: null,
    filteredProviders: [],
  };

  filterFormData = {
    location: '',
    service: 'all',
    urgent: false,
  };

  resultsCount: number = 0;

  // DONNÉES POUR LE FORMULAIRE DE PAIEMENT
  paymentFormData = {
    amount: null as number | null
  };

  // CORRECTION CLÉ: Propriété manquante pour le champ textarea
  serviceDescription: string = ''; // <--- AJOUTÉ

  // Propriétés pour la gestion de l'état de la transaction
  isPaymentProcessing: boolean = false;
  paymentMessage: string | null = null;

  // Propriétés pour stocker les détails de paiement via NgModel
  wavePhoneNumber: string = '';
  wavePinCode: string = '';
  omPhoneNumber: string = '';
  omSecretCode: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCVC: string = '';
  cardName: string = '';


  constructor() { }

  ngOnInit(): void {
    this.appState.filteredProviders = this.providersData;
    this.resultsCount = this.providersData.length;
  }

  // ------------------------------------------------------------------
  // --- 2. LOGIQUE DE NAVIGATION (SPA) ---
  // ------------------------------------------------------------------

  showListView(): void {
    this.appState.step = 'list';
    window.scrollTo(0, 0);
    this.appState.detailStep = 0;
    this.appState.currentBookingProvider = null;
    this.appState.selectedPaymentMethod = null;
    this.paymentFormData.amount = null;
    this.paymentMessage = null;
  }

  showDetailView(providerId: string): void {
    const provider = this.providersData.find(p => p.id === providerId);
    if (provider) {
      this.appState.currentBookingProvider = provider;
      this.appState.step = 'detail';
      this.appState.detailStep = 0;
      window.scrollTo(0, 0);
      this.paymentMessage = null;
      this.isPaymentProcessing = false;
    }
  }

  updateBookingSteps(step: 0 | 1 | 2 | 3): void {
    this.appState.detailStep = step;
    if (step === 2) {
      this.appState.selectedPaymentMethod = null;
    }
  }

  // ------------------------------------------------------------------
  // --- 3. LOGIQUE DE FILTRAGE ---
  // ------------------------------------------------------------------

  applyFilters(): void {
    const { location, service, urgent } = this.filterFormData;

    const locationFilter = location.trim().toLowerCase();
    const serviceFilter = service;
    const urgentFilter = urgent;

    const filtered = this.providersData.filter(provider => {
      let isMatch = true;

      if (locationFilter) {
        if (!provider.location.toLowerCase().includes(locationFilter)) {
          isMatch = false;
        }
      }

      if (serviceFilter !== 'all' && !provider.services.some(s => s.toLowerCase().includes(serviceFilter.toLowerCase()))) {
        isMatch = false;
      }

      if (urgentFilter && provider.availabilityCode !== 'now') {
        isMatch = false;
      }

      return isMatch;
    });

    this.appState.filteredProviders = filtered;
    this.resultsCount = filtered.length;
  }

  // ------------------------------------------------------------------
  // --- 4. FLUX DE RÉSERVATION/PAIEMENT ---
  // ------------------------------------------------------------------

  initiateBooking(): void {
    const provider = this.appState.currentBookingProvider;

    if (!provider) return;

    // Vous pouvez ajouter une vérification de la description ici si nécessaire
    if (this.serviceDescription.length < 10) {
      alert("Veuillez donner une description détaillée de votre besoin (minimum 10 caractères).");
      return;
    }


    if (provider.availabilityCode === 'booking') {
      alert("Demande de devis/réservation envoyée. Le prestataire vous contactera sous 24h.");
      this.showListView();
      return;
    }

    this.updateBookingSteps(1); // Étape 1: En attente

    setTimeout(() => {
      const isConfirmed = Math.random() < 0.8;

      if (isConfirmed) {
        this.processBookingConfirmation(true);
      } else {
        alert("Désolé, la demande a expiré ou le prestataire est devenu indisponible. Veuillez réessayer.");
        this.updateBookingSteps(0);
      }
    }, 2500);
  }

  processBookingConfirmation(success: boolean): void {
    if (success) {
      this.updateBookingSteps(2); // Étape 2: Choix du paiement
    }
  }

  showPaymentFields(method: 'Card' | 'OrangeMoney' | 'Wave'): void {
    this.appState.selectedPaymentMethod = method;
  }

  /**
   * Simule la soumission du paiement, en utilisant le binding de données Angular.
   * @param form L'objet du formulaire Angular (NgForm).
   */
  submitPayment(form: NgForm): void {

    // 1. Vérification de la validité
    if (form.invalid || !this.paymentFormData.amount || this.isPaymentProcessing) return;

    const method = this.appState.selectedPaymentMethod;
    const amountToPay = this.paymentFormData.amount;

    // 2. Démarrer le processus et bloquer l'UI
    this.isPaymentProcessing = true;
    this.paymentMessage = `Paiement en cours via ${method}... Veuillez patienter.`;

    setTimeout(() => {
      const paymentSuccess = Math.random() < 0.9;
      this.isPaymentProcessing = false; // Fin du traitement

      if (paymentSuccess) {
        this.updateBookingSteps(3); // Étape 3: Succès
        this.paymentMessage = `✅ Succès ! Le montant de ${amountToPay.toLocaleString('fr-FR')} XOF/EUR a été payé par ${method}. Votre réservation est confirmée.`;
      } else {
        this.paymentMessage = `❌ Échec du paiement par ${method} pour le montant de ${amountToPay}. Veuillez vérifier les informations et réessayer.`;
        this.updateBookingSteps(2); // Retour à l'étape de choix du paiement
      }

    }, 3000);
  }

  // ------------------------------------------------------------------
  // --- 5. UTILS POUR LE TEMPLATE (HTML) ---
  // ------------------------------------------------------------------

  // Génère le code HTML pour les étoiles de notation
  generateRatingHtml(rating: number): string {
    let html = '';
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        html += '<span class="rating-star text-yellow-500 text-xl">&#9733;</span>';
      } else {
        html += '<span class="rating-star text-gray-300 text-xl">&#9733;</span>';
      }
    }
    return html;
  }

  // Simule la conversion EUR vers XOF (taux fixe) et formate le résultat
  getRateInXOF(rate: string): string {
    const rateMatch = rate.match(/(\d+)€/);
    if (rateMatch && rateMatch[1]) {
      const rateEUR = parseFloat(rateMatch[1]);
      const rateXOF = (rateEUR * 655.957);
      // Retourne un nombre formaté avec l'espace comme séparateur de milliers
      return `${rateXOF.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} XOF`;
    }
    return 'N/A';
  }
}
