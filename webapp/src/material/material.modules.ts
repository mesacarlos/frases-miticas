import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import {MatMenuTrigger, MatMenuModule} from '@angular/material/menu';

export const MaterialModules = [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDatepickerModule,
    DatePipe,
    MatDatepickerModule,
    MatPaginatorModule,
    MatMenuTrigger,
    MatMenuModule
];

export const appDateFormat = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
        display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

export const MyPaginator = () =>
{
    const myPaginatorIntl = new MatPaginatorIntl();

    myPaginatorIntl.itemsPerPageLabel = '';

    return myPaginatorIntl;
  }
