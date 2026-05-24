import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  
  private clientesSignal = signal<any[]>([]);
  private encomiendasSignal = signal<any[]>([]);
  private enviosSignal = signal<any[]>([]);
  private sucursalesSignal = signal<any[]>([]);
  private seguimientosSignal = signal<any[]>([]);
  private empleadosSignal = signal<any[]>([]);
  private pagosSignal = signal<any[]>([]);
  private entregasSignal = signal<any[]>([]);

  // Getters públicos
  get clientes() {
    return this.clientesSignal.asReadonly();
  }
  get encomiendas() {
    return this.encomiendasSignal.asReadonly();
  }
  get envios() {
    return this.enviosSignal.asReadonly();
  }
  get sucursales() {
    return this.sucursalesSignal.asReadonly();
  }
  get seguimientos() {
    return this.seguimientosSignal.asReadonly();
  }
  get empleados() {
    return this.empleadosSignal.asReadonly();
  }
  get pagos() {
    return this.pagosSignal.asReadonly();
  }
  get entregas() {
    return this.entregasSignal.asReadonly();
  }

  constructor() {
    this.cargarClientes();
    this.cargarEncomiendas();
    this.cargarEnvios();
    this.cargarSucursales();
    this.cargarSeguimientos();
    this.cargarEmpleados();
    this.cargarPagos();
    this.cargarEntregas();
  }

  // ==================== NOTIFICAR CAMBIOS ====================
  private notificarCambios() {
    // Esto fuerza la actualización de los signals
    this.clientesSignal.set([...this.clientesSignal()]);
    this.encomiendasSignal.set([...this.encomiendasSignal()]);
    this.enviosSignal.set([...this.enviosSignal()]);
    this.sucursalesSignal.set([...this.sucursalesSignal()]);
    this.seguimientosSignal.set([...this.seguimientosSignal()]);
    this.empleadosSignal.set([...this.empleadosSignal()]);
    this.pagosSignal.set([...this.pagosSignal()]);
    this.entregasSignal.set([...this.entregasSignal()]);
  }

  // ==================== CLIENTES ====================
  cargarClientes() {
    const data = localStorage.getItem('clientes');
    if (data) {
      this.clientesSignal.set(JSON.parse(data));
    } else {
      const datosIniciales = [
        { id: 1, nombre: 'Juan', apellido: 'Perez', ci: '123456', telefono: '77711111', email: 'juan@gmail.com', direccion: 'La Paz', fechaRegistro: new Date().toISOString() },
        { id: 2, nombre: 'Maria', apellido: 'Lopez', ci: '654321', telefono: '77722222', email: 'maria@gmail.com', direccion: 'Cochabamba', fechaRegistro: new Date().toISOString() },
        { id: 3, nombre: 'Carlos', apellido: 'Quispe', ci: '987654', telefono: '77733333', email: 'carlos@gmail.com', direccion: 'Oruro', fechaRegistro: new Date().toISOString() }
      ];
      localStorage.setItem('clientes', JSON.stringify(datosIniciales));
      this.clientesSignal.set(datosIniciales);
    }
  }

  guardarClientes(clientes: any[]) {
    localStorage.setItem('clientes', JSON.stringify(clientes));
    this.clientesSignal.set([...clientes]);
    this.notificarCambios();
  }

  // ==================== ENCOMIENDAS ====================
  cargarEncomiendas() {
    const data = localStorage.getItem('encomiendas');
    if (data) {
      this.encomiendasSignal.set(JSON.parse(data));
    } else {
      const datosIniciales = [
        { id: 1, codigo: 'ENC001', remitente_id: 1, destinatario_id: 2, descripcion: 'Ropa', peso: 5.5, volumen: 0.3, valor_declarado: 200, fechaRegistro: new Date().toISOString() },
        { id: 2, codigo: 'ENC002', remitente_id: 2, destinatario_id: 3, descripcion: 'Documentos', peso: 1.0, volumen: 0.1, valor_declarado: 50, fechaRegistro: new Date().toISOString() },
        { id: 3, codigo: 'ENC003', remitente_id: 3, destinatario_id: 1, descripcion: 'Electrónicos', peso: 3.0, volumen: 0.2, valor_declarado: 500, fechaRegistro: new Date().toISOString() }
      ];
      localStorage.setItem('encomiendas', JSON.stringify(datosIniciales));
      this.encomiendasSignal.set(datosIniciales);
    }
  }

  guardarEncomiendas(encomiendas: any[]) {
    localStorage.setItem('encomiendas', JSON.stringify(encomiendas));
    this.encomiendasSignal.set([...encomiendas]);
    this.notificarCambios();
  }

  // ==================== ENVÍOS ====================
  cargarEnvios() {
    const data = localStorage.getItem('envios');
    if (data) {
      this.enviosSignal.set(JSON.parse(data));
    } else {
      const datosIniciales = [
        { id: 1, encomiendaId: 1, sucursalOrigenId: 1, sucursalDestinoId: 2, costo: 50, estadoId: 2, fechaEnvio: new Date().toISOString() },
        { id: 2, encomiendaId: 2, sucursalOrigenId: 2, sucursalDestinoId: 3, costo: 30, estadoId: 1, fechaEnvio: new Date().toISOString() },
        { id: 3, encomiendaId: 3, sucursalOrigenId: 1, sucursalDestinoId: 3, costo: 70, estadoId: 3, fechaEnvio: new Date().toISOString() }
      ];
      localStorage.setItem('envios', JSON.stringify(datosIniciales));
      this.enviosSignal.set(datosIniciales);
    }
  }

  guardarEnvios(envios: any[]) {
    localStorage.setItem('envios', JSON.stringify(envios));
    this.enviosSignal.set([...envios]);
    this.notificarCambios();
  }

  // ==================== SUCURSALES ====================
  cargarSucursales() {
    const data = localStorage.getItem('sucursales');
    if (data) {
      this.sucursalesSignal.set(JSON.parse(data));
    } else {
      const datosIniciales = [
        { id: 1, nombre: 'Sucursal Central', direccion: 'Av. Siempre Viva', ciudad: 'La Paz', telefono: '2221111' },
        { id: 2, nombre: 'Sucursal Norte', direccion: 'Zona Norte', ciudad: 'Cochabamba', telefono: '3332222' },
        { id: 3, nombre: 'Sucursal Sur', direccion: 'Zona Sur', ciudad: 'Santa Cruz', telefono: '4443333' }
      ];
      localStorage.setItem('sucursales', JSON.stringify(datosIniciales));
      this.sucursalesSignal.set(datosIniciales);
    }
  }

  guardarSucursales(sucursales: any[]) {
    localStorage.setItem('sucursales', JSON.stringify(sucursales));
    this.sucursalesSignal.set([...sucursales]);
    this.notificarCambios();
  }

  // ==================== SEGUIMIENTOS ====================
  cargarSeguimientos() {
    const data = localStorage.getItem('seguimientos');
    if (data) {
      this.seguimientosSignal.set(JSON.parse(data));
    } else {
      this.seguimientosSignal.set([]);
    }
  }

  guardarSeguimientos(seguimientos: any[]) {
    localStorage.setItem('seguimientos', JSON.stringify(seguimientos));
    this.seguimientosSignal.set([...seguimientos]);
    this.notificarCambios();
  }

  // ==================== EMPLEADOS ====================
  cargarEmpleados() {
    const data = localStorage.getItem('empleados');
    if (data) {
      this.empleadosSignal.set(JSON.parse(data));
    } else {
      const datosIniciales = [
        { id: 1, nombre: 'Luis', apellido: 'Gomez', cargo: 'Cajero', telefono: '77788888', sucursalId: 1 },
        { id: 2, nombre: 'Ana', apellido: 'Martinez', cargo: 'Operador', telefono: '77799999', sucursalId: 2 }
      ];
      localStorage.setItem('empleados', JSON.stringify(datosIniciales));
      this.empleadosSignal.set(datosIniciales);
    }
  }

  guardarEmpleados(empleados: any[]) {
    localStorage.setItem('empleados', JSON.stringify(empleados));
    this.empleadosSignal.set([...empleados]);
    this.notificarCambios();
  }

  // ==================== PAGOS ====================
  cargarPagos() {
    const data = localStorage.getItem('pagos');
    if (data) {
      this.pagosSignal.set(JSON.parse(data));
    } else {
      this.pagosSignal.set([]);
    }
  }

  guardarPagos(pagos: any[]) {
    localStorage.setItem('pagos', JSON.stringify(pagos));
    this.pagosSignal.set([...pagos]);
    this.notificarCambios();
  }

  // ==================== ENTREGAS ====================
  cargarEntregas() {
    const data = localStorage.getItem('entregas');
    if (data) {
      this.entregasSignal.set(JSON.parse(data));
    } else {
      this.entregasSignal.set([]);
    }
  }

  guardarEntregas(entregas: any[]) {
    localStorage.setItem('entregas', JSON.stringify(entregas));
    this.entregasSignal.set([...entregas]);
    this.notificarCambios();
  }

  // ==================== REFRESCAR TODO ====================
  refrescarTodo() {
    this.cargarClientes();
    this.cargarEncomiendas();
    this.cargarEnvios();
    this.cargarSucursales();
    this.cargarSeguimientos();
    this.cargarEmpleados();
    this.cargarPagos();
    this.cargarEntregas();
    this.notificarCambios();
  }
}