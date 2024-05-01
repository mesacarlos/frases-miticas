import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from '../../../../material/material.modules';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { UserRegister } from '../../interfaces/user.interfaces';

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
    public errorEmptyName:              boolean = false;
    public errorEmptyUsername:          boolean = false;
    public errorEmptyEmail:             boolean = false;
    public errorEmptyPassword:          boolean = false;
    public errorEmptyConfirmPassword:   boolean = false;

    public userForm = new FormGroup({
        name:               new FormControl<string>(''),
        username:           new FormControl<string>(''),
        email:              new FormControl<string>(''),
        password:           new FormControl<string>(''),
        confirmPassword:    new FormControl<string>('')
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
        if (this.currentCreateUser.name === '')
            this.errorEmptyName = true;
        else
            this.errorEmptyName = false;

        if (this.currentCreateUser.username === '')
            this.errorEmptyUsername = true;
        else
            this.errorEmptyUsername = false;

        if (this.currentCreateUser.email === '')
            this.errorEmptyEmail = true;
        else
            this.errorEmptyEmail = false;

        if (this.currentCreateUser.password === '')
            this.errorEmptyPassword = true;
        else
            this.errorEmptyPassword = false;

        if (this.currentCreateUser.confirmPassword === '')
            this.errorEmptyConfirmPassword = true;
        else
            this.errorEmptyConfirmPassword = false;

        return this.errorEmptyName || this.errorEmptyUsername || this.errorEmptyEmail || this.errorEmptyPassword || this.errorEmptyConfirmPassword;
    }
}
