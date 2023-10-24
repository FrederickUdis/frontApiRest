import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: any;
  productoActual: any = {}; // Para editar
  productoForm: FormGroup = this.fb.group({
    Descripcion: ['', Validators.required],
    Precio: ['', [Validators.required, Validators.min(0)]],
    Stock: ['', [Validators.required, Validators.min(0)]]
  });
  mostrarFormulario = false;
  editando = false;
  productoId: number | null = null;

  constructor(private fb: FormBuilder, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProductosList();
  }

  getProductosList(): void {
    this.productoService.getProductosList().subscribe(data => {
      this.productos = data;
    });
  }

  agregarProducto(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  crearProducto(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    console.log("bandera", this.productoForm.value)
    if (this.productoForm.valid) {
      const nuevoProducto = this.productoForm.value;
      if (this.editando) {
        this.guardarCambios()

      } else {
        this.productoService.createProducto(nuevoProducto).subscribe(
          data => {
            console.log('Producto creado exitosamente!', data);
            this.getProductosList()
            this.productoForm.reset(); // Limpiar el formulario
          },
          error => {
            console.error('Error al crear el producto', error);
          }
        );
      }

    }
  }
   
  editarProducto(id: number): void {
    this.editando = true;
    this.productoId = id;
    this.productoService.getProducto(id).subscribe(data => {
      this.productoForm.setValue({
        Descripcion: data.Descripcion,
        Precio: data.Precio,
        Stock: data.Stock
      });
      this.mostrarFormulario = true; // Mostrar el formulario
    });
  }

  guardarCambios(): void {
    if (this.productoForm.valid && this.editando && this.productoId !== null) {
      const productoActualizado = this.productoForm.value;
      this.productoService.updateProducto(this.productoId, productoActualizado).subscribe(
        data => {
          console.log('Producto actualizado exitosamente!', data);
          this.getProductosList(); // Refrescar la lista de productos
          this.productoForm.reset(); // Limpiar el formulario
          this.mostrarFormulario = false; // Ocultar el formulario
          this.editando = false; // Ya no estamos editando
          this.productoId = null; // Limpiar el ID del producto que estábamos editando
        },
        error => {
          console.error('Error al actualizar el producto', error);
        }
      );
    }
  }
  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe(() => {
        this.getProductosList(); // Refrescar la lista
      });
    }
  }



}
