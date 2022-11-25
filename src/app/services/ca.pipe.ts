import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'Ca',pure:false})
export class CaPipe implements PipeTransform {
  transform(value: Array<any>,IdCa?:any): Array<any> {
    if(!!value){
      if(IdCa!==undefined&& IdCa!==null){
        return value.filter(ele=> ele.IddmCaSanXuat===IdCa)
        // .concat([{},{},{},{},{},{},{},{},{},{},{}])
      }else{
        return [];
      }
    }else{
      return [];
    }
  }
}