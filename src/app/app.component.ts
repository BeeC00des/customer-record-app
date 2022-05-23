import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'basic-app';

  displayedColumns: string[] = ['clientName', 'productName', 'productPrice', 'purchaseDate', 'productBrand', 'Action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog:MatDialog, private api : ApiService){
  }

  ngOnInit(): void {
    this.getDetails();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
     width: '30%',
     height: 'auto'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getDetails();
      }
    })
  }

  getDetails(){
    this.api.getDetail()
    .subscribe ({
      next:(res)=>{
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator= this.paginator;
      },
      error:(err)=>{
        alert('Getting details unsuccessful' + err)
      }
    })
  }

  edit( row: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      height: 'auto',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getDetails();
      }
    })
  }

  delete(id:number){
    this.api.deleteDetail(id)
    .subscribe({
      next:(res)=>{
        alert("details deleted succesfully");
        this.getDetails();
      },
      error:(err)=>{
        alert("error while deleting details" + err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
