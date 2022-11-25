import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DinhmuctieuchichatluongsoimodalComponent } from 'src/app/quantri/danhmuc/danhmucsanxuat/dinhmuctieuchichatluongsoimodal/dinhmuctieuchichatluongsoimodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TrangthaimaysanxuatComponent } from '../../../quytrinh/trangthaimaysanxuat/trangthaimaysanxuat.component';
import { BaseModalNavigation } from '../navigation.class';

@Component({
  selector: 'app-botrimay-ong',
  templateUrl: './botrimay-ong.component.html',
  styleUrls: ['./botrimay-ong.component.css']
})
export class BotrimayOngComponent extends BaseModalNavigation implements OnInit {
  checkbutton: any = {
    Ghi: true
  };
  filter: any = {};
  addonData: any = {};
  listHangHoa: any = [];
  item: any = {};
  newMay: any = {};
  mapCa_Id: any = {};
  TongMatHang: any = {};
  listCanBoTri: any = {};
  arrCa: any = [];
  tocDoMay: any = [];
  lang: any = vn;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private _store: StoreService) {
    super(activeModal);
  }

  ngOnInit(): void {
    this.listHangHoa = mapArrayForDropDown(this.item.listCanBoTri, 'Ten', 'Id')
    this.sort();
    this.initSpeedOption();
    this.mapCa_Id = {};
    this.listCanBoTri = {};
    this.item.listCaSanXuat.forEach(ca => {
      this.mapCa_Id[ca.Id.split("-").join("_")] = ca.Id;
    });
    this.item.listCanBoTri.forEach(mathang => {
      mathang.SoCocOng = 0;
    });
    this.arrCa = this.item.listCaSanXuat.map(ele => {
      return {
        Id: ele.Id,
        prop: ele.Id.split("-").join("_"),
        Name: ele.Ten
      }
    })
    this.arrCa.forEach(ca => {
      this.listCanBoTri[`${ca.prop}`] = deepCopy(this.item.listCanBoTri);
      this.TongMatHang[`${ca.prop}`]={};
    });
    // console.log(this.listCanBoTri);
    this.inputChange()
  }
  sort() {
    this.item.listDaBoTri = this.item.listDaBoTri.sort((a: any, b: any) => {
      return a.TenMay.localeCompare(b.TenMay);
    })
  }
  initSpeedOption() {
    this.item.listDaBoTri.forEach(may => {
      if (validVariable(may.IdCanDoiChuyen_CanBoTri)) {
        let IddmItem = this.item.listCanBoTri.filter(mathang => mathang.Id === may.IdCanDoiChuyen_CanBoTri)?.[0].IddmItem;
        may.listTocDo = mapArrayForDropDown(may.listDinhMucMay.filter(dinhmuc => dinhmuc.IddmItem === IddmItem), 'TocDo', 'Id');
        if (!validVariable(may.IdPhanNhomMay_Item)) {
          may.IdPhanNhomMay_Item = may.listTocDo?.[0]?.value
        }else{
          may.DinhMucNangSuat = (may.listDinhMucMay.filter(dinhmuc => dinhmuc.Id === may.IdPhanNhomMay_Item)?.[0]?.DinhMucNangSuat || 0)
        }
      } else {
        may.listTocDo = [];
      }
    });
  }
  addMore(item) {
    this.item.listDaBoTri.push(deepCopy(item));
    this.sort();
  }
  inputChange() {
    this.TinhSoCocSuDungTungMay();
    this.TinhSoCocSuDungTheoMatHang();
    this.TinhTongMatHang();
  }
  TinhTongMatHang() {
    for (let ca in this.TongMatHang) {
      let tempTong = {
        SoMayCon:0,
        SoCocOng:0,
        OngTrenCon:0
      }
     for(let prop in tempTong){
       tempTong[`${prop}`] = this.listCanBoTri[`${ca}`].reduce((Tong,mathang)=>Tong+mathang[`${prop}`],0);
     }
      this.TongMatHang[`${ca}`] = tempTong;
    }
  }
  TinhSoCocSuDungTheoMatHang() {
    for (let ca in this.listCanBoTri) {
      this.listCanBoTri[ca].forEach(mathang => {
        let mays = this.item.listDaBoTri.filter(may => may.IdCanDoiChuyen_CanBoTri === mathang.Id && may.IddmCaSanXuat === this.mapCa_Id[ca]);
        if (mays.length !== 0) {
          mathang.SoCocOng = mays.reduce((Total, may) => Total + may.SoCocSuDung, 0);
          if (mathang.SoCocOng !== 0 && mathang.SoMayCon !== 0) {
            mathang.OngTrenCon = mathang.SoCocOng / mathang.SoMayCon;
          }
          else {
            mathang.OngTrenCon = 0;
          }
        } else {
          mathang.SoCocOng = 0;
          mathang.OngTrenCon = 0;
        }
      });
    }
  }
  TinhSoCocSuDungTungMay() {
    this.item.listDaBoTri.forEach(may => {
      // if(validVariable(may.SoCocDen)&& validVariable(may.SoCocTu) && may.SoCocDen>may.SoCocTu){
      //   may.SoCocSuDung = (may.SoCocDen-may.SoCocTu)+1;
      // }
      if (validVariable(may.SoCocDen) && validVariable(may.SoCocTu)) {
        may.SoCocSuDung = Math.abs(may.SoCocDen - may.SoCocTu) + 1;
      }
      else {
        may.SoCocSuDung = 0;
      }
      if(validVariable(may.DinhMucNangSuat)){
        may.SanLuongCa = may.DinhMucNangSuat * may.SoCocSuDung/60;
      }
    })
  }
  chonTocDo(item,event){
    item.DinhMucNangSuat = (item.listDinhMucMay.filter(dinhmuc => dinhmuc.Id === event.value)?.[0]?.DinhMucNangSuat || 0);
    this.inputChange()
  }
  chonMatHang(item, event) {
    console.log(event);
    if (event.value) {
      item.Ten = this.listHangHoa.find(mathang=>mathang.value===event.value)?.label;
      // if(validVariable(item.SoCocDen)&& validVariable(item.SoCocTu)){
      // }
      // else{
      //   item.SoCocDen = item.SoCocTu;
      // }
      let IddmItem = this.item.listCanBoTri.filter(mathang => mathang.Id === item.IdCanDoiChuyen_CanBoTri)?.[0].IddmItem;
      item.listTocDo = mapArrayForDropDown(item.listDinhMucMay.filter(dinhmuc => dinhmuc.IddmItem === IddmItem), 'TocDo', 'Id');
      item.IdPhanNhomMay_Item = item.listTocDo?.[0]?.value || null;
      item.DinhMucNangSuat = (item.listDinhMucMay.filter(dinhmuc => dinhmuc.Id === item.listTocDo?.[0]?.value)?.[0]?.DinhMucNangSuat || 0);
      if (!validVariable(item.SoCocDen)) {
        item.SoCocDen = 60;
      }
      if (!validVariable(item.SoCocTu)) {
        item.SoCocTu = 1;
      }
    } else {
      item.Ten = null;
      item.listTocDo = [];
      item.IdPhanNhomMay_Item = null;
      item.SanLuongCa = 0;
      item.SoCocTu = null;
      item.SoCocDen = null;
    }
    this.inputChange();
  }
  GhiLai() {
    this.services.CanDoiChuyen().SetCanDoiChuyen({ ...this.item, ...this.addonData }).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      } else {
        this.toastr.error('Cập nhật không thành công!');
      }
    })
  }
  ApDungCa(ca) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = `Tất cả những máy đã bố trí trong 2 ca còn lại sẽ bị xóa để đồng bộ! \n Bạn chắc chắn muốn áp dụng?`
    modalRef.result.then(res => {
      let mayTheoCa = deepCopy(this.item.listDaBoTri.filter(may => may.IddmCaSanXuat === this.mapCa_Id[ca]));

      let newDaBoTri = deepCopy([...mayTheoCa])
      for (let caInMap in this.mapCa_Id) {
        if (caInMap !== ca) {
          let mayCaConLai = mayTheoCa.map(may => {
            return {
              ...may,
              IddmCaSanXuat: this.mapCa_Id[caInMap]
            }
          })
          newDaBoTri = [...newDaBoTri, ...mayCaConLai]
        }
      }
      this.item.listDaBoTri = deepCopy(newDaBoTri);
      this.inputChange();
    }).catch(er => console.log(er))
  }
  ApDungDenNgay() {
    if (validVariable(this.filter.DenNgay) && validVariable(this.filter.TuNgay) && this.filter.TuNgay < this.filter.DenNgay) {
      this.services.CanDoiChuyen().SetCanDoiChuyen({ ...this.item, ...this.addonData }).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            // this.toastr.success(res.message);
            let data = {
              ...this.addonData,
              TuNgayUnix: DateToUnix(this.filter.TuNgay),
              DenNgayUnix: DateToUnix(this.filter.DenNgay),
            }
            this.services.CanDoiChuyen().SetCanDoiChuyen_ApDungNgay(data).subscribe((res:any) => {
              console.log(res);
              if (res?.State === 1) {
                this.toastr.success('Cập nhật thành công!')
              } else {
                this.toastr.error('Cập nhật không thành công!');
              }
            })
          } else {
            this.toastr.error(res.message);
          }
        } else {
          this.toastr.error('Cập nhật không thành công!');
        }
      })
    }
    else {
      this.toastr.error('Vui lòng nhập kiểm tra lại khoảng thời gian áp dụng!');
    }
  }
}
