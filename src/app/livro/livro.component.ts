import { Component, OnInit } from '@angular/core';
import { Livro } from '../models/livro';
import { LivroService } from '../services/livro.service';
import { NgForm } from '@angular/forms';
import { UsuarioAutenticadoDto } from '../models/usuario-autenticado';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit{
  livro = {} as Livro;
  livros: Livro[]=[];

  usuario: UsuarioAutenticadoDto | null = null
  constructor(private livroService: LivroService ,public autenticacaoService: AutenticacaoService) {}

  ngOnInit() {
    this.getLivros();
    this.usuario = this.autenticacaoService.retornarStorage();
  }

  // define se um livro será criado ou atualizado
  saveLivro(form: NgForm) {
    if (this.livro.id !== undefined) {
      this.livroService.editar(this.livro).subscribe({
        next: (v) => {
          this.cleanForm(form);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
    });

    } else {
      this.livroService.cadastrar(this.livro).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os livros
  getLivros() {
    this.livroService.listar().subscribe((livros: Livro[]) => {
      this.livros = livros;
    });
  }

  // deleta um livro
  deleteLivro(livro: Livro) {
    this.livroService.excluir(livro).subscribe(() => {
      this.getLivros();
    });
  }

  // copia o livro para ser editado.
  editLivro(livro: Livro) {
    this.livro = { ...livro };
    console.log(this.livro);
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getLivros();
    form.resetForm();
    this.livro = {} as Livro;
  }

}
