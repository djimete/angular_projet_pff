import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  standalone: false
})
export class HistoriqueComponent implements OnInit {
  reservations: any[] = [];

  ngOnInit() {
    // Récupération des données sauvegardées lors du paiement
    const data = localStorage.getItem('historique_reservations');
    if (data) {
      // On trie pour avoir la plus récente en premier
      this.reservations = JSON.parse(data).reverse();
    }
  }

  generatePDF(res: any) {
    const doc = new jsPDF();

    // Design du PDF
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // Indigo-600
    doc.text('WORKING EXPRESS', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Reçu de paiement : ${res.id}`, 14, 40);
    doc.text(`Date de transaction : ${new Date(res.date).toLocaleDateString()}`, 14, 48);
    doc.text(`Mode de paiement : ${res.methode.toUpperCase()}`, 14, 56);

    // Tableau des détails
    autoTable(doc, {
      startY: 65,
      head: [['Description', 'Date Intervention', 'Détails', 'Total']],
      body: [[
        'Service à domicile',
        res.details.jour,
        res.details.nbHeure + ' heure(s) à ' + res.details.heure,
        res.montant + ' XOF'
      ]],
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] }
    });

    doc.text('Merci de votre confiance !', 105, doc.internal.pageSize.height - 20, { align: 'center' });

    // Téléchargement
    doc.save(`Facture_WorkingExpress_${res.id}.pdf`);
  }
}
