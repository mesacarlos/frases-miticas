import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MaterialModules } from '../../../../material/material.modules';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ...MaterialModules
    ],
    templateUrl: './alert-add-phrase.component.html',
    styles: ``
})
export class AlertAddPhraseComponent {

}
