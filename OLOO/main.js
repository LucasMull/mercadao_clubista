const Clube = require("./clube.js");
const Produto = require("./produto.js");
const Cliente = require("./cliente.js");
const Caixa = require("./caixa.js");

cliente1 = Object.create(Cliente.id);
cliente1.init("Sergio", "churrasco");

produto1 = Object.create(Produto.id);
produto1.init("Maçã", "fruta", 4.25);
produto2 = Object.create(Produto.id);
produto2.init("Carne", "carne", 5.25);

Caixa.insere(produto1, cliente1);
Caixa.insere(produto2, cliente1);
Caixa.finalizar(cliente1);
console.log(cliente1.cesta);
console.log(Caixa.saldo);
