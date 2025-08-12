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
      },
      error: (err) => {
        this.error = 'Error al cargar clientes';
        this.cargando = false;
        console.error(err);
      }
    });

    this.clienteService.getResumenDia().subscribe({
      next: (res) => {
        this.cilindrosVendidosHoy = res.cilindrosVendidos;
        this.personasRegistradasHoy = res.personasRegistradas;
      },
      error: (err) => {
        console.error('Error al cargar resumen del día', err);
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
