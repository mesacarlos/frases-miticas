import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { MaterialModules } from '../../../../material/material.modules';

@Component({
    standalone: true,
    imports: [
        NavbarComponent,
        CommonModule,
        ...MaterialModules
    ],
    templateUrl: './settings.component.html',
    styles: ``
})
export class SettingsComponent
{
    public emptyOldPassword: boolean = false;
    public emptyNewPassword: boolean = false;
    public emptyNewPasswordConfirm: boolean = false;
    public error: string = '';
}
