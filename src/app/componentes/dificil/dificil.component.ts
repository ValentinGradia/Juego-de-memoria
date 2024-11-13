import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Carta } from 'src/app/interfaces/carta';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';
import { RegistroService } from 'src/app/services/registro.service';


@Component({
  standalone : true,
  imports : [FormsModule, RouterModule, CommonModule],
  selector: 'app-dificil',
  templateUrl: './dificil.component.html',
  styleUrls: ['./dificil.component.scss'],
})
export class DificilComponent  implements OnInit {

  valoresCartas : Array<object> = [
    {
      id : '',
      imagen : 'assets/uvas.png',
      valor : 'uva',
      idImagen : 'primerUva'
    },
    {
      id : '',
      imagen : 'assets/uvas.png',
      valor : 'uva',
      idImagen : 'segundaUva'
    },
    {
      id : '',
      imagen : 'assets/banana.png',
      valor : 'banana',
      idImagen : 'primerBanana'
    },
    {
      id : '',
      imagen : 'assets/banana.png',
      valor : 'banana',
      idImagen : 'segundaBanana'
    },
    {
      id : '',
      imagen : 'assets/manzana.png',
      valor : 'manzana',
      idImagen : 'primerManzana'
    },
    {
      id : '',
      imagen : 'assets/manzana.png',
      valor : 'manzana',
      idImagen : 'segundaManzana'
    },
    {
      id : '',
      imagen : 'assets/pera.png',
      valor : 'pera',
      idImagen : 'primerPera'
    },
    {
      id : '',
      imagen : 'assets/pera.png',
      valor : 'pera',
      idImagen : 'segundaPera'
    },
    {
      id : '',
      imagen : 'assets/kiwi.png',
      valor : 'kiwi',
      idImagen : 'primerKiwi'
    },
    {
      id : '',
      imagen : 'assets/kiwi.png',
      valor : 'kiwi',
      idImagen : 'segundoKiwi'
    },
    {
      id : '',
      imagen : 'assets/sandia.png',
      valor : 'sandia',
      idImagen : 'primerSandia'
    },
    {
      id : '',
      imagen : 'assets/sandia.png',
      valor : 'sandia',
      idImagen : 'segundaSandia'
    },
    {
      id : '',
      imagen : 'assets/naranja.png',
      valor : 'naranja',
      idImagen : 'primerNaranja'
    },
    {
      id : '',
      imagen : 'assets/naranja.png',
      valor : 'naranja',
      idImagen : 'segundaNaranja'
    },
    {
      id : '',
      imagen : 'assets/frutilla.png',
      valor : 'frutilla',
      idImagen : 'primerFrutilla'
    },
    {
      id : '',
      imagen : 'assets/frutilla.png',
      valor : 'frutilla',
      idImagen : 'segundaFrutilla'
    },
  ]

  cartasMezcladas : Array<object> = [];
  primeraCartaDadaVuelta : Carta | null = null;
  valoresEncontrados : Array<string> = [];
  seconds: number = 0;
  private intervalId: any;
  flag : boolean = true;
  correoUsuario : string | null = null;
  suscripcionUsuario : Subscription;

  constructor(private alertController: AlertController, private router: Router, private usuarioService: UsuarioService, 
    private toastController: ToastController, private registro : RegistroService) {
    this.suscripcionUsuario = this.usuarioService.correoUsuario.subscribe((correo) => {
      this.correoUsuario = correo;
    })

  }

  ngOnInit(): void {
    this.cartasMezcladas = this.mezclarArray(this.valoresCartas);
  }

  ngOnDestroy(): void {
      this.suscripcionUsuario.unsubscribe();
  }

  iniciarTimer() : void
  {
    if (!this.intervalId) { // Evita iniciar múltiples intervalos
      this.intervalId = setInterval(() => {
        this.seconds++;
      }, 1000); // Incrementa cada segundo
    }
  }


  mezclarArray(arr: object[]): object[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  cerrarModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none'; 
    }

    this.volverAEmpezar();
  }

  async voltear(event: MouseEvent): Promise<void> {

    if(this.flag)
    {
      this.iniciarTimer()
      this.flag = false;
    }
    const button = event.currentTarget as HTMLElement;
    var idBoton = button.id;
    var valorBoton = Number(idBoton);

    var img = document.createElement('img');
    const carta = this.cartasMezcladas[valorBoton] as Carta;
    img.src = `${carta.imagen}`
    img.id = carta.idImagen;
    img.style.maxHeight = "9vh";
    img.style.height = "100%";
    img.style.width = "auto";
    img.style.border = "1px solid black";
    
    this.borrarSignoDePreguntaTemporal(button);
    button.appendChild(img);

    if(this.primeraCartaDadaVuelta == null)
    {
      if(!(this.valoresEncontrados.includes(button.innerHTML)))
      {
        carta.id = idBoton;
        this.primeraCartaDadaVuelta = carta;
      }
    }
    else
    {
      await this.delay(1200);

      if(!(this.primeraCartaDadaVuelta!.valor == carta.valor))
      {
        const botonPrimerCarta = document.getElementById(this.primeraCartaDadaVuelta!.id);
        const imagenPrimeraCarta = document.getElementById(this.primeraCartaDadaVuelta!.idImagen);
        botonPrimerCarta!.removeChild(imagenPrimeraCarta!);
        this.setearSignoDePreguntaTemporal(botonPrimerCarta!);

        const imagenSegundaCarta = document.getElementById(carta.idImagen);
        button.removeChild(imagenSegundaCarta!);
        this.setearSignoDePreguntaTemporal(button!);
      }
      else
      {
        if(!(this.valoresEncontrados.includes(carta.valor)))
        {
          this.valoresEncontrados.push(carta.valor);
        }
      }

      this.primeraCartaDadaVuelta = null;

      this.verificarSiGano();
    }

  }

  borrarSignoDePreguntaTemporal(boton : HTMLElement) : void
  {
    boton.innerHTML = '';
  }

  setearSignoDePreguntaTemporal(boton : HTMLElement) : void
  {
    boton.innerHTML = '?';
  }

  setearTodosLosBotonesConPregunta() : void
  {
    for(let i = 0; i < 16; i++)
    {
      var boton = document.getElementById(`${i}`);
      boton!.innerHTML = '?';
    }
  }

  volverAEmpezar() :void
  {
    this.valoresEncontrados = [];
    this.primeraCartaDadaVuelta = null;
    this.setearTodosLosBotonesConPregunta();
    this.cartasMezcladas = this.mezclarArray(this.valoresCartas);
    this.seconds = 0;
  }

  async verificarSiGano() : Promise<void>
  {
    if(this.valoresEncontrados.length == 8)
    {

      clearInterval(this.intervalId);
      this.intervalId = null;
      this.flag = true;
      const modal = document.getElementById('modal');
      modal!.style.display = 'block';
    }
  }

  async guardarPartida() : Promise<void>
  {
    this.registro.guardarPartida(this.correoUsuario!,this.seconds,'Dificil');
    
    const toast = await this.toastController.create({
      message: 'La partido se guardo correctamente',
      duration: 1500, // Milisegundos,
      position : 'bottom'
    });

    toast.present()
  }

}
