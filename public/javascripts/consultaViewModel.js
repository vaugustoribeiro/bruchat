function entrarSalaViewModel() {
    var self = this;    
    
    self.primeiroPasso = ko.observable(true);
    self.segundoPasso = ko.observable(false);
    
    self.nome = ko.observable();
    
    self.titulo = ko.computed(function() {
        return self.nome() ? self.nome() : "Identifique-se..."
    }, self);
    
    self.sala = ko.observable();
    
    self.nomeBruxo = ko.observable();
    
    self.entrarNaSala = function () {
        
        socket.on('fs-nome-bruxo', function(nomeBruxo) {
            self.nomeBruxo(nomeBruxo);
            self.primeiroPasso(false);
            self.segundoPasso(true);
        }, self);
        
        socket.emit('fc-iniciar-consulta', {paciente: self.nome(), sala: self.sala() });
        
    };
};

vm = new entrarSalaViewModel();

ko.applyBindings(vm);