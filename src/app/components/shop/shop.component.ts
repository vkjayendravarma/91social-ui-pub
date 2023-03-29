import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shopForm!: FormGroup;
  id = null

  constructor(private fb: FormBuilder, private httpService: HttpService, private dialogRef: MatDialogRef<ShopComponent>, @Inject(MAT_DIALOG_DATA) public inputData: any) {
    this.id = inputData.id.$oid
  }

  ngOnInit(): void {
    this.shopForm = this.fb.group({
      name: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
    })
    if (this.id !== null && this.id !== undefined) {
      this.getShopById()
    }

  }
  createOrUpdate(data: any) {
    console.log(this.id);
    
    if (this.id == null) {
      this.createUpdate(data)
    } else {
      this.update(data)
    }
  }

  createUpdate(data: any) {
    console.log(data);
    this.httpService.createShop(data).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close()
      }
    })
  }

  update(data: any) {
    console.log(data);
    this.httpService.updateShop(this.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close()
      }
    })
    
  }

  getShopById() {
    if(this.id === undefined){
      return
    }
    this.httpService.searchShops({ query: 'id', id: this.id }).subscribe({
      next: (res) => {
        console.log(res);
        this.shopForm.setValue({ name: res.data.name, latitude: res.data.coordinates.coordinates[0], longitude: res.data.coordinates.coordinates[1] })
      }
    })
  }


}
