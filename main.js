"use strict";

class Clube {
  //pctg de desconto oferecido por grupo para produtos inclusos no beneficio
  constructor() {
      this.churrasco = 0.05;
      this.verde = 0.03;
      this.limpeza = 0.07;
      this.idade = 0.1;
      this.jovem = 0.25;
      this.filantropo = 0.15; 
  }
  
  //verifica categorias por clube 
  static categorias(info) {
      this.clubes = null;

      switch (info) {
        case 'carne' :
                this.clubes = ['churrasco'];
                break;
        case 'fruta' :
        case 'verdura' :
                this.clubes = ['verde'];
                break;
        case 'limpeza' :
                this.clubes = ['limpeza'];
                break;
        case 'doce' :
                this.clubes = ['jovem'];
                break;
        case 'geriatrico' :
                this.clubes = ['idade'];
                break;
        case 'peixe' :
        case 'higiene' :
        case 'alcool' :
        default :
                break;
      }
      return this.clubes;
  }
}

class Cliente {
  constructor(nome,clube) {
      this.nome = nome;
      // função q executa e atribui valor imediatamente
      this.clube = ( (info) => {
          if ( info in new Clube )
                return info;
          return null;
        })(clube);
      this.saldo = 0;
      this.desconto = 0;
      this.cesta = [];
      this.insereCesta = (produto = {}) => {
          if ( produto instanceof Produto ) { //try catch aqui
                if( Clube.categorias(produto.categoria).includes(this.clube) )
                        this.desconto += produto.valor * (new Clube)[this.clube];
                this.saldo += produto.valor;
                this.cesta.push(produto);
          }
      }
  }
};

class Produto {
  constructor(nome,valor,categoria) {
      this.nome = nome;
      this.valor = valor;
      this.categoria = ( (info) => {
         if ( Clube.categorias(info) )
                return info;
         return null;
      })(categoria);
  }
};


let cliente = new Cliente('Lucas Muller', 'idade');
const produto = new Produto('Maça',4.50,'fruta');
const produto1 = new Produto('Detergente',7.25,'limpeza');
const produto2 = new Produto('Fralda',12.30,'geriatrico');

cliente.insereCesta(produto);
cliente.insereCesta(produto1);
cliente.insereCesta(produto2);
console.log(cliente);
/*
Mercadão Clubista: Implemente um sistema usando orientação a objetos para o caixa do Mercadão Clubista. Nesse mercado são vendidos carnes, peixes, frutas, verduras, produtos de limpeza, produtos de higiene, doces, bebidas alcoólicas e produtos geriátricos. Cada produto tem um nome, preço e sua categoria. Considere um estoque infinito de produtos, então cada cliente pode comprar quantos produtos quiser, desde que tenham dinheiro o suficiente para pagar.

O mercado conta com um sistema de clube, no qual os clientes podem optar por fazer parte de um único clube que lhe oferece vantagens, temos os seguintes clubes:

Clube do churrasco: Os clientes recebem um desconto nas carnes;
Clube verde: Os clientes recebem um descontos nas frutas e vegetais;
Clube da limpeza: Os clientes recebem um desconto nos produtos de limpeza;
Clube da melhor idade: Os clientes recebem um desconto nos produtos geriátricos;
Clube jovem: Os clientes recebem um desconto nos doces, mas são proibidos de comprar bebidas alcoólicas;
Clube filantropo: Os clientes pagam a mais do valor original, a diferença paga será doada para o programa Ciência para Todos;

Os descontos e acréscimos de cada categoria serão definidos por você.

O caixa deverá exibir o nome do cliente, a categoria dele (nome do clube que participa, ou regular caso não participe de nenhum), para cada item deverá ser exibido o nome, categoria, preço, as unidades, o subtotal antes do desconto/acréscimo, o valor final, e a diferença. No final exibir o total a ser pago pelo cliente, e se ele consegue ou não pagar. Caso o cliente seja do clube filantropo exiba o valor da sua contribuição e o total de fundos arrecadados até o momento.

Não é necessário nenhuma interface elaborada, os clientes, produtos e compras deverão ser inseridos hard coded, sendo necessário apenas exibir o output do caixa. É determinantemente proibido uso de banco de dados, apenas leitura de arquivos serão aceitas.
*/
