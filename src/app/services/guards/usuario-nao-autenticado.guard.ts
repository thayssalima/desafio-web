import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from '../autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export  class UsuarioNaoAutenticadoGuard implements CanActivate {

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router) { }
  canActivate(){
    if (this.autenticacaoService.logado) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
};
