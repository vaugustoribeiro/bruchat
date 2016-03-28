function entrarSalaViewModel() {
    var self = this;    
    
    self.nome = ko.observable();
    
    self.titulo = ko.computed(function() {
        return self.nome() ? self.nome() : "Identifique-se..."
    }, self);
    
    self.sala = ko.observable();
    
    self.entrarNaSala = function () {
        socket.nome = self.nome();
        socket.emit('fc-entrar-na-sala', self.sala());
        // redirecionar para o chat
    };
};

vm = new entrarSalaViewModel();

ko.applyBindings(vm);