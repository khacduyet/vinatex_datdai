import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nhucauxuathang',
  templateUrl: './nhucauxuathang.component.html',
  styleUrls: ['./nhucauxuathang.component.css']
})
export class NhucauxuathangComponent implements OnInit {

  filterBong: any = {};
  filter: any = {
    IddmItem: "",
    IddmKho: '',
    // LoaiThoiGian: 1
  };
  filterSanLuong: any = {};
  filterNhuCau: any = {};
  monthlyConfig: any = {};
  dataSet1: any = {};
  dataSet2: any = {};
  listOpts: any = [];
  listKho: any = [];
  listMatHang: any = [];
  listTruySuatNguonGoc: any = [];
  listCongDoan: any = [];
  listMay: any = [];
  listLoaiBong: any = [];
  listCaLamViec: any = [];
  dataPie: any = {};
  IdDuAn: any;
  SelectItem: any = {};
  showTruySuatNguonGoc = false;
  option1: any = {
    scales: {
      xAxes: [{
        beginAtZero: true
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Khối lượng ( Tấn)'
        },
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return formatNumber(label, 'vi-VN', '0.0-0');
          }
        }
      }],
    },
    legend: {
      position: 'bottom'
    },
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: (((window.innerWidth - 80) * 2 / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  option2: any = {
    plugins: {
      labels: {
        fontSize: 0
      }
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      xAxes: [{
        categoryPercentage: 0.5,
        barPercentage: 1.0
      }]
    },
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: ((window.innerWidth - 80) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  optionPie: any = {
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: '#fff',
        fontStyle: 'bold',
      }
    },
    legend: {
      position: 'left'
    },
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: (((window.innerWidth - 80) / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  }
  listItem: any = [];
  constructor(private _services: SanXuatService, private store: StoreService, public toastr: ToastrService) {
    this.IdDuAn = this.store.getCurrent();
  }

  ngOnInit(): void {
    let date = new Date();
    this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.filter._tuNgayCanDoiTon = date;
    this.filter._denNgayCanDoiTon = date;
    // this.dataPie = {
    //   labels: ['Bông Mỹ', 'Bông Brazil', 'Bông Tây Phi', 'Bông Hồi'],
    //   datasets: [
    //     {
    //       data: [300, 50, 100, 200],
    //       backgroundColor: [
    //         "#009900",
    //         "#36A2EB",
    //         "#FFCE56",
    //         "#FF671F"
    //       ],
    //       hoverBackgroundColor: [
    //         "#009900",
    //         "#36A2EB",
    //         "#FFCE56",
    //         "#FF671F"
    //       ]
    //     }
    //   ]
    // };
    this.listItem = [

    ]
    this.getAllOptions();
    this.ChangeOpt();
  }

  ChangeOpt() {
    if (validVariable(this.filter._tuNgay)) {
      this.filter.TuNgay = DateToUnix(this.filter._tuNgay);
    } else {
      this.filter.TuNgay = null;
    }
    if (validVariable(this.filter._denNgay)) {
      this.filter.DenNgay = DateToUnix(this.filter._denNgay);
    } else {
      this.filter.DenNgay = null;
    }

    let TuNgay = 0;
    let DenNgay = 0;
    if (validVariable(this.filter._tuNgayCanDoiTon)) {
      TuNgay = DateToUnix(this.filter._tuNgayCanDoiTon);
    } else {
      TuNgay = null;
    }
    if (validVariable(this.filter._denNgayCanDoiTon)) {
      DenNgay = DateToUnix(this.filter._denNgayCanDoiTon);
    } else {
      DenNgay = null;
    }
    if (validVariable(this.filter.TuNgay) && validVariable(this.filter.DenNgay) && this.filter.TuNgay < this.filter.DenNgay) {
      this.filter.IdDuAn = this.IdDuAn;
      this.filter.LoaiThoiGian = 0;
      this._services.BaoCao().GetDashBoard_NhuCauXuatHang(this.filter).subscribe((res: any) => {
        this.dataSet1 = res;
      })
      this._services.BaoCao().GetDashBoard_CoCauMatHang(this.filter).subscribe((res: any) => {
        this.dataPie = res;
      });
    }
    if (validVariable(TuNgay) && validVariable(DenNgay) && TuNgay <= DenNgay) {
      let data = deepCopy(this.filter);
      data.TuNgay = TuNgay;
      data.DenNgay = DenNgay;
      this._services.BaoCao().GetDashBoard_CanDoiTonXuatHang(data).subscribe(res => {
        this.listItem = res;
      })
    }
  }

  BieuDoCoCau() {

  }

  resetFilter() {

  }

  getAllOptions() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: "",
      Loai: 11,
      Ma: "",
      Ten: ""
    };
    this._services.GetListdmKho(data).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả' });
      this.listKho = mapArrayForDropDown(res, "Ten", 'Id');
    })
    this._services.GetOptions().GetMatHang().subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tổng hợp' });
      this.listMatHang = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }

  checkMatHang(e, item, index) {
    if (e.checked) {
      this.listItem.forEach(mathang => {
        mathang.checked = false
      });
      this.listItem[index].checked = true;
      this.SelectItem = this.listItem[index];
    }
    else {
      this.SelectItem = {};
    }
  }

  xemTruySuatNguonGoc() {
    if (this.SelectItem.TendmItem != undefined && this.SelectItem != null) {
      console.log(this.SelectItem);
      if (validVariable(this.SelectItem?.IddmItem)) {

        this._services.GetDashBoard_TruyXuatNguonGoc(this.SelectItem.IddmItem, DateToUnix(this.filter._tuNgayCanDoiTon), DateToUnix(this.filter._denNgayCanDoiTon)).subscribe((res: any) => {
          this.showTruySuatNguonGoc = true;
          this.listTruySuatNguonGoc = res;
          this.listTruySuatNguonGoc.forEach(obj=>{            
            obj.herfgiaokehoachsanxuat = `#/quantri/kehoachsanxuat/giaokehoachsanxuat/${obj.IdGiaoKeHoachSanXuat}`;
            obj.herftrienkhaikehoachsanxuat = `#/quantri/kehoachsanxuat/trienkhaikehoachsanxuat/${obj.IdGiaoKeHoachSanXuat_TrienKhai}`;
            obj.herfphabong = `#/quantri/trienkhaisanxuat/phabong/${obj.IdPhuongAnPhaBong}`;
          });          
        })
      }
      else {
        this.toastr.error("Yêu cầu chọn mặt hàng");
      }
    }
    else {
      this.toastr.error("Yêu cầu chọn mặt hàng");
    }
  }
}
