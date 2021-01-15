import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Automaton } from 'src/app/models/finite-automaton.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FiniteAutomatonService {

  /** Lista de autômatos carregados */
  public automatons: Automaton[] = [];
  /** autômato sendo trabalhada atualmente */
  public currentAutomaton: Automaton = null;
  /** Índice do autômato atual */
  public currentAutomatonIndex = -1;
  /** Último automato excluída */
  public lastAutomaton: Automaton = null;
  /** Índice do ultimo autômato excluído */
  public lastAutomatonIndex = -1;

  constructor(
    private snackBar: MatSnackBar,
    private storage: StorageService,
  ) {
    this.automatons = this.storage.loadAutomatons();
  }

  /**
   * Cria um novo autômato com os valores passados e insere na lista de
   * autômatos carregadas.
   * @param title Título do autômato
   * @return autômato criado
   */
  public newAutomaton(title: string): Automaton {
    const automaton = new Automaton();
    automaton.title = title;
    this.automatons.push(automaton);
    this.currentAutomatonIndex = this.automatons.length - 1;

    this.currentAutomaton = this.automatons[this.currentAutomatonIndex];
    return this.currentAutomaton;
  }

  /**
   * Seleciona um autômato como a atual.
   * @param index Índice do autômato a ser selecionada
   */
  public select(index: number): boolean {
    if (index < 0 || index >= this.automatons.length) {
      return false;
    }

    this.currentAutomaton = this.automatons[index];
    this.currentAutomatonIndex = index;

    return true;
  }

  /**
   * Remove um autômato da lista de automatos e oferece a possibilidade
   * de desfazer.
   * @param index Índice do autômato a ser removida
   */
  public remove(index: number): boolean {
    if (index < 0 || index >= this.automatons.length) {
      return false;
    }

    if (this.currentAutomatonIndex === index) {
      if (this.currentAutomatonIndex > 0) { this.currentAutomatonIndex--; }
    }
    this.select(this.currentAutomatonIndex);

    this.lastAutomatonIndex = index;
    this.lastAutomaton = this.automatons.splice(index, 1)[0];

    if (this.automatons.length === 0) {
      this.newAutomaton('Autômato sem nome');
    }

    this.storage.saveAutomatons(this.automatons);

    return true;
  }

  /** Desfaz a exclusão de um autômato */
  public undo(): void {
    this.automatons.splice(this.lastAutomatonIndex, 0, this.lastAutomaton);
    this.select(this.lastAutomatonIndex);
    this.lastAutomaton = null;
    this.lastAutomatonIndex = -1;

    this.saveAll();

    this.snackBar.open('Autômato finito recuperado com sucesso.', null, {
      duration: 2000,
    });
  }

  public saveAll(): void {
    this.storage.saveAutomatons(this.automatons);
  }
}
