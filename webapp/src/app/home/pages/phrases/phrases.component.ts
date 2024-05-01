import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { Phrase } from '../../interfaces/phrases.interfaces';
import { CardComponent } from '../card/card.component';
import { MaterialModules } from '../../../../material/material.modules';
import { AddPhraseComponent } from '../add-phrase/add-phrase.component';
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
    styleUrl: './phrases.component.css'
})
export class PhrasesComponent implements OnInit
{
    public phrases: Phrase[] = [];
    public loading: boolean = true;

    public length: number = 0;
    public itemsPerPage: number = 25;
    public pageIndex: number = 1;

    constructor (
        public dialog: MatDialog,
        private phrasesService: PhrasesService,

    ) {}

    ngOnInit(): void
    {
        this.loadPhrases(this.itemsPerPage, this.pageIndex);
    }

    public addPhrase()
    {
        let width: string = '';

        if (window.innerWidth < 600)
            width = '95%';
        else
            width = '60%';

        this.openDialog(width);
    }

    private openDialog(width: string): void
    {
        const dialogRef = this.dialog.open(AddPhraseComponent, { width: width });

        dialogRef.componentInstance.sendEvent.subscribe(() =>
        {
            dialogRef.close();
            this.loadPhrases(this.itemsPerPage, this.pageIndex);
        });
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

    public handlePageEvent(e: PageEvent)
    {
        this.length = e.length;
        this.itemsPerPage = e.pageSize;
        this.pageIndex = e.pageIndex + 1;

        this.loadPhrases(this.itemsPerPage, this.pageIndex);
    }

}
