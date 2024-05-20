import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AddCommentComponent } from '../add-comment/add-comment.component';
import { AlertConfirmComponent } from '../../alerts/alert-confirm/alert-confirm.component';
import { AlertMessageComponent } from '../../alerts/alert-message/alert-message.component';
import { AuthService } from '../../../../auth/services/auth.service';
import { Comment } from '../../../interfaces/comments.interface';
import { CommentsService } from '../../../services/comments.service';
import { MaterialModules } from '../../../../../material/material.modules';
import { UpdateCommentComponent } from '../update-comment/update-comment.component';

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
    public username: string = '';
    public loading: boolean = true;
    public emitChanges: boolean = false;
    public balanceOfComments: number = 0;

    constructor(
        private commentsService: CommentsService,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
    ) {}

    ngOnInit(): void
    {
        this.emitChanges = false;

        this.authService.getUsername()
            .subscribe(response =>
            {
                this.username = response;
            });

        this.loadComments();
    }

    private loadComments(): void
    {
        this.commentsService.getCommentsByQuote(this.idQuote).subscribe(response =>
        {
            this.comments = response;

            this.loading = false;
        });
    }

    public openDialogDelete(idQuote: number, idComment: number)
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
        this.commentsService.deleteComment(idQuote, idComment).subscribe(response =>
        {
            let message = 'No se ha podido borrar el comentario';

            if (response)
                message = 'Se ha borrado el comentario';

            this.emitChanges = true;
            this.balanceOfComments--;
            this.showAlert(message);
            this.loadComments();
        });
    }

    public editComment(idQuote: number, idComment: number, message: string): void
    {
        let width: string = '60%';

        if (window.innerWidth < 600)
            width = '95%';

        const dialogRef = this.dialog.open(UpdateCommentComponent, {
            data: { idQuote: idQuote, idComment: idComment, message: message },
            width: width
        });

        dialogRef.componentInstance.sendEvent.subscribe(() =>
        {
            dialogRef.close();
            this.emitChanges = false;
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

    public openAddCommentForm(idQuote: number): void
    {
        let width: string = '60%';

        if (window.innerWidth < 600)
            width = '95%';

        const dialogRef = this.dialog.open(AddCommentComponent, {
            data: idQuote,
            width: width
        });

        dialogRef.componentInstance.sendEvent.subscribe(() =>
        {
            this.emitChanges = true;
            this.balanceOfComments++;
            dialogRef.close();
            this.loadComments();
        });
    }
}
