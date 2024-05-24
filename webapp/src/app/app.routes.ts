import { Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { PhrasesListComponent } from './home/pages/phrases/phrasesList/phrases-list.component';
import { adminRoute, privateRoute, publicRoute } from './auth/guards/auth.guard';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes =
[
    { path: 'home', component: PhrasesListComponent, canActivate: [privateRoute] },
    { path: 'login', component: LoginComponent, canActivate: [publicRoute] },
    { path: 'settings', component: SettingsComponent, canActivate: [privateRoute] },
    { path: 'control-panel', component: AdminComponent, canActivate: [adminRoute] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
