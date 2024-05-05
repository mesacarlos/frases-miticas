import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModules } from '../../../../../material/material.modules';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ...MaterialModules
    ],
    templateUrl: './alert-confirm.component.html',
    styles: ``
})
export class AlertConfirmComponent
{
    public title: string = '';
    public message: string = '';

    public deleteConfirm(): boolean
    {
        return true;
    }
}
