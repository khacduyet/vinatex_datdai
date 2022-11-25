import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { vungMien } from 'src/app/services/const';

@Component({
  selector: 'app-modaltinh',
  templateUrl: './modaltinh.component.html',
  styleUrls: ['./modaltinh.component.css']
})
export class ModaltinhComponent implements OnInit {
  opt: any = ''
  item: any = {};
  listVungMien:any=vungMien;
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, public toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.item.TenKhuVuc!== undefined&& this.item.TenKhuVuc!== null){
      this.item.tempVungMien = this.listVungMien.filter(ele=>ele.value === this.item.TenKhuVuc)[0];
    }
  }

  accept() {
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null && this.item.tempVungMien !== undefined && this.item.tempVungMien !== null) {
      this.item.TenKhuVuc = this.item.tempVungMien.value;
      this.services.SetdmTinh(this.item).subscribe((res: any) => {
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
