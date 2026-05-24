import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-encomiendas',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './encomiendas.component.html',
  styleUrls: ['./encomiendas.component.css']
})
export class EncomiendasComponent implements OnInit {

  private dataService = inject(DataService);

  encomiendas = this.dataService.encomiendas;
  clientes = signal<any[]>([]);
  encomiendasFiltradas = signal<any[]>([]);
  cargando = signal(true);
  modalAbierto = signal(false);
  encomiendaEditando = signal<any>(null);
  terminoBusqueda: string = '';

  seguro = signal<any>(null);
  mostrarSeguro = signal(false);

  formulario = {
    codigo: '',
    remitente_id: 0,
    destinatario_id: 0,
    descripcion: '',
    peso: 0,
    volumen: 0,
    valor_declarado: 0,
    valor_seguro: 0
  };

  ngOnInit() {
    this.cargarClientes();
    this.limpiarEncomiendasInvalidas();
    this.cargarLista();
  }

  limpiarEncomiendasInvalidas() {
    const clientesLista = this.clientes();
    if (clientesLista.length === 0) return;
    
    const idsValidos = clientesLista.map((c: any) => c.id);
    let encomiendasLista = [...this.encomiendas()];
    const validas = encomiendasLista.filter((e: any) => 
      idsValidos.includes(Number(e.remitente_id)) && idsValidos.includes(Number(e.destinatario_id))
    );
    
    if (validas.length !== encomiendasLista.length) {
      this.dataService.guardarEncomiendas(validas);
      console.log(`Eliminadas ${encomiendasLista.length - validas.length} encomiendas inválidas`);
    }
  }

  cargarClientes() {
    const clientesGuardados = localStorage.getItem('clientes');
    if (clientesGuardados) {
      this.clientes.set(JSON.parse(clientesGuardados));
    } else {
      const clientesIniciales = [
        { id: 1, nombre: 'Juan', apellido: 'Perez', ci: '123456', telefono: '77711111', email: 'juan@gmail.com', direccion: 'La Paz' },
        { id: 2, nombre: 'Maria', apellido: 'Lopez', ci: '654321', telefono: '77722222', email: 'maria@gmail.com', direccion: 'Cochabamba' },
        { id: 3, nombre: 'Carlos', apellido: 'Quispe', ci: '987654', telefono: '77733333', email: 'carlos@gmail.com', direccion: 'Oruro' }
      ];
      localStorage.setItem('clientes', JSON.stringify(clientesIniciales));
      this.clientes.set(clientesIniciales);
    }
  }

  cargarLista() {
    const listaEncomiendas = this.encomiendas();
    this.encomiendasFiltradas.set(listaEncomiendas);
    this.cargando.set(false);
  }

  filtrarEncomiendas() {
    const termino = this.terminoBusqueda.toLowerCase();
    const listaEncomiendas = this.encomiendas();
    const filtradas = listaEncomiendas.filter((e: any) => 
      e.codigo.toLowerCase().includes(termino) ||
      (e.descripcion && e.descripcion.toLowerCase().includes(termino))
    );
    this.encomiendasFiltradas.set(filtradas);
  }

  generarCodigo(): string {
    const cantidad = this.encomiendas().length + 1;
    return `ENC${String(cantidad).padStart(3, '0')}`;
  }

  abrirModal(encomienda?: any) {
    if (encomienda) {
      this.encomiendaEditando.set(encomienda);
      this.formulario = {
        codigo: encomienda.codigo,
        remitente_id: Number(encomienda.remitente_id),
        destinatario_id: Number(encomienda.destinatario_id),
        descripcion: encomienda.descripcion || '',
        peso: encomienda.peso || 0,
        volumen: encomienda.volumen || 0,
        valor_declarado: encomienda.valor_declarado || 0,
        valor_seguro: 0
      };
      this.cargarSeguro(encomienda.id);
    } else {
      this.encomiendaEditando.set(null);
      this.formulario = {
        codigo: this.generarCodigo(),
        remitente_id: 0,
        destinatario_id: 0,
        descripcion: '',
        peso: 0,
        volumen: 0,
        valor_declarado: 0,
        valor_seguro: 0
      };
      this.seguro.set(null);
      this.mostrarSeguro.set(false);
    }
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.seguro.set(null);
    this.mostrarSeguro.set(false);
  }

  guardarEncomienda() {
    // Convertir a números
    const remitenteId = Number(this.formulario.remitente_id);
    const destinatarioId = Number(this.formulario.destinatario_id);

    if (remitenteId === 0) {
      alert('❌ Seleccione un remitente');
      return;
    }
    if (destinatarioId === 0) {
      alert('❌ Seleccione un destinatario');
      return;
    }

    // Verificar que los clientes existen
    const clientesLista = this.clientes();
    const remitenteExiste = clientesLista.some((c: any) => c.id === remitenteId);
    const destinatarioExiste = clientesLista.some((c: any) => c.id === destinatarioId);

    if (!remitenteExiste) {
      alert('❌ El remitente seleccionado no existe');
      return;
    }
    if (!destinatarioExiste) {
      alert('❌ El destinatario seleccionado no existe');
      return;
    }

    let encomiendas = [...this.encomiendas()];

    if (this.encomiendaEditando()) {
      const index = encomiendas.findIndex((e: any) => e.id === this.encomiendaEditando().id);
      if (index !== -1) {
        encomiendas[index] = {
          ...encomiendas[index],
          codigo: this.formulario.codigo,
          remitente_id: remitenteId,
          destinatario_id: destinatarioId,
          descripcion: this.formulario.descripcion,
          peso: Number(this.formulario.peso) || 0,
          volumen: Number(this.formulario.volumen) || 0,
          valor_declarado: Number(this.formulario.valor_declarado) || 0
        };
      }
    } else {
      const nuevoId = encomiendas.length > 0 ? Math.max(...encomiendas.map((e: any) => e.id)) + 1 : 1;
      encomiendas.push({
        id: nuevoId,
        codigo: this.formulario.codigo,
        remitente_id: remitenteId,
        destinatario_id: destinatarioId,
        descripcion: this.formulario.descripcion,
        peso: Number(this.formulario.peso) || 0,
        volumen: Number(this.formulario.volumen) || 0,
        valor_declarado: Number(this.formulario.valor_declarado) || 0,
        fechaRegistro: new Date().toISOString()
      });
    }

    this.dataService.guardarEncomiendas(encomiendas);
    this.encomiendasFiltradas.set(encomiendas);
    if (this.terminoBusqueda) {
      this.filtrarEncomiendas();
    }
    
    if (this.mostrarSeguro() && this.formulario.valor_seguro > 0) {
      this.guardarSeguro(encomiendas);
    }
    
    this.cerrarModal();
    alert('✅ Encomienda guardada correctamente');
  }

  eliminarEncomienda(id: number) {
    if (confirm('¿Eliminar esta encomienda?')) {
      let encomiendas = [...this.encomiendas()];
      encomiendas = encomiendas.filter((e: any) => e.id !== id);
      this.dataService.guardarEncomiendas(encomiendas);
      this.encomiendasFiltradas.set(encomiendas);
      alert('✅ Encomienda eliminada');
    }
  }

  obtenerNombreCliente(id: number): string {
    if (!id || id === 0) {
      return 'Sin cliente';
    }
    const clientesLista = this.clientes();
    const cliente = clientesLista.find((c: any) => c.id === Number(id));
    if (cliente && cliente.nombre && cliente.apellido) {
      return `${cliente.nombre} ${cliente.apellido}`;
    }
    return `⚠️ Cliente ID ${id} no existe`;
  }

  toggleSeguro() {
    this.mostrarSeguro.set(!this.mostrarSeguro());
    if (!this.mostrarSeguro()) {
      this.formulario.valor_seguro = 0;
    }
  }

  cargarSeguro(encomiendaId: number) {
    const segurosGuardados = localStorage.getItem('seguros');
    const seguros = segurosGuardados ? JSON.parse(segurosGuardados) : [];
    const seguro = seguros.find((s: any) => s.encomiendaId === encomiendaId);
    if (seguro) {
      this.seguro.set(seguro);
      this.formulario.valor_seguro = seguro.monto;
      this.mostrarSeguro.set(true);
    }
  }

  guardarSeguro(encomiendas: any[]) {
    const segurosGuardados = localStorage.getItem('seguros');
    let seguros = segurosGuardados ? JSON.parse(segurosGuardados) : [];
    
    const encomiendaActual = encomiendas.find((e: any) => e.codigo === this.formulario.codigo);
    if (encomiendaActual) {
      const seguroExistente = seguros.find((s: any) => s.encomiendaId === encomiendaActual.id);
      
      if (seguroExistente) {
        seguroExistente.monto = this.formulario.valor_seguro;
      } else {
        const nuevoSeguro = {
          id: Date.now(),
          encomiendaId: encomiendaActual.id,
          monto: this.formulario.valor_seguro,
          descripcion: `Seguro para encomienda ${this.formulario.codigo}`
        };
        seguros.push(nuevoSeguro);
      }
      localStorage.setItem('seguros', JSON.stringify(seguros));
    }
  }
}