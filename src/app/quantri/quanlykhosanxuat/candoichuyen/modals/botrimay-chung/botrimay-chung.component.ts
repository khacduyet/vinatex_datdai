import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { BaseModalNavigation } from 'src/app/quantri/quanlykhosanxuat/candoichuyen/modals/navigation.class';
import { TrangthaimaysanxuatComponent } from '../../../quytrinh/trangthaimaysanxuat/trangthaimaysanxuat.component';

@Component({
  selector: 'app-botrimay-chung',
  templateUrl: './botrimay-chung.component.html',
  styleUrls: ['./botrimay-chung.component.css']
})
export class BotrimayChungComponent extends BaseModalNavigation implements OnInit {
  checkbutton: any = {};
  addonData: any = {};
  TenCongDoan: any = '';
  listHangHoa: any = [];
  item: any = {
  }
  TongMatHang: any = {};
  filter: any = {};
  newMay: any = {};
  lang: any = vn;
  constructor(public activeModal: NgbActiveModal, private _services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private _store: StoreService) {
    super(activeModal)
  }

  ngOnInit(): void {
    console.log(this.item);
    this.sort()
    this.initSpeedOption();
    this.listHangHoa = mapArrayForDropDown(this.item.listCanBoTri, 'Ten', 'Id')
    this.item.listCanBoTri.forEach(mathang => {
      mathang.SoMayDaBoTri = 0;
    });
    this.newMay = {}
    this.inputChange();
  }
  sort() {
    this.item.listDaBoTri = this.item.listDaBoTri.sort((a: any, b: any) => {
      return a.TenMay.localeCompare(b.TenMay);
    })
  }
  GhiLai() {
    this._services.CanDoiChuyen().SetCanDoiChuyen({ ...this.item, ...this.addonData }).subscribe((res: any) => {
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
  initSpeedOption() {
    this.item.listDaBoTri.forEach(may => {
      if (validVariable(may.IdCanDoiChuyen_CanBoTri)) {
        let IddmItem = this.item.listCanBoTri.filter(mathang => mathang.Id === may.IdCanDoiChuyen_CanBoTri)?.[0].IddmItem;
        may.listTocDo = mapArrayForDropDown(may.listDinhMucMay.filter(dinhmuc => dinhmuc.IddmItem === IddmItem), 'TocDo', 'Id');
        may.SanLuongCa = may.listDinhMucMay.filter(dinhmuc => dinhmuc.Id === may.listTocDo?.[0]?.value)?.[0]?.DinhMucNangSuat || 0;
        if (!validVariable(may.IdPhanNhomMay_Item)) {
          may.IdPhanNhomMay_Item = may.listTocDo?.[0]?.value
        }
      } else {
        may.listTocDo = [];
      }
    });
  }
  TinhSoLuongMatHang() {
    this.item.listCanBoTri.forEach(mathang => {
      mathang.SoMayDaBoTri = this.item.listDaBoTri.filter(may => may.IdCanDoiChuyen_CanBoTri === mathang.Id)?.length || 0;
      mathang.SanLuongBoTri = this.item.listDaBoTri.filter(may => may.IdCanDoiChuyen_CanBoTri === mathang.Id)?.reduce((Tong, may) => Tong + may.SanLuongCa, 0) || 0;
    });
  }
  TinhTongMatHang() {
    this.TongMatHang = {
      SoMayCanBoTri: 0,
      SoMayDaBoTri: 0,
      SanLuongCa: 0,
      SanLuongBoTri: 0
    }
    for (let prop in this.TongMatHang) {
      this.TongMatHang[prop] = this.item.listCanBoTri.reduce((Tong, mathang) => Tong + mathang[prop], 0);
    }
    console.log(this.TongMatHang);
  }
  inputChange() {
    this.TinhSoLuongMatHang();
    this.TinhTongMatHang();
  }
  chonMatHang(item, event) {
    if (event.value) {
      item.Ten = this.listHangHoa.find(mathang => mathang.value === event.value)?.label;
      let IddmItem = this.item.listCanBoTri.filter(mathang => mathang.Id === item.IdCanDoiChuyen_CanBoTri)?.[0].IddmItem;
      item.listTocDo = mapArrayForDropDown(item.listDinhMucMay.filter(dinhmuc => dinhmuc.IddmItem === IddmItem), 'TocDo', 'Id');
      item.IdPhanNhomMay_Item = item.listTocDo?.[0]?.value || null;
      item.SanLuongCa = item.listDinhMucMay.filter(dinhmuc => dinhmuc.Id === item.listTocDo?.[0]?.value)?.[0]?.DinhMucNangSuat || 0;
      if (!validVariable(item.SoCocDen)) {
        item.SoCocDen = 60;
      }
      if (!validVariable(item.SoCocTu)) {
        item.SoCocTu = 1;
      }
      // item.listTocDo = item.
    } else {
      item.listTocDo = [];
      item.IdPhanNhomMay_Item = null;
      item.SanLuongCa = 0;
      item.SoCocTu = null;
      item.SoCocDen = null;
    }
    this.inputChange();
  }
  ApDungDenNgay() {
    if (validVariable(this.filter.DenNgay) && validVariable(this.filter.TuNgay) && this.filter.TuNgay < this.filter.DenNgay) {
      this._services.CanDoiChuyen().SetCanDoiChuyen({ ...this.item, ...this.addonData }).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            // this.toastr.success(res.message);
            let data = {
              ...this.addonData,
              TuNgayUnix: DateToUnix(this.filter.TuNgay),
              DenNgayUnix: DateToUnix(this.filter.DenNgay),
            }
            this._services.CanDoiChuyen().SetCanDoiChuyen_ApDungNgay(data).subscribe((res:any) => {
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
