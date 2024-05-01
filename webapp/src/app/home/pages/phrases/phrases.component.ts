import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { Phrase } from '../../interfaces/phrases.interfaces';
import { CardComponent } from '../card/card.component';
import { MaterialModules } from '../../../../material/material.modules';
import { AddPhraseComponent } from '../add-phrase/add-phrase.component';
import { CommonModule } from '@angular/common';
import { PhrasesService } from '../../services/phrases.service';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        NavbarComponent,
        CardComponent,
        ...MaterialModules
    ],
    templateUrl: './phrases.component.html',
    styles: ``
})
export class PhrasesComponent implements OnInit
{
    public phrases: Phrase[] = [];
    public loading: boolean = true;

    constructor (
        public dialog: MatDialog,
        private phrasesService: PhrasesService
    ) {}

    ngOnInit(): void
    {
        this.phrasesService.getPhrases()
            .subscribe(response =>
            {
                if (response)
                    this.phrases = response.phrases;

                this.loading = false;
            });
    }

    public addPhrase()
    {
        let width: string = '';

        if (window.innerWidth < 600)
            width = '95%';
        else
            width = '60%';

        this.dialog.open(AddPhraseComponent, { width: width });
    }
}
