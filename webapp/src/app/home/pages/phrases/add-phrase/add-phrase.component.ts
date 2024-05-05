import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AddPhrase } from '../../../interfaces/phrases.interfaces';
import { AlertMessageComponent } from '../../alerts/alert-message/alert-message.component';
import { MaterialModules } from '../../../../../material/material.modules';
import { PhrasesService } from '../../../services/phrases.service';

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
}
