import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../home/services/users.service';
import { MaterialModules } from '../../../material/material.modules';
import { User } from '../../auth/interfaces/users.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

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
    public loading: boolean = true;

    constructor(
        private usersService: UsersService,
        public dialog: MatDialog,
    ) {}

    ngOnInit(): void
    {
        this.loadUsers();
    }

    public onAddUser(): void
    {
        let width: string = '60%';

        if (window.innerWidth < 600)
            width = '95%';

        const dialogRef = this.dialog.open(AddUserComponent, { width: width });

        dialogRef.componentInstance.sendEvent.subscribe(() =>
        {
            dialogRef.close();
            this.loadUsers();
        });
    }

    private loadUsers(): void
    {
        this.loading = true;

        this.usersService.getUsers().subscribe(users =>
        {
            this.users = users;
            this.loading = false;
        });
    }
}
