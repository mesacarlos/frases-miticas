import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../home/services/users.service';
import { MaterialModules } from '../../../material/material.modules';
import { User } from '../../auth/interfaces/users.interface';

@Component({
    selector: 'app-admin-users',
    standalone: true,
    imports: [
        ...MaterialModules
    ],
    templateUrl: './users-admin.component.html',
    styles: ``
})
export class UsersAdminComponent implements OnInit
{
    public users: User[] = [];

    constructor(
        private usersService: UsersService
    ) {}

    ngOnInit(): void
    {
        this.usersService.getUsers().subscribe(users => this.users = users);
    }

}
