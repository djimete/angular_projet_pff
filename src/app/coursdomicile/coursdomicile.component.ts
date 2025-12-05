import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour *ngIf, *ngFor, [ngClass]
import { FormsModule } from '@angular/forms';   // Pour (ngSubmit) et [(ngModel)]

// Définition de l'interface pour un Prestataire
interface Provider {
  id: string;
  name: string;
  initial: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  specialties: string;
  availability: string;
}

@Component({
  selector: 'app-coursdomicile',
  templateUrl: './coursdomicile.component.html',
  styleUrls: ['./coursdomicile.component.css'],
  // ⭐️ COMPOSANT STANDALONE : Il gère lui-même ses imports
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // ⭐️ CORRECTION (ngSubmit) et [(ngModel)]
  ]
})
export class CoursDomicileComponent implements OnInit {

  // --- Données et États ---
  public mockProviders: Provider[] = [
    { id: 'mdiop', name: 'M. Diop', initial: 'MD', description: 'Professeur agrégé en Mathématiques et Physique, 15 ans d\'expérience.', rating: 4.9, reviews: 112, price: 35, location: 'Dakar/Online', specialties: 'mathematiques,physique', availability: 'Disponible en ligne maintenant' },
    { id: 'fatoub', name: 'Fatou B.', initial: 'FB', description: 'Ancienne institutrice, spécialisée en soutien primaire et langues (Français/Anglais).', rating: 5.0, reviews: 68, price: 20, location: 'Parcelles Assainies', specialties: 'francais,anglais,primaire', availability: 'Prochain créneau : Demain 17h00' },
    { id: 'adamn', name: 'Adam N.', initial: 'AN', description: 'Étudiant en Master, aide aux devoirs pour Collège et Primaire. Excellent pédagogue.', rating: 4.7, reviews: 45, price: 18, location: 'Guédiawaye', specialties: 'primaire,francais', availability: 'Réservation nécessaire (48h de délai)' },
  ];

  public filteredProviders: Provider[] = this.mockProviders;
  public resultsCount: number = this.mockProviders.length;

  // Variables de la Modale
  public isModalOpen: boolean = false;
  public isPaymentView: boolean = false;
  public isConfirmationView: boolean = false;
  // Utilisation de l'opérateur '?' pour permettre null, corrige les erreurs NG1
  public currentProvider: Provider | null = null;
  public paymentAmount: number = 0;
  public paymentMethod: string = 'none';
  public paymentStatusMessage: string = '';

  // Variables des Filtres
  public filterLocation: string = '';
  public filterSpecialty: string = 'all';
  public filterUrgent: boolean = false;

  constructor() {
    // Initialise filteredProviders pour être sûr qu'il existe avant la première exécution.
    this.filteredProviders = this.mockProviders;
  }

  ngOnInit(): void {
    this.updateResultsCount();
  }

  // --- Logique des Filtres ---

  applyFilters(): void {
    let visibleCount = 0;

    this.filteredProviders = this.mockProviders.filter(card => {
      const cardLocation = card.location.toLowerCase();
      const cardSpecialties = card.specialties.split(',');

      let isMatch = true;

      // Critère 1: Localisation
      if (this.filterLocation && !cardLocation.includes(this.filterLocation.toLowerCase().trim())) {
        isMatch = false;
      }

      // Critère 2: Matière / Niveau
      if (this.filterSpecialty !== 'all' && !cardSpecialties.includes(this.filterSpecialty)) {
        isMatch = false;
      }

      // Critère 3: Aide Immédiate
      if (this.filterUrgent && card.availability !== 'Disponible en ligne maintenant') {
        isMatch = false;
      }

      if (isMatch) {
        visibleCount++;
      }
      return isMatch;
    });

    this.updateResultsCount(visibleCount);
  }

  updateResultsCount(count?: number): void {
    this.resultsCount = count !== undefined ? count : this.filteredProviders.length;
  }

  // --- Logique de la Modale et du Paiement ---

  /** Ouvre la modale et affiche les détails du prestataire. */
  openDetailModal(providerId: string): void {
    this.currentProvider = this.mockProviders.find(p => p.id === providerId) || null;

    if (!this.currentProvider) return;

    this.isModalOpen = true;
    this.isPaymentView = false;
    this.isConfirmationView = false;
    this.paymentStatusMessage = '';
    this.paymentMethod = 'none';
  }

  /** Ferme la modale. */
  closeModal(): void {
    this.isModalOpen = false;
    this.currentProvider = null;
    this.isPaymentView = false;
    this.isConfirmationView = false;
    this.paymentStatusMessage = '';
  }

  /** Passe de la vue Détails à la vue Paiement. */
  requestBooking(): void {
    if (!this.currentProvider) return;

    this.paymentAmount = this.currentProvider.price;
    this.isPaymentView = true;
  }

  /** Met à jour la visibilité des champs de paiement spécifiques. */
  updatePaymentFieldsVisibility(): boolean {
    return this.paymentMethod === 'wave' || this.paymentMethod === 'orange-money';
  }

  /** Simulation de la finalisation du paiement. */
  finalizePayment(): void {
    if (this.paymentMethod === 'none' || this.paymentAmount <= 0) {
      this.paymentStatusMessage = "Veuillez choisir une méthode de paiement et saisir un montant valide.";
      return;
    }

    // SIMULATION DE PAIEMENT RÉUSSI
    this.paymentStatusMessage = '';
    this.isPaymentView = false;
    this.isConfirmationView = true;
  }

  // Fonction utilitaire pour générer les étoiles (utilisée avec [innerHTML])
  getStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '&#9733;'.repeat(fullStars) + '<span class="text-gray-300">&#9733;</span>'.repeat(emptyStars);
  }
}
