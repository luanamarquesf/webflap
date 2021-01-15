import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Grammar } from '../../models/grammar.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RegularGrammarsService {

  /** Lista de gramáticas carregadas */
  public grammars: Grammar[] = [];
  /** Gramática sendo trabalhada atualmente */
  public currentGrammar: Grammar = null;
  /** Índice da gramática atual */
  public currentGrammarIndex = -1;
  /** Última gramática excluída */
  public lastGrammar: Grammar = null;
  /** Índice da última gramática excluída */
  public lastGrammarIndex = -1;

  constructor(
    private snackBar: MatSnackBar,
    private storage: StorageService,
  ) {
    this.grammars = this.storage.loadGrammars();
  }

  /**
   * Cria uma nova gramática com os valores passados e insere na lista de
   * gramáticas carregadas.
   * @param title Título da gramática
   * @param initial Símbolo inicial da gramática
   * @return gramática criada
   */
  public newGrammar(title: string, initial: string): Grammar {
    const grammar = new Grammar(title, initial);
    this.grammars.push(grammar);
    this.currentGrammarIndex = this.grammars.length - 1;

    this.currentGrammar = this.grammars[this.currentGrammarIndex];
    return this.currentGrammar;
  }

  /**
   * Seleciona uma gramática como a atual.
   * @param index Índice da gramática a ser selecionada
   */
  public select(index: number): boolean {
    if (index < 0 || index >= this.grammars.length) {
      return false;
    }

    this.currentGrammar = this.grammars[index];
    this.currentGrammarIndex = index;

    return true;
  }

  /**
   * Remove uma gramática da lista de gramáticas e oferece a possibilidade
   * de desfazer.
   * @param index Índice da gramática a ser removida
   */
  public remove(index: number): boolean {
    if (index < 0 || index >= this.grammars.length) {
      return false;
    }

    if (this.currentGrammarIndex === index) {
      if (this.currentGrammarIndex > 0) { this.currentGrammarIndex--; }
    }
    this.select(this.currentGrammarIndex);

    this.lastGrammarIndex = index;
    this.lastGrammar = this.grammars.splice(index, 1)[0];

    if (this.grammars.length === 0) {
      this.newGrammar('Gramática sem nome', 'S');
    }

    this.storage.saveGrammars(this.grammars);

    return true;
  }

  /** Desfaz a exclusão de uma gramática */
  public undo(): void {
    this.grammars.splice(this.lastGrammarIndex, 0, this.lastGrammar);
    this.select(this.lastGrammarIndex);
    this.lastGrammar = null;
    this.lastGrammarIndex = -1;

    this.saveAll();

    this.snackBar.open('Gramática recuperada com sucesso.', null, {
      duration: 2000,
    });
  }

  public saveAll(): void {
    this.storage.saveGrammars(this.grammars);
  }
}
