import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { ApiService} from '../services/api.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit {

  UsuarioData: any;


  constructor(public activatedRoute: ActivatedRoute, public router: Router, public apiService: ApiService) { }

  ngOnInit() {
    this.UsuarioData=new Usuario();
  }

  update(){
    this.apiService.createItem(this.UsuarioData).subscribe((Response)=>{this.router.navigate(['home'])});
  }

}
