import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegularExpressionsService } from 'src/app/services/regular-expressions/regular-expressions.service';
import { DialogContentConfirmDeleteDialog } from '../../regular-grammars/regular-grammars-list/regular-grammars-list.component';

@Component({
  selector: 'app-regular-expressions-list',
  styleUrls: ['./regular-expressions-list.component.scss'],
  templateUrl: './regular-expressions-list.component.html',
})
export class RegularExpressionsListComponent implements OnInit {

  constructor(
    public regularExpressionsService: RegularExpressionsService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  public openDialog(index: number): void {
    const dialogRef = this.matDialog.open(DialogContentConfirmDeleteDialog);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        if (this.regularExpressionsService.remove(index)) {
          const snackBarRef = this.snackBar.open('Expressão Regular excluída com sucesso.', 'Desfazer', {
            duration: 5000,
          });
          snackBarRef.onAction().subscribe(() => {
            this.regularExpressionsService.undo();
          });
        }
      }
    });
  }

  public ngOnInit(): void {
  }

}
