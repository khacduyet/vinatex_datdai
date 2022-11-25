import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bieu1b',
  templateUrl: './bieu1b.component.html',
  styleUrls: ['./bieu1b.component.css']
})
export class Bieu1bComponent implements OnInit {
  r1:any=[];
  r2:any=[];
  r3:any=[];
  cols:any=[1,2,3,4];
  tds:any=[];
  products:any=[1];
  constructor() { }

  ngOnInit(): void {
    this.r1 = [
      {rs:3,cs:1,label:'STT'},
      {rs:3,cs:1,label:'Tên đơn vị'},
      {rs:3,cs:1,label:'Số cơ sở'},
      {rs:1,cs:2,label:'Đất'},
      {rs:1,cs:4,label:'Nhà'},
      {rs:1,cs:12,label:'Hiện trạng sử dụng'},
      {rs:3,cs:1,label:'Ghi chú'}
    ]
    this.r2 = [
      {rs:2,cs:1,label:'m2'},
      {rs:2,cs:1,label:'Giá trị theo sổ sách kế toán'},
      {rs:2,cs:1,label:'m2 sàn xây dựng'},
      {rs:1,cs:2,label:'Nguyên giá'},
      {rs:2,cs:1,label:'Giá trị còn lại'},
      {rs:1,cs:3,label:'Kinh doanh'},
      {rs:1,cs:3,label:'Cho thuê'},
      {rs:1,cs:3,label:'Liên doanh'},
      {rs:1,cs:3,label:'Liên kết'},
    ];
    this.r3 = [
      {rs:1,cs:1,label:'Ngân sách'},
      {rs:1,cs:1,label:'Nguồn khác'},
    ]
    for(let i=1;i<=4;i++){
      this.r3.push(
        {rs:1,cs:1,label:'Số cơ sở'},
        {rs:1,cs:1,label:'Đất (m2)'},
        {rs:1,cs:1,label:'Nhà (m2)'},
      )
    }
    for(let i=1;i<=22;i++){
      this.tds.push(i);
    }
  }

}
