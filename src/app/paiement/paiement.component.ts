import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  standalone: false
})
export class PaiementComponent implements OnInit {
  reservation: any = {};
  montantTotal = 0;
  selectedMethod = '';
  paymentSuccess = false;

  // Correction de l'erreur NG9 : On déclare la propriété attendue par [(ngModel)]
  phoneNumber: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.reservation = params;
      // Calcul du montant (Exemple: 5000 XOF/heure)
      this.montantTotal = Number(params['nbHeure'] || 1) * 5000;
    });
  }

  confirmPayment() {
    if (!this.selectedMethod) {
      alert("Sélectionnez un mode de paiement.");
      return;
    }

    const code = prompt(`Confirmer ${this.montantTotal} XOF via ${this.selectedMethod.toUpperCase()}.\nEntrez votre code secret :`);

    if (code) {
      const nouvelleRes = {
        id: 'FAC-' + Math.floor(Math.random() * 100000),
        date: new Date(),
        montant: this.montantTotal,
        methode: this.selectedMethod,
        telephone: this.phoneNumber, // Sauvegarde du numéro utilisé
        details: this.reservation
      };

      const historique = JSON.parse(localStorage.getItem('historique_reservations') || '[]');
      historique.push(nouvelleRes);
      localStorage.setItem('historique_reservations', JSON.stringify(historique));

      this.paymentSuccess = true;
      setTimeout(() => this.router.navigate(['/historique']), 2000);
    }
  }
}
