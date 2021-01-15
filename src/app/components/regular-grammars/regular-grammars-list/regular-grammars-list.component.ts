import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegularGrammarsService } from 'src/app/services/regular-grammars/regular-grammars.service';

@Component({
  selector: 'app-regular-grammars-list',
  styleUrls: ['./regular-grammars-list.component.scss'],
  templateUrl: './regular-grammars-list.component.html',
})
export class RegularGrammarsListComponent implements OnInit {

  constructor(
    public regularGrammarsService: RegularGrammarsService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  public openDialog(index: number): void {
    const dialogRef = this.matDialog.open(DialogContentConfirmDeleteDialog);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        if (this.regularGrammarsService.remove(index)) {
          const snackBarRef = this.snackBar.open('Gramática excluída com sucesso.', 'Desfazer', {
            duration: 5000,
          });
          snackBarRef.onAction().subscribe(() => {
            this.regularGrammarsService.undo();
          });
        }
      }
    });
  }

  public ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-content-confirm-delete-dialog',
  templateUrl: '../../dialog/dialog-content-confirm-delete-dialog.html',
})
export class DialogContentConfirmDeleteDialog {}
