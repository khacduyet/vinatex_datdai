import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { vn } from 'src/app/services/const';
import { vietHoaChuCaiDau, nhapTen, DateToUnix } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-modal-tinh-trang-phap-ly',
  templateUrl: './modal-tinh-trang-phap-ly.component.html',
  styleUrls: ['./modal-tinh-trang-phap-ly.component.css']
})
export class ModalTinhTrangPhapLyComponent implements OnInit {
  opt:any='add';
  listLoaiBienDong: any = [
  ];
  vietHoaChuCaiDau = vietHoaChuCaiDau;
  nhapTen = nhapTen;
  item:any={};
  lang: any = vn;
  yearRange:string =`${((new Date()).getFullYear()-50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetListdmBienDong();
  }
  GetListdmBienDong() {
    let data = {
      PageSize: 10,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this.services.GetListdmBienDong(data).subscribe((res: any) => {
      this.listLoaiBienDong = res;
      if(this.opt ==='edit'){
        if (this.item.IDdmBienDong !== null && this.item.IDdmBienDong !== 0) {
          this.item.LoaiBienDong = res.filter(ele => ele.ID === this.item.IDdmBienDong)[0];
        }
      }
    })
  }
  accept(opt){
    if(this.item?.NgayKy !== undefined && this.item?.NgayKy !== null){
      this.item.NgayKyUnix = DateToUnix(this.item.NgayKy);
    }
    if(this.item?.ThoiGianBienDong !== undefined && this.item?.ThoiGianBienDong !== null){
      this.item.ThoiGianBienDongUnix = DateToUnix(this.item.ThoiGianBienDong);
    }
    if(this.item.LoaiBienDong !== undefined && this.item.LoaiBienDong !== null){
      this.item.IDdmBienDong= this.item.LoaiBienDong.ID;
      this.item.TendmBienDong= this.item.LoaiBienDong.Ten;
    }
    console.log(this.item);
    this.activeModal.close({opt:opt,item:this.item});
  }
}
