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
  exibirTela = false;
  dados: any;
  formProduto!: FormGroup;

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buscarProduto();
  }

  buscarProduto(): void {
    let codigo = this.route.snapshot.params['id'];

    this.produtoService.get(codigo).subscribe(
      data => {
        this.dados = data;

        this.exibirTela = true;
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
}
