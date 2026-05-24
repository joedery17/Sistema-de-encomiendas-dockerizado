import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  seguimientos = signal<any[]>([]);
  envios = signal<any[]>([]);
  seguimientosFiltrados = signal<any[]>([]);
  cargando = signal(true);
  modalAbierto = signal(false);
  modalEditarAbierto = signal(false);
  envioSeleccionadoId = signal<number | null>(null);
  seguimientoEditando = signal<any>(null);

  formulario = {
    envio_id: 0,
    estado_id: 1,
    ubicacion: '',
    observaciones: ''
  };

  estados = [
    { id: 1, nombre: 'Registrado' },
    { id: 2, nombre: 'En tránsito' },
    { id: 3, nombre: 'Entregado' }
  ];

  ngOnInit() {
    this.inicializarDatos();
    this.cargarDatos();
  }

  inicializarDatos() {
    if (!localStorage.getItem('envios')) {
      const enviosIniciales = [
        { id: 1, encomiendaId: 1, sucursalOrigenId: 1, sucursalDestinoId: 2, costo: 50, estadoId: 2, fechaEnvio: new Date().toISOString() },
        { id: 2, encomiendaId: 2, sucursalOrigenId: 2, sucursalDestinoId: 3, costo: 30, estadoId: 1, fechaEnvio: new Date().toISOString() },
        { id: 3, encomiendaId: 3, sucursalOrigenId: 1, sucursalDestinoId: 3, costo: 70, estadoId: 3, fechaEnvio: new Date().toISOString() }
      ];
      localStorage.setItem('envios', JSON.stringify(enviosIniciales));
    }

    if (!localStorage.getItem('seguimientos')) {
      const seguimientosIniciales = [
        { id: 1, envioId: 1, estadoId: 1, ubicacion: 'La Paz', observaciones: 'Recepción', fecha: new Date().toISOString() },
        { id: 2, envioId: 1, estadoId: 2, ubicacion: 'En camino', observaciones: 'Transporte terrestre', fecha: new Date().toISOString() },
        { id: 3, envioId: 3, estadoId: 3, ubicacion: 'Santa Cruz', observaciones: 'Entregado correctamente', fecha: new Date().toISOString() }
      ];
      localStorage.setItem('seguimientos', JSON.stringify(seguimientosIniciales));
    }
  }

  cargarDatos() {
    const enviosData = localStorage.getItem('envios');
    if (enviosData) {
      this.envios.set(JSON.parse(enviosData));
    }

    const seguimientosData = localStorage.getItem('seguimientos');
    if (seguimientosData) {
      const seguimientos = JSON.parse(seguimientosData);
      this.seguimientos.set(seguimientos);
      this.seguimientosFiltrados.set(seguimientos);
    }
    this.cargando.set(false);
  }

  filtrarPorEnvio() {
    if (!this.envioSeleccionadoId()) {
      this.seguimientosFiltrados.set(this.seguimientos());
    } else {
      const filtrados = this.seguimientos().filter(s => s.envioId === this.envioSeleccionadoId());
      this.seguimientosFiltrados.set(filtrados);
    }
  }

  onEnvioChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.envioSeleccionadoId.set(select.value ? parseInt(select.value) : null);
    this.filtrarPorEnvio();
  }

  abrirModal() {
    this.formulario = {
      envio_id: 0,
      estado_id: 1,
      ubicacion: '',
      observaciones: ''
    };
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.modalEditarAbierto.set(false);
    this.seguimientoEditando.set(null);
  }

  guardarSeguimiento() {
    if (this.formulario.envio_id === 0) {
      alert('❌ Seleccione un envío');
      return;
    }

    let seguimientos = [];
    const existentes = localStorage.getItem('seguimientos');
    if (existentes) {
      seguimientos = JSON.parse(existentes);
    }

    let nuevoId = 1;
    if (seguimientos.length > 0) {
      nuevoId = Math.max(...seguimientos.map((s: any) => s.id)) + 1;
    }

    const nuevoSeguimiento = {
      id: nuevoId,
      envioId: Number(this.formulario.envio_id),
      estadoId: Number(this.formulario.estado_id),
      ubicacion: this.formulario.ubicacion || '',
      observaciones: this.formulario.observaciones || '',
      fecha: new Date().toISOString()
    };

    seguimientos.push(nuevoSeguimiento);
    localStorage.setItem('seguimientos', JSON.stringify(seguimientos));

    let envios = [];
    const enviosData = localStorage.getItem('envios');
    if (enviosData) {
      envios = JSON.parse(enviosData);
      const index = envios.findIndex((e: any) => e.id === nuevoSeguimiento.envioId);
      if (index !== -1) {
        envios[index].estadoId = nuevoSeguimiento.estadoId;
        localStorage.setItem('envios', JSON.stringify(envios));
      }
    }

    this.cargarDatos();
    this.cerrarModal();
    
    if (this.envioSeleccionadoId()) {
      this.filtrarPorEnvio();
    }
    
    alert('✅ Seguimiento registrado correctamente');
  }

  // ==================== EDITAR SEGUIMIENTO ====================
  abrirModalEditar(seguimiento: any) {
    this.seguimientoEditando.set(seguimiento);
    this.formulario = {
      envio_id: seguimiento.envioId,
      estado_id: seguimiento.estadoId,
      ubicacion: seguimiento.ubicacion || '',
      observaciones: seguimiento.observaciones || ''
    };
    this.modalEditarAbierto.set(true);
  }

  actualizarSeguimiento() {
    if (this.formulario.envio_id === 0) {
      alert('❌ Seleccione un envío');
      return;
    }

    let seguimientos = [];
    const existentes = localStorage.getItem('seguimientos');
    if (existentes) {
      seguimientos = JSON.parse(existentes);
    }

    const index = seguimientos.findIndex((s: any) => s.id === this.seguimientoEditando().id);
    if (index !== -1) {
      seguimientos[index] = {
        ...seguimientos[index],
        envioId: Number(this.formulario.envio_id),
        estadoId: Number(this.formulario.estado_id),
        ubicacion: this.formulario.ubicacion || '',
        observaciones: this.formulario.observaciones || '',
        fecha: new Date().toISOString()
      };
    }

    localStorage.setItem('seguimientos', JSON.stringify(seguimientos));

    let envios = [];
    const enviosData = localStorage.getItem('envios');
    if (enviosData) {
      envios = JSON.parse(enviosData);
      const indexEnvio = envios.findIndex((e: any) => e.id === this.formulario.envio_id);
      if (indexEnvio !== -1) {
        envios[indexEnvio].estadoId = Number(this.formulario.estado_id);
        localStorage.setItem('envios', JSON.stringify(envios));
      }
    }

    this.cargarDatos();
    this.cerrarModal();
    
    if (this.envioSeleccionadoId()) {
      this.filtrarPorEnvio();
    }
    
    alert('✅ Seguimiento actualizado correctamente');
  }

  // ==================== ELIMINAR SEGUIMIENTO ====================
  eliminarSeguimiento(id: number) {
    if (confirm('¿Eliminar este registro de seguimiento?')) {
      let seguimientos = [];
      const existentes = localStorage.getItem('seguimientos');
      if (existentes) {
        seguimientos = JSON.parse(existentes);
      }
      seguimientos = seguimientos.filter((s: any) => s.id !== id);
      localStorage.setItem('seguimientos', JSON.stringify(seguimientos));
      this.cargarDatos();
      alert('✅ Seguimiento eliminado');
    }
  }

  obtenerCodigoEnvio(id: number): string {
    if (!id || id === 0) return 'Sin envío';
    const envio = this.envios().find(e => e.id === id);
    return envio ? `Envío #${envio.id}` : `Envío #${id}`;
  }

  obtenerNombreEstado(estadoId: number): string {
    const estado = this.estados.find(e => e.id === estadoId);
    return estado?.nombre || 'Desconocido';
  }

  obtenerClaseEstado(estadoId: number): string {
    switch(estadoId) {
      case 3: return 'status-entregado';
      case 2: return 'status-transito';
      default: return 'status-registrado';
    }
  }
}