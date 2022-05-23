import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EquipmentComponent } from './equipment/equipment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Customer-record-app ';

  displayedColumns: string[] = ['clientName', 'productName', 'productPrice', 'purchaseDate', 'productBrand', 'Action'];
  dataSource !: MatTableDataSource<any>;

  data !: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog:MatDialog, private api : ApiService){
  }

  ngOnInit(): void {
    this.getDetails();
    this.getEquips();
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

  openEquip(){
    this.dialog.open(EquipmentComponent, {
      width: '30%',
      height: 'auto'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getEquips();
      }
    })
  }

  getDetails(){
    this.api.getDetail()
    .subscribe ({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator= this.paginator;
      },
      error:(err)=>{
        alert('Getting details unsuccessful' + err)
      }
    })
  }

  getEquips(){
    this.api.getEquip()
    .subscribe ({
      next:(res)=>{
        console.log(res)
        this.data = new MatTableDataSource(res);
        this.data.paginator= this.paginator;
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

  editEquip( row: any){
    this.dialog.open(EquipmentComponent,{
      width: '30%',
      height: 'auto',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getEquips();
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

  deleted(id:number){
    console.log("delete " + id)
    this.api.deleteEquip(id)
    .subscribe({
      next:(res)=>{
        alert("details deleted succesfully");
        this.getEquips();
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

  filterEquip(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

}
