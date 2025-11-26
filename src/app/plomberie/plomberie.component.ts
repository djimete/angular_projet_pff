import { Component } from '@angular/core';

@Component({
  selector: 'app-plomberie',
  standalone: false,
  templateUrl: './plomberie.component.html',
  styleUrls: ['./plomberie.component.css']
})
export class PlomberieComponent {

  // Afficher la vue détail
  showPlumberDetails(id: string) {
    const listView = document.getElementById('list-view');
    const detailView = document.getElementById('detail-view');

    if (listView && detailView) {
      listView.classList.add('hidden');
      detailView.classList.remove('hidden');
    }
  }

  // Retour à la liste
  showListView() {
    const listView = document.getElementById('list-view');
    const detailView = document.getElementById('detail-view');

    if (listView && detailView) {
      detailView.classList.add('hidden');
      listView.classList.remove('hidden');
    }
  }

  // Fermer la modale de message
  closeMessageModal() {
    const modal = document.getElementById('message-modal');
    if (modal) modal.classList.add('hidden');
  }

  // Fermer modale réservation
  closeReservationModal() {
    const modal = document.getElementById('reservation-modal');
    if (modal) modal.classList.add('hidden');
  }

  // Fermer modale paiement
  closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) modal.classList.add('hidden');
  }
}
