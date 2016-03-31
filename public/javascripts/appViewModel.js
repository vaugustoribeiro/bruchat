function appViewModel() {
    var self = this;
    
    self.nome = ko.observable();
    self.socketId = ko.observable();
    self.parceiroId = ko.observable();
    
    // módulos 
    self.modal = ko.observable(new modalViewModel());
    self.head = ko.observable(new headViewModel());
    self.appChat = ko.observable(chatViewModel);
    self.appTable = ko.observable(new tableViewModel());
    self.loader = ko.observable(new loaderViewModel());
    
    self.online = ko.observable();
        
    socket.on('fs-encerrar-sessao', function() {
        self.modal.exibirmensagem("Conexão encerrada.");
        self.online(false);
    });
    
    self.etapas = ko.observableArray();
    
    self.primeiroPasso = ko.observable();
    self.segundoPasso = ko.observable();
    self.terceiroPasso = ko.observable();
};

function etapa() {
    var self = this;
    self.titulo = ko.observable();
    self.campo = ko.observable();
    self.valorCampo = ko.observable();
    self.placeHolder = ko.observable();
    
    self.visivel = ko.observable(true);
    self.etapaCorrente = ko.observable(true);
    
    self.acaoBloqueada = ko.computed(function() {
        return self.valorCampo();
    }, self);
    
    self.acaoCallback = function(callback) {
        self.acao = callback;
    };
    self.acao;
}

vm = new appViewModel();

ko.applyBindings(vm);