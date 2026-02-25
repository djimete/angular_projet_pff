import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-client',
  templateUrl: './reservation-client.component.html',
  standalone: false
})
export class ReservationClientComponent {
  res = { nbHeure: 1, jour: '', heure: '' };

  constructor(private router: Router) {}

  goToPayment() {
    this.router.navigate(['/paiement'], { queryParams: this.res });
  }
}
