import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tai-san-tren-dat',
  templateUrl: './tai-san-tren-dat.component.html',
  styleUrls: ['./tai-san-tren-dat.component.css']
})
export class TaiSanTrenDatComponent implements OnInit {
  @Input('item') items: any = [];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Loại tài sản',
      field: 'TenLoaiTaiSan',
      width: '200px'
    },
    {
      header: 'Tên tài sản',
      field: 'Ten',
      width: '200px'
    },
    {
      header: 'Diện tích sàn',
      field: 'DienTichSan',
      width: '100px',
      type:'number'
    },
    {
      header: 'Diện tích đất xây dựng',
      field: 'DienTichXayDung',
      width: '100px',
      pipe: 'number'
    },
    {
      header: 'Cấp/hạng công trình',
      field: 'CapHang',
      width: '100px'
    },
    {
      header: 'Số tầng',
      field: 'SoTang',
      width: '100px'
    },
    {
      header: 'Năm xây dựng',
      field: 'NamXayDung',
      width: '100px'
    }, 
    {
      header: 'Số năm đã SD',
      field: 'SoNamSuDung',
      width: '100px'
    }, 
    {
      header: 'Số năm SD còn lại',
      field: 'SoNamSuDungConLai',
      width: '100px'
    },
    {
      header: 'Tuổi thọ',
      field: 'TuoiTho',
      width: '100px'
    },
    {
      header: 'Thời gian khấu hao',
      field: 'ThoiGianKhauHao',
      width: '100px'
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
