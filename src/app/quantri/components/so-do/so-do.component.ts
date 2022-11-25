import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { API } from 'src/app/services/host';

@Component({
  selector: 'app-so-do',
  templateUrl: './so-do.component.html',
  styleUrls: ['./so-do.component.css']
})
export class SoDoComponent implements OnInit,DoCheck {
  @Input('item') items:any=[];
  show:boolean = false;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor() { }

  ngOnInit(): void {
    
  }
  ngDoCheck():void{
    this.items.forEach(el=>{
      el.imgURL = API.imgURL+el.Link+'&viewOnly=true';
    })
  }

}
