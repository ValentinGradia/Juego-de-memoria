import { Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { HomeComponent } from './componentes/home/home.component';
import { FacilComponent } from './componentes/facil/facil.component';
import { IntermedioComponent } from './componentes/intermedio/intermedio.component';
import { DificilComponent } from './componentes/dificil/dificil.component';
import { RegistrosComponent } from './componentes/registros/registros.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  // },
  {
    path : '',
    redirectTo : '/splash',
    pathMatch : 'full'
  },
  {
    path : 'splash',
    component : SplashComponent
  },
  {
    path : 'inicio',
    component : InicioComponent
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'facil',
    component : FacilComponent
  },
  {
    path:  'intermedio',
    component : IntermedioComponent
  },
  {
    path : 'dificil',
    component : DificilComponent
  },
  {
    path : 'registros',
    component : RegistrosComponent
  }
];
