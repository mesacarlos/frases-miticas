import { Component } from '@angular/core';

import PhraseManagement from '../../utils/phraseManagement';
import { PhrasesService } from '../../home/services/phrases.service';
import { MaterialModules } from '../../../material/material.modules';
import { PhrasesComponent } from '../../home/pages/phrases/phrases/phrases.component';

@Component({
    selector: 'app-admin-phrases',
    standalone: true,
    imports: [
        ...MaterialModules,
        PhrasesComponent
    ],
    templateUrl: './phrases-admin.component.html',
    styles: ``
})
export class PhrasesAdminComponent
{
    public phraseMng: PhraseManagement = PhraseManagement.getInstance(this.phrasesService);

    constructor (
        private phrasesService: PhrasesService
    ) {}
}
