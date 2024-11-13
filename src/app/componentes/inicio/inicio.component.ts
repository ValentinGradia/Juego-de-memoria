import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';


@Component({
  standalone : true,
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  imports : [RouterLink, FormsModule, RouterModule]
})
export class InicioComponent  implements OnInit {

  correo !: string;
  contrasenia !: string;
  

  constructor(private userService : UsuarioService, private router : Router, private alertContoller : AlertController) { }

  ngOnInit() {}

  accederAplicacion(usuario : string)
  {
    switch(usuario)
    {
      case "admin":
        this.correo = "admin@admin.com";
        this.contrasenia = "111111";
        break;
      case "usuario":
        this.correo = "usuario@usuario.com";
        this.contrasenia = "333333";
        break;
      default:
        this.correo = "invitado@invitado.com";
        this.contrasenia = "222222";
    }
  }

  async verificarUsuario()
  {

    try
    {
      await this.userService.verificarUsuarioLogin(this.correo,this.contrasenia);
      this.userService.setearCorreo(this.correo);
      this.router.navigateByUrl('/home');
    }
    catch(error : any)
    {
      const alert = await this.alertContoller.create({
        header: 'Ups..',
        subHeader: error.message,
        buttons: ['Ok'],
      });

      await alert.present();
    }
    finally
    {
      this.correo = "";
      this.contrasenia = "";
    }
  }

}