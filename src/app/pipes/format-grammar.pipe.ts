import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatGrammar',
})
export class FormatGrammarPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  public transform(value: string): SafeHtml {
    console.log(value);
    value = value.replace(/\|/g, `<span class="pipe-format-pipe">|</span>`);
    value = value.replace(/([A-Z^ε])/g, `<span class="pipe-format-non-terminal">$1</span>`);
    value = value.replace(/(ε)/g, `<span class="pipe-format-epsilon">ε</span>`);

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
