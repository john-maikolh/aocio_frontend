import { CommonModule } from "@angular/common";
import { Component, ViewEncapsulation } from "@angular/core";
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule } from "@angular/router";
import { ClienteDataService } from '../../servicios/cliente-data.service';
import { FormsModule, NgForm } from '@angular/forms';


interface Cliente {
    id?: string;
    nombre: string;
    apellido: string;
    identificacion: string;
    telefono: string;
    direccion: string;
    correo: string,
    fecha_ingreso?: string;
    cantidad_cilindros: number;
}

@Component({
    selector: 'app-formulario',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule,HttpClientModule],
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class FormularioComponent{
    cliente: Cliente = {
    nombre: '',
    apellido: '',
    identificacion: '',
    telefono: '',
    direccion: '',
    correo: 'facturaciondepositocededi@hotmail.com',
    cantidad_cilindros: 0
  };

  clienteGuardado = false;

  constructor(private clienteDataService: ClienteDataService) {}

  guardarCliente(form: NgForm) {
    if (form.invalid) {
    // Marca todos los campos como tocados para que aparezcan los mensajes de error
    Object.values(form.controls).forEach((control: any) => {
      control.markAsTouched();
    });
    return;

  }
    this.clienteDataService.registrarCliente(this.cliente).subscribe({
      next: (res) => {
        console.log('Cliente guardado:', res);
        this.clienteGuardado = true;

        // Limpia el formulario
        this.cliente = {
            nombre: '',
            apellido: '',
            identificacion: '',
            telefono: '',
            direccion: '',
            correo: 'facturaciondepositocededi@hotmail.com',
            cantidad_cilindros: 0
        };

        setTimeout(() => {
            this.clienteGuardado = false;
        }, 3000);
        },
      error: (err) => {
        console.error('Error al guardar cliente:', err);
        alert('Error al guardar el cliente');
      }
    });
  }

    //Para poner en mayúsculas las letras del formulario
  formatearNombre() {
    this.cliente.nombre = this.cliente.nombre.toUpperCase();
  }

  formatearApellido() {
    this.cliente.apellido = this.cliente.apellido.toUpperCase();
  }

  formatearDireccion() {
    this.cliente.direccion = this.cliente.direccion.toUpperCase();
  }
}