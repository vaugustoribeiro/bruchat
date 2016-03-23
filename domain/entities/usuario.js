module.exports.usuario = function(login, senha) {
    
    var self = this;
    
    if(!login || !senha) {
        throw new Error('O login ou a senha estão incorretos!');
    }
        
    self.login = login;
    self.senha = senha;
    self.realizarLogin = function() {
        if(self.login.toLowerCase() !== 'vinicius' || self.senha !== '123')
        {
            throw new Error('O login ou a senha estão incorretos!');
        }
    }
}