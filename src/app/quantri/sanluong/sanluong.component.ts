import { formatNumber } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { TinhtrangtaisanComponent } from '../danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';

@Component({
  selector: 'app-sanluong',
  templateUrl: './sanluong.component.html',
  styleUrls: ['./sanluong.component.css']
})
export class SanluongComponent implements OnInit {
  @Input('TuNgay') TuNgay:any=null;
  @Input('DenNgay') DenNgay:any=null;
  @Input('CongDoan') CongDoan:any=null;
  filter: any = {
    IddmItem: '',
    IddmMay:''
  };
  monthlyConfig_luykesanluong: any = {};
  monthlyConfig_sanluongtheomay: any = {};
  dataSet1: any = {};
  listOpts: any = [];
  listKho: any = [];
  listMatHang: any = [];
  listCongDoan: any = [];
  listMay: any = [];
  listLoaiBong: any = [];
  listCaLamViec: any = [];
  option1: any = {
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
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return formatNumber(label, 'vi-VN', '0.0-0');
          }
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return `${formatNumber(tooltipItem.yLabel, 'vi-VN')} kg`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: ((window.innerWidth - 80) / ((window.innerHeight - (225 + 32.5)) / 2))
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
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return formatNumber(label, 'vi-VN', '0.0-0');
          }
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log(tooltipItem,data);
          if(tooltipItem.datasetIndex ===0){
            return `${formatNumber(tooltipItem.yLabel, 'vi-VN')} kg - ${formatNumber(Math.ceil(tooltipItem.yLabel/data.datasets[1].data[tooltipItem.index]*10000)/100,'vi-VN')}%`
          }else{
            return `${formatNumber(tooltipItem.yLabel, 'vi-VN')} kg`
          }
        }
      }
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
  constructor(private _services: SanXuatService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    if(validVariable(this.TuNgay) && validVariable(this.DenNgay)){
      this.filter._tuNgay = this.TuNgay;
      this.filter._denNgay = this.DenNgay;
    }else{
      let date = new Date();
      this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
      this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
    if(validVariable(this.CongDoan)){
      this.filter.CongDoan = this.CongDoan;
    }
    this.GetBieuDo();
    this.getAllOptions()
  }

  GetBieuDo(CongDoan?) {
    if (validVariable(this.filter._tuNgay)) {
      this.filter.TuNgayUnix = DateToUnix(this.filter._tuNgay);
    } else {
      this.filter.TuNgayUnix = null;
    }
    if (validVariable(this.filter._denNgay)) {
      this.filter.DenNgayUnix = DateToUnix(this.filter._denNgay);
    } else {
      this.filter.DenNgayUnix = null;
    }
    if (validVariable(this.filter.TuNgayUnix) && validVariable(this.filter.DenNgayUnix) && this.filter.TuNgayUnix < this.filter.DenNgayUnix) {
      // if (!!!CongDoan) {
        this._services.DashBoard().BaoCaoSanLuongLuyKe_BieuDoDuong(this.filter).subscribe((res: any) => {
          this.monthlyConfig_sanluongtheomay = {
            labels: res.map(ele => ele.Label),
            datasets: [
              {
                type: 'line',
                label: 'Thực tế',
                borderColor: '#FF671F',
                // borderWidth: 2,
                fill: false,
                data: res.map(ele => Math.round(ele.ThucTe))
              },
              {
                type: 'line',
                label: 'Kế hoạch',
                borderColor: '#009900',
                // borderWidth: 2,
                fill: false,
                data: res.map(ele => Math.round(ele.KeHoach))
              },
              {
                type: 'bar',
                label: 'Sản lượng',
                backgroundColor: '#3c5cbb',
                data: res.map(ele => Math.round(ele.SanLuong)),
                borderColor: 'white',
                // borderWidth: 2
              },
            ]
          }
        })
      // }
      if (!!CongDoan) {
        this._services.BaoCao().GetListdmMayTheoCongDoan(this.filter.CongDoan).subscribe((res: any) => {
          // console.log(res);
          this.listMay = mapArrayForDropDown(res, "Ten", 'Id')
          this.listMay.unshift({ label: 'Tất cả', value: '' })
          this.filter.IddmMay = this.listMay[0].value;
        })
      }
      if(validVariable(this.CongDoan)){
        this._services.BaoCao().GetListdmMayTheoCongDoan(this.filter.CongDoan).subscribe((res: any) => {
          this.listMay = mapArrayForDropDown(res, "Ten", 'Id')
          this.listMay.unshift({ label: 'Tất cả', value: '' })
        })
      }
      this._services.DashBoard().BaoCaoSanLuongLuyKe_BieuDoCot(this.filter).subscribe((res: any) => {
        this.monthlyConfig_luykesanluong = {
          labels: res.map(ele => ele.Label),
          datasets: [
            {
              type: 'bar',
              label: 'Sản lượng thực tế',
              backgroundColor: '#3c5cbb',
              data: res.map(ele => Math.round(ele.ThucTe)),
              borderColor: 'white',
            },
            {
              type: 'bar',
              label: 'Sản lượng tiêu chuẩn',
              backgroundColor: '#009900',
              data: res.map(ele => Math.round(ele.KeHoach)),
              borderColor: 'white',
            },
          ]
        }
      })
    } else {
      this._toastr.warning('Vui lòng chọn đến ngày lớn hơn từ ngày để ra được dữ liệu chuẩn!');
    }
  }

  resetFilter() {

  }

  getAllOptions() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: ''
    }
    this._services.GetOptions().GetMatHang().subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả' });
      this.listMatHang = mapArrayForDropDown(res, 'Ten', 'Id')
    });
    // this._services.GetListdmKho(data).subscribe((res: any) => {
    //   this.listKho = mapArrayForDropDown(res, 'Ten', 'Id')
    // });
    this._services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, "Ten", 'Ma')
      this.listCongDoan.unshift({ label: 'Tất cả', value: '' })
      if(this.CongDoan!==''){
        this.filter.CongDoan = this.CongDoan
      }else{
        this.filter.CongDoan = this.listCongDoan[0].value;
      }
    });
    // this._services.GetListdmMay(data).subscribe((res: any) => {
    //   this.listMay = mapArrayForDropDown(res, "Ma", 'Id')
    // });
    // this._services.GetListOptdmCaSanXuat().subscribe((res: any) => {
    //   this.listCaLamViec = mapArrayForDropDown(res, "Ten", 'Id')
    // });
    // this._services.GetListdmLoaiBong(data).subscribe((res: any) => {
    //   res.unshift({ Id: '', Ten: 'Tổng hợp' });
    //   this.listLoaiBong = mapArrayForDropDown(res, "Ten", 'Id');
    // })
  }
}
