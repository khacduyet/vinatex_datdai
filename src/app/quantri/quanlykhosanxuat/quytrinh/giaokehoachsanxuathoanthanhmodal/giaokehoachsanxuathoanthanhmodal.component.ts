import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';
import { ChonquycachdonggoimodalComponent } from '../../modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component';

@Component({
  selector: 'app-giaokehoachsanxuathoanthanhmodal',
  templateUrl: './giaokehoachsanxuathoanthanhmodal.component.html',
  styleUrls: ['./giaokehoachsanxuathoanthanhmodal.component.css']
})
export class GiaokehoachsanxuathoanthanhmodalComponent implements OnInit {
  opt: any = ''
  item: any = {
    Id: ''
    // SoQuyTrinh: 'PKK_0000_001',
    // listKienHang: []
  };
  lang: any = vn;
  filter: any = {
    KeyWord: ''
  };
  checkedAll: boolean = false;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhuongAnSapXep: any = [];
  listDonVi: any = [];
  listMucDich: any = [
    { value: 0, label: 'Xuất khẩu' },
    { value: 1, label: 'Nội địa' },
  ]
  listPhanXuong: any = []; listMatHang: any = [];
  listQuyCachDongGoi: any = [];
  yearRange: string = `${((new Date()).getFullYear())}:${((new Date()).getFullYear()) + 5}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal, private _store: StoreService) {

  }

  ngOnInit(): void {
    this.GetFormOptions()
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      if (this._store.getCurrent()) {
        this.item.IdDuAn = this._store.getCurrent();
      }
    }
  }
  ngDoCheck(): void {
    this.Calculate();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }
  GetFormOptions() {
    this.services.GetOptions().GetMatHang().subscribe((res: Array<any>) => {
      this.listMatHang = res;
    })
    this.services.dmQuyCachDongGoi().GetList().subscribe((res: Array<any>) => {
      this.listQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');;
    })
    this.services.GetOptions().GetNhaMay().subscribe((res: Array<any>) => {
      this.listDonVi = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      if (validVariable(this.item.IdDuAn)) {
        this.getPhanXuong(this.item.IdDuAn, true);
      }
    })
  }
  getPhanXuong(IdDuAn, update?) {
    this.listPhanXuong = [];
    if (!!!update) {
      this.item.IddmPhanXuong = null;
    }
    this.services.GetOptions().GetPhanXuong(IdDuAn).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }

  ChuyenDuyet() {
    if (this.validData()) {
      this.services.GiaoKeHoachSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  KhongDuyet() {
    if (this.validData()) {
      this.services.GiaoKeHoachSanXuat().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  GetListdmPhuongAnSapXep() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    // this.services.GetListdmPhuongAnSapXep(data).subscribe((res: any) => {
    //   this.listPhuongAnSapXep = res;
    //   if (this.opt === 'edit') {
    //     if (this.item.listTaiSanQuyTrinh.length !== 0) {
    //       this.item.listTaiSanQuyTrinh.forEach(ele => {
    //         ele.tempPhuongAnSapXep = res.filter(pa => pa.ID === ele.IDdmPhuongAnDeXuat)[0];
    //       });
    //     }
    //   }
    // })
  }
  GetNextSoQuyTrinh() {
    this.services.GiaoKeHoachSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  GetQuyTrinh(Id) {
    this.services.GiaoKeHoachSanXuat().Get(Id).subscribe((res: any) => {
      this.item = res;
      // console.log(res);
    })
  }
  validData() {
    if (!validVariable(this.item.NoiDung)) {
      this.toastr.error('Vui lòng nhập nội dung!')
      return false;
    }
    if (!validVariable(this.item.IddmPhanXuong)) {
      this.toastr.error('Vui lòng nhập phân xưởng!')
      return false;
    }
    if (!validVariable(this.item.TongSoCa)) {
      this.toastr.error('Vui lòng nhập tổng số ca!')
      return false;
    }
    if (validVariable(this.item.TuNgay)) {
      this.item.TuNgayUnix = DateToUnix(this.item.TuNgay);
    } else {
      this.toastr.error('Vui lòng nhập từ ngày!')
      return false;
    }
    if (validVariable(this.item.DenNgay)) {
      this.item.DenNgayUnix = DateToUnix(this.item.DenNgay);
    } else {
      this.toastr.error('Vui lòng nhập đến ngày!')
      return false;
    }
    if (validVariable(this.item.TuNgay) && validVariable(this.item.DenNgay)) {
      if ((DateToUnix(this.item.DenNgay) - DateToUnix(this.item.TuNgay)) <= 0) {
        this.toastr.error('Từ ngày phải nhỏ hơn đến ngày!');
        return false;
      }
    }
    return true;
  }
  chonHangHoa() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.items = this.listMatHang;
    modalRef.componentInstance.selectedItems = [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result.then(res => {
      if (res.length > 0) {
        res.filter(obj => this.item.listItem.push(obj))
      }
      // merge(res, this.item.listItem, 'IddmItem')
    }).catch(er => {
      console.log(er);
    })
  }

  changeKeHoachSanXuat(e, item) {
    if (e.value != undefined && item.value != null && item.value > 0
      && item.listItem != undefined && item.listItem.length > 0) {
      let tong = 0;
      item.listItem.filter(obj => {
        if (!obj.isXoa) {
          tong += obj.KhoiLuong;
        }
      });
      if (item.value < tong) {
        this.toastr.error("Không được lớn hơn Kế hoạch sản xuất");
      }
    }
  }

  chonQuyCachDongGoi(item) {
    let modalRef = this._modal.open(ChonquycachdonggoimodalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.items = this.listQuyCachDongGoi;
    modalRef.componentInstance.layitem = item;
    modalRef.componentInstance.selectedItems = deepCopy(item.listItem || []);
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result.then(res => {
      // merge(res, this.item.listItem, 'IddmQuyCachDongGoi');
      item.listItem = res.listItem;
      // if (item.KhoiLuongKeHoach != undefined && item.KhoiLuongKeHoach != null && item.KhoiLuongKeHoach > 0
      //   && item.listItem != undefined && item.listItem.length > 0) {
      //   let tong = 0;
      //   item.listItem.filter(obj => {
      //     if(!obj.isXoa){
      //       tong += obj.KhoiLuong;
      //     }          
      //   });
      //   if (item.KhoiLuongKeHoach < tong) {
      //     this.toastr.error("Không được lớn hơn Kế hoạch sản xuất");
      //   }
      // }
    }).catch(er => {
      console.log(er);
    })
  }

  Calculate() {
    let TongKL = 0;
    let KLxChiSo = 0;
    this.item.listItem.forEach(mathang => {
      TongKL += validVariable(mathang.KhoiLuongKeHoach) ? mathang.KhoiLuongKeHoach : 0;
      KLxChiSo += validVariable(mathang.KhoiLuongKeHoach) ? (mathang.KhoiLuongKeHoach * mathang.Ne) : 0;
    });
    if (
      TongKL !== 0 && KLxChiSo !== 0
    ) {
      this.item.ChiSoBinhQuan = Math.ceil((KLxChiSo / TongKL) * 100) / 100;
      this.item.TongKhoiLuongMatHang = TongKL;
      if (validVariable(this.item.TongSoCa)) {
        // this.item.BQNE30 = Math.ceil(((TongKL / this.item.ChiSoBinhQuan) * 30 / this.item.TongSoCa) * 100) / 100
        this.item.BQNE30 = TongKL * this.item.ChiSoBinhQuan / 30 / this.item.TongSoCa;
      }
    }
  }
  HoanThanh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    if (this.validData()) {
      modalRef.componentInstance.message = "Bạn có chắc chắn các mặt hàng này đã hoàn thành?"
      modalRef.result.then(res => {
        this.services.GiaoKeHoachSanXuat().HoanThanh(this.item).subscribe((res: any) => {
          if (res) {
            if (res.State === 1) {
              this.toastr.success(res.message)
              this.activeModal.close();
            } else {
              this.toastr.error(res.message);
            }
          }
        })
      }).catch(er => console.log(er))
    }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.GiaoKeHoachSanXuat().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  changePhuongAnDeXuat(event, item) {
    item.TenPhuongAnDeXuat = event.Ten;
    item.IDdmPhuongAnDeXuat = event.ID;
  }
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    console.log(item)
    // let item = this.items.splice(i, 1)[0];
    if (item.Id.trim() === '') {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  refreshFilterMatHang() {
    this.filter.KeyWord = '';
  }
  checkAll(e) {
    if (e.checked) {
      this.item.listItem.forEach(item => {
        item.isDaHoanThanh = true;
      });
    } else {
      this.item.listItem.forEach(item => {
        item.isDaHoanThanh = false;
      });
    }
  }
  checked() {
    this.checkedAll = this.item.listItem.every(ele => ele.checked)
  }
}
