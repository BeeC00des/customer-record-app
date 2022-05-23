import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {

  ironBrands=["Baosteel", "TATA Steel", "Hyundai"]

  equipForm !: FormGroup 
  actionBtn : string ='save'

  constructor(
    private formbuilder : FormBuilder, 
    private api: ApiService, 
    private  equipment : MatDialogRef<EquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ){ }

  ngOnInit(): void {
    this.equipForm = this.formbuilder.group({
      clientName: ['', Validators.required],
      productName: ['', Validators.required],
      productPrice:['', Validators.required],
      purchaseDate:['', Validators.required],
      productBrand:['', Validators.required]
    })

    if(this.editData){
      this.actionBtn = 'Update';
      this.equipForm.controls['clientName'].setValue(this.editData.clientName);
      this.equipForm.controls['productName'].setValue(this.editData. productName);
      this.equipForm.controls['productPrice'].setValue(this.editData.productPrice);
      this.equipForm.controls['purchaseDate'].setValue(this.editData.purchaseDate);
      this.equipForm.controls['productBrand'].setValue(this.editData.productBrand);
    }
  }

  add(){
    if(!this.editData){
      if(this.equipForm.valid){ 
        this.api.postEquip(this.equipForm.value)
        .subscribe({
          next:(res)=>{
            alert("client details sent, successfully")
            this.equipForm.reset()
            this.equipment.close('save');
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
    this.api.putEquip(this.equipForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("client details updated, successfully")
        this.equipForm.reset()
        this.equipment.close('update');
      },
      error:()=>{
        alert("error while updating the details")
      }
    })
  }
  



}
