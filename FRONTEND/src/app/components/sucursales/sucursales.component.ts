import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {

  private dataService = inject(DataService);

  sucursales = this.dataService.sucursales;
  sucursalesFiltradas = signal<any[]>([]);
  cargando = signal(true);
  modalAbierto = signal(false);
  sucursalEditando = signal<any>(null);
  terminoBusqueda: string = '';

  formulario = {
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: ''
  };

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista() {
    const listaSucursales = this.sucursales();
    this.sucursalesFiltradas.set(listaSucursales);
    this.cargando.set(false);
  }

  filtrarSucursales() {
    const termino = this.terminoBusqueda.toLowerCase();
    const listaSucursales = this.sucursales();
    const filtradas = listaSucursales.filter((s: any) => 
      s.nombre.toLowerCase().includes(termino) ||
      (s.ciudad && s.ciudad.toLowerCase().includes(termino)) ||
      s.direccion.toLowerCase().includes(termino)
    );
    this.sucursalesFiltradas.set(filtradas);
  }

  abrirModal(sucursal?: any) {
    if (sucursal) {
      this.sucursalEditando.set(sucursal);
      this.formulario = {
        nombre: sucursal.nombre,
        direccion: sucursal.direccion,
        ciudad: sucursal.ciudad || '',
        telefono: sucursal.telefono || ''
      };
    } else {
      this.sucursalEditando.set(null);
      this.formulario = {
        nombre: '',
        direccion: '',
        ciudad: '',
        telefono: ''
      };
    }
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }

  guardarSucursal() {
    if (!this.formulario.nombre) {
      alert('❌ El nombre es obligatorio');
      return;
    }
    if (!this.formulario.direccion) {
      alert('❌ La dirección es obligatoria');
      return;
    }

    let sucursales = [...this.sucursales()];

    if (this.sucursalEditando()) {
      const index = sucursales.findIndex((s: any) => s.id === this.sucursalEditando().id);
      if (index !== -1) {
        sucursales[index] = {
          ...sucursales[index],
          nombre: this.formulario.nombre,
          direccion: this.formulario.direccion,
          ciudad: this.formulario.ciudad || '',
          telefono: this.formulario.telefono || ''
        };
      }
    } else {
      const nuevoId = sucursales.length > 0 ? Math.max(...sucursales.map((s: any) => s.id)) + 1 : 1;
      sucursales.push({
        id: nuevoId,
        nombre: this.formulario.nombre,
        direccion: this.formulario.direccion,
        ciudad: this.formulario.ciudad || '',
        telefono: this.formulario.telefono || ''
      });
    }

    // Guardar usando DataService
    this.dataService.guardarSucursales(sucursales);
    
    // Actualizar vista local
    this.sucursalesFiltradas.set(sucursales);
    if (this.terminoBusqueda) {
      this.filtrarSucursales();
    }
    
    this.cerrarModal();
    alert('✅ Sucursal guardada correctamente');
  }

  eliminarSucursal(id: number) {
    if (confirm('¿Eliminar esta sucursal?')) {
      let sucursales = [...this.sucursales()];
      sucursales = sucursales.filter((s: any) => s.id !== id);
      this.dataService.guardarSucursales(sucursales);
      this.sucursalesFiltradas.set(sucursales);
      alert('✅ Sucursal eliminada');
    }
  }
}