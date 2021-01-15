/** Exporta a classe que representa cada estado do autômato */
export class AutomatonNode {
  /** Indica se o estado é um estado final */
  public final = false;
  /** Indica se o estado é o estado inicial */
  public initial = false;
  /** ID do nó no grafo */
  public id: string;
  /** Label do estado, ex.: q0, q1, q2 */
  public label: string;
  /** Indica se o estado está selecionado no momento */
  public selected = false;
}

/** Exporta a classe que representa cada transição entre estados do autômato */
export class AutomatonLink {
  /** ID da transição */
  public id: string;
  /** Label da transação, representando os caracteres que transcicionam por ela */
  public label: string;
  /** ID do estado de origem da transição */
  public source: string;
  /** ID do estado de destino da transição */
  public target: string;
}

export class Automaton {
  public links: AutomatonLink[] = [];

  public nodes: AutomatonNode[] = [];

  public title: string;

  public modified: Date = new Date();

  public deserialize(input: any): Automaton {
    Object.assign(this, input);
    this.modified = new Date(input.modified);
    return this;
  }

  private findInitial(): number {
    let i = 0;
    for (const node of this.nodes) {
      if (node.initial) { return i; }
      i++;
    }

    return -1;
  }

  private findNodeById(id: string): number {
    let i = 0;
    for (const node of this.nodes) {
      if (node.id === id) { return i; }
      i++;
    }

    return -1;
  }

  public dive(str: string, index: number, currentNodeIndex: number): boolean {
    if (index === null || index === undefined) { index = 0; }
    if (currentNodeIndex === -1) { return false; }

    console.log('Analisando o estado', this.nodes[currentNodeIndex].id, 'com dados', this.nodes[currentNodeIndex]);

    /** Se o índice estiver no final da string e o estado atual for final, solução encontrada */
    if (str.length === index && this.nodes[currentNodeIndex].final) {
      console.log('Estado final encontrado e string completa. Yay!');
      return true;
    }

    /** Filtrando apenas transições cuja origem é o estado atual */
    const links = this.links.filter((item) => item.source === this.nodes[currentNodeIndex].id);

    /** done continuará false apenas se nenhuma transição for válida */
    let done = false;
    /** Varrendo cada transição que sae de um dado estado */
    for (const link of links) {
      console.log('Procurando transições possíveis na lista', link.label);
      const transitions = link.label.split(', ');
      /** Se for encontrada uma transição válida para o próximo caractere de str */
      if (transitions.includes(str[index])) {
        console.log('Caractere', str[index] + '(' + index + ')', 'encontrado e preenchido.');
        done = this.dive(str, index + 1, this.findNodeById(link.target));
        if (done) { return true; }
      } else if (transitions.includes('λ')) {
        /** Caso encontre uma transição em vazio, vá para o próximo estado ainda procurando o mesmo caractere */
        console.log('Transição em vazio λ encontrada. Verificando o estado destino.');
        done = this.dive(str, index, this.findNodeById(link.target));
        if (done) { return true; }
      }
    }

    console.log('Esgotados as transições possíveis para', this.nodes[currentNodeIndex].id, ' e a conclusão foi =', done);

    return done;
  }

  public async test(str: string): Promise<boolean> {
    console.log('Testando', str);

    const initialIndex = this.findInitial();

    if (initialIndex === -1) {
      console.log('Error: sem símbolo inicial');
      return false;
    }

    return this.dive(str, 0, initialIndex);
  }
}
