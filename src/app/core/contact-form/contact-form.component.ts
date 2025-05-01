import { Component, inject, OnInit } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

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
export class ContactFormComponent implements OnInit{
  contactForm: FormGroup;
  errorMessage: string = '';
  isEdit:boolean = false;
  contactId: string = '';
  cities: string[] = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'
  ];
  private _snackBar = inject(MatSnackBar)
  
  constructor(private fb: FormBuilder,
    private _apiService: ApiService,
    private _router: Router,
    private _activeRoute: ActivatedRoute

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

  ngOnInit(): void {
    this.contactId = this._activeRoute.snapshot.paramMap.get('id') || ''
    this.contactId && this.patchValue(this.contactId)
  }

  patchValue(id: string){
    this.isEdit = true
    this._apiService.getContact(id).subscribe(res => {
      console.log(res)
      this.contactForm.patchValue({
        name: res.name,
        title: res.title,
        email: res.email,
        phone: res.phone,
        address: res. address,
        city: res.city
      })
    })
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value.name);
      const contactData = {
        name: this.contactForm.value.name!,
        title: this.contactForm.value.title!,
        email: this.contactForm.value.email!,
        address: this.contactForm.value.address!,
        phone: this.contactForm.value.phone!,
        city: this.contactForm.value.city!
      }
      if (this.isEdit) {
        this._apiService.updateContact(this.contactId, contactData).subscribe(res=>{
          this.openSnackBar('Contact Updated!')
          if(res) this._router.navigate(['contacts']);
        })
      } else {
        this._apiService.createContact(contactData).subscribe(res=>{
          this.openSnackBar('New Contact Saved!')
          if(res) this._router.navigate(['contacts']);
        })
      }
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }

  openSnackBar(title: string){
    this._snackBar.open(`${title}`, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000
    });
  }

  navigateToLogin() {
    // Navigate to login page
  }
}
