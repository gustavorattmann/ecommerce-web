import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements AfterViewInit {
  exibirTela = false;
  isLoading = true;

  displayedColumns: string[] = ['codigo', 'nome', 'preco', 'acoes'];
  dataSource = new MatTableDataSource<Produto>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.carregarTabelaProdutos();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor (private produtoService: ProdutoService, private _liveAnnouncer: LiveAnnouncer) { }

  alterarOrdem(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  carregarTabelaProdutos() {
    this.produtoService.getAll().subscribe(
      data => {
        this.dataSource.data = data;

        this.exibirTela = true;

        this.isLoading = false;
      },
      response => {
        if (response.hasOwnProperty('error')) {
          if (response.error.hasOwnProperty('text')) {
            this.isLoading = false;

            Swal.fire({
              text: response.error.text,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }
      }
    );
  }

  deletarProduto(codigo: string) {
    Swal.fire({
      text: 'Desejar deletar esse produto?',
      icon: 'question',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      showConfirmButton: true
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.produtoService.delete(codigo).subscribe(
          data => {
          },
          response => {
            console.log(response)

            if (response.status === 200) {
              Swal.fire({
                text: 'Produto deletado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
              });

              this.carregarTabelaProdutos();

              return true;
            }

            Swal.fire({
              text: 'Produto não encontrado!',
              icon: 'error',
              confirmButtonText: 'Voltar'
            });

            return false;
          }
        );
      }
    });
  }
}
