import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { MaterialModules } from '../../../material/material.modules';
import { StyleManager } from '../style-manager/style-manager';
import Theme, { DocsSiteTheme } from '../../utils/theme';

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
    public isAdmin: boolean = false;

    constructor(
        private authService: AuthService,
        private styleManager: StyleManager,
        private router: Router
    ) {}

    ngOnInit(): void
    {
        this.configTheme();
        this.isAdmin = this.authService.isAdmin();
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
