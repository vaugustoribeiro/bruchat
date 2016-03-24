function indexViewModel() {
    var self = this;
    
    self.cartomantes = ko.observableArray();
    
    socket.emit('listar-cartomantes', function() {
        
    });
    
};

ko.applyBindings(new indexViewModel());