import { Component, OnInit } from '@angular/core';
import { RegularGrammarsService } from 'src/app/services/regular-grammars/regular-grammars.service';

@Component({
  selector: 'app-regular-grammars-test-many',
  styleUrls: ['./regular-grammars-test-many.component.scss'],
  templateUrl: './regular-grammars-test-many.component.html',
})
export class RegularGrammarsTestManyComponent implements OnInit {

  public testCases: TestCase[] = [];

  constructor(
    private regularGrammarsService: RegularGrammarsService,
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
      this.regularGrammarsService.currentGrammar.test(testCase.cadeia).then((result) => {
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
