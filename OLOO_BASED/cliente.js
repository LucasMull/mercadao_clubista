const Clube = require("./clube.js");

const Cliente = {
        nome: "",
        cesta: [],
        clube: ""
};
Object.defineProperty(Cliente, "init", {
        writable: false,
        enumerable: false,
        value: function (nome, clube) {
            this.nome = nome;
            this.clube = ( (info) => {
                if (info in Clube.lista){
                        return info;
                } return 'nenhum';
            })(clube);
        }
});

exports.id = Cliente;
