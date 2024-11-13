import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  standalone : true,
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class SplashComponent  implements OnInit {

  constructor(private router : Router) {
    setTimeout( () =>{
      this.router.navigateByUrl('/inicio');
    },3000);
   }

  ngOnInit() {}

}
