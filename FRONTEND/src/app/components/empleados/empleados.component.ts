import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados = signal<any[]>([]);
  sucursales = signal<any[]>([]);
  empleadosFiltrados = signal<any[]>([]);
  cargando = signal(true);
  modalAbierto = signal(false);
  empleadoEditando = signal<any>(null);
  terminoBusqueda: string = '';

  formulario = {
    nombre: '',
    apellido: '',
    cargo: '',
    telefono: '',
    sucursalId: 0
  };

  ngOnInit() {
    this.inicializarDatos();
    this.cargarDatos();
  }

  inicializarDatos() {
    if (!localStorage.getItem('sucursales')) {
      const sucursalesIniciales = [
        { id: 1, nombre: 'Sucursal Central', direccion: 'Av. Siempre Viva', ciudad: 'La Paz', telefono: '2221111' },
        { id: 2, nombre: 'Sucursal Norte', direccion: 'Zona Norte', ciudad: 'Cochabamba', telefono: '3332222' },
        { id: 3, nombre: 'Sucursal Sur', direccion: 'Zona Sur', ciudad: 'Santa Cruz', telefono: '4443333' }
      ];
      localStorage.setItem('sucursales', JSON.stringify(sucursalesIniciales));
    }

    if (!localStorage.getItem('empleados')) {
      const empleadosIniciales = [
        { id: 1, nombre: 'Luis', apellido: 'Gomez', cargo: 'Cajero', telefono: '77788888', sucursalId: 1 },
        { id: 2, nombre: 'Ana', apellido: 'Martinez', cargo: 'Operador', telefono: '77799999', sucursalId: 2 }
      ];
      localStorage.setItem('empleados', JSON.stringify(empleadosIniciales));
    }
  }

  cargarDatos() {
    const sucursalesData = localStorage.getItem('sucursales');
    if (sucursalesData) {
      this.sucursales.set(JSON.parse(sucursalesData));
    }

    const empleadosData = localStorage.getItem('empleados');
    if (empleadosData) {
      const empleados = JSON.parse(empleadosData);
      this.empleados.set(empleados);
      this.empleadosFiltrados.set(empleados);
    }
    this.cargando.set(false);
  }

  filtrarEmpleados() {
    const termino = this.terminoBusqueda.toLowerCase();
    const filtrados = this.empleados().filter(e => 
      `${e.nombre} ${e.apellido}`.toLowerCase().includes(termino) ||
      e.cargo.toLowerCase().includes(termino)
    );
    this.empleadosFiltrados.set(filtrados);
  }

  abrirModal(empleado?: any) {
    if (empleado) {
      this.empleadoEditando.set(empleado);
      this.formulario = {
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        cargo: empleado.cargo,
        telefono: empleado.telefono || '',
        sucursalId: empleado.sucursalId
      };
    } else {
      this.empleadoEditando.set(null);
      this.formulario = {
        nombre: '',
        apellido: '',
        cargo: '',
        telefono: '',
        sucursalId: 0
      };
    }
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }

  guardarEmpleado() {
    if (!this.formulario.nombre) {
      alert('❌ El nombre es obligatorio');
      return;
    }
    if (!this.formulario.apellido) {
      alert('❌ El apellido es obligatorio');
      return;
    }
    if (!this.formulario.cargo) {
      alert('❌ El cargo es obligatorio');
      return;
    }
    if (this.formulario.sucursalId === 0) {
      alert('❌ Seleccione una sucursal');
      return;
    }

    let empleados = [];
    const existentes = localStorage.getItem('empleados');
    if (existentes) {
      empleados = JSON.parse(existentes);
    }

    let nuevoId = 1;
    if (empleados.length > 0) {
      nuevoId = Math.max(...empleados.map((e: any) => e.id)) + 1;
    }

    const nuevoEmpleado = {
      id: this.empleadoEditando() ? this.empleadoEditando().id : nuevoId,
      nombre: this.formulario.nombre,
      apellido: this.formulario.apellido,
      cargo: this.formulario.cargo,
      telefono: this.formulario.telefono || '',
      sucursalId: Number(this.formulario.sucursalId)
    };

    if (this.empleadoEditando()) {
      const index = empleados.findIndex((e: any) => e.id === this.empleadoEditando().id);
      if (index !== -1) {
        empleados[index] = nuevoEmpleado;
      }
    } else {
      empleados.push(nuevoEmpleado);
    }

    localStorage.setItem('empleados', JSON.stringify(empleados));
    this.cargarDatos();
    this.cerrarModal();
    alert('✅ Empleado guardado correctamente');
  }

  eliminarEmpleado(id: number) {
    if (confirm('¿Eliminar este empleado?')) {
      let empleados = [];
      const existentes = localStorage.getItem('empleados');
      if (existentes) {
        empleados = JSON.parse(existentes);
      }
      empleados = empleados.filter((e: any) => e.id !== id);
      localStorage.setItem('empleados', JSON.stringify(empleados));
      this.cargarDatos();
      alert('✅ Empleado eliminado');
    }
  }

  obtenerNombreSucursal(id: number): string {
    if (!id || id === 0) return 'Sin sucursal';
    const sucursal = this.sucursales().find(s => s.id === id);
    return sucursal ? sucursal.nombre : `Sucursal #${id}`;
  }
}