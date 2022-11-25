import { Component, OnInit } from '@angular/core';
import { vn } from 'src/app/services/const';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { vietHoaChuCaiDau } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-modal-tai-san-tren-dat',
  templateUrl: './modal-tai-san-tren-dat.component.html',
  styleUrls: ['./modal-tai-san-tren-dat.component.css']
})
export class ModalTaiSanTrenDatComponent implements OnInit {
  lang: any = vn
  opt: any = '';
  item: any = {};
  vietHoaChuCaiDau = vietHoaChuCaiDau;
  listLoaiTaiSan: any = [
  ];
  listTinhTrangTaiSan:any=[];
  listCapHangCongTrinh:any=[];
  listDienTich: any = [
  ]
  newDienTich: any = {}
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetListdmCapHangCongTrinh();
    this.GetListdmTinhTrangTaiSan();
    this.GetListdmTaiSan();
  }
  GetListdmTinhTrangTaiSan (){
    let data ={
      PageSize: 0,
      CurrentPage: 0,
      sFilter:''
    }
    this.services.GetListdmTinhTrangTaiSan(data).subscribe((res:any)=>{
      this.listTinhTrangTaiSan = res;
      if (this.opt === 'edit') {
        if (this.item.IDdmTinhTrangTaiSan !== null && this.item.IDdmTinhTrangTaiSan !== 0) {
          this.item.TinhTrangTaiSan = this.listTinhTrangTaiSan.filter(ele => ele.ID === this.item.IDdmTinhTrangTaiSan)[0];
        }
      }
    })
  }
  GetListdmCapHangCongTrinh (){
    let data ={
      PageSize: 0,
      CurrentPage: 0,
      sFilter:''
    }
    this.services.GetListdmCapHangCongTrinh(data).subscribe((res:any)=>{
      this.listCapHangCongTrinh = res;
      if (this.opt === 'edit') {
        if (this.item.IDdmCapHang !== null && this.item.IDdmCapHang !== 0) {
          this.item.tempCapHang = this.listCapHangCongTrinh.filter(ele => ele.ID === this.item.IDdmCapHang)[0];
          this.item.TendmCapHang = this.item.CapHangCongTrinh.Ten;
        }
      }
    })
  }
  GetListdmTaiSan() {
    let data = {
      PageSize: 10,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this.services.GetListdmTaiSan(data).subscribe(res => {
      this.listLoaiTaiSan = res;
      if (this.opt === 'edit') {
        if (this.item.IDdmLoaiTaiSan !== null && this.item.IDdmLoaiTaiSan !== 0) {
          this.item.LoaiTaiSan = this.listLoaiTaiSan.filter(ele => ele.ID === this.item.IDdmLoaiTaiSan)[0];
        }
        
      }
    })

  }
  accept(opt) {
    if (this.item.LoaiTaiSan !== undefined && this.item.LoaiTaiSan !== null) {
      this.item.IDdmLoaiTaiSan = this.item.LoaiTaiSan.ID;
      this.item.TenLoaiTaiSan = this.item.LoaiTaiSan.Ten;
    }
    if (this.item.TinhTrangTaiSan !== undefined && this.item.TinhTrangTaiSan !== null) {
      this.item.IDdmTinhTrangTaiSan = this.item.TinhTrangTaiSan.ID;
    }
    if (this.item.tempCapHang !== undefined && this.item.tempCapHang !== null) {
      this.item.IDdmCapHang = this.item.tempCapHang.ID;
      this.item.TendmCapHang = this.item.tempCapHang.Ten;
    }
    this.activeModal.close({ opt: opt, item: this.item });
  }
}
