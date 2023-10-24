import { Component, OnInit } from '@angular/core';
import { OrdenService } from 'src/app/servicios/orden.service';
import { ConsumidorService } from 'src/app/servicios/consumidor.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  ordenes: any;
  consumidores: any;
  productos: any;
  ordenForm: FormGroup;
  mostrarFormulario = false;

  constructor(
    private ordenService: OrdenService,
    private consumidorService: ConsumidorService,
    private productoService: ProductoService,
    private fb: FormBuilder
  ) {
    this.ordenForm = this.fb.group({
      ConsumidorID: ['', Validators.required],
      ProductoID: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.getOrdenesList();
    this.getConsumidoresList();
    this.getProductosList();
  }

  getOrdenesList(): void {
    this.ordenService.getOrdenesList().subscribe(data => {
      this.ordenes = data;
    });
  }

  getConsumidoresList(): void {
    this.consumidorService.getConsumidoresList().subscribe(data => {
      this.consumidores = data;
    });
  }

  getProductosList(): void {
    this.productoService.getProductosList().subscribe(data => {
      this.productos = data;
    });
  }

  agregarOrden(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  crearOrden(): void {
    if (this.ordenForm.valid) {
      const formData = this.ordenForm.value;

      // Buscar el consumidor y producto seleccionados
      const consumidorSeleccionado = this.consumidores.find((consumidor:any) => consumidor.ID === formData.ConsumidorID);
      const productoSeleccionado = this.productos.find((producto:any) => producto.ID === formData.ProductoID);

      // Construir el objeto de la orden
      const nuevaOrden = {
        Consumidor: {
          ID: consumidorSeleccionado.ID,
          Nombre: consumidorSeleccionado.Nombre,
          Email: consumidorSeleccionado.Email,
          Ordenes: null
        },
        Producto: {
          ID: productoSeleccionado.ID,
          Descripcion: productoSeleccionado.Descripcion,
          Precio: productoSeleccionado.Precio,
          Stock: productoSeleccionado.Stock,
          Ordenes: null
        },
        Cantidad: formData.Cantidad,
        Total: formData.Cantidad * productoSeleccionado.Precio
      };

      // Hacer el POST
      this.ordenService.createOrden(nuevaOrden).subscribe(
        data => {
          console.log('Orden creada exitosamente!', data);
          this.getOrdenesList(); // Refrescar la lista de órdenes
          this.ordenForm.reset(); // Limpiar el formulario
          this.mostrarFormulario = false; // Ocultar el formulario
        },
        error => {
          console.error('Error al crear la orden', error);
        }
      );
    }
}

  eliminarOrden(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
      this.ordenService.deleteOrden(id).subscribe(() => {
        this.getOrdenesList(); // Refrescar la lista
      });
    }
  }
}
