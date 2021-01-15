import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { GrammarRule } from 'src/app/models/grammar.model';
import { RegularGrammarsService } from 'src/app/services/regular-grammars/regular-grammars.service';
import { RegularGrammarsTestManyComponent } from '../regular-grammars-test-many/regular-grammars-test-many.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-regular-grammars-view',
  styleUrls: ['./regular-grammars-view.component.scss'],
  templateUrl: './regular-grammars-view.component.html',
})
export class RegularGrammarsViewComponent implements OnInit {

  public leftFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-Z]$'),
  ]);

  public rightFormControl = new FormControl('', []);

  public matcher = new MyErrorStateMatcher();

  constructor(
    public regularGrammarsService: RegularGrammarsService,
    private matDialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.regularGrammarsService.newGrammar('Gramática sem nome', 'S');
  }

  /**
   * Adiciona o conteúdo validado do formulário de adição de regras à gramática atual
   * @param left Referência ao input esquerdo
   * @param right Referência ao input direito
   * @return true se tudo tiver ido bem
   */
  public addToGrammar(left: any, right: any): boolean {
    if (!this.leftFormControl.valid || !this.rightFormControl.valid || right.value === '') {
      return false;
    }
    if (!this.regularGrammarsService.currentGrammar) {
      this.regularGrammarsService.newGrammar('Gramática sem nome', 'S');
    }
    console.log(left.value, right.value);
    const rule = new GrammarRule();
    rule.setLeft(left.value);
    const rightValues = right.value.replaceAll(' ', '');
    for (const derivation of rightValues.split('|')) {
      rule.addRight(derivation);
    }

    this.regularGrammarsService.currentGrammar.rules.push(rule);

    this.regularGrammarsService.currentGrammar.generateDefinition();
    right.value = '';
    left.value = '';
    left.focus();

    this.regularGrammarsService.saveAll();

    return true;
  }

  public removeFromGrammar(index: number): void {
    this.regularGrammarsService.currentGrammar.remove(index);
    this.regularGrammarsService.saveAll();
  }

  public addEpsilon(obj: any): void {
    obj.value = obj.value.trim();
    if (obj.value === '') {
      obj.value = 'ε';
    } else {
      obj.value += ' | ε';
    }
  }

  public hasEpsilon(obj: any): boolean {
    return obj.value.search('ε') !== -1;
  }

  public removeEpsilon(obj: any): boolean {
    if (!this.hasEpsilon(obj)) {
      return false;
    }
    obj.value = obj.value.trim();
    if (obj.value === 'ε') {
      obj.value = '';
      return true;
    }
    obj.value = obj.value.replaceAll(' ε |', '');
    obj.value = obj.value.replaceAll('ε |', '');
    obj.value = obj.value.replaceAll('ε|',  '');
    obj.value = obj.value.replaceAll('| ε ', '');
    obj.value = obj.value.replaceAll('| ε', '');
    obj.value = obj.value.replaceAll('|ε',  '');

    return true;
  }

  public openDialogTestMany(): void {
    const dialogRef = this.matDialog.open(RegularGrammarsTestManyComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) { }
    });
  }

}
