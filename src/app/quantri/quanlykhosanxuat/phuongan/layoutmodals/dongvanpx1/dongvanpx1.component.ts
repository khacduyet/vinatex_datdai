import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dongvanpx1',
  templateUrl: './dongvanpx1.component.html',
  styleUrls: ['./dongvanpx1.component.css']
})
export class Dongvanpx1Component implements OnInit {
  checkbutton: any = {
    Ghi:true
  };
  listLoBong: any = [];
  item: any = {};
  block1: any = [];
  block2: any = [];
  block3: any = [];
  block4: any = [];
  poolLoBong: any = [];
  banBong: any = {};
  ngoaiQuan: any = [];
  SoViTriNgoaiQuan:number=0;
  ViTriNgoaiQuan:any = '';
  // 18, 24, 30, 33, 36, 42, 47
  listBongNgoaiQuan:any =[];
  focusedSlot: any = null;
  length:number = 0;
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal) {
  }

  ngOnInit(): void {
    this.length = this.item.listLoBong.reduce((total,ele)=>{
      return total + ele.SoLuong
    },0)
    for (let i = 1; i <= (this.length+this.SoViTriNgoaiQuan); i++) {
      let isNgoaiQuan = this.ngoaiQuan.findIndex(ele => ele === i) > -1;
      this.banBong[`${i}`] = {
        _focus: false,
        _ngoaiQuan: isNgoaiQuan,
        labelLoBong: isNgoaiQuan ? 'Ngoại quan bông' : null,
        STT: `${i}. `,
        IdLoBong: null,
        Mau: 'white'
      }
      if (i <= 2) {
        this.block1.push(`${i}`)
      }
      if (2 < i && i <= 16) {
        this.block2.push(`${i}`)
      }
      if (16 < i && i <= (this.length+this.SoViTriNgoaiQuan-2)) {
        this.block3.push(`${i}`)
      }
      if ((this.length+this.SoViTriNgoaiQuan-2) < i && i <= (this.length+this.SoViTriNgoaiQuan) && (this.length+this.SoViTriNgoaiQuan>=18)) {
        this.block4.push(`${i}`)
      }
    };
  }
  veLayout(){
    this.resetAllPicked();
    this.block1 = [];
    this.block2 = [];
    this.block3 = [];
    this.block4 = [];
    this.ngoaiQuan = this.ViTriNgoaiQuan.split(',').map(ele=>parseInt(ele));
    console.log(this.ngoaiQuan)
    this.length = this.item.listLoBong.reduce((total,ele)=>{
      return total + ele.SoLuong
    },0)
    for (let i = 1; i <= (this.length+this.SoViTriNgoaiQuan); i++) {
      let isNgoaiQuan = this.ngoaiQuan.findIndex(ele => ele === i) > -1;
      this.banBong[`${i}`] = {
        _focus: false,
        _ngoaiQuan: isNgoaiQuan,
        labelLoBong: isNgoaiQuan ? 'Ngoại quan bông' : null,
        STT: `${i}. `,
        IdLoBong: null,
        Mau: 'white'
      }
      if (i <= 2) {
        this.block1.push(`${i}`)
      }
      if (2 < i && i <= 16) {
        this.block2.push(`${i}`)
      }
      if (16 < i && i <= (this.length+this.SoViTriNgoaiQuan-2)) {
        this.block3.push(`${i}`)
      }
      if ((this.length+this.SoViTriNgoaiQuan-2) < i && i <= (this.length+this.SoViTriNgoaiQuan)) {
        this.block4.push(`${i}`)
      }
    };
  }
  changeNgoaiQuanBong() {
    if (validVariable(this.ViTriNgoaiQuan)&& this.ViTriNgoaiQuan.trim()!=='') {
      this.ngoaiQuan = this.ViTriNgoaiQuan.split(',').map(ele => parseInt(ele));
      this.ngoaiQuan.forEach(vitri => {
        this.banBong[`${vitri}`]._ngoaiQuan = true;
        if (!validVariable(this.banBong[`${vitri}`].IdLoBong)) {
          this.banBong[`${vitri}`].labelLoBong = 'Ngoại quan bông'
        }
      });
    }else{
      for(let prop in this.banBong){
        this.banBong[prop]._ngoaiQuan = false;
        if (!validVariable(this.banBong[`${prop}`].IdLoBong)) {
          this.banBong[`${prop}`].labelLoBong = null
        }
      }
    }

  }
  slotFocus(slot) {
    for (let prop in this.banBong) {
      this.banBong[prop]._focus = false;
    }
    this.banBong[slot]._focus = !this.banBong[slot]._focus;
    this.focusedSlot = parseInt(slot);
  }
  returnSlot(event: MouseEvent, item) {
    if (validVariable(this.banBong[item].IdLoBong)) {
      let _returnSlot = this.item.listLoBong.find(ele => ele.IdLoBong === this.banBong[item].IdLoBong);
      if (validVariable(_returnSlot)) {
        _returnSlot.DaXep--;
        this.banBong[item].IdLoBong = null;
        this.banBong[item].labelLoBong = this.banBong[item]._ngoaiQuan ? 'Ngoại quan bông' : null;
        this.banBong[item].Mau = 'white';
      }
    }
    event.preventDefault();
  }
  xepLoBong(lobong, i) {
    if (validVariable(this.focusedSlot)) {
      if (validVariable(this.item.listLoBong[i].DaXep)) {
        if (this.item.listLoBong[i].DaXep < this.item.listLoBong[i].SoLuong) {
          if (validVariable(this.banBong[this.focusedSlot].IdLoBong)) {
            let _returnSlot = this.item.listLoBong.find(ele => ele.IdLoBong === this.banBong[this.focusedSlot].IdLoBong);
            if (validVariable(_returnSlot)) {
              _returnSlot.DaXep--;
            }
          }
          this.item.listLoBong[i].DaXep++
          this.banBong[`${this.focusedSlot}`].labelLoBong = lobong.TenLoBong;
          this.banBong[`${this.focusedSlot}`].Mau = lobong.Mau;
          this.banBong[`${this.focusedSlot}`].IdLoBong = lobong.IdLoBong;
          this.clearFocus()
          this.getNextFocus()
        }
      } else {
        if (validVariable(this.banBong[this.focusedSlot].IdLoBong)) {
          let _returnSlot = this.item.listLoBong.find(ele => ele.IdLoBong === this.banBong[this.focusedSlot].IdLoBong);
          if (validVariable(_returnSlot)) {
            _returnSlot.DaXep--;
          }
        }
        this.item.listLoBong[i].DaXep = 1;
        this.banBong[`${this.focusedSlot}`].labelLoBong = lobong.TenLoBong;
        this.banBong[`${this.focusedSlot}`].Mau = lobong.Mau;
        this.banBong[`${this.focusedSlot}`].IdLoBong = lobong.IdLoBong;
        this.clearFocus()
        this.getNextFocus()
      }
    } else {
      this.getNextFocus()
    }
  }
  clearFocus() {
    for (let prop in this.banBong) {
      this.banBong[prop]._focus = false;
    }
  }
  getNextFocus() {
    for (let prop in this.banBong) {
      if (!this.banBong[prop]._focus && !validVariable(this.banBong[prop].labelLoBong) && parseInt(prop) <= (this.length + this.SoViTriNgoaiQuan)) {
        this.focusedSlot = parseInt(prop);
        this.banBong[prop]._focus = true;
        break;
      } else {
        this.focusedSlot = null;
      }
    }
  }
  print() {
    window.print();
  }
  resetAllPicked() {
    this.item.listLoBong.forEach(lobong => {
      lobong.DaXep = null;
    });
  }
  GhiLai() {
    let listItem = [];
    for(let prop in this.banBong){
      let item = {
        ThuTu:prop,
        IdLoBong:this.banBong[prop].IdLoBong,
        Mau:this.banBong[prop].Mau,
        TenLoBong:this.banBong[prop].labelLoBong,
        isNgoaiQuan:this.banBong[prop]._ngoaiQuan
      }
      listItem.push(item);
    }
    console.log(listItem);
  }
}
