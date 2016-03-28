function criarSalaViewModel() {
    var self = this;    
    
    self.identificador = ko.observable('Carregando identificador...');
    
    self.nome = ko.observable();
    
    self.titulo = ko.computed(function() {
        return self.nome() ? self.nome() : "Identifique-se..."
    }, self);
    
    self.criarASala = function() {
        socket.nome = self.nome();
        
        $('#frm').submit();
    };
    
    // workaround
    setInterval(function() {
        self.identificador(socket.id);
    }, 1000);
    
};

vm = new criarSalaViewModel();

ko.applyBindings(vm);