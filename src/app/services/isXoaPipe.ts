import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'isXoa',pure:false})
export class isXoaPipe implements PipeTransform {
  transform(value: Array<any>,loai?:any): Array<any> {
    if(!!value){
      if(loai!==undefined&& loai!==null){
        return value.filter(ele=>ele.isXoa!== true && ele.LoaiGiaDat===loai)
      }else{
        return value.filter(ele=>ele.isXoa!== true);
      }
    }else{
      return null;
    }
  }
}