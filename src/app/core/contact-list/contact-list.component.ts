import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { ApiService } from '../../shared/services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    TableComponent,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  contactData: any = [];
  contactDataColumns: any = ['name', 'title', 'email', 'address', 'city', 'phone'];
  contactDisplayColumns: any = ['name', 'title', 'email', 'address', 'city', 'phone'];
  totalContactData!: number;

  page: number = 1;
  total: number = 10;

  searchInputValue: string = '';
  sortBy: string = 'name';
  orderBy: string = 'asc';
  createdAt: any;

  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  getContact() {
    this._apiService.getContacts().subscribe((res) => {
      console.log(res);
      this.contactData = res;
      this.totalContactData = res.length;
    });
  }

  pageNumberChange(page: number) {
    console.log(page)
    this.page = page

    this.searchContact()
  }

  pageSizeChange(pageSize: number) {
    this.total = pageSize

    this.searchContact()
  }

  navigateToAddContct() {
    this._router.navigate(['contacts/add']);
  }

  onKeyUp(event: KeyboardEvent): void {
    this.searchInputValue = (event.target as HTMLInputElement).value.trim();
    console.log(this.searchInputValue);

    if (this.searchInputValue === '') {
      this.createdAt = null;
      this.getContact();
    } else {
      this.searchContact();
    }
  }

  sortDataBy() {
    this.searchContact();
  }

  sortOrderBy() {
    this.searchContact();
  }

  onDateChange(event: any) {
    console.log('Date selected:', event.value); 
    this.createdAt = event.value;
    this.searchContact();
  }


  searchContact() {
    const params: any = {};

    if (this.searchInputValue) {
      params.name = this.searchInputValue;
      params.email = this.searchInputValue;
      params.city = this.searchInputValue;
    }

    if (this.sortBy) {
      params.sortBy = this.sortBy;
    }

    if (this.orderBy) {
      params.sortOrder = this.orderBy;
    }

    if (this.createdAt) {
      params.createdAfter = new Date(this.createdAt).toISOString();
    }

    params.page = this.page;  
    params.limit = this.total;

    this._apiService.searchContact(params).subscribe((res) => {
      this.contactData = res.data;
    });
  }

  logout(){
    this._apiService.logout()
  }
}
