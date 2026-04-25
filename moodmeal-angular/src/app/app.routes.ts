import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Favourites} from './pages/favourites/favourites';
import {Settings} from './pages/settings/settings';
import {Restaurant} from './pages/restaurant/restaurant';
import {Mood} from './pages/mood/mood';

export const routes: Routes = [
  { path: '', component: Home }, // La ruta vacía carga el Home por defecto
  { path: 'login', component: Login },
  { path: 'favourites', component: Favourites },
  { path: 'mood', component: Mood },
  { path: 'restaurant', component: Restaurant },
  { path: 'settings', component: Settings },
  { path: '**', redirectTo: '' } // Si ponen una URL rara, los mandamos al Home
];
