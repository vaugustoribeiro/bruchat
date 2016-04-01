function appViewModel() {
    var self = this;
    
    self.nome = ko.observable();
    self.socketId = ko.observable();
    
    self.parceiroNome = ko.observable();
    self.parceiroId = $("#parceiroId").val();
    self.parceiroDesconectado = ko.observable(false);
    
    self.adm = ko.observable(false);
    
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
    
    self.urlAcessoParceiro = function() {
       return "http://" + window.location.host + "/consulta?id=" + socket.id;
    };
    
    socket.on('fs-encerrar-sessao', function() {
        self.modal().exibirMensagem(self.parceiroNome() + " encerrou a conexão.");
        self.head().titulo('Desconectado de ' + self.parceiroNome());
        self.parceiroDesconectado(true);
        self.chat().online(false);
    });
    
    socket.on('fs-iniciar-consulta', function(parceiro) {
        self.loader().hide();
        self.parceiroNome(parceiro.parceiroNome);
        self.head().titulo("Conectado com " + parceiro.parceiroNome);
        self.online(true);
    });
    
    socket.on('fs-nome-parceiro', function(parceiroNome) {
        self.parceiroNome(parceiroNome);
        self.head().titulo("Conectado com " + parceiroNome);
        self.online(true);
    }, self);

    socket.on('fs-sessao-inexistente', function() {
        self.modal().exibirMensagem("A sessão que se está tentando conectar, não existe mais.");
        $('.conexaoEncerrada').modal('show');
    }); 
};

vm = new appViewModel();

ko.applyBindings(vm);