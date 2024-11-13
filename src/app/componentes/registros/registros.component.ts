import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Registro } from 'src/app/interfaces/registro';
import { RegistroService } from 'src/app/services/registro.service';
import firebase from 'firebase/compat/app';

@Component({
  standalone : true,
  imports : [FormsModule, CommonModule, RouterModule],
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss'],
})
export class RegistrosComponent  implements OnInit, OnDestroy {


  registros: Registro[] = [];
  faciles : Registro[] = [];
  intermedios : Registro[] = [];
  dificiles : Registro[] = [];
  facil : boolean = false;
  intermedio : boolean = false;
  dificil : boolean = false;

  private registrosSubscription !: Subscription;

  constructor(private registroService: RegistroService, private router: Router) { }

  ngOnInit() {
    this.cargarRegistros();
  }

  ngOnDestroy(): void {
      
  }

  async cargarRegistros()
  {
    this.registrosSubscription = await this.registroService.traerRegistros().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc : any) => {
        const data = doc.data() as Registro; 

        if (data.Fecha instanceof firebase.firestore.Timestamp) {
          data.FechaFormateada = data.Fecha.toDate().toISOString().split('T')[0]; 
        }

        this.registros.push(data);
        
      });
    });
  }


  filtarListas()
  {

    this.faciles = this.registros.filter(registro => registro.Nivel == 'Facil');
    this.faciles.sort((a,b) => a.Tiempo - b.Tiempo);
    this.faciles = this.faciles.slice(0,5);

    this.intermedios = this.registros.filter(registro => registro.Nivel == 'Intermedio');
    this.intermedios.sort((a,b) => a.Tiempo - b.Tiempo);
    this.intermedios = this.intermedios.slice(0,5);

    this.dificiles = this.registros.filter(registro => registro.Nivel == 'Dificil');
    this.dificiles.sort((a,b) => a.Tiempo - b.Tiempo);
    this.dificiles = this.dificiles.slice(0,5);
  }

  mostrarFaciles()
  {
    this.filtarListas();
    this.facil = true;
    this.intermedio = false;
    this.dificil = false;
  }

  mostrarIntermedios()
  {
    this.filtarListas();
    this.facil = false;
    this.intermedio = true;
    this.dificil = false;
  }

  mostrarDificiles()
  {
    this.filtarListas();
    this.facil = false;
    this.intermedio = false;
    this.dificil = true;
  }


  volver()
  {
    this.facil = false;
    this.intermedio = false;
    this.dificil = false;
    this.registrosSubscription.unsubscribe();
    
    this.router.navigateByUrl('/home');
  }

}
