import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-envios',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css']
})
export class EnviosComponent implements OnInit {

  private dataService = inject(DataService);

  envios = this.dataService.envios;
  encomiendas = signal<any[]>([]);
  sucursales = signal<any[]>([]);
  enviosFiltrados = signal<any[]>([]);
  cargando = signal(true);
  modalAbierto = signal(false);
  modalPagoAbierto = signal(false);
  modalEntregaAbierto = signal(false);
  envioEditando = signal<any>(null);
  envioSeleccionado = signal<any>(null);
  terminoBusqueda: string = '';

  pagosEnvio = signal<any[]>([]);
  entregasEnvio = signal<any[]>([]);

  formulario = {
    encomienda_id: 0,
    sucursal_origen_id: 0,
    sucursal_destino_id: 0,
    costo: 0
  };

  formularioPago = {
    envioId: 0,
    monto: 0,
    metodo: 'Efectivo'
  };

  formularioEntrega = {
    envioId: 0,
    nombreRecibe: '',
    ciRecibe: '',
    firma: ''
  };

  metodosPago = ['Efectivo', 'Tarjeta', 'QR', 'Transferencia'];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    const listaEncomiendas = this.dataService.encomiendas();
    const listaSucursales = this.dataService.sucursales();
    const listaEnvios = this.envios();

    this.encomiendas.set(listaEncomiendas);
    this.sucursales.set(listaSucursales);
    this.enviosFiltrados.set(listaEnvios);
    this.cargando.set(false);
  }

  filtrarEnvios() {
    const termino = this.terminoBusqueda.toLowerCase();
    const listaEnvios = this.envios();
    const filtrados = listaEnvios.filter((e: any) => 
      this.obtenerCodigoEncomienda(e.encomiendaId).toLowerCase().includes(termino)
    );
    this.enviosFiltrados.set(filtrados);
  }

  abrirModal(envio?: any) {
    if (envio) {
      this.envioEditando.set(envio);
      this.formulario = {
        encomienda_id: envio.encomiendaId,
        sucursal_origen_id: envio.sucursalOrigenId,
        sucursal_destino_id: envio.sucursalDestinoId,
        costo: envio.costo || 0
      };
    } else {
      this.envioEditando.set(null);
      this.formulario = {
        encomienda_id: 0,
        sucursal_origen_id: 0,
        sucursal_destino_id: 0,
        costo: 0
      };
    }
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }

  guardarEnvio() {
    if (this.formulario.encomienda_id === 0) {
      alert('❌ Seleccione una encomienda');
      return;
    }
    if (this.formulario.sucursal_origen_id === 0) {
      alert('❌ Seleccione una sucursal de origen');
      return;
    }
    if (this.formulario.sucursal_destino_id === 0) {
      alert('❌ Seleccione una sucursal de destino');
      return;
    }

    let envios = [...this.envios()];

    if (this.envioEditando()) {
      const index = envios.findIndex((e: any) => e.id === this.envioEditando().id);
      if (index !== -1) {
        envios[index] = {
          ...envios[index],
          encomiendaId: Number(this.formulario.encomienda_id),
          sucursalOrigenId: Number(this.formulario.sucursal_origen_id),
          sucursalDestinoId: Number(this.formulario.sucursal_destino_id),
          costo: Number(this.formulario.costo)
        };
      }
    } else {
      const nuevoId = envios.length > 0 ? Math.max(...envios.map((e: any) => e.id)) + 1 : 1;
      const nuevoEnvio = {
        id: nuevoId,
        encomiendaId: Number(this.formulario.encomienda_id),
        sucursalOrigenId: Number(this.formulario.sucursal_origen_id),
        sucursalDestinoId: Number(this.formulario.sucursal_destino_id),
        costo: Number(this.formulario.costo),
        estadoId: 1,
        fechaEnvio: new Date().toISOString()
      };
      envios.push(nuevoEnvio);
      
      // Crear pago automático para el nuevo envío
      const pagos = JSON.parse(localStorage.getItem('pagos') || '[]');
      const nuevoPago = {
        id: Date.now(),
        envioId: nuevoId,
        monto: Number(this.formulario.costo),
        metodo: 'Pendiente',
        fecha: new Date().toISOString()
      };
      pagos.push(nuevoPago);
      localStorage.setItem('pagos', JSON.stringify(pagos));
    }

    // Guardar usando DataService
    this.dataService.guardarEnvios(envios);
    
    // Actualizar vista local
    this.enviosFiltrados.set(envios);
    if (this.terminoBusqueda) {
      this.filtrarEnvios();
    }
    
    this.cerrarModal();
    alert('✅ Envío guardado correctamente');
  }

  eliminarEnvio(id: number) {
    if (confirm('¿Eliminar este envío?')) {
      let envios = [...this.envios()];
      envios = envios.filter((e: any) => e.id !== id);
      this.dataService.guardarEnvios(envios);
      this.enviosFiltrados.set(envios);
      alert('✅ Envío eliminado');
    }
  }

  // ==================== PAGOS ====================
  cargarPagosEnvio(envioId: number) {
    const pagos = JSON.parse(localStorage.getItem('pagos') || '[]');
    this.pagosEnvio.set(pagos.filter((p: any) => p.envioId === envioId));
  }

  abrirModalPago(envio: any) {
    this.envioSeleccionado.set(envio);
    this.formularioPago = {
      envioId: envio.id,
      monto: envio.costo,
      metodo: 'Efectivo'
    };
    this.cargarPagosEnvio(envio.id);
    this.modalPagoAbierto.set(true);
  }

  guardarPago() {
    if (this.formularioPago.monto <= 0) {
      alert('❌ El monto debe ser mayor a cero');
      return;
    }

    const pagos = JSON.parse(localStorage.getItem('pagos') || '[]');
    const nuevoPago = {
      id: Date.now(),
      envioId: this.formularioPago.envioId,
      monto: this.formularioPago.monto,
      metodo: this.formularioPago.metodo,
      fecha: new Date().toISOString()
    };
    pagos.push(nuevoPago);
    localStorage.setItem('pagos', JSON.stringify(pagos));
    
    this.cargarPagosEnvio(this.formularioPago.envioId);
    this.modalPagoAbierto.set(false);
    alert('✅ Pago registrado correctamente');
  }

  eliminarPago(id: number) {
    if (confirm('¿Eliminar este pago?')) {
      let pagos = JSON.parse(localStorage.getItem('pagos') || '[]');
      pagos = pagos.filter((p: any) => p.id !== id);
      localStorage.setItem('pagos', JSON.stringify(pagos));
      const envioActual = this.envioSeleccionado();
      if (envioActual) {
        this.cargarPagosEnvio(envioActual.id);
      }
      alert('✅ Pago eliminado');
    }
  }

  // ==================== ENTREGAS ====================
  cargarEntregasEnvio(envioId: number) {
    const entregas = JSON.parse(localStorage.getItem('entregas') || '[]');
    this.entregasEnvio.set(entregas.filter((e: any) => e.envioId === envioId));
  }

  abrirModalEntrega(envio: any) {
    this.envioSeleccionado.set(envio);
    this.formularioEntrega = {
      envioId: envio.id,
      nombreRecibe: '',
      ciRecibe: '',
      firma: ''
    };
    this.cargarEntregasEnvio(envio.id);
    this.modalEntregaAbierto.set(true);
  }

  guardarEntrega() {
    if (!this.formularioEntrega.nombreRecibe) {
      alert('❌ Ingrese el nombre de quien recibe');
      return;
    }
    if (!this.formularioEntrega.ciRecibe) {
      alert('❌ Ingrese el CI de quien recibe');
      return;
    }

    const entregas = JSON.parse(localStorage.getItem('entregas') || '[]');
    const nuevaEntrega = {
      id: Date.now(),
      envioId: this.formularioEntrega.envioId,
      nombreRecibe: this.formularioEntrega.nombreRecibe,
      ciRecibe: this.formularioEntrega.ciRecibe,
      firma: this.formularioEntrega.firma || '',
      fecha: new Date().toISOString()
    };
    entregas.push(nuevaEntrega);
    localStorage.setItem('entregas', JSON.stringify(entregas));

    // Actualizar estado del envío a "Entregado"
    let envios = [...this.envios()];
    const index = envios.findIndex((e: any) => e.id === this.formularioEntrega.envioId);
    if (index !== -1) {
      envios[index].estadoId = 3;
      this.dataService.guardarEnvios(envios);
    }

    this.cargarEntregasEnvio(this.formularioEntrega.envioId);
    this.modalEntregaAbierto.set(false);
    alert('✅ Entrega registrada correctamente');
  }

  eliminarEntrega(id: number) {
    if (confirm('¿Eliminar esta entrega?')) {
      let entregas = JSON.parse(localStorage.getItem('entregas') || '[]');
      entregas = entregas.filter((e: any) => e.id !== id);
      localStorage.setItem('entregas', JSON.stringify(entregas));
      const envioActual = this.envioSeleccionado();
      if (envioActual) {
        this.cargarEntregasEnvio(envioActual.id);
      }
      alert('✅ Entrega eliminada');
    }
  }

  // ==================== MÉTODOS AUXILIARES ====================
  obtenerCodigoEncomienda(id: number): string {
    if (!id || id === 0) return 'Sin encomienda';
    const encomienda = this.encomiendas().find((e: any) => e.id === id);
    return encomienda ? encomienda.codigo : `Encomienda #${id}`;
  }

  obtenerNombreSucursal(id: number): string {
    if (!id || id === 0) return 'Sin sucursal';
    const sucursal = this.sucursales().find((s: any) => s.id === id);
    return sucursal ? sucursal.nombre : `Sucursal #${id}`;
  }

  obtenerClaseEstado(estadoId: number): string {
    switch(estadoId) {
      case 3: return 'status-entregado';
      case 2: return 'status-transito';
      default: return 'status-registrado';
    }
  }

  obtenerNombreEstado(estadoId: number): string {
    switch(estadoId) {
      case 3: return 'Entregado';
      case 2: return 'En tránsito';
      default: return 'Registrado';
    }
  }
}