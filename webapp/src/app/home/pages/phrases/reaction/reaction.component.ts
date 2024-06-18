import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../../auth/services/auth.service';
import { MaterialModules } from '../../../../../material/material.modules';
import { PhrasesService } from '../../../services/phrases.service';
import { Reaction } from '../../../interfaces/phrases.interface';
import { User } from '../../../../auth/interfaces/users.interface';

@Component({
    selector: 'app-reaction-button',
    standalone: true,
    imports: [
        ...MaterialModules,
        CommonModule,
        RouterModule
    ],
    templateUrl: './reaction.component.html',
    styles: ``
})
export class ReactionComponent implements OnInit
{
    // Fueguito:    &#128293;
    // Like:        &#128077;
    // Dislike:     &#128078;
    // Heart:       &#10084;
    @Input()
    public idPhrase: number = 0;
    @Input()
    public reactions: Reaction[] = [];

    public userSelf!: User;
    public userHasReacted: boolean = false;
    public currentReactions: CurrentReaction[] = [];

    constructor(
        private phraseService: PhrasesService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void
    {
        this.authService.getUserSelf().subscribe(res =>
            {
                if (res)
                {
                    this.userSelf = res;
                    this.loadReactions();
                }

                this.router.navigateByUrl('/home');
            });
    }

    public onReaction(reaction: string): void
    {
        this.currentReactions.forEach(r =>
            {
                if (r.type === reaction)
                {
                    if (r.selected)
                        this.removeReaction(reaction);
                    else
                        this.addReaction(reaction);
                }
            });
    }

    private addReaction(reaction: string): void
    {
        this.phraseService.addReactionPhrase(this.idPhrase, reaction).subscribe(response =>
            {
                if (response)
                    this.handleSelectedReaction(reaction);
            });
    }

    private removeReaction(reaction: string): void
    {
        this.phraseService.removeReactionPhrase(this.idPhrase, reaction).subscribe(response =>
            {
                if (response)
                    this.handleSelectedReaction(reaction);
            });
    }

    private userReactedTo(type: string): boolean
    {
        return this.reactions.some(r => r.type === type && r.userId === this.userSelf.id);
    }

    private loadReactions(): void
    {
        this.currentReactions = [
            { type: "like", icon: "&#128077;", selected: this.userReactedTo("like") },
            { type: "dislike", icon: "&#128078;", selected: this.userReactedTo("dislike") },
            { type: "love", icon: "&#129505;", selected: this.userReactedTo("love") },
            { type: "fire", icon: "&#128293;", selected: this.userReactedTo("fire") }
        ];
    }

    private handleSelectedReaction(reaction: string): void
    {
        this.currentReactions = this.currentReactions.map(r =>
            {
                if (r.type === reaction)
                    return { ...r, selected: !r.selected }

                return r;
            });
    }

}

interface CurrentReaction
{
    type: string;
    icon: string;
    selected: boolean;
}
