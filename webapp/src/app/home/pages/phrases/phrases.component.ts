import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { Phrase } from '../../interfaces/phrases.interfaces';
import { CardComponent } from '../card/card.component';
import { MaterialModules } from '../../../../material/material.modules';
import { AddPhraseComponent } from '../add-phrase/add-phrase.component';

@Component({
    standalone: true,
    imports: [
        NavbarComponent,
        CardComponent,
        ...MaterialModules
    ],
    templateUrl: './phrases.component.html',
    styles: ``
})
export class PhrasesComponent
{
    constructor (public dialog: MatDialog) {}

    public phrases: Phrase[] = [
        {
            author: "John Doe",
            date: new Date("2024-04-30"),
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            context: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            author: "Jane Smith",
            date: new Date("2024-04-29"),
            text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            context: ""
        },
        {
            author: "Alice Johnson",
            date: new Date("2024-04-28"),
            text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            context: ""
        }
    ];

    public addPhrase()
    {
        let width: string = '';

        if (window.innerWidth < 600)
            width = '95%';
        else
            width = '60%';

        this.dialog.open(AddPhraseComponent, { width: width });
    }
}
