import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  standalone : true,
  imports : [RouterModule, FormsModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(private user : UsuarioService, private router : Router) { }

  ngOnInit() {}

  seleccionarDificultad(dificultad: string) : void
  {

  }
  
  cerrarSesion() : void
  {
    this.user.limpiarCorreo();
    this.router.navigateByUrl('/inicio');
  }

}
