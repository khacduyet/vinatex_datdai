import { EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrangthaimaysanxuatComponent),
  multi: true
};
@Component({
  selector: 'app-trangthaimaysanxuat',
  templateUrl: './trangthaimaysanxuat.component.html',
  styleUrls: ['./trangthaimaysanxuat.component.css'],
  providers: [VALUE_ACCESSOR]
})
export class TrangthaimaysanxuatComponent implements ControlValueAccessor {
  @Input('IdMatHang') IdMatHang: string = null;
  @Input('HeSo') HeSo = 0;
  // @Input('SoMayBoTriConLai') SoMayBoTriConLai = 0;
  // @Output('ChangeTrangThaiMay') ChangeTrangThaiMay: EventEmitter<any> = new EventEmitter<any>();
  private _value: any = {};
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  constructor(private _toastr: ToastrService) {

  }
  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: any) {
    this._value = value;
  }
  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  changeTinhTrang() {
    if (this.HeSo > 0 && this.HeSo <= 1) {
      if (this.value.TinhTrang !== 2) {
        if (this.value.TinhTrang === 1) {
          this.value.TinhTrang = 0;
          this.value.IdGiaoKeHoachSanXuat_TrienKhaiMatHang = null;
          this.value.SoMay = 0;
        } else {
          // if (this.SoMayBoTriConLai > 0) {
          this.value.TinhTrang = 1;
          this.value.IdGiaoKeHoachSanXuat_TrienKhaiMatHang = this.IdMatHang;
          // if (this.SoMayBoTriConLai < 1) {
          //   this.value.SoMay = this.SoMayBoTriConLai
          // } else {
          //   this.value.SoMay = 1
          // }
          // } else {
          //   this._toastr.warning('Đã bố trí đủ số máy!')
          // }
        }
      }
    } else {
      this._toastr.warning('Vui lòng nhập hệ số sử dụng!')
    }


    // this.ChangeTrangThaiMay.emit(this.value.SoMay)
    // this.value.TinhTrang++
    // console.log(this.value);
  }
  getSoMay(value) {
    return value?.SoMay || 0
  }
  getColor(value) {

    if (value !== null) {
      if (value.TinhTrang === 0) {
        return 'green'
      }
      if (value.TinhTrang === 1) {
        if (validVariable(this.IdMatHang) && (this.IdMatHang === value.IdGiaoKeHoachSanXuat_TrienKhaiMatHang)) {
          return 'blue'
        }
        return 'yellow'
      }
      if (value.TinhTrang === 2) {
        return 'red'
      }
    }
  }
}
