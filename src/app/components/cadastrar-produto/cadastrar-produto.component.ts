import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {
  title = 'Teste';

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
    // aqui você pode implementar a logica para fazer seu formulário salvar
    this.produtoService.create(this.formProduto.value).subscribe(
      val => {},
      response => {
        if (response.status === 200) {
          console.log(response.error.text);
        } else {
          console.log('Falha no cadastro!');
        }
      },
      () => {}
    );
  }
}
