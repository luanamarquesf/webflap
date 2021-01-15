import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegularExpressionsService } from 'src/app/services/regular-expressions/regular-expressions.service';
import { RegularExpressionsTestManyComponent } from '../regular-expressions-test-many/regular-expressions-test-many.component';

@Component({
  selector: 'app-regular-expressions-view',
  styleUrls: ['./regular-expressions-view.component.scss'],
  templateUrl: './regular-expressions-view.component.html',
})
export class RegularExpressionsViewComponent implements OnInit {

  constructor(
    public regularExpressionsService: RegularExpressionsService,
    private matDialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.regularExpressionsService.newRegularExpression('Expressão Regular sem nome');
  }

  public addEpsilon(obj: any): void {
    /** Insere um caractere de vazio na posição do cursor */
    obj.value = obj.value.substr(0, obj.selectionStart) + 'ε' + obj.value.substr(obj.selectionStart, obj.value.length);
  }

  public openDialogTestMany(): void {
    const dialogRef = this.matDialog.open(RegularExpressionsTestManyComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) { }
    });
  }

}
