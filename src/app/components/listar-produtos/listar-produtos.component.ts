import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  produto: Produto = {
    codigo: '',
    nome: '',
    preco: 0
  };

  displayedColumns: string[] = ['codigo', 'nome', 'preco'];

  dataSource : any[] = [];

  constructor (private produtoService: ProdutoService) {

  }

  ngOnInit(): void {
    this.produtoService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }
}
