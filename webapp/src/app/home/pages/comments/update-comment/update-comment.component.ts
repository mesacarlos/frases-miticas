import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AddComment } from '../../../interfaces/comments.interface';
import { AlertMessageComponent } from '../../alerts/alert-message/alert-message.component';
import { CommentsService } from '../../../services/comments.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../../../../../material/material.modules';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ...MaterialModules,
        ReactiveFormsModule
    ],
    templateUrl: './update-comment.component.html',
    styles: ``
})
export class UpdateCommentComponent
{
    @Output()
    public sendEvent = new EventEmitter<any>();
    public errorEmptyComment: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Data,
        private commentsService: CommentsService,
        private snackBar: MatSnackBar
    ) {}

    public commentForm = new FormGroup({
        comment:     new FormControl<string>(this.data.message)
    });

    get currentComment(): AddComment
    {
        return this.commentForm.value as AddComment;
    }

    public updateComment(): void
    {
        if (this.thereAreEmptyFields())
            return;

        this.commentsService.updateComment(this.data.idQuote, this.data.idComment, this.currentComment.comment)
            .subscribe( response =>
            {
                let message = 'No se ha podido actualizar el comentario';

                if (response)
                {
                    message = '¡Comentario actualizado!';
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

export interface Data
{
    idQuote: number;
    idComment: number;
    message: string;
}
