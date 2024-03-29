import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AutoFocusDirective } from 'app/autofocus.directive';
import { UserComponent } from 'app/user/user.component';
import { UserAddComponent } from 'app/user-add/user-add.component';
import { UserEditComponent } from 'app/user-edit/user-edit.component';
import { EntryComponent } from 'app/entry/entry.component';
import { EntryAddComponent } from 'app/entry-add/entry-add.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EntryEditComponent } from 'app/entry-edit/entry-edit.component';
import { EntryViewComponent } from 'app/entry-view/entry-view.component';
import { EntryPostComponent } from 'app/entry-post/entry-post.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    CKEditorModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UserAddComponent,
    EntryAddComponent,
    EntryEditComponent,
    UserEditComponent,
    UserComponent,
    UserLoginComponent,
    AutoFocusDirective,
    EntryComponent,
    EntryViewComponent,
    EntryPostComponent,
  ]
})

export class AdminLayoutModule {}
