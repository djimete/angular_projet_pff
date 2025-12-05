import { Component } from '@angular/core';

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
  // Si vous utilisez Angular CLI avec des modules: 'standalone: false' est correct.
  standalone: false,
  templateUrl: './plomberie.component.html',
  styleUrls: ['./plomberie.component.css']
})
export class PlomberieComponent {

  plombiers: Plombier[] = [
    {
      id: '1',
      nom: 'Louis M.',
      initiales: 'L1',
      specialite: 'Expert en détection de fuites',
      experience: 12,
      note: 4.9,
      avisCount: 85,
      tarif: '10 000 XOF / heure',
      description: 'Louis est un plombier certifié avec plus de 12 ans d\'expérience. Spécialisé dans les urgences à Dakar et Rufisque.',
      zone: 'Zone non spécifiée (Dakar/Rufisque)',
      services: ['Fuite d\'eau urgente', 'Installation robinetterie', 'Débouchage canalisation'],
      disponible: true,
    },
    {
      id: '2',
      nom: 'Marion T.',
      initiales: 'M2',
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
      initiales: 'J3',
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

  plombierSelectionne: Plombier | null = null;
  reservationStatus: 'initial' | 'accepted' = 'initial';
  validationCode: string | null = null;

  selectedPaymentMethod: string = ''; // 'orange_money', 'wave', 'carte', ou ''
  paymentErrorMessage: string | null = null;

  onPaymentMethodChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedPaymentMethod = target.value;
    // Réinitialiser le message d'erreur lorsque la méthode change
    this.paymentErrorMessage = null;
    console.log('Méthode de paiement sélectionnée:', this.selectedPaymentMethod);
  }

  showPlumberDetails(id: string) {
    const plombier = this.plombiers.find(p => p.id === id);

    if (plombier) {
      this.plombierSelectionne = plombier;

      this.reservationStatus = 'initial';
      this.validationCode = null;
      this.selectedPaymentMethod = '';
      this.paymentErrorMessage = null; // Réinitialiser

      const listView = document.getElementById('list-view');
      const detailView = document.getElementById('detail-view');

      if (listView && detailView) {
        listView.classList.add('hidden');
        detailView.classList.remove('hidden');
      }
    } else {
      console.error(`Plombier avec l'ID ${id} non trouvé.`);
    }
  }

  showListView() {
    const listView = document.getElementById('list-view');
    const detailView = document.getElementById('detail-view');

    if (listView && detailView) {
      detailView.classList.add('hidden');
      listView.classList.remove('hidden');
    }
    this.plombierSelectionne = null;
    this.reservationStatus = 'initial';
    this.validationCode = null;
    this.selectedPaymentMethod = '';
    this.paymentErrorMessage = null; // Réinitialiser
  }

  openReservationModal() {
    if (this.reservationStatus === 'accepted') {
      console.log("Réservation déjà acceptée. Affichage direct de la vue détail.");
      return;
    }
    const modal = document.getElementById('reservation-modal');
    if (modal) modal.classList.remove('hidden');
  }

  submitReservation(event: Event) {
    event.preventDefault();

    if (!this.plombierSelectionne) {
      console.error("Aucun plombier sélectionné pour la réservation.");
      return;
    }

    const form = event.target as HTMLFormElement;
    const nom = (form.elements.namedItem('nom') as HTMLInputElement).value;
    const telephone = (form.elements.namedItem('telephone') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

    if (!nom || !telephone || !description) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    this.closeReservationModal();

    // Simuler le code de validation (Ex: 5714 comme sur votre image)
    this.validationCode = '5714'; // Code fixe pour la démonstration de succès/erreur
    this.reservationStatus = 'accepted';

    const listView = document.getElementById('list-view');
    const detailView = document.getElementById('detail-view');

    if (listView && detailView) {
      listView.classList.add('hidden');
      detailView.classList.remove('hidden');
    }
  }

  // Gère la soumission du paiement et la simulation de l'erreur de code
  submitPayment(event: Event) {
    event.preventDefault();
    this.paymentErrorMessage = null; // Réinitialiser l'erreur

    if (!this.validationCode) {
      this.paymentErrorMessage = "Erreur: Le code de validation n'a pas été généré ou est manquant. Veuillez rafraîchir.";
      return;
    }

    const form = event.target as HTMLFormElement;
    let codeInput: HTMLInputElement | null = null;
    let codeSaisi: string = '';

    // Déterminer l'ID de l'input du code en fonction de la méthode sélectionnée
    if (this.selectedPaymentMethod === 'orange_money') {
      codeInput = form.elements.namedItem('om-code') as HTMLInputElement;
    } else if (this.selectedPaymentMethod === 'wave') {
      codeInput = form.elements.namedItem('wave-code') as HTMLInputElement;
    } else if (this.selectedPaymentMethod === 'carte') {
      codeInput = form.elements.namedItem('card-3d-code') as HTMLInputElement;
    }

    if (codeInput) {
      codeSaisi = codeInput.value.trim();
    } else {
      this.paymentErrorMessage = "Erreur interne: Impossible de trouver le champ de code pour la méthode sélectionnée.";
      return;
    }

    // Logique de simulation de l'erreur (le code correct est '5714')
    if (codeSaisi !== this.validationCode) {
      this.paymentErrorMessage = "Erreur: Le code de validation/3D Secure entré est incorrect. Vérifiez le code à 4 chiffres affiché lors de l'acceptation.";
      return;
    }

    // Si le code est correct (simulation de succès)
    this.closePaymentModal();
    this.showMessageModal("Paiement Réussi!",
      `L'acompte a été réglé avec succès pour ${this.plombierSelectionne?.nom}. Il sera contacté immédiatement.`);

  }

  openPaymentModal() {
    // Réinitialiser la méthode de paiement et l'erreur lors de l'ouverture
    this.selectedPaymentMethod = '';
    this.paymentErrorMessage = null;
    const modal = document.getElementById('payment-modal');
    if (modal) modal.classList.remove('hidden');
  }

  showMessageModal(title: string, message: string) {
    const modal = document.getElementById('message-modal');
    const content = document.getElementById('message-content');

    if (modal && content) {
      content.innerHTML = `<h3 class="text-xl font-bold text-green-600 mb-2">${title}</h3><p>${message}</p>`;
      modal.classList.remove('hidden');
    }
  }

  closeMessageModal() {
    const modal = document.getElementById('message-modal');
    if (modal) modal.classList.add('hidden');
  }

  closeReservationModal() {
    const modal = document.getElementById('reservation-modal');
    if (modal) modal.classList.add('hidden');
  }

  closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) modal.classList.add('hidden');
  }
}
