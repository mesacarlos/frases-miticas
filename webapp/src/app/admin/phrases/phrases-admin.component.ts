import { Component } from '@angular/core';

import PhraseManagement from '../../utils/phraseManagement';
import { PhrasesService } from '../../home/services/phrases.service';

@Component({
    selector: 'app-admin-phrases',
    standalone: true,
    imports: [],
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
