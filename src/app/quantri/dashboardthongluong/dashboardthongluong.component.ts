import { AfterViewInit, Component, NgZone, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4charts from '@amcharts/amcharts4/charts';
import { formatNumber, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboardthongluong',
  templateUrl: './dashboardthongluong.component.html',
  styleUrls: ['./dashboardthongluong.component.css']
})
export class DashboardthongluongComponent implements OnInit, AfterViewInit {
  filter: any = {
    IddmItem: ''
  };
  infos: any = {
    NgayMax: {
    },
    NgayMin: {
    },
    SanPhamMax: {
    },
    SanPhamMin: {
    }
  }
  listPhanXuong: any = [];
  listNhaMay: any = [];
  listMatHang: any = [];
  chart: am4charts.SlicedChart;
  constructor(private _services: SanXuatService, private _toastr: ToastrService, @Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  ngOnInit(): void {
    let date = new Date();
    this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.getAllOptions();
  }
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngAfterViewInit(): void {
    // this.browserOnly(() => {
    //   // am4core.useTheme(am4themes_animated);

    //   let chart = am4core.create("ThongLuongChart", am4charts.SlicedChart);

    //   // chart.paddingRight = 20;

    //   // let data = [];
    //   // let visits = 10;
    //   // for (let i = 1; i < 366; i++) {
    //   //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    //   //   data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    //   // }

    //   chart.data = [{
    //     name: "Bông chải",
    //     value: 600
    //   }, {
    //     name: "Ghép",
    //     value: 300
    //   }, {
    //     name: "Thô",
    //     value: 100
    //   }, {
    //     name: "Con",
    //     value: 180
    //   }
    //   , {
    //     name: "Ống",
    //     value: 120
    //   }
    //   ];
    //   let Series = chart.series.push(new am4charts.FunnelSeries());
    //   Series.dataFields.value = "value";
    //   Series.dataFields.category = "name";
    //   Series.alignLabels = true;
    //   chart.legend = new am4charts.Legend();
    //   chart.legend.position = "left";
    //   chart.legend.valign = "bottom";
    //   chart.legend.margin(5, 5, 20, 5);
    //   this.chart = chart;
    // });
  }
  getAllOptions() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: ''
    }
    let data2 = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord ? this.filter.keyWord : '',
      CongDoan: this.filter.CongDoan ? this.filter.CongDoan : '',
      Ma: "",
      Ten: ""
    };
    this._services.GetOptions().GetMatHang().subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res, 'Ten', 'Id');
      this.listMatHang.unshift({ value: '', label: 'Tất cả' })
      // console.log(res);
    });
    this._services.GetOptions().GetNhaMay().subscribe(async (res: any) => {
      this.listNhaMay = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      this.filter.IdDuAn = await res[0].Id;
      this.getPhanXuongTheoNhaMay(res[0].Id)
    });
  }
  getPhanXuongTheoNhaMay(IdNhaMay?) {
    this._services.GetOptions().GetPhanXuong(IdNhaMay ? IdNhaMay : this.filter.IdDuAn).subscribe(async (res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id')
      this.filter.IddmPhanXuong = await res[0].Id;
      this.GetBieuDo();
    })
  }
  GetBieuDo() {
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
      this._services.BaoCao().BaoCaoThongLuongSanXuat(this.filter).subscribe((res: any) => {
        let chart = am4core.create("ThongLuongChart", am4charts.SlicedChart);
        chart.data = res.map(ele => {
          return {
            name: ele.TenCongDoan,
            // value: ele.KhoiLuongCongDoan ,
            value: ele.KhoiLuongCongDoan,
            formated:formatNumber(ele.KhoiLuongCongDoan, 'vi-VN', '0.0-2'),
            TyLe: formatNumber(ele.TyLe, 'vi-VN', '0.0-2')
          }
        })
        let Series = chart.series.push(new am4charts.FunnelSeries());
        Series.dataFields.value = "value";
        Series.dataFields.category = "name";
        Series.labels.template.text = "{category}: [bold]{formated} kg[/] [bold red]{TyLe}%";
        Series.slices.template.tooltipText = "{category}: [bold]{formated} kg[/]";
        Series.alignLabels = true;
        this.chart = chart;
      })
      this._services.BaoCao().BaoCaoThongLuongSanXuatMinMax(this.filter).subscribe((res: any) => {
        for (let prop in res) {
          if (validVariable(res[prop])) {
            this.infos[prop] = res[prop]
          } else {
            this.infos[prop] = {};
          }
        }
      })
    } else {
      this._toastr.warning('Vui lòng chọn đến ngày lớn hơn từ ngày để ra được dữ liệu chuẩn!');
    }
  }

}
