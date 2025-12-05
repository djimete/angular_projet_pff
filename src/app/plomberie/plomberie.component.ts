// Le contenu de ce fichier reste inchangé par rapport à la réponse précédente.
// Il contient déjà la définition des interfaces, des données, et des méthodes
// pour naviguer entre les vues et gérer les modales (openPaymentModal, etc.).
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

  showPlumberDetails(id: string) {
    const plombier = this.plombiers.find(p => p.id === id);

    if (plombier) {
      this.plombierSelectionne = plombier;

      this.reservationStatus = 'initial';
      this.validationCode = null;

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
  }

  openReservationModal() {
    if (this.reservationStatus === 'accepted') {
      console.log("Réservation déjà acceptée. Affichage direct de la vue détail.");
      return;
    }
    console.log('Ouverture de la modale de réservation pour:', this.plombierSelectionne?.nom);
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

    this.validationCode = Math.floor(1000 + Math.random() * 9000).toString();
    this.reservationStatus = 'accepted';

    console.log(`Réservation Acceptée. Code: ${this.validationCode}`);

    const listView = document.getElementById('list-view');
    const detailView = document.getElementById('detail-view');

    if (listView && detailView) {
      listView.classList.add('hidden');
      detailView.classList.remove('hidden');
    }
  }

  openPaymentModal() {
    console.log('Ouverture de la modale de paiement...');
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
