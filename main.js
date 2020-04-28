"use strict";

class ClubeTemplate {
  constructor(desconto, categorias) {
        this.descontoClube = desconto;
        this.categoriasClube = categorias;
  }
};

class ClubeLista {
  constructor() {
      //possíveis categorias para produtos
      this.categoriasLista = [
        'carne',
        'fruta',
        'verdura',
        'limpeza',
        'geriatrico',
        'doce',
        'peixe',
        'higiene',
        'alcool'
      ];
      //pctg de desconto oferecido por clube e produtos inclusos no beneficio
      this.churrasco = new ClubeTemplate(0.05, ['carne']);
      this.verde = new ClubeTemplate(0.03, ['fruta','verdura']);
      this.limpeza = new ClubeTemplate(0.07, ['limpeza']);
      this.idade = new ClubeTemplate(0.1, ['geriatrico']);
      this.jovem = new ClubeTemplate(0.25, ['doce']);
      this.nenhum = new ClubeTemplate(0, ['peixe','higiene','alcool']);
      this.filantropo = new ClubeTemplate(0.15, this.categoriasLista);
  }
};


class Caixa {
  constructor(cliente, clubeLista, fundos) {
      this.cliente = ((info) => {
                if (info instanceof Cliente)
                        return info;
                return undefined;
        })(cliente);
      this.clubeLista = ((info) => {
                if (info instanceof ClubeLista)
                        return info;
                return 'nenhum';
        })(clubeLista);
      this.fundos = fundos;
      this.subtotal = 0;
      this.total = 0;
      this.complemento = 0;
  };
  
  insereCesta(produto = {}) {
     if( this.produtoIncluiBeneficio(produto) )
            this.complemento += produto.valor * this.clubeLista[cliente.clube].descontoClube;
     this.subtotal += produto.valor;
     cliente.cesta.push(produto);
  };

  /* checa se produto escolhido faz parte do beneficio do clube do cliente
     retorna true ou false */
  produtoIncluiBeneficio(produto) {
     if ( produto instanceof Produto ){
          let categoriasDoClube = this.clubeLista[cliente.clube].categoriasClube;
          return categoriasDoClube.includes(produto.categoria); 
     }
     return false;
  };

  finalizaCompra() {
      switch (this.cliente.clube) {
              case 'filantropo':
                      this.total = this.subtotal + this.complemento;
                      this.fundos.add(this.complemento);
                      break;
              case 'jovem':
                      this.cliente.cesta.forEach( (elemento, indice) => {
                            if ( elemento.categoria === 'alcool' ){
                                    this.subtotal -= elemento.valor;
                                    this.cliente.cesta.splice(indice,1);
                            }
                      });
              default:
                      this.total = this.subtotal - this.complemento;
      }
  };

  outputInfo() {
      console.log("ITENS:");
      console.log(this.cliente.cesta);
      console.log (
        "\nCLUBE: " + this.cliente.clube +
        "\nTOTAL ARRECADADO: " + toBRLCurrency(this.fundos.value()) +
        "\nSUBTOTAL: " + toBRLCurrency(this.subtotal) +
        "\nCOMPLEMENTO: " + toBRLCurrency(this.complemento) +
        "\nTOTAL: " + toBRLCurrency(this.total) +
        "\n\nObrigado pela escolha " + this.cliente.nome +
        "\nVolte sempre!"
      );
  };  
};


class Cliente {
  constructor(nome,saldo,clube) {
      this.nome = nome;
      this.saldo = saldo;
      // função q executa e atribui valor imediatamente
      this.clube = ( (info) => {
          if ( info in new ClubeLista )
                return info;
          return 'nenhum';
        })(clube);
      this.cesta = [];
  }
};


class Produto {
  constructor(nome,valor,categoria) {
      this.nome = nome;
      this.valor = valor;
      this.categoria = ( (info) => {
         if ( (new ClubeLista).categoriasLista.includes(info) )
                return info;
         return null;
      })(categoria);
  }
};


const fundos = (() => {
      let totalFundos = 0;
      function addAmount(val) {
              totalFundos += val;
      }
      return {
              add: (val) => {
                      addAmount(val);
              },
              value: () => {
                      return totalFundos;
              }
      }
})();


function toBRLCurrency(n) {
    return "R$ " + Number(n.toFixed(2)).toLocaleString("pt-br");
}


/* TESTING AREA */

const produto0 = new Produto('Maça',4.50,'fruta');
const produto1 = new Produto('Detergente',7.25,'limpeza');
const produto2 = new Produto('Fralda',12.30,'geriatrico');
const produto3 = new Produto('Vinho',17.50,'alcool');
const produto4 = new Produto('Cerveja',7.50,'alcool');
const produto5 = new Produto('Rum',37.50,'alcool');
const produto6 = new Produto('Cachaça',102.50,'alcool');
const produto7 = new Produto('Toddynho',2.50,'alcool');

let cliente = new Cliente('Lucas Muller',200,'jovem');
let caixa = new Caixa(cliente, new ClubeLista, fundos); 
caixa.insereCesta(produto0);
caixa.insereCesta(produto1);
caixa.insereCesta(produto2);
caixa.insereCesta(produto3);
caixa.finalizaCompra();
caixa.outputInfo();

console.log('---------------------------------------------');

cliente = new Cliente('Guilherme Silva Gomes',500,'filantropo');
caixa = new Caixa(cliente, new ClubeLista, fundos); 
caixa.insereCesta(produto4);
caixa.insereCesta(produto5);
caixa.insereCesta(produto6);
caixa.insereCesta(produto7);
caixa.finalizaCompra();
caixa.outputInfo();
