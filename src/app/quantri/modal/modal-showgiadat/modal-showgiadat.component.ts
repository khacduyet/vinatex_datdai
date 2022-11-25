import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { vn } from 'src/app/services/const';

@Component({
  selector: 'app-modal-showgiadat',
  templateUrl: './modal-showgiadat.component.html',
  styleUrls: ['./modal-showgiadat.component.css']
})
export class ModalShowgiadatComponent implements OnInit {
  opt: any = 'edit';
  IDTaiSan: any = 0;
  LoaiGiaDat:any=''
  newItem: any = {
    ID: 0,
    FileDinhKem: {}
  };
  listDonVi:any=[
  ]
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 20)}:${((new Date()).getFullYear()+20)}`;
  item: any = {};
  listGiaDat: any = [];

  constructor(private activeModal: NgbActiveModal, private _service:Dat09Service) { }

  ngOnInit(): void {
    this.GetListdmDonViTien()
    this.newItem.LoaiGiaDat = this.LoaiGiaDat;
  }
  GetListdmDonViTien(){
    this._service.GetListdmDonViTien().subscribe((res:Array<any>)=>{
      this.listDonVi = res.map(ele=>{
        return {
          value:ele.ID,
          label:ele.Ten
        }
      })
    })
  }
  
  onClose() {
    this.activeModal.close();
  }

}
