export interface User {
  uid: any;
  nick: string;
  subnick?: string;// Usando el símbolo "?" se peude dejar opcional el campo
  age?: number;// Usando el símbolo "?" se peude dejar opcional el campo
  status?: string;
  email: string;
  friend: boolean;
}
