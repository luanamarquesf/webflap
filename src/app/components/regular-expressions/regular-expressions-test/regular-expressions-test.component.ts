import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegularExpressionsService } from 'src/app/services/regular-expressions/regular-expressions.service';

@Component({
  selector: 'app-regular-expressions-test',
  styleUrls: ['./regular-expressions-test.component.scss',
    '../regular-expressions-view/regular-expressions-view.component.scss'],
  templateUrl: './regular-expressions-test.component.html',
})
export class RegularExpressionsTestComponent implements OnInit {

  @Input() public isValid: boolean = null;
  @Input() public isLoading = false;
  @Input() public appearance = 'fill';
  @Output() public valueChange = new EventEmitter<string>();

  constructor(
    private regularExpressionsService: RegularExpressionsService,
  ) { }

  public ngOnInit(): void {
  }

  public test(queryObj: any): boolean {
    this.isValid = null;
    this.isLoading = true;
    console.log('starting');

    const promise = this.regularExpressionsService.currentRegularExpression.test(queryObj.value);
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
