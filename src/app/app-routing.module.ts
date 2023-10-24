import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './componentes/producto/producto.component';
import { ConsumidorComponent } from './componentes/consumidor/consumidor.component';
import { OrdenComponent } from './componentes/orden/orden.component';

const routes: Routes = [
  { path: 'productos', component: ProductoComponent },
  { path: 'consumidores', component: ConsumidorComponent },
  { path: 'ordenes', component: OrdenComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
