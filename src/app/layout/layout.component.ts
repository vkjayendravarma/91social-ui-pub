import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ShopComponent } from '../components/shop/shop.component';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  searchForm!: FormGroup;
  
  shops: any = []

  constructor(private MatDialog:MatDialog, private formBuilder: FormBuilder, private httpServce: HttpService){}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      range: [1, [Validators.required, Validators.min(1)]],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
    })
    this.searchForShops({
      query: "all"
    })
  }


  openShop(id: string = ""){
    const dialogRef = this.MatDialog.open(ShopComponent, {
      data: {id: id}
    })
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.searchForShops({
          query: "all"
        })
      }
    })
  }

  search(data: any){
    console.log(data);
    this.searchForShops({
      query: "",
      range: data.range,
      latitude: data.latitude,
      longitude: data.longitude
    })
  }

  reset(){
    this.searchForm.reset()
    this.searchForShops({
      query: "all"
    })
  }


  searchForShops(params: any){
    this.httpServce.searchShops(params).subscribe({
      next: (res) => {
        console.log(res.data);
        this.shops = res.data
      }
    })
  }

}
