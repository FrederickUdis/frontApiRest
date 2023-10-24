import { Component, OnInit } from '@angular/core';
import { ConsumidorService } from '../../servicios/consumidor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consumidor',
  templateUrl: './consumidor.component.html',
  styleUrls: ['./consumidor.component.css']
})
export class ConsumidorComponent implements OnInit {
  consumidores: any;
  consumidorActual: any = {};
  consumidorForm: FormGroup = this.fb.group({
    Nombre: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]]
  });
  mostrarFormulario = false;
  editando = false;
  consumidorId: number | null = null;

  constructor(private fb: FormBuilder, private consumidorService: ConsumidorService) { }

  ngOnInit(): void {
    this.getConsumidoresList();
  }

  getConsumidoresList(): void {
    this.consumidorService.getConsumidoresList().subscribe(data => {
      this.consumidores = data;
    });
  }

  agregarConsumidor(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  crearConsumidor(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (this.consumidorForm.valid) {
      const nuevoConsumidor = this.consumidorForm.value;
      if (this.editando) {
        this.guardarCambios();
      } else {
        this.consumidorService.createConsumidor(nuevoConsumidor).subscribe(
          data => {
            console.log('Consumidor creado exitosamente!', data);
            this.getConsumidoresList();
            this.consumidorForm.reset();
          },
          error => {
            console.error('Error al crear el consumidor', error);
          }
        );
      }
    }
  }

  editarConsumidor(id: number): void {
    this.editando = true;
    this.consumidorId = id;
    this.consumidorService.getConsumidor(id).subscribe(data => {
      this.consumidorForm.setValue({
        Nombre: data.Nombre,
        Email: data.Email
      });
      this.mostrarFormulario = true;
    });
  }

  guardarCambios(): void {
    if (this.consumidorForm.valid && this.editando && this.consumidorId !== null) {
      const consumidorActualizado = this.consumidorForm.value;
      this.consumidorService.updateConsumidor(this.consumidorId, consumidorActualizado).subscribe(
        data => {
          console.log('Consumidor actualizado exitosamente!', data);
          this.getConsumidoresList();
          this.consumidorForm.reset();
          this.mostrarFormulario = false;
          this.editando = false;
          this.consumidorId = null;
        },
        error => {
          console.error('Error al actualizar el consumidor', error);
        }
      );
    }
  }

  eliminarConsumidor(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este consumidor?')) {
      this.consumidorService.deleteConsumidor(id).subscribe(() => {
        this.getConsumidoresList();
      });
    }
  }
}
