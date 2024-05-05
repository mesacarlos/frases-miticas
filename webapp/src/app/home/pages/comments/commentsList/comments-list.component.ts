import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { MaterialModules } from '../../../../../material/material.modules';
import { PhrasesService } from '../../../services/phrases.service';
import { Comment } from '../../../interfaces/phrases.interfaces';
import { AlertMessageComponent } from '../../alerts/alert-message/alert-message.component';
import { AlertConfirmComponent } from '../../alerts/alert-confirm/alert-confirm.component';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ...MaterialModules
    ],
    templateUrl: './comments-list.component.html',
    styleUrl: './comments-list.component.css'
})
export class CommentsListComponent implements OnInit
{
    @Input()
    public idQuote: number = 0;
    public comments: Comment[] = [];
    public loading: boolean = true;

    constructor(
        private phrasesService: PhrasesService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
    ) {}

    ngOnInit(): void
    {
        this.loadComments();
    }

    private loadComments(): void
    {
        this.phrasesService.getCommentsByQuote(this.idQuote).subscribe(response =>
        {
            this.comments = response;

            this.loading = false;
        });
    }

    public openDialog(idQuote: number, idComment: number)
    {
        const dialogRef = this.dialog.open(AlertConfirmComponent, {
            data: { title: '¿Quieres eliminar este comentario?', message: 'No podrás deshacer el cambio' }
        });

        dialogRef.afterClosed().subscribe(result =>
        {
            if (result)
                this.deleteComment(idQuote, idComment);
        });
    }

    public deleteComment(idQuote: number, idComment: number): void
    {
        this.phrasesService.deleteComment(idQuote, idComment).subscribe(response =>
        {
            let message = 'No se ha podido borrar el comentario';

            if (response)
                message = 'Se ha borrado el comentario';

            this.showAlert(message);
            this.loadComments();
        });
    }

    public showAlert(message: string): void
    {
        this.snackBar.openFromComponent(AlertMessageComponent, {
            duration: 4000,
            data: message
        });
    }
}
