import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modaldmtaisan',
  templateUrl: './modaldmtaisan.component.html',
  styleUrls: ['./modaldmtaisan.component.css']
})
export class ModaldmtaisanComponent implements OnInit {
  opt:any=''
  item:any={};
  listDanhMucTaiSan:any=[];
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetListdmTaiSan()
  }
  GetListdmTaiSan() {
    let data = {
      PageSize: 10,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this.services.GetListdmTaiSan(data).subscribe((res: any) => {
      res.unshift({ID:0,Ten:'Gốc'})
      this.listDanhMucTaiSan = res;
      if(this.opt ==='edit'){
        if (this.item.IDParent!== null && this.item.IDParent!== 0){
          this.item.parent = this.listDanhMucTaiSan.filter(ele=>ele.ID === this.item.IDParent)[0];
        }
      }else{
        this.item.parent = {ID:null,Ten:'Gốc'}
      }
    })
  }
  accept() {
    console.log(this.item);
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined && this.item.parent !== undefined) {
      this.item.IDParent = this.item.parent.ID;
      this.services.SetdmTaiSan(this.item).subscribe((res:any)=>{
        if (res) {
          if (res.State === 1) {
            this.activeModal.close(res.message);
          } else {
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }
}
