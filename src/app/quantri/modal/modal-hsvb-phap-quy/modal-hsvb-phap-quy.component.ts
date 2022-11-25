import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadmodalComponent } from '../uploadmodal/uploadmodal.component';
import { vn } from 'src/app/services/const';
import { DateToUnix, vietHoaChuCaiDau } from 'src/app/services/globalfunction';
import { Dat09Service } from 'src/app/services/callApi';

@Component({
  selector: 'app-modal-hsvb-phap-quy',
  templateUrl: './modal-hsvb-phap-quy.component.html',
  styleUrls: ['./modal-hsvb-phap-quy.component.css']
})
export class ModalHsvbPhapQuyComponent implements OnInit {
  opt: any = 'add';
  listLoaiVanBan: any = [
  ];
  vietHoaChuCaiDau = vietHoaChuCaiDau;
  lang: any = vn;
  yearRange:string =`${((new Date()).getFullYear()-50)}:${((new Date()).getFullYear())}`;
  item: any = {};
 
  constructor(private _modal: NgbModal, private activeModal: NgbActiveModal,private _service:Dat09Service) {

  }

  ngOnInit(): void {
    this.GetListLoaiVanBan()
  }
  GetListLoaiVanBan(){
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    this._service.GetListLoaiVanBan(data).subscribe((res: any) => {
      this.listLoaiVanBan = res.map(ele=>{
        return {
          value:ele.ID,
          label:ele.Ten
        }
      });
    })
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      this.item.ID = this.item.ID !== undefined ? this.item.ID : 0;
      this.item.TenGui = data[data.length - 1].Name;
      this.item.TenGoc = data[data.length - 1].NameLocal;
      this.item.DuongDan = data[data.length - 1].Url;
    }, (reason) => {

    });
  }
  taiXuongFileDinhKem() {

  }
  accept() {
    if (this.item?.NgayQuyetDinh !== undefined && this.item?.NgayQuyetDinh !== undefined) {
      this.item.NgayQuyetDinhUnix = DateToUnix(this.item.NgayQuyetDinh);
    }
    console.log(this.item)
    this.activeModal.close(this.item);
  }
  
}
