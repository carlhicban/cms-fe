import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm: FormGroup;
  errorMessage: string = '';
  cities: string[] = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'
  ];
  private _snackBar = inject(MatSnackBar)
  
  constructor(private fb: FormBuilder,
    private _apiService: ApiService,
    private _router: Router,

  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      const contactData = {
        name: this.contactForm.value.name!,
        title: this.contactForm.value.title!,
        email: this.contactForm.value.email!,
        address: this.contactForm.value.address!,
        phone: this.contactForm.value.phone!,
        city: this.contactForm.value.city!
      }
      this._apiService.createContact(contactData).subscribe(res=>{
        
        // openSnackBar() {
          this._snackBar.open('New Contact Saved!', '', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000
          });
        // }
      
        if(res) this._router.navigate(['contacts']);
      })
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }

  navigateToLogin() {
    // Navigate to login page
  }
}
