import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { Phrase } from '../../interfaces/phrases.interfaces';
import { CardComponent } from '../card/card.component';
import { MaterialModules } from '../../../../material/material.modules';
import { AddPhraseComponent } from '../add-phrase/add-phrase.component';
import { PhrasesService } from '../../services/phrases.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        NavbarComponent,
        CardComponent,
        ...MaterialModules
    ],
    templateUrl: './phrases.component.html',
    styleUrl: './phrases.component.css'
})
export class PhrasesComponent implements OnInit
{
    public phrases: Phrase[] = [];
    public loading: boolean = true;

    public length: number = 0;
    public itemsPerPage: number = 25;

    constructor (
        public dialog: MatDialog,
        private phrasesService: PhrasesService
    ) {}

    ngOnInit(): void
    {
        this.loadPhrases(this.itemsPerPage);
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

    private loadPhrases(pageSize: number = -1, pageIndex: number = 1)
    {
        this.phrasesService.getPhrases(pageSize, pageIndex)
            .subscribe(response =>
            {
                if (response)
                {
                    this.phrases = response.phrases;
                    this.length = response.totalItems;
                }

                this.loading = false;
            });
    }

    handlePageEvent(e: PageEvent)
    {
        this.length = e.length;
        this.itemsPerPage = e.pageSize;

        this.loadPhrases(this.itemsPerPage, e.pageIndex + 1);
    }
}
