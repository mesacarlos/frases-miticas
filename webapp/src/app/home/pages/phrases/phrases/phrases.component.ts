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
import Util from '../../../../utils/util';

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

        this.phraseMng.setPageSize(this.itemsPerPage)
                        .setPageIndex(this.pageIndex)
                        .loadPhrases();
    }

    public searchForm = new FormGroup({
        search:     new FormControl<string>('')
    });

    public addPhrase()
    {
        this.openDialog(Util.getWindowWidth());
    }

    private openDialog(width: string): void
    {
        const dialogRef = this.dialog.open(AddPhraseComponent, { width: width });

        dialogRef.componentInstance.sendEvent.subscribe(() =>
        {
            dialogRef.close();
            this.phraseMng.loadPhrases();
        });
    }

    public handlePageEvent(e: PageEvent): void
    {
        this.phraseMng.length = e.length;
        this.itemsPerPage = e.pageSize;
        this.pageIndex = e.pageIndex + 1;

        this.phraseMng.setPageSize(this.itemsPerPage)
                        .setPageIndex(this.pageIndex)
                        .loadPhrases();
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

        this.phraseMng.setSearch(this.currentPhrase.search).loadPhrases();
    }

    public onFilter(event: MatSelectChange)
    {
        this.userFilter = event.value;

        this.phraseMng.setAuthors(this.userFilter.map(u => u.id)).loadPhrases();
    }

    public filterFrom(event: MatDatepickerInputEvent<Date>): void
    {
        if (event.value === null)
            return;

        this.dateFrom = new Date(event.value);

        this.phraseMng.setFrom(this.dateFrom).loadPhrases();
    }

    public filterTo(event: MatDatepickerInputEvent<Date>): void
    {
        if (event.value === null)
            return;

        this.dateTo = new Date(event.value);

        this.phraseMng.setTo(this.dateTo).loadPhrases();
    }

    public clearFilter(): void
    {
        this.userFilter = [];
        this.dateFrom = new Date("2015-01-01");
        this.dateTo = new Date();

        this.authorSelect.writeValue(this.userFilter);

        this.phraseMng.resetState()
                        .setPageSize(this.itemsPerPage)
                        .setPageIndex(this.pageIndex)
                        .loadPhrases();
    }

    public onRealoadPhrases(event: { id: number, commentCount: number } | undefined)
    {
        if (event === undefined)
        {
            this.phraseMng.loadPhrases();
            return;
        }

        const phrase: Phrase | undefined = this.phraseMng.phrases.find(p => p.id === event.id);

        if (phrase)
            phrase.commentCount = event.commentCount;
    }

}
