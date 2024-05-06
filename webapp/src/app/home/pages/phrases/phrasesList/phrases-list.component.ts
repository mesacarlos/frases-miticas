import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AddPhraseComponent } from '../add-phrase/add-phrase.component';
import { CardComponent } from '../../card/card.component';
import { MaterialModules, MyPaginator, appDateFormat } from '../../../../../material/material.modules';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { Phrase, Search } from '../../../interfaces/phrases.interfaces';
import { PhrasesService } from '../../../services/phrases.service';
import { User } from '../../../../auth/interfaces/user.interfaces';
import { UsersService } from '../../../services/users.service';

@Component({
    standalone: true,
    imports: [
        ...MaterialModules,
        CardComponent,
        CommonModule,
        NavbarComponent,
        ReactiveFormsModule
    ],
    providers: [
        provideNativeDateAdapter(),
        { provide: MatPaginatorIntl, useValue: MyPaginator() },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: appDateFormat }
    ],
    templateUrl: './phrases-list.component.html',
    styleUrl: './phrases-list.component.css'
})
export class PhrasesListComponent implements OnInit
{
    public phrases: Phrase[] = [];
    public loading: boolean = true;
    public usersList: User[] = [];
    public userFilter: User[] = [];
    public dateFrom: Date = new Date("2015-01-01");
    public dateTo: Date = new Date();

    public length: number = 0;
    public itemsPerPage: number = 25;
    public pageIndex: number = 1;

    @ViewChild('authorSelect') authorSelect!: MatSelect;

    constructor (
        public dialog: MatDialog,
        private phrasesService: PhrasesService,
        private userService: UsersService
    ) {}

    ngOnInit(): void
    {
        this.userService.getUsers()
            .subscribe(response => this.usersList = response);

        this.loadPhrases(this.itemsPerPage, this.pageIndex);
    }

    public searchForm = new FormGroup({
        search:     new FormControl<string>('')
    });

    public addPhrase()
    {
        let width: string = '60%';

        if (window.innerWidth < 600)
            width = '95%';

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

    private loadPhrases(
        pageSize: number = -1,
        pageIndex: number = 1,
        search: string = '',
        from: Date = new Date(0),
        to: Date = new Date(),
        authors: number[] = this.usersList.map(u => u.id)
    )
    {
        this.loading = true;

        this.phrasesService.getPhrases(pageSize, pageIndex, search, from, to, authors)
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

    public handlePageEvent(e: PageEvent): void
    {
        this.length = e.length;
        this.itemsPerPage = e.pageSize;
        this.pageIndex = e.pageIndex + 1;

        this.loadPhrases(this.itemsPerPage, this.pageIndex);
    }

    public scrollToTop(): void
    {
        window.scrollTo(0, 0);
    }

    get currentPhrase(): Search
    {
        return this.searchForm.value as Search;
    }

    public search(keypress: boolean): void
    {
        if (this.currentPhrase.search === '' && !keypress)
            return;

        this.loadPhrases(this.itemsPerPage, this.pageIndex, this.currentPhrase.search);
    }

    public onFilter(event: MatSelectChange)
    {
        this.userFilter = event.value;

        this.loadPhrases(this.itemsPerPage, this.pageIndex, this.currentPhrase.search, this.dateFrom, this.dateTo, this.userFilter.map(u => u.id));
    }

    public filterFrom(event: MatDatepickerInputEvent<Date>): void
    {
        if (event.value === null)
            return;

        this.dateFrom = new Date(event.value);

        this.loadPhrases(this.itemsPerPage, this.pageIndex, this.currentPhrase.search, this.dateFrom, this.dateTo, this.userFilter.map(u => u.id));
    }

    public filterTo(event: MatDatepickerInputEvent<Date>): void
    {
        if (event.value === null)
            return;

        this.dateTo = new Date(event.value);

        this.loadPhrases(this.itemsPerPage, this.pageIndex, this.currentPhrase.search, this.dateFrom, this.dateTo, this.userFilter.map(u => u.id));
    }

    public clearFilter(): void
    {
        this.userFilter = [];
        this.dateFrom = new Date("2015-01-01");
        this.dateTo = new Date();

        this.authorSelect.writeValue(this.userFilter);
    }

}
