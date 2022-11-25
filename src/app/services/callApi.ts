import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './host';
@Injectable({
    providedIn: 'root'
})
export class Dat09Service {
    constructor(private http: HttpClient) { }
    // QuanLyTaiSanDat
    GetListTaiSanDat(data) {
        let url = API.QLTSD + 'GetListTaiSanDat';
        return this.http.post(url, data, httpOptions);
    }
    GetBaoCaoTaiSanDat(data) {
        let url = API.QLTSD + 'GetBaoCaoTaiSanDat';
        return this.http.post(url, data, httpOptions);
    }
    ExportExcelBaoCaoTaiSanDat(data) {
        let url = API.QLTSD + 'ExportExcelBaoCaoTaiSanDat';
        return this.http.post(url, data, httpOptions);
    }
    SetTaiSanDat(data) {
        let url = API.QLTSD + 'SetTaiSanDat';
        return this.http.post(url, data, httpOptions);
    }
    DeleteTaiSanDat(data) {
        let url = API.QLTSD + 'DeleteTaiSanDat';
        return this.http.post(url, data, httpOptions);
    }
    GetTaiSanDat(data) {
        let url = API.QLTSD + `GetTaiSanDat?IDTaiSan=${data}`;
        return this.http.get(url, httpOptions);
    }

    //Ho so van ban phap quy
    GetListHoSo(data) {
        let url = API.QLTSD + 'GetListHoSo';
        return this.http.post(url, data, httpOptions);
    }
    SetHoSo(data) {
        let url = API.QLTSD + 'SetHoSo';
        return this.http.post(url, data, httpOptions);
    }
    DeleteHoSo(data) {
        let url = API.QLTSD + 'DeleteHoSo';
        return this.http.post(url, data, httpOptions);
    }

    //Tai san tren dat
    GetListTaiSanDatNha(data) {
        let url = API.QLTSD + 'GetListTaiSanDatNha';
        return this.http.post(url, data, httpOptions);
    }
    SetTaiSanDatNha(data) {
        let url = API.QLTSD + 'SetTaiSanDatNha';
        return this.http.post(url, data, httpOptions);
    }
    DeleteTaiSanDatNha(data) {
        let url = API.QLTSD + 'DeleteTaiSanDatNha';
        return this.http.post(url, data, httpOptions);
    }

    //LoaiVanBan
    GetListLoaiVanBan(data) {
        let url = API.danhmuc + 'GetListdmLoaiVanBan';
        return this.http.post(url, data, httpOptions);
    }
    SetLoaiVanBan(data) {
        let url = API.danhmuc + 'UpdatedmLoaiVanBan';
        return this.http.post(url, data, httpOptions);
    }
    DeleteLoaiVanBan(data) {
        let url = API.danhmuc + 'DeletedmLoaiVanBan';
        return this.http.post(url, data, httpOptions);
    }

    
    //Bien dong
    GetListBienDong(data) {
        let url = API.QLTSD + 'GetListBienDong';
        return this.http.post(url, data, httpOptions);
    }
    SetBienDong(data) {
        let url = API.QLTSD + 'SetBienDong';
        return this.http.post(url, data, httpOptions);
    }
    DeleteBienDong(data) {
        let url = API.QLTSD + 'DeleteBienDong';
        return this.http.post(url, data, httpOptions);
    }

    //Hop dong cho thue/thue
    GetListHopDongThueDat(data) {
        let url = API.QLTSD + 'GetListHopDongThueDat';
        return this.http.post(url, data, httpOptions);
    }
    SetHopDongThueDat(data) {
        let url = API.QLTSD + 'SetHopDongThueDat';
        return this.http.post(url, data, httpOptions);
    }
    DeleteHopDongThueDat(data) {
        let url = API.QLTSD + 'DeleteHopDongThueDat';
        return this.http.post(url, data, httpOptions);
    }

    // DanhMuc
    GetListdmDonVi(data) {
        let url = API.danhmuc + "GetListdmDonVi";
        return this.http.post(url, data, httpOptions);
    }
    GetListdmDonViByCRUD(){
        let url = API.danhmuc + "GetListdmDonViByCRUD";
        return this.http.post(url,null,httpOptions);
    }
    SetdmDonVi(data) {
        let url = API.danhmuc + 'SetdmDonVi';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmDonVi(data) {
        let url = API.danhmuc + 'DeletedmDonVi';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmTaiSan(data) {
        let url = API.danhmuc + "GetListdmTaiSan";
        return this.http.post(url, data, httpOptions);
    }
    SetdmTaiSan(data) {
        let url = API.danhmuc + 'SetdmTaiSan';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmTaiSan(data) {
        let url = API.danhmuc + 'DeletedmTaiSan';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmBienDong(data) {
        let url = API.danhmuc + "GetListdmBienDong";
        return this.http.post(url, data, httpOptions);
    }
    SetdmBienDong(data) {
        let url = API.danhmuc + 'SetdmBienDong';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmBienDong(data) {
        let url = API.danhmuc + 'DeletedmBienDong';
        return this.http.post(url, data, httpOptions)
    }


    GetListdmTinhTrangTaiSan(data) {
        let url = API.danhmuc + 'GetListdmTinhTrangTaiSan';
        return this.http.post(url, data, httpOptions)
    }
    SetdmTinhTrangTaiSan(data) {
        let url = API.danhmuc + 'SetdmTinhTrangTaiSan';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmTinhTrangTaiSan(data) {
        let url = API.danhmuc + 'DeletedmTinhTrangTaiSan';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmDuAn(data) {
        let url = API.danhmuc + "GetListdmDuAn";
        return this.http.post(url, data, httpOptions);
    }
    SetdmDuAn(data) {
        let url = API.danhmuc + 'SetdmDuAn';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmDuAn(data) {
        let url = API.danhmuc + 'DeletedmDuAn';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmNguonGocDat(data) {
        let url = API.danhmuc + "GetListdmNguonGocDat";
        return this.http.post(url, data, httpOptions);
    }
    SetdmNguonGocDat(data) {
        let url = API.danhmuc + 'SetdmNguonGocDat';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmNguonGocDat(data) {
        let url = API.danhmuc + 'DeletedmNguonGocDat';
        return this.http.post(url, data, httpOptions)
    }


    GetListdmMucDichSuDung(data) {
        let url = API.danhmuc + "GetListdmMucDichSuDung";
        return this.http.post(url, data, httpOptions);
    }
    SetdmMucDichSuDung(data) {
        let url = API.danhmuc + 'SetdmMucDichSuDung';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmMucDichSuDung(data) {
        let url = API.danhmuc + 'DeletedmMucDichSuDung';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmDoiTac(data) {
        let url = API.danhmuc + "GetListdmDoiTac";
        return this.http.post(url, data, httpOptions);
    }
    SetdmDoiTac(data) {
        let url = API.danhmuc + 'SetdmDoiTac';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmDoiTac(data) {
        let url = API.danhmuc + 'DeletedmDoiTac';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmHinhThucXuLy(data) {
        let url = API.danhmuc + "GetListdmHinhThucXuLy";
        return this.http.post(url, data, httpOptions);
    }
    SetdmHinhThucXuLy(data) {
        let url = API.danhmuc + 'SetdmHinhThucXuLy';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmHinhThucXuLy(data) {
        let url = API.danhmuc + 'DeletedmHinhThucXuLy';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmTinh(data) {
        let url = API.danhmuc + "GetListdmTinh";
        return this.http.post(url, data, httpOptions);
    }
    SetdmTinh(data) {
        let url = API.danhmuc + 'SetdmTinh';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmTinh(data) {
        let url = API.danhmuc + 'DeletedmTinh';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmQuan(data) {
        let url = API.danhmuc + "GetListdmQuan";
        return this.http.post(url, data, httpOptions);
    }
    SetdmQuan(data) {
        let url = API.danhmuc + 'SetdmQuan';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmQuan(data) {
        let url = API.danhmuc + 'DeletedmQuan';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmPhuong(data) {
        let url = API.danhmuc + "GetListdmPhuong";
        return this.http.post(url, data, httpOptions);
    }
    SetdmPhuong(data) {
        let url = API.danhmuc + 'SetdmPhuong';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmPhuong(data) {
        let url = API.danhmuc + 'DeletedmPhuong';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmCapHangCongTrinh(data) {
        let url = API.danhmuc + "GetListdmCapHangCongTrinh";
        return this.http.post(url, data, httpOptions);
    }
    SetdmCapHangCongTrinh(data) {
        let url = API.danhmuc + 'SetdmCapHangCongTrinh';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmCapHangCongTrinh(data) {
        let url = API.danhmuc + 'DeletedmCapHangCongTrinh';
        return this.http.post(url, data, httpOptions)
    }

    SetHienTrangSuDung(data) {
        let url = API.QLTSD + 'SetHienTrangSuDung';
        return this.http.post(url, data, httpOptions)
    }
    DeleteHienTrangSuDung(data) {
        let url = API.QLTSD + 'DeleteHienTrangSuDung';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmPhuongAnSapXep(data) {
        let url = API.danhmuc + "GetListdmPhuongAnSapXep";
        return this.http.post(url, data, httpOptions);
    }
    SetdmPhuongAnSapXep(data) {
        let url = API.danhmuc + 'SetdmPhuongAnSapXep';
        return this.http.post(url, data, httpOptions)
    }
    DeletedmPhuongAnSapXep(data) {
        let url = API.danhmuc + 'DeletedmPhuongAnSapXep';
        return this.http.post(url, data, httpOptions)
    }

    GetListdmHienTrangSuDung(data){
        let url = API.danhmuc + "GetListdmHienTrangSuDung";
        return this.http.post(url,data,httpOptions);
    }
    SetdmHienTrangSuDung(data){
        let url = API.danhmuc + "SetdmHienTrangSuDung";
        return this.http.post(url,data,httpOptions);
    }
    DeletedmHienTrangSuDung(data){
        let url = API.danhmuc + "DeletedmHienTrangSuDung";
        return this.http.post(url,data,httpOptions);
    }

    GetListdmDonViSoHuuDatNha(data){
        let url = API.danhmuc + "GetListdmDonViSoHuuNhaDat";
        return this.http.post(url,data,httpOptions);
    }
    SetdmDonViSoHuuNhaDat(data){
        let url = API.danhmuc + "SetdmDonViSoHuuNhaDat";
        return this.http.post(url,data,httpOptions);
    }
    DeletedmDonViSoHuuNhaDat(data){
        let url = API.danhmuc + "DeletedmDonViSoHuuNhaDat";
        return this.http.post(url,data,httpOptions);
    }

    GetGiaDat(data) {
        let url = API.QLTSD + 'GetGiaDat';
        return this.http.post(url, data, httpOptions);
    }
    GetSoThuaDat(data) {
        let url = API.QLTSD + 'GetSoThuaDat';
        return this.http.post(url, data, httpOptions);
    }
    ThongKeThongTinThuaDat(data) {
        let url = API.QLTSD + 'ThongKeThongTinThuaDat';
        return this.http.post(url, data, httpOptions);
    }

    BaoCaoChiTietCacCoSo(data){
        let url = API.QLTSD + 'BaoCaoChiTietCacCoSo';
        return this.http.post(url, data, httpOptions);
    }
    GetBaoCaoChiTietCoSo(IdDonVi){
        let url = API.QLTSD + `GetBaoCaoChiTietCoSo?aIdDonVi=${IdDonVi}`;
        return this.http.get(url, httpOptions);
    }
    

    GetNextSoQuyTrinhXuLyDatDai(){
        let url = API.QLTSD + 'GetNextSoQuyTrinhXuLyDatDai';
        return this.http.get(url, httpOptions);
    }
    GetNextSoQuyTrinh(){
        let url = API.QLTSD + 'GetNextSoQuyTrinh';
        return this.http.get(url, httpOptions);
    }
    
    SetQuyTrinh(data){
        let url = API.QLTSD + 'SetQuyTrinh';
        return this.http.post(url,data,httpOptions);
    }   
    GetListQuyTrinh(data){
        let url = API.QLTSD + 'GetListQuyTrinh';
        return this.http.post(url,data,httpOptions);
    }
    GetQuyTrinh(aId){
        let url = API.QLTSD + `GetQuyTrinh?aId=${aId}`;
        return this.http.get(url,httpOptions);
    }
    DeleteQuyTrinh(data){
        let url = API.QLTSD + 'DeleteQuyTrinh';
        return this.http.post(url,data,httpOptions);
    }


    ChuyenTiepQuyTrinh(data){
        let url = API.QLTSD + 'ChuyenTiepQuyTrinh';
        return this.http.post(url,data,httpOptions);
    }
    KiemTraButtonThemMoi(){
        let url = API.imgURL+"/SmartEOSAPI/QuanTriQuyTrinh/KiemTraTab?eAction=QUYTRINHXULYDATDAI09"
        return this.http.get(url, httpOptions);
    }
    KiemTraButtonModal(IdQuyTrinh,IdTrangThai){
        let url = API.QLTSD+`KiemTraButton?aId=${IdQuyTrinh}&aIdTrangThai=${IdTrangThai}`
        return this.http.get(url, httpOptions);
    }

    
    GetBaoCaoDonVi(data){
        let url = API.QLTSD + 'GetBaoCaoDonVi';
        return this.http.post(url,data,httpOptions);
    }

    Importdm(View,FileName){
        // View:
        // BienDong,
        // MucDichSuDung
        // TinhTrangTaiSan,
        // NguonGocDat
        // CapHangCongTrinh
        // HienTrangSuDung
        // TaiSan,
        // DonVi,
        // HinhThucXuLy
        // DuAn
        // LoaiCongTrinh
        // PhuongAnSapXep
        // DonViSoHuuNhaDat
        let url = API.danhmuc + `Importdm${View}?FileName=${FileName}`;
        return this.http.get(url,httpOptions);
    }

    SetActionRole(data) {
        let url = API.QLTSD + 'SetActionRole';
        return this.http.post(url, data, httpOptions);
    }

    ChangePass(data){ //{"OldPassword":"1","NewPassword":"12"}
        let url = API.auth + 'QuanTri/ChangePass';
        return this.http.post(url, data, httpOptions);
    }

    ForgotPass(data){ //{"UserName":"1"}
        let url = API.auth + 'QuanTri/ForgotPassword';
        return this.http.post(url, data, httpOptions);
    }

    //DonViTien

    GetListdmDonViTien(){
        return this.http.get(`${API.danhmuc}GetListdmDonViTien`,httpOptions);
    }
    GetTepDinhKemHuongDanSuDung(){
        return this.http.get(`${API.QLTSD}GetTepDinhKemHuongDanSuDung`,httpOptions);
    }
    SetTepDinhKemHuongDanSuDung(data){
        return this.http.post(`${API.QLTSD}SetTepDinhKemHuongDanSuDung`,data,httpOptions);
    }
    GetListTaiSanDatTienThueSuDung(data){
        return this.http.post(`${API.QLTSD}GetListTaiSanDatTienThueSuDung`,data,httpOptions);
    }
    GetListTaiSanDatTienThueDat(data){
        return this.http.post(`${API.QLTSD}GetListTaiSanDatTienThueDat`,data,httpOptions);
    }

    

    
    

    // Global function
    Avatar(str: string) {
        if (str !== null && str !== undefined && str.trim() !== '') {
            return API.imgURL + str;
        } else {
            return 'assets/img/defavatar.png';
        }
    }
    Img(str: string) {
        if (str !== null && str !== undefined && str.trim() !== '') {
            return API.imgURL + str;
        } else {
            return 'assets/img/defavatar.png';
        }
    }
    relativeDate(date) {
        let createdDate = new Date(date).getTime();
        let today = new Date().getTime();
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
        var elapsed = today - createdDate;
        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' giây trước';
        }
        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' phút trước';
        }
        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' giờ trước';
        }
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerDay) + ' ngày trước';
        }
        else if (elapsed < msPerYear) {
            return Math.round(elapsed / msPerMonth) + ' tháng trước';
        }
        else {
            return Math.round(elapsed / msPerYear) + ' năm trước';
        }
    }
    //Global function
    dateToUnix(data: any) {
        let date = new Date();
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(0);
        date.setHours(0);
        date.setDate(data.day);
        date.setMonth(data.month - 1);
        date.setFullYear(data.year);
        return date.getTime() / 1000;
    }
    unixToDate(unix: number) {
        let date = new Date(unix * 1000);
        let day = '0' + date.getDate();
        let month = '0' + (date.getMonth() + 1);
        return day.slice(-2) + '/' + month.slice(-2) + '/' + date.getFullYear();
    }
    unixToPicker(unix: number) {
        let date = new Date(unix * 1000);
        let day = '0' + date.getDate();
        let month = '0' + (date.getMonth() + 1);
        return {
            day: +day,
            month: +month,
            year: date.getFullYear()
        };
    }
    dateStringRender(str) {

    }
    download(url) {
        window.open(API.imgURL+url);
    }
}
