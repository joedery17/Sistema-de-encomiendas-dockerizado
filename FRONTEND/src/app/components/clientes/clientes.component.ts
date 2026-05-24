import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  private dataService = inject(DataService);

  clientes = this.dataService.clientes;
  clientesFiltrados = signal<any[]>([]);
  contactos = signal<any[]>([]);
  cargando = signal(true);
  modalAbierto = signal(false);
  modalContactoAbierto = signal(false);
  clienteEditando = signal<any>(null);
  terminoBusqueda: string = '';

  formulario = {
    nombre: '',
    apellido: '',
    ci: '',
    telefono: '',
    email: '',
    direccion: ''
  };

  formularioContacto = {
    clienteId: 0,
    tipo: '',
    nombre: '',
    telefono: ''
  };

  tiposContacto = ['Emergencia', 'Familiar', 'Referencia', 'Trabajo'];

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista() {
    const listaClientes = this.clientes();
    console.log('Clientes cargados:', listaClientes);
    this.clientesFiltrados.set(listaClientes);
    this.cargando.set(false);
  }

  filtrarClientes() {
    const termino = this.terminoBusqueda.toLowerCase();
    const listaClientes = this.clientes();
    const filtrados = listaClientes.filter((c: any) => 
      `${c.nombre} ${c.apellido}`.toLowerCase().includes(termino) ||
      (c.ci && c.ci.includes(termino))
    );
    this.clientesFiltrados.set(filtrados);
  }

  abrirModal(cliente?: any) {
    if (cliente) {
      this.clienteEditando.set(cliente);
      this.formulario = {
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        ci: cliente.ci || '',
        telefono: cliente.telefono || '',
        email: cliente.email || '',
        direccion: cliente.direccion || ''
      };
    } else {
      this.clienteEditando.set(null);
      this.formulario = {
        nombre: '',
        apellido: '',
        ci: '',
        telefono: '',
        email: '',
        direccion: ''
      };
    }
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
  }

  guardarCliente() {
    if (!this.formulario.nombre || !this.formulario.apellido) {
      alert('❌ Nombre y apellido son obligatorios');
      return;
    }

    // Obtener clientes actuales
    let clientesActuales = this.clientes();
    let clientes = [...clientesActuales];

    if (this.clienteEditando()) {
      // Actualizar cliente existente
      const index = clientes.findIndex((c: any) => c.id === this.clienteEditando().id);
      if (index !== -1) {
        clientes[index] = {
          ...clientes[index],
          nombre: this.formulario.nombre,
          apellido: this.formulario.apellido,
          ci: this.formulario.ci || '',
          telefono: this.formulario.telefono || '',
          email: this.formulario.email || '',
          direccion: this.formulario.direccion || ''
        };
      }
    } else {
      // Crear nuevo cliente
      let nuevoId = 1;
      if (clientes.length > 0) {
        const ids = clientes.map((c: any) => c.id);
        nuevoId = Math.max(...ids) + 1;
      }
      const nuevoCliente = {
        id: nuevoId,
        nombre: this.formulario.nombre,
        apellido: this.formulario.apellido,
        ci: this.formulario.ci || '',
        telefono: this.formulario.telefono || '',
        email: this.formulario.email || '',
        direccion: this.formulario.direccion || '',
        fechaRegistro: new Date().toISOString()
      };
      clientes.push(nuevoCliente);
    }

    // Guardar en el servicio (esto actualiza el signal)
    this.dataService.guardarClientes(clientes);
    
    // ACTUALIZAR LA VISTA INMEDIATAMENTE
    this.clientesFiltrados.set([...clientes]);
    
    // Si hay búsqueda activa, volver a filtrar
    if (this.terminoBusqueda) {
      const termino = this.terminoBusqueda.toLowerCase();
      const filtrados = clientes.filter((c: any) => 
        `${c.nombre} ${c.apellido}`.toLowerCase().includes(termino) ||
        (c.ci && c.ci.includes(termino))
      );
      this.clientesFiltrados.set(filtrados);
    }
    
    this.cerrarModal();
    alert('✅ Cliente guardado correctamente');
  }

  eliminarCliente(id: number) {
    if (confirm('¿Eliminar este cliente?')) {
      let clientesActuales = this.clientes();
      let clientes = clientesActuales.filter((c: any) => c.id !== id);
      this.dataService.guardarClientes(clientes);
      this.clientesFiltrados.set(clientes);
      alert('✅ Cliente eliminado');
    }
  }

  abrirModalContacto(clienteId: number) {
    this.formularioContacto = {
      clienteId: clienteId,
      tipo: '',
      nombre: '',
      telefono: ''
    };
    this.cargarContactos(clienteId);
    this.modalContactoAbierto.set(true);
  }

  cerrarModalContacto() {
    this.modalContactoAbierto.set(false);
    this.formularioContacto = {
      clienteId: 0,
      tipo: '',
      nombre: '',
      telefono: ''
    };
  }

  guardarContacto() {
    if (!this.formularioContacto.tipo || !this.formularioContacto.nombre || !this.formularioContacto.telefono) {
      alert('❌ Complete todos los campos');
      return;
    }

    const contactosGuardados = localStorage.getItem('contactos');
    let contactos = contactosGuardados ? JSON.parse(contactosGuardados) : [];
    
    let nuevoId = 1;
    if (contactos.length > 0) {
      const ids = contactos.map((c: any) => c.id);
      nuevoId = Math.max(...ids) + 1;
    }
    
    const nuevoContacto = {
      id: nuevoId,
      clienteId: this.formularioContacto.clienteId,
      tipo: this.formularioContacto.tipo,
      nombre: this.formularioContacto.nombre,
      telefono: this.formularioContacto.telefono,
      fecha: new Date().toISOString()
    };
    
    contactos.push(nuevoContacto);
    localStorage.setItem('contactos', JSON.stringify(contactos));
    this.cargarContactos(this.formularioContacto.clienteId);
    this.cerrarModalContacto();
    alert('✅ Contacto guardado');
  }

  cargarContactos(clienteId: number) {
    const contactosGuardados = localStorage.getItem('contactos');
    const todos = contactosGuardados ? JSON.parse(contactosGuardados) : [];
    const contactosCliente = todos.filter((c: any) => c.clienteId === clienteId);
    this.contactos.set(contactosCliente);
  }

  eliminarContacto(id: number) {
    if (confirm('¿Eliminar este contacto?')) {
      let contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
      contactos = contactos.filter((c: any) => c.id !== id);
      localStorage.setItem('contactos', JSON.stringify(contactos));
      this.cargarContactos(this.formularioContacto.clienteId);
      alert('✅ Contacto eliminado');
    }
  }
}