import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bieu4',
  templateUrl: './bieu4.component.html',
  styleUrls: ['./bieu4.component.css']
})
export class Bieu4Component implements OnInit {
  r1:any=[];
  r2:any=[];
  r3:any=[];
  cols:any=[];
  tds:any=[];
  products:any=[1];
  constructor() { }

  ngOnInit(): void {
    this.r1 = [
      {rs:3,cs:1,label:'STT'},
      {rs:3,cs:1,label:'Diễn giải'},
      {rs:1,cs:5,label:'Đối tượng'},
      {rs:3,cs:1,label:'Mục đích sử dụng theo VB giao đất, cho thuê đất'},
      {rs:3,cs:1,label:'Lý do không thuộc đối tượng sắp xếp lại, xử lý'},
      {rs:2,cs:2,label:'Tổng diện tích'},
      {rs:1,cs:16,label:'Hiện trạng'},
      {rs:3,cs:1,label:'Đề xuất, kiến nghị (nếu có)'},
      {rs:3,cs:1,label:'Ghi chú'}
    ]
    this.r2 = [
      {rs:1,cs:4,label:'Nhà nước giao đất, cho thuê đất'},
      {rs:2,cs:1,label:'Thuê lại của Công ty quản lý kinh doanh Nhà, đất của địa phương'},
      {rs:1,cs:2,label:'Trụ sở làm việc'},
      {rs:1,cs:2,label:'Hoạt động sự nghiệp'},
      {rs:1,cs:2,label:'Làm nhà ở'},
      {rs:1,cs:2,label:'Cho thuê'},
      {rs:1,cs:2,label:'Bỏ trống'},
      {rs:1,cs:2,label:'Bị lấn chiếm'},
      {rs:1,cs:2,label:'Kinh doanh, liên doanh, liên kết'},
      {rs:1,cs:2,label:'Khác'},

    ];
    this.r3 = [
      {rs:2,cs:1,label:'Giao đất không thu tiền sử dụng đất'},
      {rs:2,cs:1,label:'Giao đất có thu tiền sử dụng đất'},
      {rs:2,cs:1,label:'Cho thuê đất trả tiền một lần'},
      {rs:2,cs:1,label:'Cho thuê đất trả tiền hàng năm'},
    ];
    for(let i=1;i<=9;i++){
      this.cols.push(i)
      this.r3.push(
        {rs:1,cs:1,label:'Đất (m2)'},
        {rs:1,cs:1,label:'Nhà (m2)'},
      )
    }
    for(let i=1;i<=29;i++){
      this.tds.push(i);
    }
  }
}
