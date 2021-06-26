import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length >= 45) {
      return value.slice(0, 45).trim()+'... ';
    }
    return value;
  }

}
