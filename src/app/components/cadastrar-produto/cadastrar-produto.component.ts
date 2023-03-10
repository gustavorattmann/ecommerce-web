import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {
  formProduto!: FormGroup;

  constructor(private produtoService: ProdutoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm(new Produto());
  }

  createForm(produto: Produto) {
    this.formProduto = new FormGroup({
      nome: new FormControl(produto.nome),
      preco: new FormControl(produto.preco)
    });
  }

  get nome(): any { return this.formProduto.get('nome'); }
  get preco(): any { return this.formProduto.get('preco'); }

  limparNome() {
    this.nome.reset();
  }

  limparPreco() {
    this.preco.reset();
  }

  limparCampos() {
    this.formProduto.reset(new Produto());
  }

  onSubmit() {
    this.produtoService.create(this.formProduto.value).subscribe(
      val => {},
      response => {
        if (response.status === 200) {
          Swal.fire({
            text: 'Produto cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: false
          }).then((resultado) => {
            if (resultado.isConfirmed) {
              Swal.fire({
                text: 'Deseja continuar cadastrando?',
                icon: 'question',
                confirmButtonText: 'Sim',
                showConfirmButton: true,
                cancelButtonText: 'Não',
                showCancelButton: true,
                allowOutsideClick: false
              }).then((resultado) => {
                if (!resultado.isConfirmed) {
                  window.location.href = '/produtos';
                } else {
                  this.limparCampos();
                }
              });
            }
          });

          return true;
        }

        var texto = 'Falha no cadastro do produto!'

        if (response.hasOwnProperty('error')) {
            if (response.error.hasOwnProperty('nome')) {
              texto = response.error.nome;
            } else if (response.error.hasOwnProperty('preco')) {
              texto = response.error.preco;
            }
        }

        Swal.fire({
          text: texto,
          icon: 'error',
          confirmButtonText: 'Voltar'
        });

        return false;
      },
      () => {}
    );
  }
}
