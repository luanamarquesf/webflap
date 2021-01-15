import { Component, OnInit } from '@angular/core';
import { FiniteAutomatonService } from 'src/app/services/finite-automaton/finite-automaton.service';

@Component({
  selector: 'app-finite-automaton-test-many',
  styleUrls: ['./finite-automaton-test-many.component.scss'],
  templateUrl: './finite-automaton-test-many.component.html',
})
export class FiniteAutomatonTestManyComponent implements OnInit {

  public testCases: TestCase[] = [];

  constructor(
    private finiteAutomatonService: FiniteAutomatonService,
  ) { }

  public ngOnInit(): void {
    this.add();
  }

  public add(): void {
    this.testCases.push(new TestCase());
  }

  public testAll(): void {
    for (const testCase of this.testCases) {
      console.log(testCase);
      testCase.loading = true;
      this.finiteAutomatonService.currentAutomaton.test(testCase.cadeia).then((result) => {
        testCase.valid = result;
      });
      testCase.loading = false;
    }
  }

  public remove(index: number): void {
    this.testCases.splice(index, 1);
  }

}

class TestCase {
  public valid = null;
  public loading = false;
  public cadeia = '';
}
