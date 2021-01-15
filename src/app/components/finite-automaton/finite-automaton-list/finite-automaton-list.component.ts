import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FiniteAutomatonService } from 'src/app/services/finite-automaton/finite-automaton.service';
import { DialogContentConfirmDeleteDialog } from '../../regular-grammars/regular-grammars-list/regular-grammars-list.component';

@Component({
  selector: 'app-finite-automaton-list',
  styleUrls: ['./finite-automaton-list.component.scss'],
  templateUrl: './finite-automaton-list.component.html',
})
export class FiniteAutomatonListComponent implements OnInit {

  constructor(
    public finiteAutomatonService: FiniteAutomatonService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  public openDialog(index: number): void {
    const dialogRef = this.matDialog.open(DialogContentConfirmDeleteDialog);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        if (this.finiteAutomatonService.remove(index)) {
          const snackBarRef = this.snackBar.open('Autômato excluído com sucesso.', 'Desfazer', {
            duration: 5000,
          });
          snackBarRef.onAction().subscribe(() => {
            this.finiteAutomatonService.undo();
          });
        }
      }
    });
  }

  public ngOnInit(): void {
    this.finiteAutomatonService.newAutomaton('Autômato criado ao iniciar');
  }

}
