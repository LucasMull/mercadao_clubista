"use strict"

const produto = require("./produto.js");

const ClubeTemplate = {
    init() { 
     this.descontoClube = desconto;
     this.categoriasClube = categorias;
    }
};

function OD(prot,obj){
    return Object.assign(Object.create(prot), obj);
}

const ListaClube = Object.create(Object.prototype, {
    criar: {
        enumerable: false,
        value: function(clube, x, y) {
            this[clube] = OD(ClubeTemplate, {desconto: x, categorias: y}) 
        }
    }
});

ListaClube.criar('churrasco', 0.5, ['carne']);
ListaClube.criar('verde', 0.03, ['fruta', 'verdura']);
ListaClube.criar('limpeza', 0.07, ['limpeza']);
ListaClube.criar('idade', 0.1, ['geriatrico']);
ListaClube.criar('jovem', 0.25, ['doce']);
ListaClube.criar('nenhum', 0, ['peixe','higiene','alcool']);
ListaClube.criar('filantropo', 0.15, produto.categorias);

exports.lista = ListaClube;
