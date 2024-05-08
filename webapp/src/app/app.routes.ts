import { Routes } from '@angular/router';

import { PhrasesListComponent } from './home/pages/phrases/phrasesList/phrases-list.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { privateRoute, publicRoute } from './auth/guards/auth.guard';
import { SettingsComponent } from './settings/settings.component';
//import { RegisterComponent } from './auth/pages/register/register.component';

export const routes: Routes =
[
    { path: 'home', component: PhrasesListComponent, canActivate: [privateRoute] },
    { path: 'login', component: LoginComponent, canActivate: [publicRoute] },
    { path: 'settings', component: SettingsComponent, canActivate: [privateRoute] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
