import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, deepCopy } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-danhsachmaymodal',
  templateUrl: './danhsachmaymodal.component.html',
  styleUrls: ['./danhsachmaymodal.component.css']
})
export class DanhsachmaymodalComponent implements OnInit {
  opt: any = ''
  item: any = {
  };
  listdmPhanXuong: any = [];
  listCongDoan: any = [];
  listdmPhanXuong_copy: any = [];
  listCongDoan_copy: any = [];
  listPhanNhomMaySX: any = [];
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    // this.listdmPhanXuong_copy = deepCopy(this.listdmPhanXuong);
    // this.listCongDoan_copy = deepCopy(this.listCongDoan);
    if (this.opt == 'edit') {
      this.item.objdmPhanNhom = this.listPhanNhomMaySX.filter(obj => this.item.IddmPhanNhom == obj.Id)[0];
    }
  }
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== '' && this.item.Ten !== '' && this.item.Ten !== undefined && this.item.objdmPhanNhom !== undefined) {
      this.item.IddmPhanNhom = this.item.objdmPhanNhom.Id;
      this.services.SetdmMay(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.activeModal.close(res.message);
          } else {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }

  ChonPhanNhomMay(e) {
    // this.listCongDoan = this.listCongDoan_copy.map(obj => obj.value == e.value.CongDoan);
    // this.listdmPhanXuong = this.listdmPhanXuong_copy.map(obj => obj.value == e.value.IddmPhanXuong);
    this.item.CongDoan = e.value.CongDoan != null ? this.listCongDoan.filter(obj => obj.value == e.value.CongDoan)[0].value : null;
    this.item.IddmPhanXuong = e.value.IddmPhanXuong != null ? this.listdmPhanXuong.filter(obj => obj.value == e.value.IddmPhanXuong)[0].value : null;
  }

}
