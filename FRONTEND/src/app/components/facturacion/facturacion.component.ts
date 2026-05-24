import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-facturacion',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  private dataService = inject(DataService);
  
  facturas = signal<any[]>([]);
  cargando = signal<boolean>(true);
  modalAbierto = signal<boolean>(false);
  facturaSeleccionada = signal<any>(null);
  terminoBusqueda: string = '';

  ngOnInit() {
    this.limpiarPagosHuerfanos();
    this.cargarFacturas();
  }

  limpiarPagosHuerfanos() {
    const envios = this.dataService.envios();
    const enviosIds = envios.map((e: any) => e.id);
    const pagos = JSON.parse(localStorage.getItem('pagos') || '[]');
    const pagosValidos = pagos.filter((pago: any) => enviosIds.includes(pago.envioId));
    
    if (pagosValidos.length !== pagos.length) {
      localStorage.setItem('pagos', JSON.stringify(pagosValidos));
    }
  }

  cargarFacturas() {
    this.cargando.set(true);
    
    this.limpiarPagosHuerfanos();
    
    const pagos = JSON.parse(localStorage.getItem('pagos') || '[]');
    const envios = this.dataService.envios();
    const encomiendas = this.dataService.encomiendas();
    const clientes = this.dataService.clientes();

    if (pagos.length === 0) {
      this.facturas.set([]);
      this.cargando.set(false);
      return;
    }

    const facturasGeneradas = pagos.map((pago: any, index: number) => {
      // Buscar el envío
      const envio = envios.find((e: any) => e.id === pago.envioId);
      
      // Buscar la encomienda relacionada al envío
      const encomienda = encomiendas.find((e: any) => e.id === envio?.encomiendaId);
      
      // Buscar el cliente relacionado a la encomienda
      const cliente = clientes.find((c: any) => c.id === encomienda?.remitente_id);
      
      return {
        id: pago.id,
        numero: `F-${String(index + 1).padStart(3, '0')}`,
        fecha: pago.fecha || new Date(),
        nit: cliente?.ci || '------',
        razonSocial: cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Cliente',
        monto: pago.monto
      };
    });

    this.facturas.set(facturasGeneradas);
    this.cargando.set(false);
  }

  getTotalMonto(): number {
    const lista = this.facturas();
    let total = 0;
    for (let i = 0; i < lista.length; i++) {
      total = total + (lista[i].monto || 0);
    }
    return total;
  }

  filtrarFacturas() {
    if (!this.terminoBusqueda) {
      this.cargarFacturas();
    } else {
      const termino = this.terminoBusqueda.toLowerCase();
      const todas = this.facturas();
      const filtradas = todas.filter((f: any) => 
        f.numero.toLowerCase().includes(termino) ||
        f.razonSocial.toLowerCase().includes(termino) ||
        f.nit.includes(termino)
      );
      this.facturas.set(filtradas);
    }
  }

  verDetalle(factura: any) {
    this.facturaSeleccionada.set(factura);
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.facturaSeleccionada.set(null);
  }

  imprimirFactura(factura: any) {
    const contenido = `
      <html>
      <head>
        <title>Factura ${factura.numero}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 50px; }
          .factura { max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px; }
          .header { text-align: center; border-bottom: 2px solid #333; }
          .header h1 { color: #2563eb; margin: 0; }
          .total { text-align: right; font-size: 20px; font-weight: bold; color: #059669; }
        </style>
      </head>
      <body>
        <div class="factura">
          <div class="header">
            <h1>SISTEMA DE ENCOMIENDAS</h1>
            <p>Factura de Servicio</p>
          </div>
          <p><strong>N° Factura:</strong> ${factura.numero}</p>
          <p><strong>Fecha:</strong> ${new Date(factura.fecha).toLocaleString()}</p>
          <p><strong>NIT:</strong> ${factura.nit}</p>
          <p><strong>Cliente:</strong> ${factura.razonSocial}</p>
          <hr>
          <p><strong>Concepto:</strong> Servicio de Encomienda</p>
          <div class="total">Total: Bs. ${factura.monto}</div>
          <p style="text-align:center;">¡Gracias por su preferencia!</p>
        </div>
        <script>window.print();<\/script>
      </body>
      </html>
    `;
    const ventana = window.open('', '_blank');
    if (ventana) {
      ventana.document.write(contenido);
      ventana.document.close();
    }
  }
}