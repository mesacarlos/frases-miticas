import { Component, OnInit } from '@angular/core';

import { MaterialModules } from '../../material/material.modules';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../auth/interfaces/user.interface';
import { AuthService } from '../auth/services/auth.service';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        ...MaterialModules,
        NavbarComponent,
        RouterOutlet
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit
{
    public user: User | null = null;
    public loading: boolean = true;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void
    {
        this.authService.getUserSelf()
            .subscribe(user =>
            {
                this.user = user;
                this.loading = false;

                if (this.user == null)
                    this.router.navigateByUrl('/home');
            });
    }

    public onShowPhrases(): void
    {
        this.router.navigateByUrl('control-panel/phrases');
    }

    public onShowUsers(): void
    {
        this.router.navigateByUrl('control-panel/users');
    }
}
