/** Exporta a classe que define uma expressão regular */
export class RegularExpression {
  /** Título da expressão regular */
  public title: string;
  /** Pattern no formato padrão (dado em teoria) da expressão */
  public pattern = '';
  /** Data da última alteração da expressão regular */
  public modified: Date = new Date();

  public deserialize(input: any): RegularExpression {
    Object.assign(this, input);
    this.modified = new Date(input.modified);
    return this;
  }

  public convert(str: string): string {
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

  public async test(str: string): Promise<boolean> {
    const converted = this.convert(this.pattern);
    console.log(str.match(converted));
    const match = str.match(converted);
    return match !== null && match['0'] === str;
  }
}
