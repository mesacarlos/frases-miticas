import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import Theme from './utils/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: ``
})
export class AppComponent implements OnInit
{
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void
    {
        Theme.checkTheme();

        if (!this.authService.verifyToken())
        {
            localStorage.setItem('token', '');
            this.router.navigate(['/login']);
        }
    }
}
