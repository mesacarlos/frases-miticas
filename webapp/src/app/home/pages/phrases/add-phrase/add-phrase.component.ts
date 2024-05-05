import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AddPhrase } from '../../../interfaces/phrases.interfaces';
import { AlertMessageComponent } from '../../alerts/alert-message/alert-message.component';
import { MaterialModules } from '../../../../../material/material.modules';
import { PhrasesService } from '../../../services/phrases.service';
import { User } from '../../../../auth/interfaces/user.interfaces';
import { UsersService } from '../../../services/users.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-add-phrase',
    standalone: true,
    imports: [
        ...MaterialModules,
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [
        provideNativeDateAdapter()
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
        date:       new FormControl<Date>(new Date()),
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
        return this.phraseForm.value as AddPhrase;
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

}
