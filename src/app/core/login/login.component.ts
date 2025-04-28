import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../shared/services/api.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar)
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  errorMessage: string = '';

  constructor(
    private _apiService: ApiService,
    private _router: Router
  ){}

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!
      }
      this._apiService.login(userData).pipe(
        catchError((error) => {
          this.errorMessage = error.message;
          this.openSnackBar(this.errorMessage)
          throw error;
        })
      ).subscribe(res => {
        const token = res.access_token
        console.log(res.access_token);
        this._apiService.authenticateToken(token)
        this.openSnackBar('Signin Successfully')
        this._router.navigate(['contacts'])
      });
    }
  }

  navigateToRegiter(){
    this._router.navigate(['register'])
  }

  openSnackBar(title: string){
    this._snackBar.open(`${title}`, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000
    });
  }
}
