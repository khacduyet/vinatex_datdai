import { Pipe } from '@angular/core';
@Pipe({
    name: 'NumSep'
})
export class VNDPipe {
    transform(value: any): string {
        if (value !== null && value !== undefined) {
            value = value.toString();
            const pattern = /(-?\d+)(\d{3})/;
            while (pattern.test(value)) {
                value = value.replace(pattern, '$1.$2');
            }
            return value;
        }
        else{
            return ''
        }
    }
}