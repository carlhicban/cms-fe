import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../shared/services/api.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    errorMessage: string = '';
  
    constructor(
      private _apiService: ApiService,
      private _router: Router
    ){}
  
    onSubmit() {
      if (this.registerForm.valid) {
        const userData = {
          username: this.registerForm.value.username!,
          password: this.registerForm.value.password!
        }
        this._apiService.register(userData).pipe(
          catchError((error) => {
            this.errorMessage = error.message; // Display the error message in the template
            throw error;
          })
        ).subscribe(res => {
          const token = res.access_token
          console.log(res.access_token);
          this._apiService.authenticateToken(token)
          this._router.navigate(['contacts'])
        });
      }
    }
  
    navigateToSigin(){
      this._router.navigate(['register'])
    }
}
