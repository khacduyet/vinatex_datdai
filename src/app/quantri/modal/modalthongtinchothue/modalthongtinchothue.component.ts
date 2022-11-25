import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { vn } from 'src/app/services/const';
import { UploadmodalComponent } from '../uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-modalthongtinchothue',
  templateUrl: './modalthongtinchothue.component.html',
  styleUrls: ['./modalthongtinchothue.component.css']
})
export class ModalthongtinchothueComponent implements OnInit {
  item: any = {};
  thongTinHopDong:any = { TepDinhKemHopDong: {} };
  opt: any = '';
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    console.log(this.thongTinHopDong);
  }

  accept() {
    if (this.opt === 'doitacmoi') {
      if (this.item.Ten === null || this.item.Ten === undefined || this.item.Ma === null || this.item.Ma === undefined || this.item.Ma.trim() === '' || this.item.Ten.trim() === '') {
        this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!');
        return;
      }
      this.services.SetdmDonViSoHuuNhaDat(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close(
              { 
                ID:res.ID,
                thongTinHopDong: JSON.parse(JSON.stringify(this.thongTinHopDong)),
                message:res.message
              }
            );
            // this.activeModal.close(res.message);
          } else {
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.activeModal.close(
        { 
          thongTinHopDong: JSON.parse(JSON.stringify(this.thongTinHopDong))
        }
      );
    }
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      this.thongTinHopDong.TepDinhKemHopDong.ID = 0;
      this.thongTinHopDong.TepDinhKemHopDong.TenGui = data[data.length - 1].Name;
      this.thongTinHopDong.TepDinhKemHopDong.TenGoc = data[data.length - 1].NameLocal;
      this.thongTinHopDong.TepDinhKemHopDong.DuongDan = data[data.length - 1].Url;
    }, (reason) => {

    });
  }

}
