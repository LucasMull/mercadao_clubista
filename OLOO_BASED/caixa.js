"use strict"

const Cliente = require('./cliente.js');
const Produto = require('./produto.js');
const Clube = require('./clube.js');

const Saldo = {
        subtotal: 0,
        total: 0,
        complemento: 0
};

Object.defineProperty(Saldo, "fundos", {
    enumerable: false,
    writable: false,
    configurable: false,
    value: (() => {
        let arrecadado = 0;
        function addAmount(val) {
            arrecadado += val;
        }
        return {
            soma: (val) => {
                addAmount(val);
            },
            valor: () => {
                return arrecadado;
            }
        }
    })()
});

function insereCesta(produto, cliente) {
    if ( Object.getPrototypeOf(produto) === Produto.id ){
        if ( Clube.lista[cliente.clube].categorias.includes(produto.categoria) ){
            Saldo.complemento += produto.preco * Clube.lista[cliente.clube].desconto;
        }
        Saldo.subtotal += produto.preco;
        cliente.cesta.push(produto);
    }
}

function finalizarCompra(cliente) {
    switch(cliente.clube) {
        case 'filantropo':
            Saldo.total = Saldo.subtotal + Saldo.complemento;
            Saldo.fundos.soma(Saldo.complemento);
            break;
        case 'jovem':
            cliente.cesta.forEach( (produto, i) => {
                    if (produto.categoria === 'alcool' ){
                            Saldo.subtotal -= produto.preco;
                            cliente.cesta.splice(i,1);
                    }

            });
        default:
            Saldo.total = Saldo.subtotal - Saldo.complemento;
            break;
    }
}

exports.saldo = Saldo;
exports.insere = insereCesta;
exports.finalizar = finalizarCompra;
