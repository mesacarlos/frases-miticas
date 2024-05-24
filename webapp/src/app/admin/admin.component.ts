import { Component } from '@angular/core';
import { MaterialModules } from '../../material/material.modules';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
    standalone: true,
    imports: [
        ...MaterialModules,
        NavbarComponent
    ],
    templateUrl: './admin.component.html',
    styles: ``
})
export class AdminComponent
{

}
