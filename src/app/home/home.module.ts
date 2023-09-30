import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { ApiService} from '../services/api.service';
import { NavController } from '@ionic/angular';
import { Usuario} from '../models/usuario';


import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css']
})
export class HomePageModule {

  UsuariosData: any;

  constructor(public apiService:ApiService, private nav:NavController){
    this.UsuariosData=[];
  }

  ionViewWillEnter(){
    this.getAllUsuarios();
  }

  getAllUsuarios(){
    this.apiService.getList().subscribe(Response=>{this.UsuariosData=Response;});
  }

  deleteUsuario(item:Usuario){
    this.apiService.deleteItem(item.id).subscribe(Response=> this.getAllUsuarios());
  }
  editUsuario(item:Usuario){
    this.nav.navigateForward('editar', {state:{item}});
  }



}
