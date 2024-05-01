import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MaterialModules } from '../../../../material/material.modules';
import { AddPhrase } from '../../interfaces/phrases.interfaces';

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
export class AddPhraseComponent
{
    public errorEmptyAuthor: boolean = false;
    public errorEmptyText: boolean = false;

    public phraseForm = new FormGroup({
        author:     new FormControl<string>(''),
        date:       new FormControl<Date>(new Date()),
        text:       new FormControl<string>(''),
        context:    new FormControl<string>('')
    });

    public addPhrase()
    {
        if (this.thereAreEmptyFields())
            return;
    }

    get currentPhrase(): AddPhrase
    {
        return this.phraseForm.value as AddPhrase;
    }

    private thereAreEmptyFields(): boolean
    {
        if (this.currentPhrase.author === '')
            this.errorEmptyAuthor = true;
        else
            this.errorEmptyAuthor = false;

        if (this.currentPhrase.text === '')
            this.errorEmptyText = true;
        else
            this.errorEmptyText = false;

        return this.errorEmptyAuthor || this.errorEmptyText;
    }
}
