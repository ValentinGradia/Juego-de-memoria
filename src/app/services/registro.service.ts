import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private angularFirestore: AngularFirestore) { }
  
  async guardarPartida(correo : string, tiempo: number, nivel : string) : Promise<void>
  {
    try
    {
      await this.angularFirestore.collection('Registros').add({
        Jugador : correo,
        Tiempo : tiempo,
        Fecha : new Date(),
        Nivel : nivel
      });
    }catch(error){throw error;}
  }

  traerRegistros() : Observable<any>
  {
    const registros = this.angularFirestore.collection('Registros').get();
    return registros;
  }
  
}
