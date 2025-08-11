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
  cargando = true;
  error = '';

  constructor(private clienteService: ClienteDataService) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar clientes';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}
