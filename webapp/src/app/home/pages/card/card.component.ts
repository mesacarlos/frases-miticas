import { Component, Input } from '@angular/core';
import { Phrase } from '../../interfaces/phrases.interfaces';
import { MaterialModules } from '../../../../material/material.modules';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        ...MaterialModules
    ],
    templateUrl: './card.component.html',
    styles: ``
})
export class CardComponent
{
    @Input()
    phrase: Phrase = { id: 0, author: '', date: '', text: '', context: '' };

    // implements on init and check if publication like
    public likeIcon: string = 'favorite_border';
    public numLikes: number = 0;


    public giveLike()
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
}
