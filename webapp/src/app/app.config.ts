import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { MatSnackBarRef } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(MatSnackBarRef)
    ]
};
