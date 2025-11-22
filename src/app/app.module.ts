import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ← Ajoutez ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { CoursdomicileComponent } from './coursdomicile/coursdomicile.component';
import { DetaileletrictComponent } from './detaileletrict/detaileletrict.component';
import { DetaildomestiqueComponent } from './detaildomestique/detaildomestique.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InscriptionComponent,
    ResetPasswordComponent,
    ConfirmPasswordComponent,
    PlomberieComponent,
    NounouComponent,
    ElectriciteComponent,
    DomestiqueComponent,
    BricolageComponent,
    BeauteComponent,
    ReparationtechComponent,
    CoursdomicileComponent,
    DetaileletrictComponent,
    DetaildomestiqueComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule // ← Ajoutez cette ligne
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
