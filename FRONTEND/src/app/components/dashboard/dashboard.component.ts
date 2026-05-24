import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dataService = inject(DataService);

  estadisticas = signal({
    clientes: 0,
    encomiendas: 0,
    envios: 0,
    sucursales: 0
  });

  enviosRecientes = signal<any[]>([]);
  encomiendas = signal<any[]>([]);
  sucursales = signal<any[]>([]);
  cargando = signal(true);

  constructor() {
    // Efecto que se ejecuta cuando los datos cambian
    effect(() => {
      this.actualizarDashboard();
    });
  }

  ngOnInit() {
    this.actualizarDashboard();
  }

  actualizarDashboard() {
    const clientes = this.dataService.clientes();
    const encomiendas = this.dataService.encomiendas();
    const envios = this.dataService.envios();
    const sucursales = this.dataService.sucursales();

    this.estadisticas.set({
      clientes: clientes.length,
      encomiendas: encomiendas.length,
      envios: envios.length,
      sucursales: sucursales.length
    });

    this.encomiendas.set(encomiendas);
    this.sucursales.set(sucursales);

    const enviosOrdenados = [...envios].sort((a: any, b: any) => {
      const idA = a.id || 0;
      const idB = b.id || 0;
      return idB - idA;
    });
    this.enviosRecientes.set(enviosOrdenados.slice(0, 5));
    this.cargando.set(false);
  }

  obtenerCodigoEncomienda(id: number): string {
    if (!id || id === 0) return 'Sin encomienda';
    const encomienda = this.encomiendas().find((e: any) => e.id === id);
    if (encomienda && encomienda.codigo) {
      return encomienda.codigo;
    }
    return `Encomienda #${id}`;
  }

  obtenerNombreSucursal(id: number): string {
    if (!id || id === 0) return 'Sin sucursal';
    const sucursal = this.sucursales().find((s: any) => s.id === id);
    if (sucursal && sucursal.nombre) {
      return sucursal.nombre;
    }
    return `Sucursal #${id}`;
  }

  obtenerClaseEstado(estadoId: number | undefined): string {
    switch(estadoId) {
      case 3: return 'status-entregado';
      case 2: return 'status-transito';
      default: return 'status-registrado';
    }
  }

  obtenerNombreEstado(estadoId: number | undefined): string {
    switch(estadoId) {
      case 3: return 'Entregado';
      case 2: return 'En tránsito';
      default: return 'Registrado';
    }
  }
}