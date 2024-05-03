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
    templateUrl: './alert-remove-comments.component.html',
    styles: ``
})
export class AlertRemoveCommentsComponent
{
    constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) {}
}
