import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ModalchitietthuadatComponent } from '../modal/modalchitietthuadat/modalchitietthuadat.component';
import { ModaladvancedsearchComponent } from '../modal/modaladvancedsearch/modaladvancedsearch.component';
import { ToastrService } from 'ngx-toastr';
import { formatNumber } from '@angular/common';
import { SourceMapGenerator } from '@angular/compiler/src/output/source_map';
import { ModalbaocaotonghopComponent } from '../modal/modalbaocaotonghop/modalbaocaotonghop.component';
import { UnixToDate, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chonVung') chonVung:any;
  keyWord: any;
  pagingThuaDat: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  vung: any = {};
  currentUser: any;
  selectedVung: TreeNode = {};
  vungs: TreeNode[] = [];
  DaBan:boolean = false;
  thuaDats: any = [];
  thongKes: any = [
    // { vung: 'Tổng số thửa đất', soThua: 47, dienTich: 20000 },
    // { vung: 'Miền Bắc', soThua: 20, dienTich: 10000 },
    // { vung: 'Miền Trung', soThua: 10, dienTich: 5000 },
    // { vung: 'Miền Nam', soThua: 17, dienTich: 5000 },
  ];
  IDTaiSan:any;
  options: any = {};
  bieuDoCot: any = {};
  bieuDoDuong: any = {};
  tuNams: any = [];
  denNams: any = [];
  TuNam: any = {};
  DenNam: any = {};
  listColor: any = ['#2ca24e', '#edbf3c', '#d9d9d9'];
  listLabel: any = ['Sử dụng làm nhà xưởng', 'Đang cho thuê', 'Khác'];
  listProp: any = ['DienTichNhaXuong', 'DienTichChoThue', 'DienTichKhac'];
  optionsLine: {};
  constructor(private _modal: NgbModal, private _services: Dat09Service, private _auth: AuthenticationService, private _toast: ToastrService) {
    this.currentUser = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.tuNams.push({ label: (new Date()).getFullYear() - i });
    }
    for (let i = (new Date()).getFullYear() - 2; i <= (new Date()).getFullYear(); i++) {
      this.denNams.push({ label: i });
    }
    this.TuNam = { label: (new Date()).getFullYear() - 2 };
    this.DenNam = { label: (new Date()).getFullYear() };
    this.optionsLine = {
      plugins: {
        labels: {
          fontSize:0
        }
      },
      legend: {
        position: 'top'
      },
      scales: {
        yAxes: [
          {
            // scaleLabel: {
            //   display: true,
            //   labelString: 'Triệu đồng'
            // },
            ticks: {
              beginAtZero: true,
              callback: function (label, index, labels) {
                return formatNumber(label, 'vi-VN', '0.0-0');
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            let tong = 0;
            for (let i = 0; i < data.datasets.length; i++) {
              tong += data.datasets[i].data[tooltipItem.index];
            }
            return `${data.datasets[tooltipItem.datasetIndex].label}: ${formatNumber(tooltipItem.yLabel, 'vi-VN')} triệu đồng`
          }
        }
      }
    }
    this.options = {
      plugins: {
        labels: {
          fontSize:0
        }
      },
      maintainAspectRatio: window.innerWidth <=375? false:true,
      legend: {
        position: 'top'
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function (label, index, labels) {
                return formatNumber(label, 'vi-VN', '0.0-0');
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            let tong = 0;
            for (let i = 0; i < data.datasets.length; i++) {
              tong += data.datasets[i].data[tooltipItem.index];
            }
            return `${data.datasets[tooltipItem.datasetIndex].label}: ${formatNumber(tooltipItem.yLabel, 'vi-VN')} (${Math.round(tooltipItem.yLabel / tong * 10000) / 100}%)`
          }
        }
      }
    };
    this.GetListdmDonVi();

  }
  tuNamChange(nam) {
    this.denNams = [];
    for (let i = nam; i <= (new Date()).getFullYear(); i++) {
      this.denNams.push({ label: i })
    }
    this.GetGiaDat()
  }
  denNamChange() {
    this.GetGiaDat()
  }
  ChangeDaBan(){
    this.GetSoThuaDat();
    this.GetListTaiSanDat(this.vung.ID);
  }
  GetGiaDat() {
    let filterItem = {
      Tu: this.TuNam.label,
      Den: this.DenNam.label,
      IDdmDonVi: this.vung.ID,
      IDTaiSan: validVariable(this.IDTaiSan)? this.IDTaiSan: undefined
    }
    this._services.GetGiaDat(filterItem).subscribe((res: Array<any>) => {
      let bieuDoDuong = {
        labels: [],
        datasets: [
          {
            label: 'Đơn giá đất tham khảo (Triệu đồng)',
            borderColor: '#ed883a',
            fill: false,
            data: []
          }
        ]
      }
      res.forEach(ele => {
        bieuDoDuong.labels.push(ele.Nam);
        bieuDoDuong.datasets[0].data.push(ele.Gia);
      })
      this.bieuDoDuong = bieuDoDuong;
    })
  }
  GetSoThuaDat() {
    let filterItem = {
      IDdmDonVi: this.vung.ID,
      isDaBan: this.DaBan
    }
    this._services.GetSoThuaDat(filterItem).subscribe((res: Array<any>) => {
      let bieuDoCot: any = {
        datasets: []
      };
      let tong = {
        Ten: 'Tổng số thửa đất',
        DienTich: 0,
        SoThua: 0
      };
      bieuDoCot.labels = res.map(ele => ele.Ten);
      for (let i = 0; i < this.listColor.length; i++) {
        let dataset: any = {
          label: this.listLabel[i],
          backgroundColor: this.listColor[i],
        }
        dataset.data = res.map(ele => ele[this.listProp[i]] !== null ? (Math.round(ele[this.listProp[i]] * 100) / 100) : 0);
        bieuDoCot.datasets.push(dataset);
        if (res[i].DienTich !== null && res[i].DienTich !== undefined) {
          tong.DienTich += res[i].DienTich;
        }
        if (res[i].SoThua !== null && res[i].SoThua !== undefined) {
          tong.SoThua += res[i].SoThua;
        }
      }
      this.thongKes = [tong, ...res];
      this.bieuDoCot = bieuDoCot;
    })
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
            label: ele.Ten +` (${ele.TongSoThuaDat})`,
            data: ele,
            key: ele.ID.toString(),
            parentKey: ele.IDParent?.toString() || null
          }
        })
        // this.selectedVung = res[0];
        this.flatToTreeArray(data, "key", "parentKey");
        this.GetListTaiSanDat(this.vung.ID);
        // this.GetGiaDat();
        this.GetSoThuaDat();
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
    this.selectedVung = list[0];
    // console.log(this.selectedVung.data);
    this.vung = this.selectedVung.data;
  }
  nodeSelect(event): void {
    this.chonVung.hide();
    this.vung = event.node.data;
    this.GetListTaiSanDat(this.vung.ID);
    this.GetGiaDat();
    this.GetSoThuaDat();
  }
  resetFilter() {
    this.keyWord = "";
    this.GetListTaiSanDat(this.vung.ID);
  }
  GetListTaiSanDat(id: any) {
    let data = {
      PageSize: 10,
      CurrentPage: this.pagingThuaDat.CurrentPage!==0?this.pagingThuaDat.CurrentPage:1,
      IDdmDonVi: id,
      sFilter: this.keyWord,
      isDaBan:this.DaBan,
      Ma: "",
      Ten: "",
    };
    this._services.GetListTaiSanDat(data).subscribe((res: any) => {
      this.thuaDats = res.items;
      this.pagingThuaDat = res.paging;
    });
  }
  showChiTietThuaDat(Id) {
    this._services.GetTaiSanDat(Id).subscribe((res: any) => {
      res.HienTrangSuDungs.forEach(ele => {
        ele.ThoiGian = UnixToDate(ele.ThoiGianUnix);
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
      })
    });
  }

  getBaoCaoTaiSan() {
    this._services.GetBaoCaoTaiSanDat(this.searchItem).subscribe(res => {
      this.thuaDats = res;
    })
  }

  searchItem: any = {
    ThongTinChung: {},
    TaiSanTrenDat: {},
    TinhTrangPhapLy: {},
    HoSoVanBanPhapQuy: {}
  };
  advancedSearch: boolean = false;

  getPopupSearch() {
    let modalRef = this._modal.open(ModaladvancedsearchComponent, {
      backdrop: 'static',
      size: 'lg'
    })
    modalRef.componentInstance.searchItem = this.searchItem;
    modalRef.result.then(res => {
      this.advancedSearch = true;
      this.searchItem = res;
      this.getBaoCaoTaiSan();
    }).catch(er => { console.log(er) })
  }

  exportExcel() {
    if (this.advancedSearch) {
      this._services.ExportExcelBaoCaoTaiSanDat(this.searchItem).subscribe((res: any) => {
        if (res?.Error?.State === 1) {
          this._services.download(res.FileName);
        } else {
          this._toast.error('Có lỗi xảy ra!')
        }
      })
    } else {
      this._services.ExportExcelBaoCaoTaiSanDat({}).subscribe((res: any) => {
        if (res?.Error?.State === 1) {
          this._services.download(res.FileName);
        } else {
          this._toast.error('Có lỗi xảy ra!')
        }
      })
    }
  }
  getThanhTra(listHoSo) {
    return listHoSo.some(ele => ele.IdLoaiVanBan === 5);
  }
  baoCaoTongHop(){
    let modalRef = this._modal.open(ModalbaocaotonghopComponent,{
      size:'fullscreen',
      backdrop:'static'
    })
    modalRef.componentInstance.IDVung = this.vung.ID;
    modalRef.result.then(res=>{
      // console.log(res);
    })
    .catch(er=>{
      // console.log(er);
    })
  }
  changePage(event) {
    this.pagingThuaDat.CurrentPage = event.page + 1;
    this.GetListTaiSanDat(this.vung.ID);
  }
  checkThuaDat(index){
    this.thuaDats.forEach(ele => {
        ele.selected = false;
    });
    this.thuaDats[index].selected = true;
    this.IDTaiSan = this.thuaDats[index].ID;
    this.GetGiaDat();
  }
}
