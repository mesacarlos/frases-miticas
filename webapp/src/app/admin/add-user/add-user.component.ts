import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-admin-add-user',
    standalone: true,
    imports: [],
    templateUrl: './add-user.component.html',
    styles: ``
})
export class AddUserComponent
{
    @Output()
    public sendEvent = new EventEmitter<any>();
}
