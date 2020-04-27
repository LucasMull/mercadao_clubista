"use strict";

class Clubes {
  constructor() {
      //possíveis categorias para produtos
      this.categorias = [
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
      this.churrasco = [0.05, ['carne']];
      this.verde = [0.03, ['fruta','verdura']];
      this.limpeza = [0.07, ['limpeza']];
      this.idade = [0.1, ['geriatrico']];
      this.jovem = [0.25, ['doce']];
      this.nenhum = [0, ['peixe','higiene','alcool']];
      this.filantropo = [0.15, this.categorias]; 
  }
};

class Caixa extends Clubes {
  constructor(cliente) {
      super();
      this.cliente = ( (info) => {
                if (cliente instanceof Cliente)
                        return cliente;
                return undefined;
        })(cliente);
      this.subtotal = 0;
      this.complemento = 0;

      this.insereCesta = (produto = {}) => {
          if ( produto instanceof Produto ) {
                if( this[cliente.clube][1].includes(produto.categoria) )
                        this.complemento += produto.valor * this[cliente.clube][0];
                this.subtotal += produto.valor;
                cliente.cesta.push(produto);
          }
      }
      this.finalizaCompra = () => {
          switch (this.cliente.clube) {
                  case 'filantropo':
                          console.log("Total a ser pago: " + (this.subtotal+this.complemento));
                          break;
                  case 'jovem':
                          this.cliente.cesta.forEach( (elemento, indice) => {
                                if ( elemento.categoria === 'alcool' ){
                                        this.subtotal -= elemento.valor;
                                        this.cliente.cesta.splice(indice,1);
                                }
                          });
                  default:
                          console.log("Total a ser pago: " + (this.subtotal-this.complemento));
          }
      };
  }
};

class Cliente {
  constructor(nome,saldo,clube) {
      this.nome = nome;
      this.saldo = saldo;
      // função q executa e atribui valor imediatamente
      this.clube = ( (info) => {
          if ( info in new Clubes )
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
         if ( (new Clubes).categorias.includes(info) )
                return info;
         return null;
      })(categoria);
  }
};


const cliente = new Cliente('Lucas Muller',200,'jovem');
const caixa = new Caixa(cliente); 
const produto = new Produto('Maça',4.50,'fruta');
const produto1 = new Produto('Detergente',7.25,'limpeza');
const produto2 = new Produto('Fralda',12.30,'geriatrico');
const produto3 = new Produto('Vinho',17.50,'alcool');

caixa.insereCesta(produto);
caixa.insereCesta(produto1);
caixa.insereCesta(produto2);
caixa.insereCesta(produto3);
caixa.finalizaCompra();

//console.log(caixa);
//console.log(cliente);
