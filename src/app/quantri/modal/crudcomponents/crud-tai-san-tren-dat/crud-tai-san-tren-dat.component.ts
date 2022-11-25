import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTaiSanTrenDatComponent } from '../../modal-tai-san-tren-dat/modal-tai-san-tren-dat.component';

@Component({
  selector: 'app-crud-tai-san-tren-dat',
  templateUrl: './crud-tai-san-tren-dat.component.html',
  styleUrls: ['./crud-tai-san-tren-dat.component.css']
})
export class CrudTaiSanTrenDatComponent implements OnInit, DoCheck {
  @Input('TaiSanDatNhas') items: any = [];
  @Output('TaiSanDatNhas') itemChange: EventEmitter<any> = new EventEmitter<any>();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Loại tài sản',
      field: 'TenLoaiTaiSan',
      width: '200px',
      pipe: ''

    },
    {
      header: 'Tên tài sản',
      field: 'Ten',
      width: '200px',
      pipe: ''

    },
    {
      header: 'Diện tích sàn',
      field: 'DienTichSan',
      width: '100px',
      pipe: 'number'
    },
    {
      header: 'Diện tích đất xây dựng',
      field: 'DienTichXayDung',
      width: '100px',
      pipe: 'number'
    },

    {
      header: 'Cấp/hạng công trình',
      field: 'TendmCapHang',
      width: '100px',
      pipe: ''

    },
    {
      header: 'Số tầng',
      field: 'SoTang',
      width: '100px',
      pipe: ''

    },
    {
      header: 'Năm xây dựng',
      field: 'NamXayDung',
      width: '100px',
      pipe: ''

    },
    {
      header: 'Số năm đã SD',
      field: 'SoNamSuDung',
      width: '100px',
      pipe: ''

    },
    {
      header: 'Số năm SD còn lại',
      field: 'SoNamSuDungConLai',
      width: '100px',
      pipe: ''

    },
    {
      header: 'Tuổi thọ',
      field: 'TuoiTho',
      width: '100px',
      pipe: ''

    },
    {
      header: 'Thời gian khấu hao',
      field: 'ThoiGianKhauHao',
      width: '100px',
      pipe: ''
    },
    {
      header: 'Nguyên giá (Triệu đồng)',
      field: 'NguyenGia',
      width: '100px', 
      pipe: 'number'
    },
    {
      header: 'Giá trị còn lại (Triệu đồng)',
      field: 'GiaTriConLai',
      width: '100px',
      pipe: 'number'
    },
  ];

  constructor(private _modal: NgbModal) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.itemChange.emit(this.items);
  }
  add() {
    let modalRef = this._modal.open(ModalTaiSanTrenDatComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = {
      ID: 0,
      TepDinhKems: [],
      BanVe: [],
      LoaiTaiSan: {}
    };
    modalRef.componentInstance.opt = 'add';
    modalRef.result.then(res => {
      console.log(res.item);
      this.items.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  edit(item, i) {
    let modalRef = this._modal.open(ModalTaiSanTrenDatComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.opt = 'edit';
    modalRef.result.then(res => {
      this.items.splice(i, 1);
      this.items.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  delete(i) {
    let item = this.items.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.items.push(JSON.parse(JSON.stringify(item)));
    }

    // this.items[i].isXoa = true;
    // this.items.push(this.items.splice(i,1));
    console.log(item);
    console.log(this.items);
  }
}
