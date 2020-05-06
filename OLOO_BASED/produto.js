"use strict"

const CategoriaProduto = [
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

const Produto = {
        nome: "",
        categoria: "",
        preco: 0
};

Object.defineProperty(Produto, "init", {
        writable:false,
        enumerable: false,
        value: function(nome, categoria, preco) {
            this.nome = nome;
            this.categoria = ((info) => {
               if ( CategoriaProduto.includes(info) )
                      return info;
               return null;
            })(categoria),
            this.preco = ((info) => {
                try {
                    if ( typeof info != "number" ){
                            throw new Error('Preço inválido: ' + this.nome); 
                    }
                } catch (e) {
                    console.log(e.message);
                    process.exit(1);
                } finally {
                    return info;
                }
            })(preco)
        }
});

exports.categorias = CategoriaProduto;
exports.id = Produto;
