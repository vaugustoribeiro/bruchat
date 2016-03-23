function loginViewModel() {
    var self = this;
    self.login = ko.observable();
    self.senha = ko.observable();
    
    self.titulo = ko.computed(function(){
        return self.login() ? self.login() : "Bruxo";
    }, self);
}

ko.applyBindings(new loginViewModel());