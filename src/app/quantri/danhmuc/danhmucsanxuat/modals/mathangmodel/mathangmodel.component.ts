import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { MultiSelectModule } from 'primeng/multiselect';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-mathangmodel',
  templateUrl: './mathangmodel.component.html',
  styleUrls: ['./mathangmodel.component.css']
})
export class MathangmodelComponent implements OnInit {
  opt: any = ''
  item: any = {
  };
  listCongDoan: any = [];
  listLoaiSoi: any = [];
  listItem: any = [];
  listDacTinhSoi: any = [
    {
      value: "CC",
      label: "CC"
    },
    {
      value: "CF",
      label: "CF"
    }
  ];
  editTableItem: any = {};
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    if(this.opt === 'add'){
      this.item.HoatDong = true;
    }
    else{
      this.item.Nm = this.item.Ne*1.693;
    }
    this.getListLoaiSoi();
  }

  getListLoaiSoi() {
    this.services.GetListOptdmLoaiSoi().subscribe((res: any) => {
      this.listLoaiSoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined) {
      this.item.Loai = 1;
      this.item.DonViThietKe = this.item.DonViDatHang;
      var listCodeCongDoan_new: any = [];
      // if (this.item.listCongDoan != null && this.item.listCongDoan != undefined) {
      //   this.item.listCongDoan.forEach(element => {
      //     if(element != null && element!= undefined){
      //       var data: any = {};
      //       data.CongDoan = element;
      //       listCodeCongDoan_new.push(data);
      //     }
      //   });
      //   this.item.listCongDoan = listCodeCongDoan_new;
      // }
     
      this.services.SetdmItem(this.item).subscribe((res: any) => {
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

  TinhGiaTri(event) {
    if(event !== undefined)
     return (event*1.693);
  }
}
