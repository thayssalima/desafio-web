import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { UsuarioAutenticadoDto } from "../models/usuario-autenticado";

@Injectable({
    providedIn: 'root'
  })

export class AutenticacaoService  {
    url = 'http://localhost:8080/desafio-api/usuarios';

    constructor(private httpClient: HttpClient) { }

    autenticar(body: any): Observable<UsuarioAutenticadoDto> {
        return this.httpClient.post<UsuarioAutenticadoDto>(this.url + '/autenticar', body);
      }

      salvarStorage(usuario: UsuarioAutenticadoDto) {
        localStorage.setItem('desafio', JSON.stringify(usuario));
      }

      retornarStorage(): UsuarioAutenticadoDto {
        return <UsuarioAutenticadoDto>JSON.parse(<string>localStorage.getItem('desafio'));
      }
}
