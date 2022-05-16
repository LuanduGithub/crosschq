import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSize'
})
export class TextSizePipe implements PipeTransform {

  transform(value: string, size: number): string {
    const paragraph = value.substring(0, size);
    return paragraph.concat('...');
  }

}
