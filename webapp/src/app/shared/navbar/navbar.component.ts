import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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
export class NavbarComponent {

}
