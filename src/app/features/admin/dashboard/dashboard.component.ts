import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClienteDataService, Cliente } from '../../servicios/cliente-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesPaginados: Cliente[] = [];
  paginaActual = 1;
  elementosPorPagina = 15;
  totalPaginas = 0;

  cargando = true;
  error = '';

  cilindrosVendidosHoy = 0;
  personasRegistradasHoy = 0;

  constructor(private clienteService: ClienteDataService) {}

  ngOnInit() {
  this.clienteService.getClientes().subscribe({
    next: (data) => {
      this.clientes = data;
      this.totalPaginas = Math.ceil(this.clientes.length / this.elementosPorPagina);
      this.cambiarPagina(1); // Mostrar la primera página
      this.cargando = false;

      // 🔹 Calcular cilindros vendidos (sumatoria)
      this.cilindrosVendidosHoy = this.clientes.reduce(
        (total, cliente) => total + (cliente.cantidad_cilindros || 0),
        0
      );

      // 🔹 Calcular personas registradas hoy (si existe fecha de registro)
      const hoy = new Date().toISOString().split('T')[0];
      this.personasRegistradasHoy = this.clientes.filter(cliente => {
        if (!cliente.fecha_ingreso) return false;
        return cliente.fecha_ingreso.split('T')[0] === hoy;
      }).length;
    },
    error: (err) => {
      this.error = 'Error al cargar clientes';
      this.cargando = false;
      console.error(err);
    }
  });
}


  cambiarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;
    const inicio = (pagina - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.clientesPaginados = this.clientes.slice(inicio, fin);
  }

  descargarCSV() {
    this.clienteService.downloadCSV().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'clientes.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar CSV:', err);
        alert('Error al descargar el archivo CSV');
      }
    });
  }
}
