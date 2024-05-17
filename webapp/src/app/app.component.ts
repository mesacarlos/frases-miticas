import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
    ngOnInit(): void
    {
        Theme.checkTheme();
    }
}
