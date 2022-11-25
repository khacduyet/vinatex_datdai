import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Dat09Service } from 'src/app/services/callApi';
import { deepCopy, validVariable } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { ModalchitietthuadatComponent } from '../../modal/modalchitietthuadat/modalchitietthuadat.component';

@Component({
  selector: 'app-baocaotaichinh',
  templateUrl: './baocaotaichinh.component.html',
  styleUrls: ['./baocaotaichinh.component.css']
})
export class BaocaotaichinhComponent implements OnInit {
  @Input('IDVung') IDVung?: any;
  @ViewChild('chonVung') chonVung: any;
  TyGia: number = 0;
  currentUser: any;
  vung: any;
  vungs: any[];
  TaiSanDats: any[];
  TaiSanDatCons: any[];
  TaiSanDatHienTrang: any[];
  TaiSanDatHienTrangCon: any[];
  TinhTrangPhapLys: any[];
  TienThueDatHangNams: any[];
  ThueSuDungDatHangNams: any[];
  tableTienThueDatHangNam:boolean=false;
  tableTienThueSuDungDatHangNam:boolean=false;
  baocao: any;
  selectedVung: any;
  DaBan:boolean =false;
  element: HTMLElement;
  constructor(private _modal: NgbModal, private _services: Dat09Service,
    private _auth: AuthenticationService, private _toast: ToastrService) {
    this.currentUser = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.GetListdmDonVi();
  }

  GetListdmDonVi() {
    let data = {
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: "",
    };
    this._services.GetListdmDonVi(data).subscribe(
      (res: any) => {
        let data = res.map((ele: any) => {
          return {
            label: ele.Ten + ` (${ele.TongSoThuaDat})`,
            data: ele,
            key: ele.ID.toString(),
            parentKey: ele.IDParent?.toString() || null
          }
        })
        // this.selectedVung = res[0];
        this.flatToTreeArray(data, "key", "parentKey");
      },
      (err: any) => {
        this.vung["Ten"] = "Có lỗi xảy ra";
      }
    );
  }
  flatToTreeArray(list, Id: string, pId: string) {
    let finalData = [];
    list.forEach((element) => {
      element.children = [];
    });
    list.forEach((element) => {
      if (element[pId] !== null) {
        if (
          list.filter((e: any) => e[Id] === element[pId])[0] !== null &&
          list.filter((e: any) => e[Id] === element[pId])[0] !== undefined
        ) {
          list
            .filter((e: any) => e[Id] === element[pId])[0]
            .children.push(element);
        } else {
          finalData.push(element);
        }
      } else {
        finalData.push(element);
      }
    });
    this.vungs = finalData;
    // this.selectedVung = list.filter(ele => ele[Id] === this.currentUser.IDdmDonVi.toString())[0];
    this.selectedVung = validVariable(this.IDVung) ? list.find(vung => vung.data.ID === this.IDVung) : list[0];
    console.table(list);
    console.log(this.IDVung);
    this.vung = this.selectedVung.data;
    this.GetBaoCaoDonVi(this.vung.Ma)
  }
  nodeSelect(event): void {
    this.chonVung.hide();
    this.vung = event.node.data;
    this.GetBaoCaoDonVi(event.node.data.Ma)
  }

  GetBaoCaoDonVi(Ma) {
    let data = {
      ValueSearch: Ma,
      isDaBan:this.DaBan,
    }
    this._services.GetBaoCaoDonVi(data).subscribe((res: any) => {
      if (validVariable(res.DanhSachHienTrangCongTyMe)) {
        let distinct = res.DanhSachHienTrangCongTyMe.map(ele => ele.TenHienTrang);
        distinct = [...new Set(distinct)].map(ele => {
          return {
            Ten: ele,
            Tong: res.DanhSachHienTrangCongTyMe.filter(hientrang => hientrang.TenHienTrang === ele).reduce((tong, hientrang) => tong + hientrang.TongSoHienTrang, 0)
          }
        });
        res.HienTrangCongTyMe = deepCopy(distinct);
      }
      if (validVariable(res.DanhSachHienTrangCongTyCon)) {
        let distinct: Array<any> = res.DanhSachHienTrangCongTyCon.map(ele => ele.TenHienTrang);
        distinct = [...new Set(distinct)].map(ele => {
          return {
            Ten: ele,
            Tong: res.DanhSachHienTrangCongTyCon.filter(hientrang => hientrang.TenHienTrang === ele).reduce((tong, hientrang) => tong + hientrang.TongSoHienTrang, 0)
          }
        });
        res.HienTrangCongTyCon = deepCopy(distinct);
      }

      this.baocao = res;
    })
  }
  getImgLink(url?) {
    if (url) {
      return API.imgURL + url
    } else {
      return ''
    }
  }
  TaiSanDat(diadiem, opt, LoaiBaoCao) {
    let data = {
      PageSize: 5,
      CurrentPage: 0,
      IDdmDonVi: this.vung.ID,
      sFilter: diadiem.DiaDiem,
      isDaBan:this.DaBan,
      Ma: "",
      Ten: "",
      LoaiBaoCao: LoaiBaoCao,
    };
    this._services.GetListTaiSanDat(data).subscribe((res: any) => {
      if (diadiem.expand === true) {
        this.baocao[opt].forEach(dd => {
          dd.expand = false;
        });
      } else {
        this.baocao[opt].forEach(dd => {
          dd.expand = false;
        });
        diadiem.expand = true;
      }
      if (opt.includes('Me')) {
        this.TaiSanDats = res;
      } else {
        this.TaiSanDatCons = res;
      }
    });
  }

  HienTrang(hientrang, opt, LoaiBaoCao) {
    let data = {
      PageSize: 5,
      CurrentPage: 0,
      IDdmDonVi: this.vung.ID,
      sFilter: hientrang.Ten,
      isDaBan:this.DaBan,
      Ma: "",
      Ten: "",
      LoaiBaoCao: LoaiBaoCao,
    };
    this._services.GetListTaiSanDat(data).subscribe((res: any) => {
      if (hientrang.expand === true) {
        this.baocao[opt].forEach(dd => {
          dd.expand = false;
        });
      } else {
        this.baocao[opt].forEach(dd => {
          dd.expand = false;
        });
        hientrang.expand = true;
      }
      if (opt.includes('Me')) {
        this.TaiSanDatHienTrang = res;
      } else {
        this.TaiSanDatHienTrangCon = res;
      }
    });
  }
  TinhTrangPhapLy(tinhtrang, opt) {
    let data = {
      PageSize: 5,
      CurrentPage: 0,
      IDdmDonVi: this.vung.ID,
      sFilter: '',
      isDaBan:this.DaBan,
      HienTrangPhapLy: tinhtrang.MaHienTrang,
      Ma: "",
      Ten: "",
    };
    this._services.GetListTaiSanDat(data).subscribe((res: any) => {
      if (tinhtrang.expand === true) {
        this.baocao[opt].forEach(dd => {
          dd.expand = false;
        });
      } else {
        this.baocao[opt].forEach(dd => {
          dd.expand = false;
        });
        tinhtrang.expand = true;
      }
      this.TinhTrangPhapLys = res
    });
  }
  TienThueDatHangNam() {
    this.tableTienThueDatHangNam = !this.tableTienThueDatHangNam;
    this._services.GetListTaiSanDatTienThueDat({IDdmDonVi:this.vung.ID}).subscribe(
      (res:any)=>{
        this.TienThueDatHangNams = res
      }
    )
  }
  TienThueSuDungDatHangNam() {
    this.tableTienThueSuDungDatHangNam = !this.tableTienThueSuDungDatHangNam;
    this._services.GetListTaiSanDatTienThueSuDung({IDdmDonVi:this.vung.ID}).subscribe(
      (res:any)=>{
        this.ThueSuDungDatHangNams = res;
      }
    )
  }

  showChiTietThuaDat(Id, opt?) {
    this._services.GetTaiSanDat(Id).subscribe((res: any) => {
      res.HienTrangSuDungs.forEach(ele => {
        ele.ThoiGian = (ele.ThoiGianUnix !== 0 ? (new Date(ele.ThoiGianUnix * 1000)) : null);
      });
      let item = res;
      this._services.ThongKeThongTinThuaDat({ IDTaiSan: Id }).subscribe((res: any) => {
        let ThongKe = res;
        let modalRef = this._modal.open(ModalchitietthuadatComponent, {
          size: 'fullscreen',
          backdrop: 'static'
        })
        modalRef.componentInstance.selectedThuaDat = item;
        modalRef.componentInstance.ThongKeThongTinThuaDat = ThongKe;
        modalRef.componentInstance.activedTab = validVariable(opt) ? opt : '';
        console.log(opt);
      })
    });
  }
}
