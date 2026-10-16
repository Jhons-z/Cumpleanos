import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

import { Inicio } from './inicio/inicio';
import { Login } from './login/login';
import { Cumpleanos } from './cumpleanos/cumpleanos';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'iniciar-sesion', component: Login },
  { path: 'cumpleanos', component: Cumpleanos, canActivate: [authGuard] },
  { path: '**', redirectTo: 'inicio' }
];
