import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModules } from '../../../../../material/material.modules';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ...MaterialModules
    ],
    templateUrl: './alert-message.component.html',
    styles: ``
})
export class AlertMessageComponent
{
    constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) {}
}
