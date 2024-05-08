import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AlertMessageComponent } from '../alerts/alert-message/alert-message.component';
import { AuthService } from '../../../auth/services/auth.service';
import { ChangePassword } from '../../../auth/interfaces/user.interface';
import { MaterialModules } from '../../../../material/material.modules';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
    standalone: true,
    imports: [
        NavbarComponent,
        CommonModule,
        ...MaterialModules,
        ReactiveFormsModule
    ],
    templateUrl: './settings.component.html',
    styles: ``
})
export class SettingsComponent
{
    public emptyOldPassword: boolean = false;
    public emptyNewPassword: boolean = false;
    public emptyNewPasswordConfirm: boolean = false;
    public error: string = '';
    private existsError: boolean = false;

    constructor (
        private authService: AuthService,
        private snackBar: MatSnackBar,
    ) {}

    public changePasswordForm = new FormGroup({
        oldPassword:            new FormControl<string>(''),
        newPassword:            new FormControl<string>(''),
        newPasswordConfirm:     new FormControl<string>('')
    });

    public onChangePassword(): void
    {
        if (this.thereAreEmptyFields())
            this.existsError = true;

        if (this.currentChangePassword.newPassword !== this.currentChangePassword.newPasswordConfirm)
        {
            this.error = 'Las nuevas contraseñas no coinciden';
            this.existsError = true;
        }

        if (this.existsError)
        {
            this.changePasswordForm.controls.oldPassword.setErrors({ notMatched: true });
            this.changePasswordForm.controls.newPassword.setErrors({ notMatched: true });
            this.changePasswordForm.controls.newPasswordConfirm.setErrors({ notMatched: true });

            return;
        }
        else
        {
            this.changePasswordForm.controls.oldPassword.setErrors(null);
            this.changePasswordForm.controls.newPassword.setErrors(null);
            this.changePasswordForm.controls.newPasswordConfirm.setErrors(null);
        }

        this.error = '';
        this.existsError = false;

        this.authService.changePassword(this.currentChangePassword).subscribe(response =>
        {
            let message = 'No se ha podido cambiar la contraseña. Contraseña antigua incorrecta';

            if (response)
                message = 'Se ha cambiado con éxito la contraseña';

            this.showAlert(message);
        });
    }

    get currentChangePassword(): ChangePassword
    {
        return this.changePasswordForm.value as ChangePassword;
    }

    private thereAreEmptyFields(): boolean
    {
        this.emptyOldPassword = this.currentChangePassword.oldPassword === '';
        this.emptyNewPassword = this.currentChangePassword.newPassword === '';
        this.emptyNewPasswordConfirm = this.currentChangePassword.newPasswordConfirm === '';

        return this.emptyOldPassword || this.emptyNewPassword || this.emptyNewPasswordConfirm;
    }

    public showAlert(message: string): void
    {
        this.snackBar.openFromComponent(AlertMessageComponent, {
            duration: 4000,
            data: message
        });
    }
}
