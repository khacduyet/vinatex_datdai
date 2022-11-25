import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tinh-trang-phap-ly',
  templateUrl: './tinh-trang-phap-ly.component.html',
  styleUrls: ['./tinh-trang-phap-ly.component.css']
})
export class TinhTrangPhapLyComponent implements OnInit {
  @Input('item') items:any=[];

  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols:any=[
    {
      header:'Loại Biến động',
      field:'TendmBienDong',
      width:'200px'
    },
    {
      header:'Nội dung biến động',
      field:'NoiDungBienDong',
      width:'500px'
    },
    {
      header:'Ngày ký',
      field:'NgayKy',
      width:'150px'
    },
    {
      header:'Người ký',
      field:'NguoiKy',
      width:'150px'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
