
export interface InscriptionRequest{
  email: string ,
  motDePasse: string,
  nom: string,
  prenom:string,
  telephone: string,
  adresse: string,
  metier:string,
  genre:string,
  dateNaissance:string
}

export interface LoginRequest{
  motDePasse: string,
  email: string
}

export interface User{
  prenom:string,
  nom:string,
  tarif?:number;
  email?:string,
  telephone?:string
}

export interface LoginResponse{
  token: string,
  user: User
}


