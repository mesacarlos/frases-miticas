import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModules } from '../../../../material/material.modules';
import { UserLogin } from '../../interfaces/user.interfaces';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
    standalone: true,
    imports: [
        ...MaterialModules,
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        NavbarComponent
    ],
    templateUrl: './login.component.html',
    styles: ``
})
export class LoginComponent
{
    public errorUsername: string = 'Nombre de usuario incorrecto';
    public errorEmptyUsername: boolean = false;
    public errorPassword: string = 'Contraseña incorrecta';
    public errorEmptyPassword:          boolean = false;

    public userForm = new FormGroup({
        username:   new FormControl<string>(''),
        password:   new FormControl<string>('')
    });

    get currentUser(): UserLogin
    {
        return this.userForm.value as UserLogin;
    }

    public onLogin()
    {
        if (this.thereAreEmptyFields())
            return;
    }

    private thereAreEmptyFields(): boolean
    {
        this.errorEmptyUsername = this.currentUser.username === '';
        this.errorEmptyPassword = this.currentUser.password === '';

        return this.errorEmptyUsername || this.errorEmptyPassword;
    }
}
