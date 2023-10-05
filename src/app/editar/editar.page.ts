import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { ApiService} from '../services/api.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  id:number=0;
  UsuarioData:any;
  Data: any;
  
  constructor(public activatedRoute: ActivatedRoute, public router: Router, public apiService: ApiService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(paramas=>{
      this.activatedRoute.queryParamMap.subscribe(p=>{
        this.Data= this.router.getCurrentNavigation()?.extras?.state as Usuario;
        this.UsuarioData= this.Data.item;
      })
    });
  }

  update(){
    this.apiService.updateItem(this.UsuarioData).subscribe(response=>{
      this.router.navigate(['home']);
    });
  }

}
