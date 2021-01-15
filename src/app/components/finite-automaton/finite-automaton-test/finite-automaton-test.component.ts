import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FiniteAutomatonService } from 'src/app/services/finite-automaton/finite-automaton.service';

@Component({
  selector: 'app-finite-automaton-test',
  styleUrls: [
    './finite-automaton-test.component.scss',
    '../finite-automaton-view/finite-automaton-view.component.scss',
  ],
  templateUrl: './finite-automaton-test.component.html',
})
export class FiniteAutomatonTestComponent implements OnInit {

  @Input() public isValid: boolean = null;
  @Input() public isLoading = false;
  @Input() public appearance = 'fill';
  @Output() public valueChange = new EventEmitter<string>();

  constructor(
    private finiteAutomatonService: FiniteAutomatonService,
  ) { }

  public ngOnInit(): void {
  }

  public test(queryObj: any): boolean {
    this.isValid = null;
    this.isLoading = true;
    console.log('starting');

    const promise = this.finiteAutomatonService.currentAutomaton.test(queryObj.value);
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
