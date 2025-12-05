import { Component, OnInit } from '@angular/core';

// Interface pour structurer les données des prestataires
interface Prestataire {
  id: number;
  name: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  specialty: string[];
  availability: 'now' | 'soon' | 'booking';
  location: string;
  price: string;
  action_type: 'Urgence' | 'Devis' | 'Planification';
  image: string;
  color: string;
  badge_text: string;
  badge_color: string;
}

@Component({
  selector: 'app-bricolage',
  standalone: false,
  templateUrl: './bricolage.component.html', // ⬅️ L'erreur pointe ici, vérifiez le fichier physique
  styleUrl: './bricolage.component.css'
})
export class BricolageComponent implements OnInit {

  public currentAction: 'urgence' | 'devis' | 'planifier' | '' = '';

  // --- Propriétés d'État et de Données ---
  public allProviders: Prestataire[] = [];
  public filteredProviders: Prestataire[] = [];
  public currentProvider: Prestataire | null = null;
  public showDetailSection: boolean = false;
  public showPaymentSection: boolean = false;
  public bookingStatusMessage: string = '';
  public isBookingAccepted: boolean = false;
  public paymentResult: 'success' | 'failure' | 'pending' | '' = '';

  // --- Propriétés pour le Formulaire et les Filtres ---
  public serviceDescription: string = '';
  public filterLocation: string = '';
  public filterSpecialty: string = 'all';
  public filterUrgent: boolean = false;
  public paymentAmount: number = 35;
  public selectedPaymentMethod: string = '';


  // --- Cycle de Vie Angular ---

  ngOnInit() {
    this.loadProvidersData();
    this.filteredProviders = this.allProviders;
  }

  // --- Données (Simulées) ---
  private loadProvidersData() {
    this.allProviders = [
      {
        id: 1,
        name: "Papa K.",
        title: "Plombier Certifié | Dépannage 24/7",
        description: "Spécialiste des urgences plomberie (fuites, canalisations bouchées) et électricité légère. Disponible immédiatement sur Dakar et environs proches.",
        rating: 4.9,
        reviews: 88,
        specialty: ["plomberie", "electricite"],
        availability: "now",
        location: "Dakar",
        price: "50€ / déplacement + pièces",
        action_type: "Urgence",
        image: "https://placehold.co/80x80/ef4444/ffffff?text=P1",
        color: "border-red-500",
        badge_text: "Disponible pour Urgence",
        badge_color: "bg-red-100 text-red-700"
      },
      {
        id: 2,
        name: "Aïcha D.",
        title: "Multi-Services : Montage, Peinture, Fixations",
        description: "Experte en aménagement intérieur. Montage de meubles IKEA, pose de cadres, peinture de petites surfaces. Ponctualité garantie.",
        rating: 5.0,
        reviews: 42,
        specialty: ["montage", "peinture"],
        availability: "soon",
        location: "Parcelles Assainies",
        price: "25€ / heure",
        action_type: "Devis",
        image: "https://placehold.co/80x80/4f46e5/ffffff?text=A2",
        color: "border-indigo-500",
        badge_text: "Prochain créneau : Après-demain",
        badge_color: "bg-blue-50 text-indigo-700"
      },
      {
        id: 3,
        name: "Issa M.",
        title: "Maître Électricien | Rénovation et Mise aux normes",
        description: "Travaux d'électricité complexes, rénovation complète, installation de systèmes de sécurité. Nécessite une planification préalable.",
        rating: 4.7,
        reviews: 65,
        specialty: ["electricite"],
        availability: "booking",
        location: "Guédiawaye",
        price: "30€ / heure",
        action_type: "Planification",
        image: "https://placehold.co/80x80/9ca3af/ffffff?text=I3",
        color: "border-gray-400",
        badge_text: "Réservation nécessaire (3 jours de délai)",
        badge_color: "bg-gray-100 text-gray-700"
      }
    ];
  }

  // --- LOGIQUE DE FILTRAGE ---

  public applyFilters() {
    this.filteredProviders = this.allProviders.filter(provider => {
      let isMatch = true;
      if (this.filterLocation && !provider.location.toLowerCase().includes(this.filterLocation.toLowerCase())) {
        isMatch = false;
      }
      if (this.filterSpecialty !== 'all' && !provider.specialty.includes(this.filterSpecialty)) {
        isMatch = false;
      }
      if (this.filterUrgent && provider.availability !== 'now') {
        isMatch = false;
      }
      return isMatch;
    });
  }

  // --- GESTION DE LA VUE (LISTE vs DÉTAIL) ---

  public showProviderDetails(providerId: number, action: string) {

    this.currentProvider = this.allProviders.find(p => p.id === providerId) || null;

    this.currentAction = action as 'urgence' | 'devis' | 'planifier';

    this.showDetailSection = true;
    this.showPaymentSection = false;
    this.isBookingAccepted = false;
    this.bookingStatusMessage = '';
    this.paymentResult = '';
    this.serviceDescription = '';
    this.paymentAmount = 35;
    this.selectedPaymentMethod = '';
  }

  public goBackToList() {
    this.showDetailSection = false;
    this.currentProvider = null;
    this.currentAction = '';
  }

  // --- GESTION DE LA RÉSERVATION (MOCK) ---

  public getFormTitle(): string {
    switch (this.currentAction) {
      case 'urgence': return 'Demande de Service Urgente 🚨';
      case 'devis': return 'Demande de Devis Estimatif 📝';
      case 'planifier': return 'Demande de Planification 📅';
      default: return 'Demande de Service';
    }
  }

  public getFormButtonText(): string {
    switch (this.currentAction) {
      case 'urgence': return 'Soumettre ma Demande en Urgence';
      case 'devis': return 'Soumettre ma Demande de Devis';
      case 'planifier': return 'Soumettre ma Demande de Service';
      default: return 'Soumettre ma Demande de Service';
    }
  }

  public handleBookingRequest() {
    if (this.serviceDescription.length < 10) {
      this.bookingStatusMessage = '⚠️ Veuillez décrire votre besoin avec plus de détails (minimum 10 caractères).';
      this.isBookingAccepted = false;
      return;
    }

    this.bookingStatusMessage = '✅ Demande envoyée ! En attente d\'acceptation par le prestataire...';
    this.isBookingAccepted = false;

    // Simulation de l'acceptation
    setTimeout(() => {
      this.isBookingAccepted = true;
      this.showPaymentSection = true;
      this.bookingStatusMessage = '🎉 Votre demande a été ACCEPTÉE ! Vous pouvez maintenant procéder au paiement.';
    }, 3000);
  }

  // --- GESTION DU PAIEMENT (MOCK) ---

  public getPaymentMethodName(): string {
    switch (this.selectedPaymentMethod) {
      case 'wave': return 'Wave';
      case 'orange-money': return 'Orange Money';
      case 'card': return 'Carte Bancaire';
      default: return '';
    }
  }

  public processPayment() {
    if (this.paymentAmount <= 0 || !this.selectedPaymentMethod) {
      this.paymentResult = 'failure';
      this.bookingStatusMessage = "Erreur: Veuillez saisir un montant valide et sélectionner un mode de paiement.";
      return;
    }

    this.paymentResult = 'pending';
    this.bookingStatusMessage = "Traitement du paiement en cours, veuillez patienter...";

    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        this.paymentResult = 'success';
      } else {
        this.paymentResult = 'failure';
      }
    }, 3500);
  }

  public getPaymentMessageClass(): string {
    switch (this.paymentResult) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'failure': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'hidden';
    }
  }

  public getPaymentMessageContent(): string {
    if (this.paymentResult === 'success') {
      const transactionId = (Math.random() * 1e8).toString(16).slice(0, 8).toUpperCase();
      return `<p class="text-2xl mb-2">🎉 Paiement Réussi !</p>
              <p>Service pour ${this.currentProvider?.name} confirmé pour ${this.paymentAmount.toFixed(2)}€ par ${this.getPaymentMethodName()}.</p>
              <p class="text-sm mt-1">Transaction ID: ${transactionId}</p>
              <p class="text-sm mt-3 font-normal">Le prestataire vous contactera sous peu pour finaliser l'intervention.</p>`;
    } else if (this.paymentResult === 'failure') {
      return "Échec du Paiement. Vérifiez vos informations et réessayez ou contactez le support.";
    }
    return '';
  }

  public getRatingStars(rating: number, filled: boolean): string {
    const filledCount = Math.floor(rating);
    const emptyCount = 5 - filledCount;
    return filled ? '★'.repeat(filledCount) : '★'.repeat(emptyCount);
  }
}
