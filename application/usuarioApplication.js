var domain = require('../domain/entities/usuario.js');

module.exports.usuarioApplication = function() {
    var self = this;
    self.realizarLogin = function(login, senha) {
        try {
            var usuario = new domain.usuario(login, senha);
            usuario.realizarLogin();
        } catch(erro) {
            throw erro;
        }
    }
}