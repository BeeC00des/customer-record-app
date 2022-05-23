import { Component,Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  brands=["Brand New", "Second Hand"]

  clientForm !: FormGroup 
  actionBtn : string ='save'

  constructor(
    private formbuilder : FormBuilder, 
    private api: ApiService, 
    private  dialog : MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ){ }

  ngOnInit(): void {
    this.clientForm = this.formbuilder.group({
      clientName: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice:['', Validators.required],
      purchaseDate:['', Validators.required],
      productBrand:['', Validators.required]
    })

    if(this.editData){
      this.actionBtn = 'Update';
      this.clientForm.controls['clientName'].setValue(this.editData.clientName);
      this.clientForm.controls['productName'].setValue(this.editData. productName);
      this.clientForm.controls['productPrice'].setValue(this.editData.productPrice);
      this.clientForm.controls['purchaseDate'].setValue(this.editData.purchaseDate);
      this.clientForm.controls['productBrand'].setValue(this.editData.productBrand);
    }
  }

  add(){
    if(!this.editData){
      if(this.clientForm.valid){ 
        this.api.postDetail(this.clientForm.value)
        .subscribe({
          next:(res)=>{
            alert("client details sent, successfully")
            this.clientForm.reset()
            this.dialog.close('save');
          },
          error:()=>{
            alert("error while sending the details")
          }
        })
      }
    }else{
      this.update();
    }
  }

  update(){
    this.api.putDetail(this.clientForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("client details updated, successfully")
        this.clientForm.reset()
        this.dialog.close('update');
      },
      error:()=>{
        alert("error while updating the details")
      }
    })
  }
}
