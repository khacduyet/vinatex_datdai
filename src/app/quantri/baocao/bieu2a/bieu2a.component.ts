import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bieu2a',
  templateUrl: './bieu2a.component.html',
  styleUrls: ['./bieu2a.component.css']
})
export class Bieu2aComponent implements OnInit {
  r1:any=[];
  r2:any=[];
  r3:any=[];
  cols:any=[1,2,3,4];
  tds:any=[];
  products:any=[1];
  constructor() { }

  ngOnInit(): void {
    this.r1 = [
      {rs:2,cs:1,label:'STT'},
      {rs:2,cs:1,label:'Diễn giải'},
      {rs:1,cs:3,label:'Tổng số cơ sở nhà đất được giao quản lý, sử dụng'},
      {rs:1,cs:3,label:'Số cơ sở nhà đất phải sắp xếp lại, xử lý theo QĐ09, NĐ167'},
      {rs:1,cs:3,label:'Số cơ sở nhà đất đã kê khai'},
      {rs:1,cs:3,label:'Số cơ sở nhà đất đã được phê duyệt'},
      {rs:2,cs:1,label:'Ghi chú'}
    ]
    this.r2 = [

    ];
    for(let i=1;i<=4;i++){
      this.r2.push(
        {rs:1,cs:1,label:'Số cơ sở'},
        {rs:1,cs:1,label:'Đất (m2)'},
        {rs:1,cs:1,label:'Nhà (m2)'},
      )
    }
    for(let i=1;i<=15;i++){
      this.tds.push(i);
    }
  }
}
