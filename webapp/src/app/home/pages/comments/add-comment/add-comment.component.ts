import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AddComment } from '../../../interfaces/phrases.interfaces';
import { MaterialModules } from '../../../../../material/material.modules';
import { PhrasesService } from '../../../services/phrases.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMessageComponent } from '../../alerts/alert-message/alert-message.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ...MaterialModules,
        ReactiveFormsModule
    ],
    templateUrl: './add-comment.component.html',
    styles: ``
})
export class AddCommentComponent
{
    @Output()
    public sendEvent = new EventEmitter<any>();
    public errorEmptyComment: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public idQuote: number,
        private phrasesService: PhrasesService,
        private snackBar: MatSnackBar
    ) {}

    public commentForm = new FormGroup({
        comment:     new FormControl<string>('')
    });

    get currentComment(): AddComment
    {
        return this.commentForm.value as AddComment;
    }

    public addComment(): void
    {
        if (this.thereAreEmptyFields())
            return;

        this.phrasesService.addComment(this.idQuote, this.currentComment.comment)
            .subscribe( response =>
            {
                let message = 'No se ha podido añadir el comentario';

                if (response)
                {
                    message = '¡Comentario añadido!';
                    this.commentForm.reset();
                    this.sendEvent.emit();
                }

                this.showAlert(message);
            });
    }

    private thereAreEmptyFields()
    {
        this.errorEmptyComment = this.currentComment.comment === '';

        return this.errorEmptyComment;
    }

    public showAlert(message: string): void
    {
        this.snackBar.openFromComponent(AlertMessageComponent, {
            duration: 4000,
            data: message
        });
    }
}
