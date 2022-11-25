import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-modalphuongansapxep',
  templateUrl: './modalphuongansapxep.component.html',
  styleUrls: ['./modalphuongansapxep.component.css']
})
export class ModalphuongansapxepComponent implements OnInit {
  opt: any = ''
  item: any = {
    ID:0,
    TepDinhKems:[]
  };
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, public toastr: ToastrService,private _modal:NgbModal) { }

  ngOnInit(): void {
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      console.log(data);
      console.log(this.item.TepDinhKems);

      let itemupload:any = {};
      itemupload.ID = 0;
      itemupload.TenGui = data[data.length - 1]?.Name||null;
      itemupload.TenGoc = data[data.length - 1]?.NameLocal||null;
      itemupload.DuongDan = data[data.length - 1]?.Url||null;
      if(itemupload.TenGui!== null){
        if(this.item.TepDinhKems.length!==0){
          this.item.TepDinhKems.forEach(ele => {
            ele.isXoa =true;
          });
        }
        this.item.TepDinhKems.unshift(itemupload);
        console.log(this.item);
      }
    }, (reason) => {

    });
  }
  taiXuongFileDinhKem() {

  }
  accept() {
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null){
      this.services.SetdmPhuongAnSapXep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close(res.message);
          } else {
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!')
    }
  }
}
