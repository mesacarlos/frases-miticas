import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AlertMessageComponent } from '../../alerts/alert-message/alert-message.component';
import { EditPhrase, Phrase } from '../../../interfaces/phrases.interface';
import { MaterialModules, appDateFormat } from '../../../../../material/material.modules';
import { PhrasesService } from '../../../services/phrases.service';
import { User, InvolvedUser } from '../../../../auth/interfaces/user.interface';
import { UsersService } from '../../../services/users.service';

@Component({
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
    templateUrl: './edit-phrase.component.html',
    styles: ``
})
export class EditPhraseComponent implements OnInit
{
    @Output()
    public sendEvent = new EventEmitter<any>();
    public errorEmptyAuthor: boolean = false;
    public errorEmptyText: boolean = false;
    public usersList: User[] = [];
    public date: Date = new Date(this.phrase.date);

    constructor(
        private phrasesService: PhrasesService,
        private userService: UsersService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public phrase: Phrase
    ) {}

    ngOnInit(): void
    {
        this.userService.getUsers()
            .subscribe(response => this.usersList = response);
    }

    public phraseForm = new FormGroup({
        author:     new FormControl<string>(this.phrase.author),
        text:       new FormControl<string>(this.phrase.text),
        context:    new FormControl<string>(this.phrase.context ? this.phrase.context : ''),
        users:      new FormControl<User[]>(
                        this.phrase.involvedUsers.map( (user: InvolvedUser) => ({
                            id: user.id,
                            username: user.username,
                            fullName: user.fullname,
                            profilePictureUrl: user.profilePictureUrl,
                            isSuperAdmin: false
                        }))
                    )
    });

    public editPhrase()
    {
        if (this.thereAreEmptyFields())
            return;

        this.phrasesService.editPhrase(this.currentPhrase)
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

    get currentPhrase(): EditPhrase
    {
        const skeletonPhrase: EditPhrase = this.phraseForm.value as EditPhrase;

        skeletonPhrase.id = this.phrase.id;
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
            data: 'Frase editada'
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
