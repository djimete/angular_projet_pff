// src/app/reparationtech/reparationtech.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Requis pour *ngIf, *ngFor

// --- Définitions d'Interfaces pour les données ---
interface Provider {
  id: string;
  name: string;
  title: string;
  location: string;
  devices: string[];
  brands: string[];
  rating: number;
  reviews: number;
  status: string;
  price: string;
  description: string;
  services: string[];
  image: string;
  isUrgent: boolean;
}

interface Demand {
  providerId: string | null;
  problemDescription: string;
  status: 'list' | 'detail' | 'booking' | 'submitted' | 'accepted' | 'payment' | 'paid';
  amountDue: number;
  paymentMethod: 'wave' | 'orange-money' | 'card' | null;
}

@Component({
  selector: 'app-reparationtech',
  // Si ce composant est Standalone, vous devez l'indiquer explicitement:
  // standalone: true,
  templateUrl: './reparationtech.component.html',
  // 🚨 CORRECTION D'ERREUR NG8103 : Ajout de CommonModule pour *ngIf et *ngFor
  imports: [
    FormsModule,
    CommonModule // Ajouté pour supporter *ngIf et *ngFor dans le template
  ],
  styleUrl: './reparationtech.component.css'
})
export class ReparationtechComponent implements OnInit {

  // --- Données et État de l'Application ---
  providerData: Provider[] = [
    { id: 'mame_d', name: 'Mame D.', title: 'Réparation Tél. & Ordinateurs | Certifiée', location: 'Dakar', devices: ['smartphone', 'pc'], brands: ['apple', 'samsung'], rating: 5.0, reviews: 95, status: 'Diagnostic sous 1h Garanti', price: '20€ / Diagnostic', description: "Mame est notre spécialiste certifiée Apple et Samsung. Forte de 8 ans d'expérience...", services: ["Remplacement écran", "Réparation de connecteur de charge"], image: "https://placehold.co/80x80/65a30d/ffffff?text=M1", isUrgent: true },
    { id: 'cheikh_a', name: 'Cheikh A.', title: 'Spécialiste Logiciel & Sécurité (Windows/Linux)', location: 'Fann', devices: ['pc', 'logiciel'], brands: ['dell', 'hp'], rating: 4.6, reviews: 70, status: 'Disponible pour RDV à distance', price: '30€ / heure', description: "Cheikh excelle dans la résolution des problèmes logiciels complexes, la suppression de virus...", services: ["Suppression de virus", "Installation/Configuration de systèmes"], image: "https://placehold.co/80x80/9ca3af/ffffff?text=C2", isUrgent: false },
    { id: 'fatou_s', name: 'Fatou S.', title: 'Réparation Consoles de Jeu & Appareils photo', location: 'Guédiawaye', devices: ['console', 'electronique'], brands: ['all'], rating: 4.9, reviews: 15, status: 'Atelier ouvert (lundi-vendredi)', price: 'Devis gratuit en atelier', description: "Fatou est la référence pour les réparations fines d'électronique et de consoles...", services: ["Réparation port HDMI", "Microsoudure sur carte mère"], image: "https://placehold.co/80x80/65a30d/ffffff?text=F3", isUrgent: true },
  ];

  currentDemand: Demand = {
    providerId: null,
    problemDescription: '',
    status: 'list',
    amountDue: 0,
    paymentMethod: null
  };

  // Défini comme potentiellement undefined
  currentProvider: Provider | undefined;

  // 🚨 CORRECTION : Utilisation de l'énumération de types corrigée
  selectedPaymentMethod: 'wave' | 'orange-money' | 'card' | null = null;

  bookingForm = {
    deviceType: '',
    problemDescription: ''
  };

  // --- Initialisation ---
  ngOnInit() {
    this.showListView();
  }

  // --- Fonctions de Navigation et de Vue ---

  changeView(newStatus: Demand['status'], providerId?: string | null) {
    this.currentDemand.status = newStatus;
    if (providerId) {
      this.currentProvider = this.providerData.find(p => p.id === providerId);
      this.currentDemand.providerId = providerId;
    } else {
      this.currentProvider = undefined;
      this.currentDemand.providerId = null;
    }
  }

  showListView() {
    this.changeView('list');
  }

  // 🚨 CORRECTION NG5 : Ajout de la vérification de l'ID
  renderProviderDetails(providerId: string | undefined) {
    if (providerId) {
      this.changeView('detail', providerId);
    }
  }

  // 🚨 CORRECTION NG5 : Ajout de la vérification de l'ID
  renderBookingForm(providerId: string | undefined) {
    if (providerId) {
      this.changeView('booking', providerId);
    }
  }

  // 🚨 CORRECTION NG5 : Ajout de la vérification de l'ID
  renderPaymentForm(providerId: string | undefined) {
    if (this.currentDemand.status === 'accepted' && providerId) {
      this.changeView('payment', providerId);
    } else {
      // Si on essaie de payer sans être 'accepted' ou sans ID, retour à la liste
      this.showListView();
    }
  }

  // --- Logique Métier ---

  // 🚨 CORRECTION NG5 : La fonction accepte maintenant undefined
  renderRatingStars(rating: number | undefined): string {
    if (rating === undefined || rating === null) {
      rating = 0; // Utiliser 0 par défaut pour le rendu
    }
    const fullStars = Math.floor(rating);
    const halfStar = (rating % 1 >= 0.25) ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<span class="rating-star text-yellow-500">&#9733;</span>'; // Ajout de la classe de couleur
    }
    if (halfStar) {
      starsHtml += '<span class="rating-star text-yellow-500" style="clip-path: inset(0 50% 0 0); display: inline-block;">&#9733;</span>';
    }
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<span class="rating-star text-gray-300">&#9733;</span>';
    }
    return starsHtml;
  }

  /** Gère la soumission du formulaire de demande */
  handleBookingSubmit() {
    // Vérification stricte
    if (!this.currentProvider || !this.bookingForm.problemDescription) return;

    this.currentDemand.problemDescription = this.bookingForm.problemDescription;
    this.changeView('submitted', this.currentProvider.id);
  }

  /** Simule l'acceptation de la demande par le prestataire */
  simulateAcceptance() {
    // Vérification stricte
    if (!this.currentProvider) return;

    // Montant entre 50 et 249
    const amount = Math.floor(Math.random() * 200) + 50;

    this.currentDemand.amountDue = amount;
    this.changeView('accepted', this.currentProvider.id);
  }

  // --- Logique de Paiement ---

  selectPaymentMethod(method: 'wave' | 'orange-money' | 'card') {
    this.selectedPaymentMethod = method;
    this.currentDemand.paymentMethod = method;
  }

  // Ajout d'une fonction pour gérer le changement de méthode depuis le HTML
  onPaymentMethodChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const method = target.value as 'wave' | 'orange-money' | 'card' | '';
    if (method) {
      this.selectPaymentMethod(method);
    } else {
      this.selectedPaymentMethod = null;
      this.currentDemand.paymentMethod = null;
    }
  }


  /** Gère la soumission du formulaire de paiement */
  handlePaymentSubmit(amountToPay: string) {
    const requiredAmount = this.currentDemand.amountDue;
    const paidAmount = parseFloat(amountToPay);

    if (isNaN(paidAmount) || paidAmount <= 0) {
      alert("Veuillez saisir un montant valide.");
      return;
    }

    if (paidAmount < requiredAmount) {
      alert(`Le montant saisi est insuffisant. Le montant minimum requis est de ${requiredAmount} €.`);
      return;
    }

    if (!this.currentDemand.paymentMethod || !this.currentDemand.providerId) {
      alert("Erreur de paiement. Veuillez réessayer.");
      return;
    }

    // Simulation : Le paiement est réussi
    this.currentDemand.amountDue = paidAmount;
    this.changeView('paid', this.currentDemand.providerId);
  }
}
