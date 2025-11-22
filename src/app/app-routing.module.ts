import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ConfirmPasswordComponent} from './confirm-password/confirm-password.component';
import {PlomberieComponent} from './plomberie/plomberie.component';
import {NounouComponent} from './nounou/nounou.component';
import {ElectriciteComponent} from './electricite/electricite.component';
import {DomestiqueComponent} from './domestique/domestique.component';
import {BricolageComponent} from './bricolage/bricolage.component';
import {BeauteComponent} from './beaute/beaute.component';
import {CoursdomicileComponent} from './coursdomicile/coursdomicile.component';
import {ReparationtechComponent} from './reparationtech/reparationtech.component';
import {DetaileletrictComponent} from './detaileletrict/detaileletrict.component';
import {DetaildomestiqueComponent} from './detaildomestique/detaildomestique.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'home', redirectTo: 'inscription' }, // Redirection pour les routes inconnues

  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirm-password', component: ConfirmPasswordComponent },
  {path :'plomberie',component:PlomberieComponent},
  {path:'nounou',component:NounouComponent},
  {path:'eletricite', component:ElectriciteComponent},
  {path:'domestique',component:DomestiqueComponent},
  {path:'bricolage',component:BricolageComponent},
  {path:'beaute',component:BeauteComponent},
  {path:'reparateurtech',component:ReparationtechComponent},
  {path:'coursdomicile',component:CoursdomicileComponent},
  {path:'detaileletrict', component:DetaileletrictComponent},
  {path:'detaildomestique',component: DetaildomestiqueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
