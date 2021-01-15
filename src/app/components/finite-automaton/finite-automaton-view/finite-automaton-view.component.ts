import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { AutomatonLink, AutomatonNode } from 'src/app/models/finite-automaton.model';
import * as shape from 'd3-shape';
import { MatMenuTrigger } from '@angular/material/menu';
import { FiniteAutomatonService } from 'src/app/services/finite-automaton/finite-automaton.service';
import { FiniteAutomatonTestManyComponent } from '../finite-automaton-test-many/finite-automaton-test-many.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-finite-automaton-view',
  styleUrls: ['./finite-automaton-view.component.scss'],
  templateUrl: './finite-automaton-view.component.html',
})
export class FiniteAutomatonViewComponent implements OnInit {

  public graphOptions = {
    autoCenter: false,
    curve: shape.curveCardinal.tension(-1),
    showMiniMap: true,
    view: [, 400],
  };

  public zoomToFit$: Subject<boolean> = new Subject();
  public center$: Subject<boolean> = new Subject();

  public links = [];

  public nodes = [];

  public selectionMode = false;
  private subject: string;
  private selectionCount: number;
  private selectedNodes = [];

  private snackBarRef: any;

  @ViewChild(MatMenuTrigger) public trigger: MatMenuTrigger;
  public menuTopLeftPosition =  {x: '0', y: '0'};

  constructor(
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    public finiteAutomatonService: FiniteAutomatonService,
  ) { }

  public add(event: any): void {
    console.log('hello?', this.finiteAutomatonService.currentAutomaton);
    this.finiteAutomatonService.currentAutomaton.nodes.push({
      final: false,
      id: 'node-' + this.finiteAutomatonService.currentAutomaton.nodes.length.toString(),
      initial: false,
      label: 'q' + this.finiteAutomatonService.currentAutomaton.nodes.length.toString(),
      selected: false,
    } as AutomatonNode);

    this.refresh();

    this.fitGraph();
  }

  private selectionModeStart(subject: string, count: number): void {
    if (subject) { this.subject = subject; }
    this.selectionCount = count;
    let text: string;
    if (subject === 'add-transition') {
      text = 'Escolha os estados de origem e destino.';
    } else if (subject === 'remove-element') {
      text = 'Escolha um estado para excluir.';
    }
    this.snackBarRef = this.snackBar.open(text, 'Cancelar', {
      duration: 0,
    });
    this.snackBarRef.onAction().subscribe(() => {
      this.selectionModeEnd();
      this.snackBarRef.dismiss();
    });

    this.selectionMode = true;
  }

  private selectionModeEnd(): void {
    this.subject = '';
    this.snackBarRef.dismiss();
    while (this.selectedNodes.length > 0) {
      this.selectedNodes[0].selected = false;
      this.selectedNodes.splice(0, 1);
    }
    this.selectionMode = false;
    this.refresh();
  }

  public addTransition(): void {
    this.selectionModeStart('add-transition', 2);
  }

  public removeNode(): void {
    this.selectionModeStart('remove-element', 1);
  }

  public fitGraph(): void {
    this.zoomToFit$.next(true);
  }

  public centerGraph(): void {
    this.center$.next(true);
  }

  public refresh(): void {
    this.finiteAutomatonService.currentAutomaton.nodes = [...this.finiteAutomatonService.currentAutomaton.nodes];
    this.finiteAutomatonService.currentAutomaton.links = [...this.finiteAutomatonService.currentAutomaton.links];

    this.finiteAutomatonService.saveAll();
  }

  public selectNode(event: any, node: any): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.selectionMode) { return; }

    node.selected = true;
    if (this.selectedNodes.length < this.selectionCount) {
      this.selectedNodes.push(node);
      if (this.selectedNodes.length === this.selectionCount) {
        this.execute();
      }
    }
  }

  public selectToRemoveLink(link: any, part: string): void {
    if (!this.selectionMode) { return; }
    if (this.selectedNodes.length < this.selectionCount) {
      this.selectedNodes.push(link);
      if (this.selectedNodes.length === this.selectionCount) {
        const label = link.label.split(', ');
        if (label.length > 1) {
          label.splice(label.indexOf(part), 1);
          link = Object.assign(link, {label: label.join(', ')});
          this.finiteAutomatonService.currentAutomaton.links[this.getLinkById(link.id)] = link;
          this.selectionModeEnd();
        } else {
          this.execute();
        }
      }
    }
  }

  /** Procura o índice de um link e o retorna */
  private getLinkById(id: string): number {
    let i = 0;
    for (const item of this.finiteAutomatonService.currentAutomaton.links) {
      if (item.id === id) {
        return i;
      }
      i++;
    }
    return -1;
  }

  /** Executa o subject escolhido com a seleção feita */
  private execute(): void {
    if (this.subject === 'add-transition') {
      const index = this.searchLink(this.selectedNodes[0].id, this.selectedNodes[1].id);
      console.log('Index of link is', index);
      let simbolo = prompt('Digite o símbolo terminal para atransição:');
      if (simbolo === '') {
        simbolo = 'λ';
      } else if (!simbolo) { this.selectionModeEnd(); return; }
      if (index !== -1) {
        this.finiteAutomatonService.currentAutomaton.links[index].label += ', ' + simbolo;
      } else {
        const link = new AutomatonLink();
        link.id = `link-${ this.finiteAutomatonService.currentAutomaton.links.length }`;
        link.label = simbolo;
        link.source = this.selectedNodes[0].id;
        link.target = this.selectedNodes[1].id;
        this.finiteAutomatonService.currentAutomaton.links.push(link);
      }
    } else if (this.subject === 'remove-element') {
      console.log('deleting', this.selectedNodes[0]);
      if (this.selectedNodes[0].source !== undefined) {
        this.finiteAutomatonService.currentAutomaton.links = this.finiteAutomatonService.currentAutomaton.links.filter((link) =>
          link.id !== this.selectedNodes[0].id);
      } else {
        this.finiteAutomatonService.currentAutomaton.links = this.finiteAutomatonService.currentAutomaton.links.filter((link) =>
          ![link.source, link.target].includes(this.selectedNodes[0].id));
        this.finiteAutomatonService.currentAutomaton.nodes = this.finiteAutomatonService.currentAutomaton.nodes.filter((node) =>
          node.id !== this.selectedNodes[0].id);
        console.log(this.finiteAutomatonService.currentAutomaton.links);
        console.log(this.finiteAutomatonService.currentAutomaton.nodes);
      }
    }
    this.selectionModeEnd();
  }

  private searchLink(source: string, target: string): number {
    let index = 0;
    for (const link of this.finiteAutomatonService.currentAutomaton.links) {
      if (link.source === source && link.target === target) {
        return index;
      }
      index++;
    }

    return -1;
  }

  public ngOnInit(): void {

  }

  public keypress(event: any): void {
    console.log(event);
  }

  public onRightClick(event: any, node: any): void {
    event.preventDefault();
    event.stopPropagation();
    console.log('right click on', event, node);

    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    this.trigger.menuData = {item: node};

    this.trigger.openMenu();
  }

  /** Troca o estado inicial de um estado e remove de todos os outros */
  public toggleInitial(node: any): boolean {
    console.log('node', node);
    const c = !node.initial;

    this.finiteAutomatonService.currentAutomaton.nodes.map((item: any) => {
      item.initial = false;
      return item;
    });

    node.initial = c;

    this.finiteAutomatonService.saveAll();

    return node.initial;
  }

  /** Troca o estado final de um estado */
  public toggleFinal(node: any): boolean {

    node.final = !node.final;

    this.finiteAutomatonService.saveAll();

    return node.final;
  }

  public openDialogTestMany(): void {
    const dialogRef = this.matDialog.open(FiniteAutomatonTestManyComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) { }
    });
  }
}
