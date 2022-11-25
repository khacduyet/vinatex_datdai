import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-modaldmkho',
  templateUrl: './modaldmkho.component.html',
  styleUrls: ['./modaldmkho.component.css']
})
export class ModaldmkhoComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  listNhomKho: any = [];
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal,private sanXuatService:SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListNhomKho();
  }
  accept() {
    this.item.HoatDong  = true;
    this.khongclicknhieu = !this.khongclicknhieu;
    this.sanXuatService.SetdmKho(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
    
  }
  getListNhomKho() {
    let data: any = {};
    data.CurrentPage = 0;
    this.sanXuatService.GetListdmNhomKho(data).subscribe((res: any) => {
      this.listNhomKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.activeModal.close(res.message);
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }
}
