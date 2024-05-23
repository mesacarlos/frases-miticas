import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { MaterialModules } from '../../../material/material.modules';
import Theme, { DocsSiteTheme } from '../../utils/theme';
import { StyleManager } from '../style-manager/style-manager';

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
    public currentTheme: DocsSiteTheme | undefined;

    constructor(
        public styleManager: StyleManager,
        private router: Router
    ) {}

    ngOnInit(): void
    {
        this.configTheme();
    }

    public logout()
    {
        localStorage.setItem('token', '');
        this.router.navigate(['/login']);
    }

    public configTheme(): void
    {
        const isDarkMode: boolean = Theme.isDarkMode();
        this.themeIcon = isDarkMode ? 'brightness_6' : 'brightness_2';

        this.currentTheme = Theme.themes.find(t => t.isDark === isDarkMode);

        this.styleManager.setStyle('theme', `${ this.currentTheme?.name }.css`)
    }

    public changeTheme(): void
    {
        Theme.changeTheme();
        this.configTheme();
    }

}
