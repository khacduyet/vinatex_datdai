import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { vn } from 'src/app/services/const'
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { API } from 'src/app/services/host';
import { DateToUnix, UnixToDate, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-modaldmdonvi',
  templateUrl: './modaldmdonvi.component.html',
  styleUrls: ['./modaldmdonvi.component.css']
})
export class ModaldmdonviComponent implements OnInit {
  opt: any = ''
  item: any = {
  };
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  listDanhMucDonVi: any = [];
  listLoaiHinhCongTy: any = [
    { value: 'CONG_TY_100_VON', label: 'Công ty 100% vốn' },
    { value: 'CONG_TY_CON', label: 'Công ty con' },
    { value: 'CONG_TY_LIEN_KET', label: 'Công ty liên kết' },
    { value: 'KHOAN_DAU_TU_KHAC', label: 'Khoản đầu tư khác' },
    { value: 'DON_VI_SU_NGHIEP', label: 'Đơn vị sự nghiệp' },
  ];
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.getListdmDonViByCRUD();
  }
  getListdmDonViByCRUD() {
    this.services.GetListdmDonViByCRUD().subscribe((res: any) => {
      this.listDanhMucDonVi = res;
      res.unshift({ ID: null, Ten: 'Gốc' })
      if (this.opt === 'edit') {
        this.item.NgayCapGiayPhepKinhDoanh = UnixToDate(this.item.NgayCapGiayPhepKinhDoanhUnix);
        if (this.item.IDParent !== null && this.item.IDParent !== 0) {
          var parent = this.listDanhMucDonVi.filter(ele => ele.ID === this.item.IDParent)[0];
          if (parent != null && parent != undefined) {
            this.item.parent = parent;
          } else {
            this.item.parent = { ID: this.item.IDParent, Ten: 'Gốc' }
          }
        } else {
          this.item.parent = { ID: null, Ten: 'Gốc' }
        }
      } else {
        this.item.parent = { ID: null, Ten: 'Gốc' }
      }
    });
  }
  // GetListdmDonVi() {
  //   let data = {
  //     PageSize: 10,
  //     CurrentPage: 0,
  //     sFilter: "",
  //     Ma: "",
  //     Ten: ""
  //   };
  //   this.services.GetListdmDonVi(data).subscribe((res: any) => {
  //     this.listDanhMucDonVi = res;
  //     res.unshift({ID:null,Ten:'Gốc'})
  //     if(this.opt ==='edit'){
  //       this.item.NgayCapGiayPhepKinhDoanh = new Date(new Date(this.item.NgayCapGiayPhepKinhDoanh).getFullYear(),new Date(this.item.NgayCapGiayPhepKinhDoanh).getMonth(),new Date(this.item.NgayCapGiayPhepKinhDoanh).getDate() + 1);
  //       if (this.item.IDParent!== null && this.item.IDParent!== 0){
  //         var parent = this.listDanhMucDonVi.filter(ele=>ele.ID === this.item.IDParent)[0];
  //         if(parent != null && parent != undefined){
  //           this.item.parent = parent;
  //         }else{
  //           this.item.parent = {ID:this.item.IDParent,Ten:'Gốc'}
  //         }
  //       }else{
  //           this.item.parent = {ID:null,Ten:'Gốc'}
  //       }
  //     }else{
  //       this.item.parent = {ID:null,Ten:'Gốc'}
  //     }
  //   })
  // }
  taiLenFileDinhKem() {
    this.item.LogoCongTy = {};
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.multiple = true;
    modalRef.componentInstance.type = 'image';
    modalRef.result.then((data) => {
      this.item.LogoCongTy.ID = 0;
      this.item.LogoCongTy.TenGui = data[data.length - 1].Name;
      this.item.LogoCongTy.TenGoc = data[data.length - 1].NameLocal;
      this.item.LogoCongTy.DuongDan = data[data.length - 1].Url;
      console.log(this.item.LogoCongTy);
    }, (reason) => {

    });
  }
  getImgLink(url){
    return API.imgURL+url;
  }
  accept() {
    console.log(this.item.NgayCapGiayPhepKinhDoanh)
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined && this.item.parent !== undefined) {
      this.item.IDParent = this.item.parent.ID;
      if(validVariable(this.item.NgayCapGiayPhepKinhDoanh)){
        this.item.NgayCapGiayPhepKinhDoanhUnix = DateToUnix(this.item.NgayCapGiayPhepKinhDoanh)
      }
      if (this.item.SoTaiKhoan != null && this.item.SoTaiKhoan != undefined) {
        if (!(/^\d*$/.test(this.item.SoTaiKhoan))) {
          this.toastr.warning("Số tài khoản ngân hàng phải là số.Vui lòng kiểm tra lại");
          return false;
        }
      }
      this.services.SetdmDonVi(this.item).subscribe((res: any) => {
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
