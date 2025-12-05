import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- Imports de TOUS les Composants ---
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
import { CoursDomicileComponent } from './coursdomicile/coursdomicile.component'; // Casse corrigée
import { DetaileletrictComponent } from './detaileletrict/detaileletrict.component';
import { DetaildomestiqueComponent } from './detaildomestique/detaildomestique.component';
// ----------------------------------------


const routes: Routes = [
  // Routes de Base
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirm-password', component: ConfirmPasswordComponent },

  // Routes des Catégories de Services
  { path: 'plomberie', component: PlomberieComponent },
  { path: 'nounou', component: NounouComponent },
  { path: 'electricite', component: ElectriciteComponent },
  { path: 'domestique', component: DomestiqueComponent },
  { path: 'bricolage', component: BricolageComponent },
  { path: 'beaute', component: BeauteComponent },
  { path: 'reparation-tech', component: ReparationtechComponent },
  { path: 'cours-domicile', component: CoursDomicileComponent },

  // Routes des Détails de Services (avec paramètres dynamiques ':id')
  { path: 'detail-electrique/:id', component: DetaileletrictComponent },
  { path: 'detail-domestique/:id', component: DetaildomestiqueComponent },

  // Route Wildcard (redirige vers la page d'accueil si l'URL ne correspond à aucune route ci-dessus)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // Exporte le module de routage pour qu'il soit disponible dans AppModule et dans les templates (routerLink)
  exports: [RouterModule]
})
export class AppRoutingModule { }
