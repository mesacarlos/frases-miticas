import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CommentsListComponent } from '../../comments/commentsList/comments-list.component';
import { MaterialModules } from '../../../../../material/material.modules';
import { Phrase } from '../../../interfaces/phrases.interface';
import { PhrasesService } from '../../../services/phrases.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMessageComponent } from '../../alerts/alert-message/alert-message.component';
import { AlertConfirmComponent } from '../../alerts/alert-confirm/alert-confirm.component';
import { EditPhraseComponent } from '../edit/edit-phrase.component';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        ...MaterialModules
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css'
})
export class CardComponent
{
    @Input()
    public isAdmin: boolean = false;
    @Input()
    phrase: Phrase = {
        id: 0,
        author: '',
        date: '',
        text: '',
        context: '',
        involvedUsers: [],
        commentCount: 0
    };
    @Output() reloadPhrases = new EventEmitter<{ id: number, commentCount: number }>();

    // implements on init and check if publication like
    public likeIcon: string = 'favorite_border';
    public numLikes: number = 0;

    constructor(
        private dialog: MatDialog,
        private phrasesService: PhrasesService,
        private snackBar: MatSnackBar
    ) {}

    public giveLike(): void
    {
        if (this.likeIcon === 'favorite_border')
        {
            this.likeIcon = 'favorite';
            this.numLikes++;
            return;
        }

        this.likeIcon ='favorite_border';
        this.numLikes--;
    }

    public viewComments(): void
    {
        let width: string = '60%';

        if (window.innerWidth < 600)
            width = '95%';

        this.openDialog(width);
    }

    private openDialog(width: string): void
    {
        const dialogRef = this.dialog.open(CommentsListComponent, { width: width });

        dialogRef.componentInstance.idQuote = this.phrase.id;

        dialogRef.afterClosed().subscribe( () =>
        {
            if (dialogRef.componentInstance.emitChanges)
            {
                this.phrase.commentCount += dialogRef.componentInstance.balanceOfComments;
                this.reloadPhrases.emit({ id: this.phrase.id, commentCount: this.phrase.commentCount })
            }
        });
    }

    public delete(): void
    {
        if (!this.isAdmin)
            return;

        const dialogRef = this.dialog.open(AlertConfirmComponent, {
            data: { title: '¿Quieres eliminar esta frase?', message: 'No podrás deshacer el cambio' }
        });

        dialogRef.afterClosed().subscribe(result =>
        {
            if (result)
            {
                this.phrasesService.deletePhrase(this.phrase.id)
                    .subscribe(response =>
                    {
                        if (response)
                        {
                            this.snackBar.openFromComponent(AlertMessageComponent, {
                                duration: 4000,
                                data: 'Frase eliminada'
                            });

                            this.reloadPhrases.emit(undefined);
                        }
                });
            }
        });
    }

    public edit(): void
    {
        if (!this.isAdmin)
            return;

        let width: string = '60%';

        if (window.innerWidth < 600)
            width = '95%';

        const dialogRef = this.dialog.open(EditPhraseComponent, {
            width: width,
            data: this.phrase
        });

        dialogRef.componentInstance.sendEvent.subscribe(() =>
        {
            dialogRef.close();
            this.reloadPhrases.emit(undefined);
        });
    }
}
