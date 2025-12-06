import { Component, OnInit } from '@angular/core';

// Interface pour structurer les données des professeurs
interface PrestataireCours {
  id: string;
  name: string;
  initial: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  location: string;
  specialties: string[];
  availability: 'now' | 'soon' | 'booking';
  badge_text: string; // Texte de disponibilité
  badge_color: string;
  action_type: 'Réserver une Session' | 'Demander une Réservation' | 'Planifier un Cours';
}

@Component({
  selector: 'app-cours-domicile',
  standalone: false,
  templateUrl: './coursdomicile.component.html',
  styleUrl: './coursdomicile.component.css' // Créez ce fichier si nécessaire
})
export class CoursDomicileComponent implements OnInit {

  // --- Propriétés d'État et de Données ---
  public allProviders: PrestataireCours[] = [];
  public filteredProviders: PrestataireCours[] = [];
  public currentProvider: PrestataireCours | null = null;
  public showDetailSection: boolean = false;
  public showPaymentSection: boolean = false;

  // --- Propriétés pour la Réservation / Paiement ---
  public montantTotalAPayer: number = 0; // Montant basé sur le prix du prestataire
  public selectedPaymentMethod: 'om' | 'wave' | 'card' = 'om';
  public numeroTelephoneOM: string = '';
  public codeSecretOM: string = '';
  public courseDuration: number = 1; // Durée par défaut du cours (simulé)

  // --- Propriétés pour les Filtres ---
  public filterLocation: string = '';
  public filterSpecialty: string = 'all';
  public filterUrgent: boolean = false;


  ngOnInit() {
    this.loadProvidersData();
    this.filteredProviders = this.allProviders;
  }

  // --- LOGIQUE DE NAVIGATION / AFFICHAGE ---

  /** Affiche la section Détail du prestataire sélectionné. */
  public showProviderDetails(id: string): void {
    const provider = this.allProviders.find(p => p.id === id);
    if (provider) {
      this.currentProvider = provider;
      this.showDetailSection = true;
      this.showPaymentSection = false;
      this.courseDuration = 1; // Réinitialiser la durée à 1h par défaut
      this.montantTotalAPayer = provider.price * this.courseDuration;
      this.resetPaymentForm();
    }
  }

  /** Retourne à la liste des prestataires. */
  public goBackToList(): void {
    this.showDetailSection = false;
    this.showPaymentSection = false;
    this.currentProvider = null;
    this.resetPaymentForm();
  }

  /** Simule l'envoi de la demande (ou confirmation) et redirige vers le paiement. */
  public submitBookingRequest(): void {
    if (this.currentProvider && this.courseDuration > 0) {
      this.montantTotalAPayer = this.currentProvider.price * this.courseDuration;

      // Ici, on simule que la demande a été acceptée et on passe directement au paiement.
      alert(`Demande de cours de ${this.courseDuration}h avec ${this.currentProvider.name} validée. Redirection vers le paiement. Montant : ${this.montantTotalAPayer}€.`);

      this.showPaymentSection = true;
      this.showDetailSection = true; // On garde les détails visibles à côté du paiement
    } else {
      alert("⚠️ Veuillez choisir une durée de cours valide.");
    }
  }

  // --- LOGIQUE DE PAIEMENT ---

  /** Met à jour la méthode de paiement sélectionnée. */
  public selectPaymentMethod(method: 'om' | 'wave' | 'card'): void {
    this.selectedPaymentMethod = method;
  }

  /** Gère la soumission des paiements mobiles (Wave / Orange Money) */
  public submitMobilePayment(type: 'Orange Money' | 'Wave'): void {
    if (this.numeroTelephoneOM && this.codeSecretOM) {
      alert(`✅ Paiement de ${type} de ${this.montantTotalAPayer}€ initié pour le N° ${this.numeroTelephoneOM}. Votre cours est réservé !`);
      this.goBackToList();
    } else {
      alert("⚠️ Veuillez entrer votre numéro de téléphone et votre code secret simulé.");
    }
  }

  /** Gère la soumission du paiement par Carte Bancaire (simulé) */
  public submitCardPayment(): void {
    alert(`✅ Paiement par Carte Bancaire de ${this.montantTotalAPayer}€ initié. Votre cours est réservé !`);
    this.goBackToList();
  }

  private resetPaymentForm(): void {
    this.numeroTelephoneOM = '';
    this.codeSecretOM = '';
    this.selectedPaymentMethod = 'om';
  }

  // --- Méthodes de Filtrage et d'Affichage ---

  public applyFilters(): void {
    this.filteredProviders = this.allProviders.filter(provider => {
      let isMatch = true;

      if (this.filterLocation.trim() && !provider.location.toLowerCase().includes(this.filterLocation.toLowerCase())) {
        isMatch = false;
      }

      if (this.filterSpecialty !== 'all' && !provider.specialties.includes(this.filterSpecialty)) {
        isMatch = false;
      }

      if (this.filterUrgent && provider.availability !== 'now') {
        isMatch = false;
      }

      return isMatch;
    });
  }

  public getRatingStars(rating: number, filled: boolean): string {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - Math.ceil(rating);

    let stars = '';
    if (filled) {
      for (let i = 0; i < fullStars; i++) {
        stars += '&#9733;';
      }
    } else {
      for (let i = 0; i < emptyStars; i++) {
        stars += '&#9733;';
      }
    }
    return stars;
  }

  // --- Données des Prestataires (Adaptées des images) ---
  private loadProvidersData() {
    this.allProviders = [
      {
        id: 'mdiop',
        name: "M. Diop",
        initial: 'MD',
        title: "Professeur agrégé en Mathématiques et Physique, 15 ans d'expérience.",
        description: "Je suis M. Diop, professeur agrégé et expérimenté. Spécialisé dans la préparation aux examens du secondaire et l'enseignement en ligne de haut niveau. Mon objectif est d'assurer la réussite de mes élèves dans les matières scientifiques.",
        rating: 4.9,
        reviews: 112,
        price: 35,
        location: "Dakar/Online",
        specialties: ["mathematiques", "physique"],
        availability: "now",
        badge_text: "Disponible en ligne maintenant",
        badge_color: "bg-red-100 text-red-700",
        action_type: "Réserver une Session",
      },
      {
        id: 'fatoub',
        name: "Fatou B.",
        initial: 'FB',
        title: "Ancienne institutrice, spécialisée en soutien primaire et langues (Français/Anglais).",
        description: "Je suis Fatou B., j'ai été institutrice pendant 10 ans. Je me concentre sur l'aide aux devoirs et le développement des compétences de base pour les niveaux primaire et collège, avec une expertise particulière en langues.",
        rating: 5.0,
        reviews: 68,
        price: 20,
        location: "Parcelles Assainies",
        specialties: ["francais", "anglais", "primaire"],
        availability: "soon",
        badge_text: "Prochain créneau : Demain 17h00",
        badge_color: "bg-teal-100 text-teal-700",
        action_type: "Demander une Réservation",
      },
      {
        id: 'adamn',
        name: "Adam N.",
        initial: 'AN',
        title: "Étudiant en Master, aide aux devoirs pour Collège et Primaire. Excellent pédagogue.",
        description: "Étudiant en Master, je propose un soutien scolaire dynamique et adapté aux jeunes. Je peux aider dans toutes les matières du primaire et du collège. Mon approche est basée sur la patience et l'encouragement.",
        rating: 4.7,
        reviews: 45,
        price: 18,
        location: "Guédiawaye",
        specialties: ["primaire", "francais"],
        availability: "booking",
        badge_text: "Réservation nécessaire (48h de délai)",
        badge_color: "bg-gray-100 text-gray-700",
        action_type: "Planifier un Cours",
      }
    ];
  }
}
