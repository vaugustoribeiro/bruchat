function appViewModel() {
    var self = this;
    
    self.nome = ko.observable();
    self.socketId = ko.observable();
    
    self.parceiroNome = ko.observable();
    self.parceiroId = ko.observable();
    
    self.adm = ko.observable();
    
    self.modal = ko.observable(new modalViewModel());
    self.head = ko.observable(new headViewModel());
    self.chat = ko.observable(new chatViewModel());
    self.mesa = ko.observable(new mesaViewModel());
    self.loader = ko.observable(new loaderViewModel());
    self.paginaGenerica = ko.observable(new paginaGenericaViewModel());
    
    self.online = ko.observable();
    
    self.online.subscribe(function(valor) { 
        self.chat().online(valor);
    }, self);
    
    self.desconectar = function() {
        location.reload(); // melhorar isso aqui véi
    }
    
    socket.on('fs-encerrar-sessao', function() {
        self.modal().exibirMensagem(self.parceiroNome() + " encerrou a conexão.");
        self.head().titulo('Desconectado de ' + self.parceiroNome());
    });

    self.urlAcessoParceiro = ko.computed(function() {
       return "http://" + window.location.host + "/consulta?id=" + self.socketId() ;
    });
    
    setInterval(function() {
        self.socketId(socket.id);
    }, 1000);
    
    setInterval(function(){
        self.parceiroId($("#parceiroId").val());
    }, 1000);    
};

vm = new appViewModel();

ko.applyBindings(vm);