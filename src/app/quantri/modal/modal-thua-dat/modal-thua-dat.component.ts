import { Component, OnInit, Input } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { capQuanLy } from 'src/app/services/const';
import { API } from 'src/app/services/host';
import { DateToUnix, validVariable } from 'src/app/services/globalfunction';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-thua-dat',
  templateUrl: './modal-thua-dat.component.html',
  styleUrls: ['./modal-thua-dat.component.css']
})
export class ModalThuaDatComponent implements OnInit {
  opt:any='add';
  item:any={};
  capQuanLy:any = capQuanLy;
  userInfo: any;
  constructor(
    private _auth: AuthenticationService,
    private activeModal:NgbActiveModal,
    private _service:Dat09Service,
    private _toastr:ToastrService) {
      this.userInfo = this._auth.currentUserValue;
     }

  ngOnInit(): void {
  }
  changeCapQuanLy(event){
    console.log(event);
    
  }
  taiHDSD(){
    this._service.GetTepDinhKemHuongDanSuDung().subscribe((res:any)=>{
      console.log(res)
      if(validVariable(res.Link)){
        this.download(res);
      }else{
        this._toastr.error('Không có file hướng dẫn sử dụng!')
      }
    })
  }
  accept(){
    if(this.item?.TaiSanDat?.NgayCapGCN !== undefined && this.item?.TaiSanDat?.NgayCapGCN !== undefined){
      this.item.TaiSanDat.NgayCapGCNUnix = DateToUnix(this.item.TaiSanDat.NgayCapGCN);
    }
    if(this.item?.TaiSanDat?.NgayCapGPKD !== undefined && this.item?.TaiSanDat?.NgayCapGPKD !== undefined){
      this.item.TaiSanDat.NgayCapGPKDUnix = DateToUnix(this.item.TaiSanDat.NgayCapGPKD);
    }
    if(this.item?.TaiSanDat?.NgayKyGiaoDat !== undefined && this.item?.TaiSanDat?.NgayKyGiaoDat !== undefined){
      this.item.TaiSanDat.NgayKyGiaoDatUnix = DateToUnix(this.item.TaiSanDat.NgayKyGiaoDat);
    }
    if(this.item?.TaiSanDat?.ThoiHanSuDungDenNgay !== undefined && this.item?.TaiSanDat?.ThoiHanSuDungDenNgay !== undefined){
      this.item.TaiSanDat.ThoiHanSuDungDenNgayUnix = DateToUnix(this.item.TaiSanDat.ThoiHanSuDungDenNgay);
    }
    if(this.item?.TaiSanDat?.ThoiHanSuDungTuNgay !== undefined && this.item?.TaiSanDat?.ThoiHanSuDungTuNgay !== undefined){
      this.item.TaiSanDat.ThoiHanSuDungTuNgayUnix = DateToUnix(this.item.TaiSanDat.ThoiHanSuDungTuNgay);
    }
    
    if(this.item.TaiSanDat.tempTinh !== undefined && this.item.TaiSanDat.tempTinh !== null && this.item.TaiSanDat.tempQuan !== undefined && this.item.TaiSanDat.tempQuan !== null && this.item.TaiSanDat.tempPhuong !== undefined && this.item.TaiSanDat.tempPhuong !== null && this.item.TaiSanDat.DiaChi!==null&& this.item.TaiSanDat.DiaChi!==undefined && this.item.TaiSanDat.DiaChi.trim()!==""){
      this.item.NguoiCapNhat = this.userInfo.UserName
      this._service.SetTaiSanDat(this.item).subscribe((res:any)=>{
        if(res?.State===1){
          this.activeModal.close()
        }else{
          this._toastr.error(res?.message)
        }
      })
      console.log(this.item)

    }else{
      this._toastr.warning('Vui lòng nhập đầy đủ địa chỉ thửa đất!')
    }
    
  }
  download(tepdinhkems : any = {}){
    console.log(tepdinhkems)
    if(tepdinhkems.TenGoc.includes('.pdf')){
      window.open(API.imgURL+tepdinhkems.Link+'&viewOnly=true')
    }else{
      window.open(API.imgURL+tepdinhkems.Link);
    }
  }
}
