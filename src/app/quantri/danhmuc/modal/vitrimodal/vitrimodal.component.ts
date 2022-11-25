import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-vitrimodal',
  templateUrl: './vitrimodal.component.html',
  styleUrls: ['./vitrimodal.component.css']
})
export class VitrimodalComponent implements OnInit {
  opt: any = ''
  item: any = {
  };
  listdmKho: any = [];
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.getListdmKho();
    
  }

  getListdmKho() {
    var data: any = {};
    data.CurrentPage = 0;
    data.Loai = 1;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined) {
      if(this.item.Id === undefined || this.item.Id === null || this.item.Id === "")
        this.item.HoatDong = true;
      this.services.SetdmViTri(this.item).subscribe((res: any) => {
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
