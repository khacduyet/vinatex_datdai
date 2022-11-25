import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTaiSanTrenDatComponent } from '../../modal-tai-san-tren-dat/modal-tai-san-tren-dat.component';
import { ModalHsvbPhapQuyComponent } from '../../modal-hsvb-phap-quy/modal-hsvb-phap-quy.component';
import { Dat09Service } from 'src/app/services/callApi';
import { UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-crud-hsvb-phap-quy',
  templateUrl: './crud-hsvb-phap-quy.component.html',
  styleUrls: ['./crud-hsvb-phap-quy.component.css']
})
export class CrudHsvbPhapQuyComponent implements OnInit, DoCheck {
  @Input('TepDinhKems') TepDinhKems: Array<any> = [];
  @Output('TepDinhKems') tepDinhKemsChange: EventEmitter<any> = new EventEmitter<any>();
  listLoaiVanBan:any=[];
  cols: any = [
    // {
    //   header: 'Số văn bản',
    //   field: 'SoVanBan',
    //   width: '90px'
    // },
    // {
    //   header: 'Tên văn bản',
    //   field: 'TenVanBan',
    //   width: '200px'
    // },
    // {
    //   header: 'Ngày quyết định',
    //   field: 'NgayQuyetDinh',
    //   width: '100px'
    // },
    // {
    //   header: 'CQ ban hành',
    //   field: 'CoQuanBanHanh',
    //   width: '200px'
    // },

    // {
    //   header: 'Nơi lưu trữ văn bản gốc',
    //   field: 'NoiLuuTru',
    //   width: '100px'
    // },
    // {
    //   header: 'Tệp đính kèm',
    //   field: 'TepDinhKem',
    //   width: '150px'
    // }, 
    // {
    //   header: 'Trích yếu',
    //   field: 'GhiChu',
    //   width: '150px'
    // },
    {
      header: 'Loại văn bản',
      field: 'LoaiVanBan',
      width: '100px'
    },
    {
      header: 'Trích yếu',
      field: 'GhiChu',
      width: '150px'
    },
    {
      header: 'Tên văn bản',
      field: 'TenVanBan',
      width: '150px'
    },
    {
      header: 'CQ ban hành',
      field: 'CoQuanBanHanh',
      width: '200px'
    },
    {
      header: 'Số văn bản',
      field: 'SoVanBan',
      width: '100px'
    },
    {
      header: 'Ngày quyết định',
      field: 'NgayQuyetDinh',
      width: '100px'
    },
    {
      header: 'Nơi lưu trữ văn bản gốc',
      field: 'NoiLuuTru',
      width: '200px'
    },
    {
      header: 'Tệp đính kèm',
      field: 'TepDinhKem',
      width: '150px'
    },
  ];

  constructor(private _modal: NgbModal, private _services: Dat09Service) { }
  getLabel(item){
    return this.listLoaiVanBan.find(ele=>ele.value===item.IdLoaiVanBan)?.label||'';
  }
  ngOnInit(): void {
    // let alo = JSON.parse(JSON.stringify(this.items[0]));
    // for (let i = 0; i < 10; i++) {
    //   this.items.push(alo);
    // }
    this.GetListLoaiVanBan()
  }
  GetListLoaiVanBan(){
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    this._services.GetListLoaiVanBan(data).subscribe((res: any) => {
      this.listLoaiVanBan = res.map(ele=>{
        return {
          value:ele.ID,
          label:ele.Ten
        }
      });
    })
  }
  ngDoCheck(): void {
    this.tepDinhKemsChange.emit(this.TepDinhKems);
  }
  add() {
    let modalRef = this._modal.open(ModalHsvbPhapQuyComponent, {
      size: 'xl',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      ID: 0
    };
    modalRef.result.then(res => {
      console.log(res);
      this.TepDinhKems.push(res);
    }).catch(er => { console.log(er) });
  }
  edit(item, i) {
    let modalRef = this._modal.open(ModalHsvbPhapQuyComponent, {
      size: 'xl',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.item.NgayQuyetDinh = UnixToDate(item.NgayQuyetDinhUnix);
    modalRef.result.then(res => {
      this.TepDinhKems.splice(i, 1);
      this.TepDinhKems.push(res);
    }).catch(er => { console.log(er) });
  }
  delete(i) {
    let item = this.TepDinhKems.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.TepDinhKems.push(JSON.parse(JSON.stringify(item)));
    }

    // this.TepDinhKems[i].isXoa = true;
    // this.TepDinhKems.push(this.TepDinhKems.splice(i,1));
  }

}
