import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-visualizar-produto',
  templateUrl: './visualizar-produto.component.html',
  styleUrls: ['./visualizar-produto.component.css']
})
export class VisualizarProdutoComponent implements OnInit {
  codigo = this.route.snapshot.params['id'];
  exibirTela = false;
  exibirCampoNome = true;
  exibirCampoPreco = true;
  dados: any;
  formProduto!: FormGroup;

  get nome(): any { return this.formProduto.get('nome'); }
  get preco(): any { return this.formProduto.get('preco'); }

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buscarProduto();
  }

  buscarProduto() {
    this.produtoService.get(this.codigo).subscribe(
      data => {
        this.dados = data;

        this.exibirTela = true;

        this.createForm(new Produto());
      },
      response => {
        console.log(response)

        if (response.hasOwnProperty('error')) {
          if (response.error.hasOwnProperty('text')) {
            Swal.fire({
              text: response.error.text,
              icon: 'error',
              confirmButtonText: 'Voltar',
              allowOutsideClick: false
            }).then((resultado) => {
              if (resultado.isConfirmed) {
                window.location.href = '/produtos';
              }
            });
          }
        }
      }
    );
  }

  createForm(produto: Produto) {
    this.formProduto = new FormGroup({
      nome: new FormControl(produto.nome),
      preco: new FormControl(produto.preco)
    });

    this.formProduto.get('nome')?.disable();
    this.formProduto.get('preco')?.disable();

    this.formProduto.get('nome')?.setValue(this.dados.nome);
    this.formProduto.get('preco')?.setValue(this.dados.preco);
  }

  alterarCampo(campo = 'nome') {
    if (campo === 'nome') {
      this.formProduto.get('nome')?.enable();

      this.exibirCampoNome = false;
    } else {
      this.formProduto.get('preco')?.enable();

      this.exibirCampoPreco = false;
    }
  }

  cancelarAlterarCampo(campo = 'nome') {
    if (campo === 'nome') {
      this.formProduto.get('nome')?.disable();
      this.formProduto.get('nome')?.setValue(this.dados.nome);

      this.exibirCampoNome = true;
    } else {
      this.formProduto.get('preco')?.disable();
      this.formProduto.get('preco')?.setValue(this.dados.preco);

      this.exibirCampoPreco = true;
    }
  }

  confirmarAlterarCampo(campo = 'nome') {
    var campos;

    if (campo === 'nome') {
      campos = {
        nome: this.nome.value,
        preco: this.dados.preco
      }
    } else {
      campos = {
        nome: this.dados.nome,
        preco: this.preco.value
      }
    }

    this.produtoService.update(this.codigo, campos).subscribe(
      data => {
        console.log(data)
      },
      response => {
        console.log(response)

        if (response.status === 200) {
          Swal.fire({
            text: 'Produto alterado com sucesso!',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          if (campo === 'nome') {
            this.dados.nome = this.nome.value;

            this.formProduto.get('nome')?.disable();
            this.formProduto.get('nome')?.setValue(this.dados.nome);

            this.exibirCampoNome = true;
          } else {
            this.dados.preco = this.preco.value;

            this.formProduto.get('preco')?.disable();
            this.formProduto.get('preco')?.setValue(this.dados.preco);

            this.exibirCampoPreco = true;
          }

          return true;
        }

        Swal.fire({
          text: 'Falha ao alterar produto!',
          icon: 'error',
          confirmButtonText: 'Voltar'
        });

        return false;
      }
    );
  }
}
