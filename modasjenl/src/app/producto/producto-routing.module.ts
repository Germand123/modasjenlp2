import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'productos', redirectTo: 'productos/index', pathMatch: 'full'},
  { path: 'productos/index', component: IndexComponent },
  { path: 'productos/create', component: CreateComponent },
  { path: 'productos/edit/:idPerson', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }