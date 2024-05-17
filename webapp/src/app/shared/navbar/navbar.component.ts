import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MaterialModules } from '../../../material/material.modules';
import Theme from '../../utils/theme';

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
export class NavbarComponent implements OnInit
{
    public themeIcon: string = '';

    constructor(private router: Router) {}

    ngOnInit(): void
    {
        this.configTheme();
    }

    public logout()
    {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    public configTheme(): void
    {
        this.themeIcon = Theme.isDarkMode() ? 'brightness_6' : 'brightness_2';
    }

    public changeTheme(): void
    {
        Theme.changeTheme();
        this.configTheme();
    }
}
