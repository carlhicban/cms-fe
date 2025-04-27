import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full'},
    
    { path: 'signin', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
];
