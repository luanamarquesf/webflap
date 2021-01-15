import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegularExpression } from 'src/app/models/regular-expression.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RegularExpressionsService {

  /** Lista de expressões regulares carregadas */
  public regularExpressions: RegularExpression[] = [];
  /** Expressão regular sendo trabalhada atualmente */
  public currentRegularExpression: RegularExpression = null;
  /** Índice da expressão regular atual */
  public currentRegularExpressionIndex = -1;
  /** Última expressão regular excluída */
  public lastRegularExpression: RegularExpression = null;
  /** Índice da última expressão regular excluída */
  public lastRegularExpressionIndex = -1;

  constructor(
    private snackBar: MatSnackBar,
    private storage: StorageService,
  ) {
    this.regularExpressions = this.storage.loadRegularExpressions();
  }

  /**
   * Cria uma nova expressão regular com os valores passados e insere na lista de
   * expressões regulares carregadas.
   * @param title Título da ER
   * @return ER criada
   */
  public newRegularExpression(title: string): RegularExpression {
    const regularExpression = new RegularExpression();
    regularExpression.title = title;
    this.regularExpressions.push(regularExpression);
    this.currentRegularExpressionIndex = this.regularExpressions.length - 1;

    this.currentRegularExpression = this.regularExpressions[this.currentRegularExpressionIndex];
    return this.currentRegularExpression;
  }

  /**
   * Seleciona uma expressão regular como a atual.
   * @param index Índice da ER a ser selecionada
   */
  public select(index: number): boolean {
    if (index < 0 || index >= this.regularExpressions.length) {
      return false;
    }

    this.currentRegularExpression = this.regularExpressions[index];
    this.currentRegularExpressionIndex = index;

    return true;
  }

  /**
   * Remove uma expressão regular da lista de expressões regulares e oferece a possibilidade
   * de desfazer.
   * @param index Índice da expressão regular a ser removida
   */
  public remove(index: number): boolean {
    if (index < 0 || index >= this.regularExpressions.length) {
      return false;
    }

    if (this.currentRegularExpressionIndex === index) {
      if (this.currentRegularExpressionIndex > 0) { this.currentRegularExpressionIndex--; }
    }
    this.select(this.currentRegularExpressionIndex);

    this.lastRegularExpressionIndex = index;
    this.lastRegularExpression = this.regularExpressions.splice(index, 1)[0];

    if (this.regularExpressions.length === 0) {
      this.newRegularExpression('Expressão regular sem nome');
    }

    this.storage.saveRegularExpressions(this.regularExpressions);

    return true;
  }

  /** Desfaz a exclusão de uma expressão regular */
  public undo(): void {
    this.regularExpressions.splice(this.lastRegularExpressionIndex, 0, this.lastRegularExpression);
    this.select(this.lastRegularExpressionIndex);
    this.lastRegularExpression = null;
    this.lastRegularExpressionIndex = -1;

    this.saveAll();

    this.snackBar.open('Expressão Regular recuperada com sucesso.', null, {
      duration: 2000,
    });
  }

  public saveAll(): void {
    this.storage.saveRegularExpressions(this.regularExpressions);
  }
}
