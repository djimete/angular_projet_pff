import { Component, OnInit } from '@angular/core';

// Interface pour les avis clients
interface AvisClient {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

// Interface pour structurer les données des prestataires
interface PrestataireDomestique {
  id: number;
  name: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  services: string[];
  availability: 'now' | 'soon' | 'booking';
  location: string;
  price: string;
  price_details: string; // Pour les forfaits ou détails de prix
  action_type: 'Réserver' | 'Détails et Réservation' | 'Contacter'; // Libellés des boutons
  image: string;
  color: string;
  badge_text: string;
  badge_color: string;
  specific_skills: string[]; // Compétences spécifiques pour la vue détail
  reviews_data: AvisClient[]; // Données des avis
}

@Component({
  selector: 'app-travail-domestique',
  standalone: false,
  templateUrl: './domestique.component.html',
  styleUrl: './domestique.component.css'
})
export class DomestiqueComponent implements OnInit {

  // --- Propriétés d'État et de Données ---
  public allProviders: PrestataireDomestique[] = [];
  public filteredProviders: PrestataireDomestique[] = [];
  public currentProvider: PrestataireDomestique | null = null;
  public showDetailSection: boolean = false;
  public showPaymentSection: boolean = false;

  // --- Propriétés pour le Formulaire de Réservation / Paiement ---
  public dateSouhaitee: string = '';
  public dureeEstimee: number = 3;
  public detailsPrestation: string = '';
  public selectedService: string = 'Ménage complet';
  public montantTotalAPayer: number = 16.00;
  public numeroTelephoneOM: string = '';
  public codeSecretOM: string = '';
  public selectedPaymentMethod: 'om' | 'wave' | 'card' = 'om'; // <-- NOUVELLE PROPRIÉTÉ: 'om' par défaut

  // --- Propriétés pour les Filtres ---
  public filterLocation: string = '';
  public filterService: string = 'all';
  public filterUrgent: boolean = false;


  ngOnInit() {
    this.loadProvidersData();
    this.filteredProviders = this.allProviders;
  }

  // --- LOGIQUE DE PAIEMENT ---

  /** Met à jour la méthode de paiement sélectionnée. */
  public selectPaymentMethod(method: 'om' | 'wave' | 'card'): void {
    this.selectedPaymentMethod = method;
  }

  /** Gère l'envoi du formulaire de réservation/contact et redirige vers le paiement. */
  public submitReservation(): void {
    if (this.dateSouhaitee && this.dureeEstimee > 0 && this.detailsPrestation.length > 5) {
      this.montantTotalAPayer = this.dureeEstimee * 8;

      this.showPaymentSection = true;
      this.showDetailSection = false;

      alert(`Demande validée. Redirection vers le paiement. Montant : ${this.montantTotalAPayer}€ pour ${this.dureeEstimee}h.`);

    } else {
      alert("⚠️ Veuillez remplir la date, la durée estimée et les détails de la prestation (minimum 5 caractères).");
    }
  }

  /** Gère la soumission de tous les paiements mobiles */
  public submitMobilePayment(type: 'Orange Money' | 'Wave'): void {
    if (this.numeroTelephoneOM && this.codeSecretOM) {
      alert(`✅ Paiement de ${type} de ${this.montantTotalAPayer}€ initié pour le N° ${this.numeroTelephoneOM}. Votre service est réservé !`);
      this.goBackToList();
    } else {
      alert("⚠️ Veuillez entrer votre numéro de téléphone et votre code secret simulé.");
    }
  }

  /** Gère la soumission du paiement par Carte Bancaire (simulé) */
  public submitCardPayment(): void {
    alert(`✅ Paiement par Carte Bancaire de ${this.montantTotalAPayer}€ initié. Votre service est réservé !`);
    this.goBackToList();
  }

  private resetBookingForm(): void {
    this.dateSouhaitee = '';
    this.dureeEstimee = 3;
    this.detailsPrestation = '';
    this.selectedService = 'Ménage complet';
    this.montantTotalAPayer = 0;
    this.numeroTelephoneOM = '';
    this.codeSecretOM = '';
  }

  // --- LOGIQUE DE NAVIGATION et FILTRAGE (Inchangée) ---

  public showProviderDetails(id: number): void {
    const provider = this.allProviders.find(p => p.id === id);
    if (provider) {
      this.currentProvider = provider;
      this.showDetailSection = true;
      this.showPaymentSection = false;
      this.resetBookingForm();
    }
  }

  public goBackToList(): void {
    this.showDetailSection = false;
    this.showPaymentSection = false;
    this.currentProvider = null;
  }

  public applyFilters(): void {
    this.filteredProviders = this.allProviders.filter(provider => {
      let isMatch = true;
      if (this.filterLocation.trim() && !provider.location.toLowerCase().includes(this.filterLocation.toLowerCase())) {
        isMatch = false;
      }
      if (this.filterService !== 'all' && !provider.services.includes(this.filterService)) {
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

  // --- Données des Prestataires (Inchangées) ---
  private loadProvidersData() {
    this.allProviders = [
      {
        id: 1,
        name: "Fatou G.",
        title: "Aide Ménagère & Experte en Repassage",
        description: "Bonjour ! Je suis Fatou et j'offre mes services de ménage et d'entretien à domicile depuis plus de 8 ans. Je suis reconnue pour ma **rapidité**, ma **discrétion** et mon **sens du détail**. Que ce soit pour un ménage hebdomadaire ou un nettoyage de printemps approfondi, je garantis des résultats impeccables. J'apporte mon propre équipement si nécessaire. Au plaisir de vous rencontrer !",
        rating: 5.0,
        reviews: 105,
        services: ["menage", "repassage"],
        availability: "now",
        location: "Dakar (Plateau)",
        price: "8€ / heure",
        price_details: "Minimum 2 heures par séance. Le repassage est facturé au temps passé ou au panier (sur devis).",
        action_type: "Réserver",
        image: "https://placehold.co/80x80/059669/ffffff?text=F1",
        color: "border-emerald-500",
        badge_text: "Disponible Maintenant",
        badge_color: "bg-emerald-100 text-emerald-700",
        specific_skills: ["Nettoyage écologique", "Gestion du linge délicat", "Organisation de placards", "Cuisine légère (en option)"],
        reviews_data: [
          {
            name: "Marie L.",
            rating: 5.0,
            date: "il y a 3 jours",
            comment: "Fatou est incroyablement efficace. Elle a tout nettoyé à fond, y compris les coins oubliés. Le repassage est parfait. Je recommande sans hésiter !",
          },
          {
            name: "Aliou D.",
            rating: 4.5,
            date: "il y a 2 semaines",
            comment: "Ponctuelle et très professionnelle. Elle a même organisé mon dressing qui était un désordre total. Excellent rapport qualité-prix.",
          },
          {
            name: "Sonia M.",
            rating: 5.0,
            date: "il y a 1 mois",
            comment: "J'utilise les services de Fatou toutes les semaines, et je n'ai jamais eu de plainte. Mon appartement est toujours étincelant après son passage.",
          }
        ]
      },
      {
        id: 2,
        name: "Modou L.",
        title: "Spécialiste Nettoyage Post-Chantier | Équipement Pro",
        description: "Nettoyage en profondeur après travaux ou déménagement. J'utilise des équipements professionnels pour un résultat optimal, notamment pour les grandes surfaces. Je me déplace sur Rufisque et la Petite Côte.",
        rating: 4.8,
        reviews: 32,
        services: ["nettoyage_profondeur"],
        availability: "soon",
        location: "Rufisque",
        price: "Forfait 120€ / journée",
        price_details: "Forfait journée (8h) : 120€. Devis personnalisé pour les chantiers de longue durée (plus de 3 jours). Frais de déplacement inclus.",
        action_type: "Détails et Réservation",
        image: "https://placehold.co/80x80/facc15/ffffff?text=M2",
        color: "border-yellow-500",
        badge_text: "Prochain créneau : Demain 8h00",
        badge_color: "bg-yellow-100 text-yellow-700",
        specific_skills: ["Nettoyage haute pression", "Élimination des résidus de ciment", "Désinfection", "Gestion des déchets"],
        reviews_data: [
          {
            name: "Serigne B.",
            rating: 5.0,
            date: "il y a 1 semaine",
            comment: "Modou est le meilleur pour les finitions après construction. Notre nouvelle maison était pleine de poussière, et il l'a laissée immaculée. Très efficace et bien équipé.",
          },
          {
            name: "Khady S.",
            rating: 4.5,
            date: "il y a 3 semaines",
            comment: "Nettoyage de déménagement impeccable. Il a fait un travail extraordinaire dans la cuisine et les salles de bain. Je le recommande pour tout travail de grande ampleur.",
          }
        ]
      },
      {
        id: 3,
        name: "Maimouna T.",
        title: "Experte Repassage à Domicile | Service Rapide",
        description: "Service de repassage professionnel, soigné et rapide. Je m'occupe de tous types de textiles. Réservation à l'avance nécessaire en raison de ma forte demande, idéalement une semaine avant.",
        rating: 4.5,
        reviews: 45,
        services: ["repassage"],
        availability: "booking",
        location: "Dakar",
        price: "10€ / heure",
        price_details: "Repassage (à l'heure) : 10€ / heure. Minimum 2h par intervention. Frais de déplacement non inclus si la zone est éloignée.",
        action_type: "Contacter",
        image: "https://placehold.co/80x80/9ca3af/ffffff?text=M3",
        color: "border-gray-400",
        badge_text: "Sur réservation (1 semaine de délai)",
        badge_color: "bg-gray-100 text-gray-700",
        specific_skills: ["Repassage de chemises et costumes", "Linge délicat (soie, laine)", "Organisation du dressing"],
        reviews_data: [
          {
            name: "Ndeye P.",
            rating: 5.0,
            date: "il y a 2 jours",
            comment: "Maimouna est une perle. Elle prend soin des vêtements comme si c'étaient les siens. Mes chemises de travail n'ont jamais été aussi nettes. Repassage terminé en moins de 2 heures !",
          },
          {
            name: "Omar K.",
            rating: 4.0,
            date: "il y a 1 semaine",
            comment: "Travail très soigné. Un petit bémol sur le délai de réservation, mais la qualité est là. Très professionnelle et discrète.",
          },
          {
            name: "Aïcha B.",
            rating: 4.5,
            date: "il y a 1 mois",
            comment: "Service de repassage impeccable et très rapide. Elle a géré une grosse pile de linge sans problème. Je la recommande vivement pour le linge délicat.",
          }
        ]
      }
    ];
  }
}
