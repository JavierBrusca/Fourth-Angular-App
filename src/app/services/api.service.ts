import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  basePath='http:://localhost:3000/';

  constructor(private http:HttpClient) { }

  httpOptions={
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log("Ha ocurrido un error: ", error.error.message);
    }
    else{
      console.log("Codigo de error $ {error.status} . " + "Body: $error.error");
      
    }
    return throwError("Ha sucedido un problema, intentelo de nuevo mas tarde");
  }

  createItem(item:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.basePath+'usuario/',JSON.stringify(item),this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  getItem(item:Usuario):Observable<Usuario>{
    return this.http.get<Usuario>(this.basePath+'usuario/'+item.id).pipe(retry(2),catchError(this.handleError));
  }

  getList(item:Usuario): Observable<Usuario>{
    return this.http.get<Usuario>(this.basePath+'usuario/').pipe(retry(2),catchError(this.handleError));
  }

  updateItem(item:Usuario):Observable<Usuario>{
    console.log("UPDATE: "+JSON.stringify(item))
    return this.http.put<Usuario>(this.basePath+'usuario/'+item.id,JSON.stringify(item),this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  deleteItem(item:Usuario):Observable<Usuario>{
    return this.http.delete<Usuario>(this.basePath+'usuario/'+identifierName,this.httpOptions).pipe(retry(2),catchError(this.handleError));

  }

}
