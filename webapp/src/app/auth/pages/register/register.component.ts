import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from '../../../../material/material.modules';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { UserRegister } from '../../interfaces/users.interface';

@Component({
    standalone: true,
    imports: [
        ...MaterialModules,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NavbarComponent
    ],
    templateUrl: './register.component.html',
    styles: ``
})
export class RegisterComponent
{
    public errorEmptyUsername:          boolean = false;
    public errorEmptyEmail:             boolean = false;
    public errorEmptyPassword:          boolean = false;
    public errorEmptyConfirmPassword:   boolean = false;
    public errorEmptyFullName:          boolean = false;

    public userForm = new FormGroup({
        username:           new FormControl<string>(''),
        email:              new FormControl<string>(''),
        password:           new FormControl<string>(''),
        confirmPassword:    new FormControl<string>(''),
        fullName:           new FormControl<string>(''),
        isSuperAdmin:       new FormControl<boolean>(false)
    });

    get currentCreateUser(): UserRegister
    {
        return this.userForm.value as UserRegister;
    }

    public onRegister(): void
    {
        if ( this.currentCreateUser.password !== this.currentCreateUser.confirmPassword )
            return;

        if (this.thereAreEmptyFields())
            return;
    }

    private thereAreEmptyFields(): boolean
    {
        this.errorEmptyUsername = this.currentCreateUser.username === '';
        this.errorEmptyEmail = this.currentCreateUser.email === '';
        this.errorEmptyPassword = this.currentCreateUser.password === '';
        this.errorEmptyConfirmPassword = this.currentCreateUser.confirmPassword === '';
        this.errorEmptyFullName = this.currentCreateUser.fullName === '';

        return this.errorEmptyUsername || this.errorEmptyEmail || this.errorEmptyPassword || this.errorEmptyConfirmPassword || this.errorEmptyFullName;
    }
}
