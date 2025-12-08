import { Component, OnInit } from '@angular/core';

// --- INTERFACE DE DONNÉES ---
interface Nanny {
  id: string;
  name: string;
  title: string;
  location: string;
  rate: string;
  imgText: string;
  reviews: number;
  rating: number;
  ageGroups: string[];
  availability: 'now' | 'soon' | 'booking';
  profileContent: string;
}

@Component({
  selector: 'app-nounou',
  standalone: false,
  templateUrl: './nounou.component.html',
  styleUrl: './nounou.component.css'
})
export class NounouComponent implements OnInit {

  // --- 1. DATA SIMULATION ---
  providers: Nanny[] = [
    { id: 'khadijas', name: 'Khadija S.', title: 'Assistante Maternelle agréée | Spécialisée Bébés', location: 'Dakar', rate: '5€ / heure', imgText: 'K1', reviews: 68, rating: 4.9, ageGroups: ['bebe', 'maternelle'], availability: 'now', profileContent: 'Khadija a 8 ans d\'expérience et est spécialisée dans les soins aux nourrissons (0-2 ans). Elle est agréée par l\'État du Sénégal.' },
    { id: 'mansourd', name: 'Mansour D.', title: 'Coach scolaire et périscolaire | Aide aux devoirs', location: 'Rufisque', rate: '10€ / heure', imgText: 'M2', reviews: 15, rating: 4.7, ageGroups: ['primaire'], availability: 'soon', profileContent: 'Mansour est titulaire d\'un Master en Éducation. Il se concentre sur l\'aide aux devoirs pour les enfants de 6 à 12 ans.' },
    { id: 'aminac', name: 'Amina C.', title: 'Nourrice avec références | Garde temps plein', location: 'Dakar', rate: 'Forfait mensuel (sur devis)', imgText: 'A3', reviews: 22, rating: 4.3, ageGroups: ['maternelle', 'primaire'], availability: 'booking', profileContent: 'Amina propose une garde à temps plein. Elle a d\'excellentes références et est disponible pour une longue durée.' }
  ];

  // --- 2. PROPRIÉTÉS D'ÉTAT PRINCIPALES ---
  filteredProviders: Nanny[] = [];
  currentView: 'list-view' | 'detail-view' | 'payment-view' = 'list-view';
  selectedNanny: Nanny | null = null;

  // --- 3. PROPRIÉTÉS POUR LA RÉSERVATION ET LE PAIEMENT ---
  reservationAccepted: boolean = false;
  // Montant modifiable (initialisé à une valeur par défaut)
  paymentAmount: number = 55.00;
  selectedPaymentMethod: 'carte' | 'orange' | 'wave' | null = null;

  // PROPRIÉTÉS COMPLÈTES POUR LES CHAMPS DE PAIEMENT
  card_number: string = '';
  card_expiry: string = ''; // Ajouté pour l'expiration de la carte
  card_cvv: string = '';    // Ajouté pour le CVV
  orange_phone: string = '';
  orange_pin: string = '';  // Ajouté pour le code Pin Orange-Money
  wave_phone: string = '';

  // --- 4. PROPRIÉTÉS POUR LES FILTRES (liées via [(ngModel)]) ---
  filterLocation: string = '';
  filterAge: string = 'all';
  filterUrgent: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.applyFilters();
  }

  // ------------------------------------------------------------------
  // --- GESTION DES VUES ---
  // ------------------------------------------------------------------

  showView(viewId: 'list-view' | 'detail-view' | 'payment-view'): void {
    this.currentView = viewId;
    window.scrollTo(0, 0);
  }

  showDetails(id: string): void {
    this.selectedNanny = this.providers.find(n => n.id === id) || null;
    if (this.selectedNanny) {
      this.reservationAccepted = false;
      this.showView('detail-view');
    }
  }

  // showPaymentForm : Réinitialise les champs et définit le montant initial
  showPaymentForm(id: string, initialAmount: number): void {
    this.selectedNanny = this.providers.find(n => n.id === id) || null;
    this.paymentAmount = initialAmount;

    // Réinitialisation de l'état du paiement et des champs de saisie
    this.selectedPaymentMethod = null;
    this.card_number = '';
    this.card_expiry = '';
    this.card_cvv = '';
    this.orange_phone = '';
    this.orange_pin = '';
    this.wave_phone = '';

    this.showView('payment-view');
  }

  // ------------------------------------------------------------------
  // --- LOGIQUE DE FILTRAGE ---
  // ------------------------------------------------------------------

  applyFilters(): void {
    const locationFilter = this.filterLocation.trim().toLowerCase();
    const ageFilter = this.filterAge;
    const urgentFilter = this.filterUrgent;

    this.filteredProviders = this.providers.filter(nanny => {
      let isMatch = true;

      if (locationFilter && !nanny.location.toLowerCase().includes(locationFilter)) {
        isMatch = false;
      }
      if (ageFilter !== 'all' && !nanny.ageGroups.includes(ageFilter)) {
        isMatch = false;
      }
      if (urgentFilter && nanny.availability !== 'now') {
        isMatch = false;
      }
      return isMatch;
    });
  }

  // ------------------------------------------------------------------
  // --- LOGIQUE DE RÉSERVATION ET PAIEMENT ---
  // ------------------------------------------------------------------

  simulateReservationDemand(id: string): void {
    const nanny = this.providers.find(n => n.id === id);
    if (!nanny) return;

    if (nanny.availability !== 'now') {
      this.alertUser(`Réservation immédiate impossible. Statut: ${this.getAvailabilityText(nanny.availability)}`, 'error');
      return;
    }

    this.alertUser(`Demande de réservation envoyée à ${nanny.name}. Simulation d'attente...`, 'info');

    setTimeout(() => {
      this.paymentAmount = 55.00; // Montant initial (peut être modifié par l'utilisateur)
      this.reservationAccepted = true;
      this.alertUser(`La demande de ${nanny.name} a été acceptée !`, 'success');
    }, 2500);
  }

  // submitPayment : Inclut la validation du montant et des champs spécifiques
  submitPayment(): void {
    // 1. Validation du Montant et de la Méthode
    if (!this.paymentAmount || this.paymentAmount <= 0) {
      this.alertUser('Veuillez saisir un montant de prestation valide.', 'error');
      return;
    }
    if (!this.selectedPaymentMethod) {
      this.alertUser('Veuillez sélectionner une méthode de paiement.', 'error');
      return;
    }

    // 2. Validation des champs spécifiques
    let isDataComplete = false;

    switch (this.selectedPaymentMethod) {
      case 'carte':
        // Validation: Numéro, Expiration, CVV
        isDataComplete = !!this.card_number && !!this.card_expiry && !!this.card_cvv;
        break;
      case 'orange':
        // Validation: Téléphone, Pin/Code de validation
        isDataComplete = !!this.orange_phone && !!this.orange_pin;
        break;
      case 'wave':
        // Validation: Téléphone
        isDataComplete = !!this.wave_phone;
        break;
    }

    if (!isDataComplete) {
      this.alertUser(`Veuillez remplir toutes les informations requises pour le paiement par ${this.getFriendlyMethodName(this.selectedPaymentMethod)}.`, 'error');
      return;
    }

    // 3. Traitement de la Simulation de Paiement
    const nannyName = this.selectedNanny?.name || 'le prestataire';
    const message = `Paiement réussi de ${this.paymentAmount.toFixed(2)} € via ${this.getFriendlyMethodName(this.selectedPaymentMethod)}. La réservation avec ${nannyName} est confirmée !`;
    this.alertUser(message, 'success');

    // Retourner à la liste après le paiement
    setTimeout(() => this.showView('list-view'), 3000);
  }

  // ------------------------------------------------------------------
  // --- UTILS DE RENDU (pour le HTML) ---
  // ------------------------------------------------------------------

  getAvailabilityText(status: 'now' | 'soon' | 'booking'): string {
    switch (status) {
      case 'now': return 'Disponible Maintenant';
      case 'soon': return 'Bientôt Disponible';
      case 'booking': return 'Sur Réservation';
      default: return 'Statut Inconnu';
    }
  }

  getFriendlyMethodName(method: string | null): string {
    switch (method) {
      case 'carte': return 'Carte Bancaire';
      case 'orange': return 'Orange-Money';
      case 'wave': return 'Wave';
      default: return 'Méthode Inconnue';
    }
  }

  generateStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const remainingStars = 5 - fullStars;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
      starsHtml += `<span class="text-yellow-400">&#9733;</span>`;
    }
    for (let i = 0; i < remainingStars; i++) {
      starsHtml += `<span class="text-gray-300">&#9733;</span>`;
    }
    return starsHtml;
  }

  alertUser(message: string, type: 'success' | 'error' | 'info'): void {
    console.log(`[ALERTE - ${type.toUpperCase()}]: ${message}`);
    alert(`[${type.toUpperCase()}] ${message}`);
  }
}
