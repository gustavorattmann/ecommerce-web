import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  exibirTela = false;

  produto: Produto = {
    codigo: '',
    nome: '',
    preco: 0
  };

  displayedColumns: string[] = ['codigo', 'nome', 'preco', 'action'];

  dataSource : any[] = [];

  constructor (private produtoService: ProdutoService) {

  }

  ngOnInit(): void {
    this.produtoService.getAll().subscribe(
      data => {
        this.dataSource = data;

        this.exibirTela = true;
      },
      response => {
        console.log(response)

        if (response.hasOwnProperty('error')) {
          if (response.error.hasOwnProperty('text')) {
            Swal.fire({
              text: response.error.text,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        }
      }
    );
  }
}
