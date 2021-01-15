/** Classe referente a cada regra dentro de uma gramática regular */
export class GrammarRule {
  /** Lado esquerdo da regra (símbolo não terminal) */
  public left: string;
  /** Lado direito da regra (lista de símbolos terminais e não terminais) */
  public right: string[] = [];

  /**
   * Seta o valor do lado esquerdo da regra de gramática, validando a entrada
   * @param content Conteúdo a ser adicionado.
   */
  public setLeft(content: string): void {
    if (content.length > 1 || content.toLowerCase() === content || content === 'ε') {
      throw Error('Formato de caractere não terminal é letra maiúscula [A-Z]!');
    }

    this.left = content;
  }

  /**
   * Adiciona um valor do lado direito da regra de gramática.
   * @param content conteúdo a ser adicionado.
   */
  public addRight(content: string): void {
    this.right.push(content);
  }

  /**
   * Remove um valor do lado direito da regra através de seu índice
   * @param index índice do item a ser removido
   * @return o item removido.
   */
  public remove(index: number): string {
    if (index < 0 || index >= this.right.length) {
      throw Error('Índice fora da range de right.');
    }

    return this.right.splice(index, 1)[0];
  }

  public deserialize(input: any): GrammarRule {
    Object.assign(this, input);
    return this;
  }
}

/** ****************************************
 *  ****************************************
 *  Classe referente a uma gramática regular
 *  ****************************************
 *  ****************************************
 */
export class Grammar {
  /** Nome da gramática para referência do usuário */
  public title: string;
  /** Lista de regras que compõem a gramática */
  public rules: GrammarRule[] = [];
  /** Símbolo inicial da gramática */
  public initial: string;
  /** Data da última modificação da gramática */
  public modified: Date = new Date();
  public definition = '';

  constructor(title?: string, initial?: string) {
    this.title = title || '';
    this.initial = initial || 'S';
  }

  /** TODO: Corrigir a forma com que são instanciados esses objetos */
  public deserialize(input: any): Grammar {
    const rules = input.rules;
    input.rules = [];
    for (const rule of rules) {
      input.rules.push(new GrammarRule().deserialize(rule));
    }
    Object.assign(this, input);
    this.modified = new Date(input.modified);
    return this;
  }

  public generateDefinition(): void {
    /** G = ({S, A}, {a, b}, P, S) */
    const terminals = [];
    const nonTerminals = [];
    for (const rule of this.rules) {
      if (nonTerminals.indexOf(rule.left) === -1) {
        nonTerminals.push(rule.left);
      }
      for (const part of rule.right) {
        for (const symbol of part.split('')) {
          if (symbol.toLowerCase() !== symbol) {
            continue;
          }
          /** Note que a lista de símbolos terminais não inclui o epsilon */
          if (terminals.indexOf(symbol) === -1 && symbol !== 'ε') {
            terminals.push(symbol);
          }
        }
      }
    }
    this.definition = `G = ({${nonTerminals.join(', ')}}, {${terminals.join(', ')}}, P, ${this.initial})`;
    console.log(this.definition);
  }

  /**
   * Remove uma regra com base em seu índice
   * @param index índice do item a ser removido
   * @return o item removido.
   */
  public remove(index: number): GrammarRule {
    if (index < 0 || index >= this.rules.length) {
      throw Error('Índice fora da range de rules.');
    }

    const removed = this.rules.splice(index, 1)[0];

    this.generateDefinition();

    return removed;
  }

  /**
   * Mergulha em um símbolo não terminal e o deriva.
   * @param str cadeia a ser testada
   * @param index índice atual sendo processado
   * @param currentNotTerminal caractere não terminal sendo processado
   * @return true se a cadeia pertencer à gramática, false caso contrário.
   */
  public dive(str: string, index?: number, currentNotTerminal?: string): boolean {
    if (!currentNotTerminal || currentNotTerminal === '') { currentNotTerminal = this.initial; }
    if (!index) { index = 0; }
    if (index > str.length) {
      console.log('Solução rejeitada. Cadeia chegou ao final. (Possível bug com epsilon...)');
      return false;
    }
    console.log('Begin testing');

    console.log('At char', str[index] + '(' + index + ')', 'from string', str);

    let done = false;

    /** Procurando regras que condizem com o currentNotTerminal  */
    for (const rule of this.rules) {
      if (rule.left !== currentNotTerminal) { continue; }
      console.log('Regra para', currentNotTerminal, 'encontrada. Hora de derivar');
      /** Verificando cada derivação da regra encontrada */
      for (const derivation of rule.right) {
        /** Índice sendo alcançado pela derivação atual */
        let currentIndex = index;
        for (const symbol of derivation) {
          if (this.isNonTerminal(symbol)) {
            console.log('Símbolo não terminal', symbol, 'encontrado. Indo nele recursivamente com', str, currentIndex, symbol);
            done = this.dive(str, currentIndex, symbol);
            if (done) { return true; }
          } else if (symbol === str[currentIndex]) {
            console.log('Char', symbol, 'encontrado em', derivation, 'de', rule.left, 'Ass.:', str, index, currentNotTerminal);
            currentIndex++;
            done = currentIndex === str.length;
          } else if (symbol === 'ε') {
            if (str === '') {
              console.log('Cadeia vazia permitida. A cadeia é válida.');
              return true;
            }
            done = currentIndex === str.length;
            console.log('Símbolo "ε" encontrado. Se a cadeia estiver completa (', done, '), então done = true');
          } else {
            console.log('Nesse caso, o símbolo atual da derivação não condiz com o próximo da cadeia. Abortar Derivação.');
            done = false;
            break;
          }
        }
      }
    }
    console.log('Recursão com assinatura', str, index, currentNotTerminal, 'concluída. Resultado =', done);
    return done;
  }

  /**
   * Testa se uma cadeia pertence à gramática
   * @param str cadeia a ser testada
   * @param index índice atual sendo processado
   * @param currentNotTerminal caractere não terminal sendo processado
   * @return Promise que resolve true se a cadeia pertencer à gramática, false caso contrário.
   */
  public async test(str: string, index?: number, currentNotTerminal?: string): Promise<boolean> {
    return this.dive(str, index, currentNotTerminal);
  }

  private isNonTerminal(symbol: string): boolean {
    return /[A-Z]/.test(symbol);
  }
}
