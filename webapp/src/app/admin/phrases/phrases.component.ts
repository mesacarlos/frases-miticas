import { Component } from '@angular/core';

import PhraseManagement from '../../utils/phraseManagement';
import { PhrasesService } from '../../home/services/phrases.service';

@Component({
    selector: 'app-admin-phrases',
    standalone: true,
    imports: [],
    templateUrl: './phrases.component.html',
    styles: ``
})
export class PhrasesComponent
{
    public phraseMng: PhraseManagement = PhraseManagement.getInstance(this.phrasesService);

    constructor (
        private phrasesService: PhrasesService
    ) {}

}
