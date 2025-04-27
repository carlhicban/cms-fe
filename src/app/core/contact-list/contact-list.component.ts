import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ApiService } from '../../shared/services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    TableComponent,
    MatButtonModule,
    // ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  contactData:any = []
  contactDataColumns:any = ['name','title', 'email', 'address', 'city','phone'];
  contactDisplayColumns:any = ['name','title', 'email', 'address', 'city', 'phone'];
  totalContactData!:number;

  page:number = 1;
  total:number = 10;

  constructor(
    private _apiService: ApiService,
    private _router: Router
  ){}

  ngOnInit(): void {
    this._apiService.getContacts().subscribe(res=>{
      console.log(res)
      this.contactData = res
      this.totalContactData = res.length
    })
  }

  pageNumberChange(page:number){
  }

  navigateToAddContct(){
    this._router.navigate(['contacts/add'])
  }
}
