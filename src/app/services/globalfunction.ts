import { API } from './host';

export function readNum(value: any, donvi: string) {
    let fullnum = value.toString().split('.');
    var fraction = fullnum[1];
    console.log(fraction);
    var number = fullnum[0];
    var dv = ["", "mươi", "trăm", "nghìn", "triệu", "tỉ"];
    var cs = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    var doc;
    var i, j, k, n, len, found, ddv, rd;
    len = number.length;
    // number += "ss";
    doc = "";
    found = 0;
    ddv = 0;
    rd = 0;

    i = 0;
    while (i < len) {
        //So chu so o hang dang duyet
        n = (len - i + 2) % 3 + 1;

        //Kiem tra so 0
        found = 0;
        for (j = 0; j < n; j++) {
            if (number[i + j] != '0') {
                found = 1;
                break;
            }
        }

        //Duyet n chu so
        if (found === 1) {
            rd = 1;
            for (j = 0; j < n; j++) {
                ddv = 1;
                switch (number[i + j]) {
                    case '0':
                        if (n - j === 3) doc += cs[0] + " ";
                        if (n - j === 2) {
                            if (number[i + j + 1] != '0') doc += "linh ";
                            ddv = 0;
                        }
                        break;
                    case '1':
                        if (n - j === 3) doc += cs[1] + " ";
                        if (n - j === 2) {
                            doc += "mười ";
                            ddv = 0;
                        }
                        if (n - j === 1) {
                            if (i + j === 0) k = 0;
                            else k = i + j - 1;

                            if (number[k] != '1' && number[k] != '0')
                                doc += "mốt ";
                            else
                                doc += cs[1] + " ";
                        }
                        break;
                    case '5':
                        if ((i + j === len - 1) || (i + j + 3 === len - 1))
                            doc += "lăm ";
                        else
                            doc += cs[5] + " ";
                        break;
                    default:
                        doc += cs[number[i + j]] + " ";
                        break;
                }

                //Doc don vi nho
                if (ddv === 1) {
                    doc += ((n - j) != 1) ? dv[n - j - 1] + " " : dv[n - j - 1];
                }
            }
        }


        //Doc don vi lon
        if (len - i - n > 0) {
            if ((len - i - n) % 9 === 0) {
                if (rd === 1) {
                    for (k = 0; k < (len - i - n) / 9; k++) {
                        doc += "tỉ ";
                    }
                }
                rd = 0;
            }
            else
                if (found != 0) {
                    doc += dv[(Math.floor(((len - i - n + 1) % 9) / 3) + 2)] + " ";
                }
        }

        i += n;
    }

    if (len === 1) {
        if (number[0] === '0' || number[0] === '5') {
            return cs[number[0]];
        }
    }
    if (fraction !== undefined) {
        doc += 'phẩy ' + readNum(fraction, '')
    }
    doc += donvi;
    return doc;
}
export function vietHoaChuCaiDau(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function nhapTen(value: string) {
    let arr = value.split(' ');
    let upperArr = arr.map(ele => ele.charAt(0).toUpperCase() + ele.slice(1));
    return upperArr.join(' ')
}
export function download(tepdinhkems: Array<any>) {
    console.log(tepdinhkems[0])
    if (tepdinhkems[0].TenGoc.includes('.pdf')) {
        window.open(API.imgURL + tepdinhkems[0].Link + '&viewOnly=true')
    } else {
        window.open(API.imgURL + tepdinhkems[0].Link);
    }
}
export function deepCopy(value: any) {
    return JSON.parse(JSON.stringify(value));
}
export function validVariable(value: any) {
    if (value !== undefined && value !== null && value.toString().trim() !== "") {
        return true;
    } else {
        return false;
    }
}
export function DateToUnix(date: any): any {
    return (new Date(date)).getTime() / 1000;
}
export function DateToDatePicker(date: any): any {
    return validVariable(date) ? new Date(date) : undefined;
}
export function UnixToDate(unix: number): Date | null {
    if (unix !== undefined && unix !== null && unix !== 0) {
        return new Date(unix * 1000);
    } else {
        return null;
    }

}
export function mapArrayForDropDown(array: Array<any>, labelProp: string, valueProp: string): Array<any> {
    return array.map(ele => {
        return {
            label: ele[labelProp],
            value: ele[valueProp],
        }
    })
}
export function merge(newArr: Array<any>, existingArr: Array<any>, diffProp: string): Array<any> {
    let removeIndex = [];
    newArr.forEach((newEle) => {
        let index = existingArr.findIndex(
            (oldEle) => newEle[diffProp] === oldEle[diffProp]
        );
        if (index === -1) {
            existingArr.push(newEle);
        }
    });
    existingArr.forEach((oldEle, index) => {
        let indexCheck = newArr.findIndex(
            (newEle) => newEle[diffProp] === oldEle[diffProp]
        );
        if (indexCheck === -1) {
            removeIndex.push(index);
        }
    });
    for (var i = removeIndex.length - 1; i >= 0; i--) {
        if (existingArr[i].Id === '') {
            existingArr.splice(removeIndex[i], 1);
        } else {
            existingArr[i].isXoa = true;
        }
    }
    return existingArr;
}

export function CVMic(array:Array<any>,sokien:number){
    // array là mảng chứa mic và số lượng của từng lô từng bàn từ bông hồi
    // sokien là tổng số kiện trên bàn bông trừ bông hồi
    return (Math.sqrt(array.map(x => Math.pow(x - (array.reduce((a, b) => a + b) / array.length), 2)).reduce((a, b) => a + b) / (array.length-1)))*sokien/100
}

export function formatdate(ngay: any, istime: boolean) {
    let date = new Date(ngay);
    let time = ` ${date.getHours()}:${date.getMinutes()}`;
    let succformat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}${istime ? time : ""}`;
    return succformat;
}