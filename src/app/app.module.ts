import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 👈 [IMPORTANT] Pour [(ngModel)]

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// --- IMPORTS DE TOUS LES COMPOSANTS ---
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { PlomberieComponent } from './plomberie/plomberie.component'; // 👈 Le composant à déclarer
import { NounouComponent } from './nounou/nounou.component';
import { ElectriciteComponent } from './electricite/electricite.component';
import { DomestiqueComponent } from './domestique/domestique.component';
import { BricolageComponent } from './bricolage/bricolage.component';
import { BeauteComponent } from './beaute/beaute.component';
import { ReparationtechComponent } from './reparationtech/reparationtech.component';
import { CoursDomicileComponent } from './coursdomicile/coursdomicile.component';// ⭐️ Casse corrigée
// Assurez-vous que le chemin ('./composant-chemin/...') est correct par rapport à app.module.ts
import { DetaileletrictComponent } from './detaileletrict/detaileletrict.component';
import { DetaildomestiqueComponent } from './detaildomestique/detaildomestique.component';
// ----------------------------------------


@NgModule({
  // ⭐️ [CORRECTION] TOUS les composants doivent être listés ici
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InscriptionComponent,
    ResetPasswordComponent,
    ConfirmPasswordComponent,
    PlomberieComponent, // 👈 CORRECTION DE L'ERREUR "not declared"
    NounouComponent,
    ElectriciteComponent,
    DomestiqueComponent,
    BricolageComponent,
    BeauteComponent,
    ReparationtechComponent,
    DetaileletrictComponent,
    DetaildomestiqueComponent,
    CoursDomicileComponent,

  ],
  // ⭐️ [IMPORTANT] Assurez-vous que FormsModule et AppRoutingModule sont importés
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Nécessaire pour [(ngModel)] dans PlomberieComponent
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
