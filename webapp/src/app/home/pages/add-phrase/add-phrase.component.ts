import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MaterialModules } from '../../../../material/material.modules';
import { AddPhrase } from '../../interfaces/phrases.interfaces';
import { PhrasesService } from '../../services/phrases.service';
import { AlertAddPhraseComponent } from '../alert-add-phrase/alert-add-phrase.component';

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
    @Output()
    public sendEvent = new EventEmitter<any>();
    public errorEmptyAuthor: boolean = false;
    public errorEmptyText: boolean = false;

    constructor(
        private phrasesService: PhrasesService,
        private snackBar: MatSnackBar
    ) {}

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

    public showAlert(): void
    {
        this.snackBar.openFromComponent(AlertAddPhraseComponent, {
            duration: 4000
        });
    }
}
