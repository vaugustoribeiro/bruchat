module.exports = function Usuario() {
    var self = this;
    self.login = '';
    self.senha = '';
    
    self.realizarLogin = function() {
        if(self.login === 'vinicius' && self.senha === '123')
        {
            return 'usuário autenticado';
        }
        else
        {
            return 'erro'
        }
    }
    
    return self;
}