import { Component } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        ...MaterialModules,
        NavbarComponent,
        RouterOutlet
    ],
    templateUrl: './admin.component.html',
    styles: ``
})
export class AdminComponent
{
    constructor(
        private router: Router
    ) {}

    public onShowPhrases(): void
    {
        this.router.navigateByUrl('control-panel/phrases');
    }

    public onShowUsers(): void
    {
        this.router.navigateByUrl('control-panel/users');
    }
}
