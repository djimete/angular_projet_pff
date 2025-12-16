// src/app/auth.service.ts

import { Injectable } from '@angular/core';

// Définition de l'interface pour la structure d'un utilisateur
interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Clé utilisée pour stocker les utilisateurs dans le localStorage
  private STORAGE_KEY = 'registeredUsers';

  constructor() {
    // Initialisation :
    // Si aucune donnée n'existe encore pour cette clé, on crée un tableau vide
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  // Méthode interne pour récupérer tous les utilisateurs enregistrés
  private getUsers(): User[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Méthode interne pour sauvegarder la liste complète des utilisateurs
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  /**
   * Vérifie si un email est déjà enregistré dans le système.
   * @param email L'adresse email à vérifier.
   * @returns true si l'email existe, false sinon.
   */
  isEmailRegistered(email: string): boolean {
    return this.getUsers().some(user => user.email === email);
  }

  /**
   * Simule l'inscription d'un nouvel utilisateur.
   * @param email L'adresse email de l'utilisateur.
   * @param password Le mot de passe de l'utilisateur.
   * @returns true si l'inscription est réussie, false si l'utilisateur existe déjà.
   */
  register(email: string, password: string): boolean {
    if (this.isEmailRegistered(email)) {
      return false; // Échec : Utilisateur déjà existant
    }
    const users = this.getUsers();
    users.push({ email, password }); // Ajout du nouvel utilisateur
    this.saveUsers(users);
    return true; // Succès
  }

  /**
   * Simule la connexion d'un utilisateur.
   * @param email L'adresse email pour la connexion.
   * @param password Le mot de passe saisi.
   * @returns true si l'utilisateur est trouvé et le mot de passe correspond, false sinon.
   */
  login(email: string, password: string): boolean {
    // Recherche l'utilisateur par email
    const user = this.getUsers().find(u => u.email === email);

    // Vérifie l'existence de l'utilisateur ET la correspondance du mot de passe
    return user !== undefined && user.password === password;
  }
}
