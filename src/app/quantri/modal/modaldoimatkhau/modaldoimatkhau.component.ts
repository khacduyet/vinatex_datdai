import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Dat09Service } from 'src/app/services/callApi';

@Component({
  selector: 'app-modaldoimatkhau',
  templateUrl: './modaldoimatkhau.component.html',
  styleUrls: ['./modaldoimatkhau.component.css']
})
export class ModaldoimatkhauComponent implements OnInit {
  oldPass: string;
  newPass: string;
  confirmPass: string;
  constructor(private _services: Dat09Service, private _toastr: ToastrService , private _activeModal:NgbActiveModal,private auth:AuthenticationService,private _router:Router) { }

  ngOnInit(): void {
  }
  validatePass() {
    if (this.oldPass === undefined || this.oldPass === null || this.oldPass.trim() === '') {
      this._toastr.error('Vui lòng nhập mật khẩu cũ!')
      return false;
    } else if (this.newPass === undefined || this.newPass === null || this.newPass.trim() === '') {
      this._toastr.error('Vui lòng nhập mật khẩu mới!')
      return false;
    } else if (this.confirmPass === undefined || this.confirmPass === null || this.confirmPass.trim() === '') {
      this._toastr.error('Vui lòng xác nhận mật khẩu mới!')
      return false;
    }else if(this.newPass !== this.confirmPass){
      this._toastr.error('Xác nhận mật khẩu mới không khớp!')
      return false;
    }
    return true
  }
  ChangePass() {
    if(this.validatePass()){
      let data = {
        OldPassword:this.oldPass,
        NewPassword:this.newPass}
      this._services.ChangePass(data).subscribe((res:any)=>{
        if(res){
          if(res?.Error===4){
            this._toastr.success(res.Detail);
            this.auth.logout();
            this._router.navigate(['/login']);
            this._activeModal.close();
          }else{
            this._toastr.error(res.Detail);
          }
        }else{
          this._toastr.error('Có lỗi trong quá trình xử lý!');
        }
      })
    }
  }
}
