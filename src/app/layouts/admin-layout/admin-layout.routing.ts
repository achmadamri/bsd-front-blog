import { Routes } from '@angular/router';

import { AuthGuard } from '../../auth.guard';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { UserComponent } from 'app/user/user.component';
import { UserAddComponent } from 'app/user-add/user-add.component';
import { UserEditComponent } from 'app/user-edit/user-edit.component';
import { EntryComponent } from 'app/entry/entry.component';
import { EntryAddComponent } from 'app/entry-add/entry-add.component';
import { EntryEditComponent } from 'app/entry-edit/entry-edit.component';
import { EntryViewComponent } from 'app/entry-view/entry-view.component';
import { EntryPostComponent } from 'app/entry-post/entry-post.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                       component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',                    component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'user',                            component: UserComponent, canActivate: [AuthGuard] },
    { path: 'user-add',                        component: UserAddComponent, canActivate: [AuthGuard] },    
    { path: 'user-edit/:tbuId',                component: UserEditComponent, canActivate: [AuthGuard] },
    { path: 'user-edit',                       component: UserEditComponent, canActivate: [AuthGuard] },
    { path: 'user-login',                      component: UserLoginComponent },
    { path: 'entry',                           component: EntryComponent, canActivate: [AuthGuard] },
    { path: 'entry-view',                      component: EntryViewComponent },
    { path: 'entry-add',                       component: EntryAddComponent, canActivate: [AuthGuard] },
    { path: 'entry-edit/:tbeId',               component: EntryEditComponent, canActivate: [AuthGuard] },
    { path: 'entry-post/:tbeId',               component: EntryPostComponent },
];
