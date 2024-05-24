import { Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { adminRoute, privateRoute, publicRoute } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/pages/login/login.component';
import { PhrasesComponent } from './admin/phrases/phrases.component';
import { PhrasesListComponent } from './home/pages/phrases/phrasesList/phrases-list.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './admin/users/users.component';

export const routes: Routes =
[
    { path: 'home', component: PhrasesListComponent, canActivate: [privateRoute] },
    { path: 'login', component: LoginComponent, canActivate: [publicRoute] },
    { path: 'settings', component: SettingsComponent, canActivate: [privateRoute] },
    {
        path: 'control-panel',
        component: AdminComponent,
        canActivate: [adminRoute],
        children: [
            { path: 'phrases', component: PhrasesComponent },
            { path: 'users', component: UsersComponent }
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
