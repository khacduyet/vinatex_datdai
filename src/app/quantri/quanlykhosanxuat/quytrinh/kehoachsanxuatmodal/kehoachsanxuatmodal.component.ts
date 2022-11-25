import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, merge, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';
import { ChonquycachdonggoimodalComponent } from '../../modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component';

@Component({
  selector: 'app-kehoachsanxuatmodal',
  templateUrl: './kehoachsanxuatmodal.component.html',
  styleUrls: ['./kehoachsanxuatmodal.component.css']
})
export class KehoachsanxuatmodalComponent implements OnInit, DoCheck {
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
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private _store: StoreService) {

  }

  ngOnInit(): void {
    this.GetFormOptions()
    this.KiemTraButtonModal();
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
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      // console.log(data);
      // console.log(this.item.TepDinhKems);
      // let itemupload:any = {};
      // itemupload.ID = 0;
      // itemupload.TenGui = data[data.length - 1]?.Name||null;
      // itemupload.TenGoc = data[data.length - 1]?.NameLocal||null;
      // itemupload.DuongDan = data[data.length - 1]?.Url||null;
      // if(itemupload.TenGui!== null){
      //   if(this.item.TepDinhKems.length!==0){
      //     this.item.TepDinhKems.forEach(ele => {
      //       ele.isXoa =true;
      //     });
      //   }
      //   this.item.TepDinhKems.unshift(itemupload);
      //   console.log(this.item);
      // }
    }, (reason) => {

    });
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
        if(!obj.isXoa){
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
  GhiLai() {
    if (this.validData()) {
      this.services.GiaoKeHoachSanXuat().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            if (this.item.listItem != undefined && this.item.listItem != null) {
              this.item.listItem.filter(objlistItem => {
                objlistItem.listItem.filter(objlistItem2 => {
                  objlistItem2.objQuyCachDongGoi = this.listQuyCachDongGoi.filter(obj => objlistItem2.IddmQuyCachDongGoi == obj.value)[0];
                });
              });
            }
            this.KiemTraButtonModal();
            this.Calculate();
          } else {
            this.Calculate();
            this.toastr.error(res.message);
          }
        }
      })
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
  refreshFilterMatHang(){
    this.filter.KeyWord = '';
  }
  TinhSoCa(){
    console.log(this.item.TuNgay,this.item.DenNgay);
    if(validVariable(this.item.TuNgay) && validVariable(this.item.DenNgay)){
      this.item.TuNgayUnix = DateToUnix(this.item.TuNgay);
      this.item.DenNgayUnix = DateToUnix(this.item.DenNgay);
      // console.log(this.item.TongSoCa);
      if(!validVariable(this.item.TongSoCa)|| this.item.TongSoCa===0){
        this.item.TongSoCa = ((this.item.DenNgayUnix - this.item.TuNgayUnix)/(24*3600)+1)*3;
        // console.log(this.item.TongSoCa);
      }
    }
  }
  validDenNgay(mathang, e) {
    if (validVariable(mathang.TuNgay)) {
      if ((DateToUnix(e) - DateToUnix(mathang.TuNgay)) < 0) {
        this.toastr.warning('Đến ngày phải lớn hơn Từ ngày!')
        setTimeout(() => {
          mathang.DenNgay = null;
        }, 500)
      }else{
        this.TinhSoCa();
      }
    } else {
      setTimeout(() => {
        mathang.DenNgay = null;
      }, 500)
      this.toastr.warning('Vui lòng chọn Từ ngày trước!')
    }
  }
}
