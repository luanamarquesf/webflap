import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiniteAutomatonComponent } from './pages/finite-automaton/finite-automaton.component';
import { RegularExpressionsComponent } from './pages/regular-expressions/regular-expressions.component';
import { RegularGrammarsComponent } from './pages/regular-grammars/regular-grammars.component';
import { InitialComponent } from './pages/initial/initial.component';

const routes: Routes = [
  { path: 'regular-expressions', component: RegularExpressionsComponent },
  { path: 'regular-grammars', component: RegularGrammarsComponent },
  { path: 'finite-automaton', component: FiniteAutomatonComponent },
  { path: 'initial', component: InitialComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }

/** Exporta os componentes que estão roteados. */
export const routingComponents = [
  RegularExpressionsComponent,
  RegularGrammarsComponent,
  FiniteAutomatonComponent,
  InitialComponent,
];
