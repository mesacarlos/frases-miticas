import { Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { adminRoute, privateRoute, publicRoute } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/pages/login/login.component';
import { PhrasesAdminComponent } from './admin/phrases/phrases-admin.component';
import { PhrasesComponent } from './home/pages/phrases/phrases/phrases.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersAdminComponent } from './admin/users/users-admin.component';

export const routes: Routes =
[
    { path: 'home', component: PhrasesComponent, canActivate: [privateRoute] },
    { path: 'login', component: LoginComponent, canActivate: [publicRoute] },
    { path: 'settings', component: SettingsComponent, canActivate: [privateRoute] },
    {
        path: 'control-panel',
        component: AdminComponent,
        canActivate: [adminRoute],
        children: [
            { path: 'phrases', component: PhrasesAdminComponent },
            { path: 'users', component: UsersAdminComponent }
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
