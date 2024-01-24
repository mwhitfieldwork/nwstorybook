import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class ConversionPipe implements PipeTransform {

  transform(size: number, extension: string = 'MB'): unknown {
    console.log(size);
    return (size / (1024 * 1024)).toFixed(2) + extension;
  }

}
