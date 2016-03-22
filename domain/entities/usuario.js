module.exports = {
    
    Usuario: function() {
        var self = this;
        self.login = '';
        self.senha = '';
        self.realizarLogin = function() {
            if(self.login.toLowerCase() !== 'vinicius' && self.senha !== '123')
            {
                throw new Error('O login ou a senha estão incorretos!');
            }
        }
    }
}