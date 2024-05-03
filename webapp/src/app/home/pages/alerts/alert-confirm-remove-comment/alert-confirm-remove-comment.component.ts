import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModules } from '../../../../../material/material.modules';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ...MaterialModules
    ],
    templateUrl: './alert-confirm-remove-comment.component.html',
    styles: ``
})
export class AlertConfirmRemoveCommentComponent
{
    public deleteConfirm(): boolean
    {
        return true;
    }
}
