function appViewModel() {
    var self = this;
    
    self.nome = ko.observable();
    self.socketId = ko.observable();
    
    self.parceiroNome = ko.observable();
    self.parceiroId = $("#parceiroId").val();
    self.parceiroDesconectado = ko.observable(false);
    
    self.modal = ko.observable(new modalViewModel());
    self.head = ko.observable(new headViewModel());
    self.chat = ko.observable(new chatViewModel());
    self.mesa = ko.observable(new mesaViewModel());
    self.loader = ko.observable(new loaderViewModel());
    self.paginaGenerica = ko.observable(new paginaGenericaViewModel());
    
    self.conectado = ko.observable(false);
    
    self.online = ko.observable();
    
    self.online.subscribe(function(valor) {
        self.conectado(true); 
        self.chat().online(valor);
        self.mesa().online(valor);
        self.head().online(valor);
    }, self);
    
    self.desconectar = function() {
        self.online(false);
        socket.io.disconnect();
    }
    
    self.sair = function() {
        location.href = '/';
    }
    
    self.urlAcessoParceiro = function() {
       return "http://" + window.location.host + "/consulta?id=" + socket.id;
    };
    
    // client socket events
    socket.on('fs-encerrar-sessao', function() {
        self.modal().exibirMensagem(self.parceiroNome() + " encerrou a conexão.");
        self.head().titulo('Desconectado de ' + self.parceiroNome());
        self.parceiroDesconectado(true);
        self.online(false);
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
        self.modal().exibirMensagem("A sessão que se está tentando conectar, não existe.");
    }); 
    
    // manager events
    socket.io.on('connect', function() {
        console.log('io connect');
    });
    socket.io.on('connect_error', function(object) {
        console.log('io connect_error');
    });
    socket.io.on('connect_timeout', function() {
        console.log('io connect_timeout');
    });
    socket.io.on('reconnect', function(number) {
        console.log('io reconnect');
    });
    socket.io.on('reconnect_attempt', function() {
        console.log('io reconnect_attempt');
    });
    socket.io.on('reconnecting', function(number) {
        console.log('io reconnecting');
    });
    socket.io.on('reconnect_error', function(object) {
        console.log('io reconnect_error');
    });
    socket.io.on('reconnect_failed', function() {
        console.log('io reconnect_failed');
    });
    
    // socket events
    socket.on('connect', function() {
        console.log('io connect');        
    });
    socket.on('error', function(object) {
        console.log('io error');        
    });
    socket.on('disconnect', function() {
        console.log('io disconnect');        
    });
    socket.on('reconnect', function(number) {
        console.log('io reconnect');        
    });
    socket.on('reconnect_attempt', function() {
        console.log('io reconnect_attempt');        
    });
    socket.on('reconnecting', function(number) {
        console.log('io reconnecting');        
    });
    socket.on('reconnect_error', function(object) {
        console.log('io reconnect_error');        
    });
    socket.on('reconnect_failed', function() {
        console.log('io reconnect_failed');        
    });
};

vm = new appViewModel();

ko.applyBindings(vm);