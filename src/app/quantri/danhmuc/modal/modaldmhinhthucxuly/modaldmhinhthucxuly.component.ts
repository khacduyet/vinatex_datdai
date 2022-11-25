import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modaldmhinhthucxuly',
  templateUrl: './modaldmhinhthucxuly.component.html',
  styleUrls: ['./modaldmhinhthucxuly.component.css']
})
export class ModaldmhinhthucxulyComponent implements OnInit {
  opt:any='';
  item:any={};
  listDanhMucLoaiHinhThucXuLy:any=[];
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, public toastr: ToastrService) { }

  ngOnInit(): void {
  }
  accept() {

    //&& this.item.LoaiHinhThucXuLy !== undefined
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined && this.item.Loai.trim() !== '' && this.item.Loai !== undefined)  {
      // this.item.Loai = this.item.LoaiHinhThucXuLy.ID;
      this.services.SetdmHinhThucXuLy(this.item).subscribe((res:any)=>{
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
