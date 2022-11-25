import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-phanquyentheophanxuongmodal',
  templateUrl: './phanquyentheophanxuongmodal.component.html',
  styleUrls: ['./phanquyentheophanxuongmodal.component.css']
})
export class PhanquyentheophanxuongmodalComponent implements OnInit {

 
  opt: any = ''
  item: any = {
  };
  listdmPhanXuong:any=[];
  listUser : any = [];
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal,
     private services: SanXuatService,
      public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.GetlistUser();
    this.GetlistPhanXuong();
  }
  
  accept() {
    this.item.HoatDong = true;
    this.khongclicknhieu = !this.khongclicknhieu;
      this.services.PhanQuyen().Set(this.item).subscribe((res: any) => {
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
  }
  GetlistUser() {
    this.services.GetListUser().subscribe((res: any) => {
      this.listUser = mapArrayForDropDown(res, 'TenNhanVien', 'IdUser');
    })
  }
  GetlistPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
}
