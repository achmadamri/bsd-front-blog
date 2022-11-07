import { Routes } from '@angular/router';

import { AuthGuard } from '../../auth.guard';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { UserComponent } from 'app/user/user.component';
import { UserAddComponent } from 'app/user-add/user-add.component';
import { UserEditComponent } from 'app/user-edit/user-edit.component';
import { DepartmentsComponent } from 'app/departments/departments.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                       component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',                    component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'user',                            component: UserComponent, canActivate: [AuthGuard] },
    { path: 'user-add',                        component: UserAddComponent, canActivate: [AuthGuard] },    
    { path: 'user-edit/:tbuId',                component: UserEditComponent, canActivate: [AuthGuard] },
    { path: 'user-edit',                       component: UserEditComponent, canActivate: [AuthGuard] },
    { path: 'user-login',                      component: UserLoginComponent },
    { path: 'departments',                     component: DepartmentsComponent },
];
