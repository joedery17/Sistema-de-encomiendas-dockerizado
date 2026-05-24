import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EncomiendasComponent } from './components/encomiendas/encomiendas.component';
import { EnviosComponent } from './components/envios/envios.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { AuthGuard } from './guards/auth.guard';
import { FacturacionComponent } from './components/facturacion/facturacion.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'encomiendas', component: EncomiendasComponent, canActivate: [AuthGuard] },
  { path: 'envios', component: EnviosComponent, canActivate: [AuthGuard] },
  { path: 'sucursales', component: SucursalesComponent, canActivate: [AuthGuard] },
  { path: 'seguimiento', component: SeguimientoComponent, canActivate: [AuthGuard] },
  { path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'facturacion', component: FacturacionComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard' }
];