import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sanluongchitiet',
  templateUrl: './sanluongchitiet.component.html',
  styleUrls: ['./sanluongchitiet.component.css']
})
export class SanluongchitietComponent implements OnInit {
  filter: any = {};
  r1: any = [
  ];
  r2: any = [

  ]
  tabIndex: any = 0;
  constructor() { }

  ngOnInit(): void {
    this.changeLuyKe({ checked: false })
  }
  changeLuyKe(event) {
    if (event.checked) {
      if (this.tabIndex === 0) {
        this.r1 = [
          { label: 'Ca sản xuất', cs: 4, rs: 1 },
          { label: 'Hiệu suất (%)/ngày', cs: 2, rs: 1 },
          { label: 'Năng bq(kg/ca/máy)', cs: 2, rs: 1 },
        ]
        this.r2 = [
          { label: 'Ca 1', cs: 1, rs: 1 },
          { label: 'Ca 2', cs: 1, rs: 1 },
          { label: 'Ca 3', cs: 1, rs: 1 },
          { label: 'Tổng', cs: 1, rs: 1 },
          { label: 'Năng suất lý thuyết', cs: 1, rs: 1 },
          { label: 'Hiệu suất(%)', cs: 1, rs: 1 },
          { label: 'Máy huy động / ngày', cs: 1, rs: 1 },
          { label: 'NS TH bq ngàyngày(kg/ca máy)', cs: 1, rs: 1 },
        ]
      } else {
        this.r1 = [
          { label: 'Ca sản xuất', cs: 4, rs: 1 },
          // { label: 'Hiệu suất (%)/ngày', cs: 2, rs: 1 },
          { label: 'Năng bq(kg/ca/máy)', cs: 2, rs: 1 },
        ]
        this.r2 = [
          { label: 'Ca 1', cs: 1, rs: 1 },
          { label: 'Ca 2', cs: 1, rs: 1 },
          { label: 'Ca 3', cs: 1, rs: 1 },
          { label: 'Tổng', cs: 1, rs: 1 },
          // { label: 'Năng suất lý thuyết', cs: 1, rs: 1 },
          // { label: 'Hiệu suất(%)', cs: 1, rs: 1 },
          { label: 'Máy huy động / ngày', cs: 1, rs: 1 },
          { label: 'NS TH bq ngàyngày(kg/ca máy)', cs: 1, rs: 1 },
        ]
      }
    } else {
      this.r1 = [
        { label: 'Ca sản xuất', cs: 4, rs: 1 },
        { label: 'Hiệu suất (%)/ngày', cs: 2, rs: 1 },
        { label: 'Năng bq(kg/ca/máy)', cs: 2, rs: 1 },
      ]
      this.r2 = [
        { label: 'Ca 1', cs: 1, rs: 1 },
        { label: 'Ca 2', cs: 1, rs: 1 },
        { label: 'Ca 3', cs: 1, rs: 1 },
        { label: 'Tổng', cs: 1, rs: 1 },
        { label: 'Năng suất lý thuyết', cs: 1, rs: 1 },
        { label: 'Hiệu suất(%)', cs: 1, rs: 1 },
        { label: 'Máy huy động / ngày', cs: 1, rs: 1 },
        { label: 'NS TH bq ngàyngày(kg/ca máy)', cs: 1, rs: 1 },
      ]
    }
    console.log(this.r1)
  }

  changeTab(event) {//event.index
    this.tabIndex = event.index;
    this.changeLuyKe({checked:this.filter.checkLuyKe})
  }
}
