import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AddPhraseComponent } from '../add/add-phrase.component';
import { CardComponent } from '../card/card.component';
import { MaterialModules, MyPaginator, appDateFormat } from '../../../../../material/material.modules';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { Phrase, Search } from '../../../interfaces/phrases.interface';
import { PhrasesService } from '../../../services/phrases.service';
import { User } from '../../../../auth/interfaces/users.interface';
import { UsersService } from '../../../services/users.service';

import PhraseManagement from '../../../../utils/phraseManagement';

@Component({
    selector: 'app-list-phrases',
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
    templateUrl: './phrases.component.html',
    styleUrl: './phrases.component.css'
})
export class PhrasesComponent implements OnInit
{
    @Input()
    public isAdmin: boolean = false;

    public phraseMng: PhraseManagement = PhraseManagement.getInstance(this.phrasesService);
    public usersList: User[] = [];
    public userFilter: User[] = [];
    public dateFrom: Date = new Date("2015-01-01");
    public dateTo: Date = new Date();

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

        this.phraseMng.loadPhrases(this.itemsPerPage, this.pageIndex);
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
            this.phraseMng.loadPhrases(this.itemsPerPage, this.pageIndex);
        });
    }

    public handlePageEvent(e: PageEvent): void
    {
        this.phraseMng.length = e.length;
        this.itemsPerPage = e.pageSize;
        this.pageIndex = e.pageIndex + 1;

        this.phraseMng.loadPhrases(this.itemsPerPage, this.pageIndex);
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

        this.phraseMng.loadPhrases(this.itemsPerPage, this.pageIndex, this.currentPhrase.search);
    }

    public onFilter(event: MatSelectChange)
    {
        this.userFilter = event.value;

        this.phraseMng.loadPhrases(this.itemsPerPage, this.pageIndex, this.currentPhrase.search, this.dateFrom, this.dateTo, this.userFilter.map(u => u.id));
    }

    public filterFrom(event: MatDatepickerInputEvent<Date>): void
    {
        if (event.value === null)
            return;

        this.dateFrom = new Date(event.value);

        this.phraseMng.loadPhrases(this.itemsPerPage, this.pageIndex, this.currentPhrase.search, this.dateFrom, this.dateTo, this.userFilter.map(u => u.id));
    }

    public filterTo(event: MatDatepickerInputEvent<Date>): void
    {
        if (event.value === null)
            return;

        this.dateTo = new Date(event.value);

        this.phraseMng.loadPhrases(this.itemsPerPage, this.pageIndex, this.currentPhrase.search, this.dateFrom, this.dateTo, this.userFilter.map(u => u.id));
    }

    public clearFilter(): void
    {
        this.userFilter = [];
        this.dateFrom = new Date("2015-01-01");
        this.dateTo = new Date();

        this.authorSelect.writeValue(this.userFilter);
        this.phraseMng.loadPhrases(this.itemsPerPage, this.pageIndex, this.currentPhrase.search);
    }

    public onRealoadPhrases(event: { id: number, commentCount: number } | undefined)
    {
        if (event === undefined)
        {
            this.phraseMng.loadPhrases(this.itemsPerPage, this.pageIndex, this.currentPhrase.search, this.dateFrom, this.dateTo, this.userFilter.map(u => u.id));
            return;
        }

        const phrase: Phrase | undefined = this.phraseMng.phrases.find(p => p.id === event.id);

        if (phrase)
            phrase.commentCount = event.commentCount;
    }

}
