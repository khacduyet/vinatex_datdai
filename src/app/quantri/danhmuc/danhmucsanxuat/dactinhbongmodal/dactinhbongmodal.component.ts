import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dactinhbongmodal',
  templateUrl: './dactinhbongmodal.component.html',
  styleUrls: ['./dactinhbongmodal.component.css']
})
export class DactinhbongmodalComponent implements OnInit {
  opt: any = ''
  item: any = {
  };
  listdmLoaiBong: any = [];
  listdmCapBong: any = [];
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    var data: any = {};
    data.CurrentPage = 0;
    this.services.GetListdmLoaiBong(data).subscribe((res: any) => {
      this.listdmLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.GetListOptdmCapBong().subscribe((res: any) => {
      this.listdmCapBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.IddmCapBong !== undefined && this.item.IddmLoaiBong !== undefined) {
      this.services.dmDacTinhBong().Set(this.item).subscribe((res: any) => {
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
}
