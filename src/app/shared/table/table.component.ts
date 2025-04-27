import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() tableData:any;
  @Input() tableDataColumns:any;
  @Input() tableDisplayColumns:any;
  @Input() tableActions: any;
  @Input() subTableDisplayColumns: any;
  @Input() totalData: any;
  @Output() pageNumber = new EventEmitter<any>()
  
  displayedColumns!: string[];
  subTitleDisplayedColumns!: string[];
  dataColumns!:string[];
  dataSource:any;
  totalPage!:number;
  pageArray!: number[];
  selectedPage!: number;
  isNextPage!: boolean;
  isPrevPage!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.updateTableData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.dataSource = new MatTableDataSource(changes['tableData'].currentValue)
    this.getTotalPage()
  }

  updateTableData(){
    this.dataSource = new MatTableDataSource(this.tableData);
    this.displayedColumns = this.tableDisplayColumns;
    this.dataColumns = this.tableDataColumns;
    this.subTitleDisplayedColumns = this.subTableDisplayColumns;

    this.getTotalPage()
  }

  getTotalPage(){
    this.totalPage = Math.ceil(this.totalData / 8)
    this.pageArray = Array.from({ length: this.totalPage }, (_, i) => i + 1)
    this.selectedPage = 1
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  goToPage(page:number){
    if (page !== this.selectedPage) {
      this.selectedPage = page;
    }
  }

  nextPage(){
    if (this.totalPage !== this.selectedPage) {
      this.selectedPage += 1;
      console.log(this.selectedPage)
      this.pageNumber.emit(this.selectedPage);
      this.isNextPage = true;
    } else {
      this.isNextPage = false;
    }
  }

  prevPage(){
    if (this.selectedPage !== 1) {
      this.selectedPage -= 1;
      this.pageNumber.emit(this.selectedPage);
    }
  }

  changePage(event: any){
    const pageNumber = event.pageIndex + 1
    this.pageNumber.emit(pageNumber)
  }
}
