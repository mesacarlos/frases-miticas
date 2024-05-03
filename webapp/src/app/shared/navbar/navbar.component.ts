import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MaterialModules } from '../../../material/material.modules';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        ...MaterialModules,
        RouterModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent
{
    constructor(private router: Router) {}

    public logout()
    {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    public openDialog(): void
    {

    }
}
