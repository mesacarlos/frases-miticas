import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    constructor (
        @Inject(MAT_DIALOG_DATA) public data: Data
    ) {}

    public deleteConfirm(): boolean
    {
        return true;
    }
}

export interface Data
{
    title: string;
    message: string;
}
