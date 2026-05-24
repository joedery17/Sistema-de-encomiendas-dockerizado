import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/cliente.entity';
import { Sucursal } from './sucursal/sucursal.entity';
import { ContactoCliente } from './contacto-cliente/contacto-cliente.entity';
import { ClienteSucursal } from './cliente-sucursal/cliente-sucursal.entity';
import { TipoPaquete } from './tipo-paquete/tipo-paquete.entity';
import { Encomienda } from './encomienda/encomienda.entity';
import { DetalleEncomienda } from './detalle-encomienda/detalle-encomienda.entity';
import { Seguro } from './seguro/seguro.entity';
import { EstadoEnvio } from './estado-envio/estado-envio.entity';
import { Envio } from './envio/envio.entity';
import { Seguimiento } from './seguimiento/seguimiento.entity';
import { Entrega } from './entrega/entrega.entity';
import { Usuario } from './usuario/usuario.entity';
import { Empleado } from './empleado/empleado.entity';
import { Pago } from './pago/pago.entity';
import { Factura } from './factura/factura.entity';
import { ClienteModule } from './cliente/cliente.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { ContactoClienteModule } from './contacto-cliente/contacto-cliente.module';
import { ClienteSucursalModule } from './cliente-sucursal/cliente-sucursal.module';
import { TipoPaqueteModule } from './tipo-paquete/tipo-paquete.module';
import { EncomiendaModule } from './encomienda/encomienda.module';
import { DetalleEncomiendaModule } from './detalle-encomienda/detalle-encomienda.module';
import { SeguroModule } from './seguro/seguro.module';
import { EstadoEnvioModule } from './estado-envio/estado-envio.module';
import { EnvioModule } from './envio/envio.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { EntregaModule } from './entrega/entrega.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { PagoModule } from './pago/pago.module';
import { FacturaModule } from './factura/factura.module';
import { AuthModule } from './auth/auth.module';  // <--- AGREGAR ESTA LÍNEA

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '5432')),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', '12345678'),
        database: config.get<string>('DB_NAME', 'database'),
        entities: [Cliente, Sucursal, ContactoCliente, ClienteSucursal, TipoPaquete, Encomienda, DetalleEncomienda, Seguro, EstadoEnvio, Envio, Seguimiento, Entrega, Usuario, Empleado, Pago, Factura],
        synchronize: false,
      }),
    }),
    ClienteModule,
    SucursalModule,
    ContactoClienteModule,
    ClienteSucursalModule,
    TipoPaqueteModule,
    EncomiendaModule,
    DetalleEncomiendaModule,
    SeguroModule,
    EstadoEnvioModule,
    EnvioModule,
    SeguimientoModule,
    EntregaModule,
    UsuarioModule,
    EmpleadoModule,
    PagoModule,
    FacturaModule,
    AuthModule,  // <--- AGREGAR ESTA LÍNEA
  ],
})
export class AppModule {}