// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 👈 [IMPORTANT] Pour [(ngModel)]
import { CommonModule } from '@angular/common'; // ⬅️ NÉCESSAIRE pour ngClass, *ngIf, *ngFor
import { NgClass } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// --- IMPORTS DE TOUS LES COMPOSANTS ---
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { PlomberieComponent } from './plomberie/plomberie.component';
import { NounouComponent } from './nounou/nounou.component';
import { ElectriciteComponent } from './electricite/electricite.component';
import { DomestiqueComponent } from './domestique/domestique.component';
import { BricolageComponent } from './bricolage/bricolage.component';
import { BeauteComponent } from './beaute/beaute.component';
import { ReparationtechComponent } from './reparationtech/reparationtech.component';
import { CoursDomicileComponent } from './coursdomicile/coursdomicile.component';
import { DetaileletrictComponent } from './detaileletrict/detaileletrict.component';
import { DetaildomestiqueComponent } from './detaildomestique/detaildomestique.component';
import {AuthService} from './services/auth.service';
import { ReservationClientComponent } from './reservation-client/reservation-client.component';
import { PaiementComponent } from './paiement/paiement.component';
import { HistoriqueComponent } from './historique/historique.component';
// ----------------------------------------


@NgModule({
  // ⭐️ [CORRECTION] LoginComponent a été retiré, car il est standalone.
  declarations: [
    AppComponent,
    HomeComponent,
    // LoginComponent, <--- RETIRÉ CAR IL EST DÉFINI COMME STANDALONE DANS SON FICHIER .TS
    InscriptionComponent,
    ResetPasswordComponent,
    ConfirmPasswordComponent,
    PlomberieComponent,
    NounouComponent,
    DomestiqueComponent,
    BricolageComponent,
    BeauteComponent,
    DetaileletrictComponent,
    DetaildomestiqueComponent,
    CoursDomicileComponent,
    ElectriciteComponent,
    ReservationClientComponent,
    PaiementComponent,
    HistoriqueComponent,
  ],
  // [IMPORTANT] Les composants standalone doivent être importés s'ils sont utilisés
  // dans le template d'un composant de ce module ou dans le routing.
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgClass,

    // Ajoutez LoginComponent ici si vous l'utilisez directement dans le template de AppComponent
    // ou si vous l'utilisez dans le routing (si ce n'est pas déjà géré par AppRoutingModule)
    LoginComponent,
    ReparationtechComponent, // J'assume qu'il est aussi standalone et utilisé ici
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
