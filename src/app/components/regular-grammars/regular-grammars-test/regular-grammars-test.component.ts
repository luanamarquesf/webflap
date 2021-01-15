import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegularGrammarsService } from 'src/app/services/regular-grammars/regular-grammars.service';

@Component({
  selector: 'app-regular-grammars-test',
  styleUrls: [
    './regular-grammars-test.component.scss',
    '../regular-grammars-view/regular-grammars-view.component.scss',
  ],
  templateUrl: './regular-grammars-test.component.html',
})
export class RegularGrammarsTestComponent implements OnInit {

  @Input() public isValid: boolean = null;
  @Input() public isLoading = false;
  @Input() public appearance = 'fill';
  @Output() public valueChange = new EventEmitter<string>();

  constructor(
    private regularGrammarsService: RegularGrammarsService,
  ) { }

  public ngOnInit(): void {
  }

  public test(queryObj: any): boolean {
    this.isValid = null;
    this.isLoading = true;
    console.log('starting');

    const promise = this.regularGrammarsService.currentGrammar.test(queryObj.value);
    console.log('MIDDLE');
    promise.then((result: boolean) => {
      this.isLoading = false;
      console.log('ended');
      this.isValid = result;
      console.log('RESULTADO DO TESTE PARA', queryObj.value, 'É =', result);
    });

    console.log('FIRST');
    return false;
  }

  public spread(value: string): void {
    console.log('value =', value);
    this.valueChange.emit(value);
  }
}
