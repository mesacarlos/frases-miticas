import { Routes } from '@angular/router';

import { PhrasesComponent } from './home/pages/phrases/phrases.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { privateRoute, publicRoute } from './auth/guards/auth.guard';
//import { RegisterComponent } from './auth/pages/register/register.component';

export const routes: Routes =
[
    { path: 'home', component: PhrasesComponent, canActivate: [privateRoute] },
    { path: 'login', component: LoginComponent, canActivate: [publicRoute] },
    //{ path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
