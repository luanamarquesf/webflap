import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = 'webflap';

  public menu = [
    { name: 'Início', icon: 'home', link: '/initial' },
    { name: 'Expressões Regulares', icon: 'calculate', link: '/regular-expressions' },
    { name: 'Gramáticas Regulares', icon: 'grading', link: '/regular-grammars' },
    { name: 'Autômatos Finitos', icon: 'workspaces', link: '/finite-automaton' },
  ];
}
