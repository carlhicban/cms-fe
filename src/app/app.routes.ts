import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { ContactFormComponent } from './core/contact-form/contact-form.component';
import { AuthGuard } from './shared/services/auth.guard';
import { ContactListComponent } from './core/contact-list/contact-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full'},
    { path: 'signin', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'contacts', component: ContactListComponent,  canActivate: [AuthGuard] },
    { path: 'contacts/add', component: ContactFormComponent,  canActivate: [AuthGuard] }
];
