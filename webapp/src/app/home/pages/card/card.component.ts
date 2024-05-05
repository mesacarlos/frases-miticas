import { Component, Input } from '@angular/core';
import { Phrase } from '../../interfaces/phrases.interfaces';
import { MaterialModules } from '../../../../material/material.modules';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CommentsListComponent } from '../comments/commentsList/comments-list.component';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
		NgFor,
        ...MaterialModules
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css'
})
export class CardComponent
{
    @Input()
    phrase: Phrase = {
        id: 0,
        author: '',
        date: '',
        text: '',
        context: '',
        involvedUsers: []
    };

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
    }
}
