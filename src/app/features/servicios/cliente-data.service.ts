import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';  // importamos 'of'
import { isPlatformBrowser } from '@angular/common';
//import { environment } from '../../../environments/environment';

export interface Cliente {
  id?: string;
  nombre: string;
  apellido: string;
  identificacion: string;
  telefono: string;
  direccion: string;
  correo: string;
  fecha_ingreso?: string; // formato: YYYY-MM-DD
  cantidad_cilindros: number;
}

@Injectable({
  providedIn: 'root',
})
export class ClienteDataService {
  private apiUrl = "https://acopiobackend.vercel.app/api/clientes"; // Usamos la URL del entorno

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  registrarCliente(cliente: Cliente): Observable<Cliente[]> {
    if (!isPlatformBrowser(this.platformId)) {
      // En prerender devolvemos array vacío o puedes cambiar a throwError si prefieres
      return of([]);
    }
    return this.http.post<Cliente[]>(this.apiUrl, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([]); // devolver array vacío en SSR para no romper prerender
    }
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  obtenerClientePorId(id: string): Observable<Cliente | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null); // en SSR devolvemos null o algún valor por defecto
    }
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }
}
