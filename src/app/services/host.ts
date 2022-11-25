import { HttpHeaders } from '@angular/common/http';
const host1 = 'http://eos.harmonyes.com.vn:1169';
// const host1 = 'http://serverduan:1169';
// const host1 = 'http://vinatex.harmonyes.com.vn';
// const host = 'http://localhost:1169';
// export const host1 = `${window.location.origin.includes('localhost')?'http://eos.harmonyes.com.vn:1169':(window.location.origin)}`;
// host public 'http://vinatex.harmonyes.com.vn';
//host phat trien 'http://eos.harmonyes.com.vn:1169'
export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json,text/plain, */*',
    }),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    withCredentials: true,
};
export class API {    
    public static auth = host1+'/SmartEOSAPI/';
    public static baseUrl = host1 + '/QLTS/';
    // public static auth = host + '/SmartEOSAPI/';
    // public static baseUrl = host + '/';
    public static SCM = host1 + '/SCM/';
    public static ThongKeDien = host1 + '/SCM/ThongKeDien/';
    public static KeHoachNguyenLieu = host1 + '/SCM/KeHoachNguyenLieu/';
    public static SCMQuanLyKho = host1 + '/SCM/QuanLyKho/';
    public static SCMDanhMuc = host1 + '/SCM/DanhMuc/';
    public static SCMKiemTraChatLuong = host1 + '/SCM/KiemTraChatLuong/';  
    public static SCMDashBoard = host1 +  '/SCM/BaoCao/';
    public static SCMBaoCao = host1 + '/SCM/BaoCao/';    
    public static danhmuc = API.baseUrl + 'DanhMuc/';
    public static QLTSD = API.baseUrl+'QuanLyTaiSanDat/';
    public static uploadURL = host1 + '/QLTS/FileUploader/Post';
    public static downloadURL = host1 +'/uploader/api/hdfiles'
    public static imgURL = host1;
}
