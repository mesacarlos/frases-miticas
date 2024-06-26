import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AddPhrase } from '../../../interfaces/phrases.interface';
import { AlertMessageComponent } from '../../alerts/alert-message/alert-message.component';
import { MaterialModules, appDateFormat } from '../../../../../material/material.modules';
import { PhrasesService } from '../../../services/phrases.service';
import { User } from '../../../../auth/interfaces/users.interface';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-add-phrase',
    standalone: true,
    imports: [
        ...MaterialModules,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        provideNativeDateAdapter(),
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: appDateFormat }
    ],
    templateUrl: './add-phrase.component.html',
    styles: ``
})
export class AddPhraseComponent implements OnInit
{
    @Output()
    public sendEvent = new EventEmitter<any>();
    public errorEmptyAuthor: boolean = false;
    public errorEmptyText: boolean = false;
    public usersList: User[] = [];
    public date: Date = new Date();

    constructor(
        private phrasesService: PhrasesService,
        private userService: UsersService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void
    {
        this.userService.getUsers()
            .subscribe(response => this.usersList = response);
    }

    public phraseForm = new FormGroup({
        author:     new FormControl<string>(''),
        text:       new FormControl<string>(''),
        context:    new FormControl<string>(''),
        users:      new FormControl<User[]>([])
    });

    public addPhrase()
    {
        if (this.thereAreEmptyFields())
            return;

        this.phrasesService.addPhrase(this.currentPhrase)
            .subscribe(response =>
            {
                if (response)
                {
                    this.showAlert();
                    this.phraseForm.reset();
                    this.sendEvent.emit();
                }
            });
    }

    get currentPhrase(): AddPhrase
    {
        const skeletonPhrase: AddPhrase = this.phraseForm.value as AddPhrase;

        skeletonPhrase.date = this.date;

        return skeletonPhrase;
    }

    private thereAreEmptyFields(): boolean
    {
        this.errorEmptyAuthor = this.currentPhrase.author === '';
        this.errorEmptyText = this.currentPhrase.text === '';

        return this.errorEmptyAuthor || this.errorEmptyText;
    }

    public showAlert(): void
    {
        this.snackBar.openFromComponent(AlertMessageComponent, {
            duration: 4000,
            data: '¡¡Frase añadida!!'
        });
    }

    public autocompleteAuthors(event: MatSelectChange)
    {
        const selectedValue: User[] = event.value;

        if (selectedValue.length > 0)
            this.phraseForm.get('author')?.setValue(selectedValue.map(user => user.fullName).join(', '));
        else
            this.phraseForm.get('author')?.setValue('');
    }

    public updateDate(event: MatDatepickerInputEvent<Date>): void
    {
        if (event.value)
            this.date = new Date(event.value);
    }

}
