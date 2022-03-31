import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numCount'
})
export class NumCountPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
