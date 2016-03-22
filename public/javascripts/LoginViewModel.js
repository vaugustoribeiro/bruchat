function LoginViewModel() {
    var self = this;
    self.login = ko.observable();
    self.senha = ko.observable();
}

ko.applyBindings(new LoginViewModel());