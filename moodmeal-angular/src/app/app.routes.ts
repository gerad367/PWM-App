import { authGuard } from './guards/auth-guard';
import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Settings} from './pages/settings/settings';
import { Favourites } from "./pages/favourites/favourites";
import {Mood} from './pages/mood/mood';
import { Restaurant } from "./pages/restaurant/restaurant";
import {Register} from './pages/register/register';

export const routes: Routes = [
  { path: '', component: Home }, // Home abierta para todos
  { path: 'login', component: Login },

  // Estas rutas solo se abren si el Guard devuelve true
  { path: 'favourites', component: Favourites, canActivate: [authGuard] },
  { path: 'settings', component: Settings, canActivate: [authGuard] },

  { path: 'mood', component: Mood },
  { path: 'restaurant', component: Restaurant },

  { path: '**', redirectTo: '' },

  { path: 'register', component: Register }
];
