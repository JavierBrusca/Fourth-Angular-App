import { Component } from '@angular/core';

import { ApiService} from '../services/api.service';
import { NavController } from '@ionic/angular';
import { Usuario} from '../models/usuario';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage{

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
