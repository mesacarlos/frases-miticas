import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CommentsListComponent } from '../../comments/commentsList/comments-list.component';
import { MaterialModules } from '../../../../../material/material.modules';
import { Phrase } from '../../../interfaces/phrases.interface';

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
        private dialog: MatDialog
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
    }

    public edit(): void
    {
        if (!this.isAdmin)
            return;
    }
}
