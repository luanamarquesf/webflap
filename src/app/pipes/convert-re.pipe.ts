import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertRe',
})
export class ConvertRePipe implements PipeTransform {

  private convert(str: string): string {
    const inicio = '^';
    const fim = '$';
    str = str.replace(/ /g, '');
    let regularExpressionForJS = inicio.concat(str, fim);
    regularExpressionForJS = regularExpressionForJS.replace(/\(([\w|+]*ε[\w|+]*)\)/g, '($1)?');
    regularExpressionForJS = regularExpressionForJS.replace(/\+ε/g, '');
    regularExpressionForJS = regularExpressionForJS.replace(/ε\+/g, '');
    regularExpressionForJS = regularExpressionForJS.replace(/\((\w)\+(\w)\)/g, '[$1|$2]');
    regularExpressionForJS = regularExpressionForJS.replace(/\((\w{2,})\+(\w{2,})\)/g, '($1|$2)');
    regularExpressionForJS = regularExpressionForJS.replace(/\+/g, '|');
    return regularExpressionForJS;
  }

  public transform(value: unknown, ...args: unknown[]): unknown {
    return this.convert(value as string);
  }

}
