import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProdutosComponent } from './components/listar-produtos/listar-produtos.component';
import { VisualizarProdutoComponent } from './components/visualizar-produto/visualizar-produto.component';
import { CadastrarProdutoComponent } from './components/cadastrar-produto/cadastrar-produto.component';
import { AlterarProdutoComponent } from './components/alterar-produto/alterar-produto.component';

const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', component: ListarProdutosComponent, title: 'Listar Produtos' },
  { path: 'produto/cadastrar', component: CadastrarProdutoComponent, title: 'Cadastrar Produto' },
  { path: 'produto/alterar/:id', component: AlterarProdutoComponent, title: 'Alterar Produto' },
  { path: 'produto/:id', component: VisualizarProdutoComponent, title: 'Visualizar Produto' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
