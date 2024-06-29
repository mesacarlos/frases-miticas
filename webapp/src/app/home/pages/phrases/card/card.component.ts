import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AlertConfirmComponent } from '../../alerts/alert-confirm/alert-confirm.component';
import { AlertMessageComponent } from '../../alerts/alert-message/alert-message.component';
import { CommentsListComponent } from '../../comments/commentsList/comments-list.component';
import { EditPhraseComponent } from '../edit/edit-phrase.component';
import { MaterialModules } from '../../../../../material/material.modules';
import { Phrase } from '../../../interfaces/phrases.interface';
import { PhrasesService } from '../../../services/phrases.service';
import { ReactionComponent } from '../reaction/reaction.component';

import Util, { SkeletonReaction } from '../../../../utils/util';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        ...MaterialModules,
        ReactionComponent
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css'
})
export class CardComponent implements OnInit
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
        reactions: [],
        commentCount: 0
    };
    @Output() reloadPhrases = new EventEmitter<{ id: number, commentCount: number }>();

    public reactionIcon: string = 'favorite_border';
    public numLikes: number = 0;
    public userHasReacted: boolean = false;
    public reactions: DisplayReaction = {
        "like": 0,
        "dislike": 0,
        "love": 0,
        "fire": 0
    };

    public iconReactions: SkeletonReaction = Util.getReactions();

    constructor(
        private dialog: MatDialog,
        private phrasesService: PhrasesService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void
    {
        this.countReactions();
    }

    public viewComments(): void
    {
        this.openDialog(Util.getWindowWidth());
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

        const dialogRef = this.dialog.open(EditPhraseComponent, {
            width: Util.getWindowWidth(),
            data: this.phrase
        });

        dialogRef.componentInstance.sendEvent.subscribe(() =>
        {
            dialogRef.close();
            this.reloadPhrases.emit(undefined);
        });
    }

    private countReactions(): void
    {
        this.phrase.reactions.forEach(element =>
        {
            this.reactions[element.type]++;
        });
    }

    public getKeys(): string[]
    {
        return Object.keys(this.reactions);
    }

}

interface DisplayReaction
{
    [icon: string]: number;
}
