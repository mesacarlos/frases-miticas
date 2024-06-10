import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../home/services/users.service';

@Component({
    selector: 'app-admin-users',
    standalone: true,
    imports: [],
    templateUrl: './users-admin.component.html',
    styles: ``
})
export class UsersAdminComponent implements OnInit
{
    constructor(
        private usersService: UsersService
    ) {}

    ngOnInit(): void
    {

    }

}
