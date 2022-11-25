import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { vn } from 'src/app/services/const'
import { DateToUnix, UnixToDate, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-modaldonvisohuunhadat',
  templateUrl: './modaldonvisohuunhadat.component.html',
  styleUrls: ['./modaldonvisohuunhadat.component.css']
})
export class ModaldonvisohuunhadatComponent implements OnInit {

  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  opt: any = ''
  item: any = {};
  listDanhMucDonViSoHuuNhaDat: any = [];
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, public toastr: ToastrService) {

  }

  ngOnInit(): void {
    if (this.opt === 'edit') {
      this.item.NgayCapGiayPhep = UnixToDate(this.item.NgayCapGiayPhepUnix);
    }
  }

  accept() {
    if (this.item.Ten === null || this.item.Ten === undefined || this.item.Ma === null || this.item.Ma === undefined || this.item.Ma.trim()===''|| this.item.Ten.trim()==='') {
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!');
      return;
    }
    if(validVariable(this.item.NgayCapGiayPhep)){
      this.item.NgayCapGiayPhepUnix = DateToUnix(this.item.NgayCapGiayPhep);
      console.log(this.item.NgayCapGiayPhepUnix);
      console.log(this.item.NgayCapGiayPhep);
    }
    if(this.item.SoTaiKhoan != null && this.item.SoTaiKhoan != undefined){
      if(!(/^\d*$/.test(this.item.SoTaiKhoan))){
        this.toastr.warning("Số tài khoản ngân hàng phải là số.Vui lòng kiểm tra lại");
        return;
      }
    }
    this.item.TenCongTy = this.item.Ten;
    this.services.SetdmDonViSoHuuNhaDat(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close(res.message);
        } else {
          this.toastr.error(res.message)
        }
      }
    })
  }
}
