function criarSalaViewModel() {
    var self = this;    
    
    self.app = new appViewModel();
    
    // observables
    self.primeiroPasso = ko.observable(true);
    self.segundoPasso = ko.observable(false);
    self.terceiroPasso = ko.observable(false);
    
    
    self.nomeParceiro = ko.observable(); // nome do parceiro
    self.identificador = ko.observable(); // id do socket
    self.nome = ko.observable(); // nome do utilizador
    self.sessaoEncerrada = ko.observable(false);
        
    self.habilitarIdentificacao = ko.computed(function() {
        return self.nome() ? true : false;
    });
    
    self.urlAcessoParceiro = ko.computed(function() {
       return "http://" + window.location.host + "/consulta?id=" + self.identificador() ;
    });
    
    self.criarASala = function() {
        socket.emit('fc-criar-sessao-espiritual', self.nome());
        self.primeiroPasso(false);
        self.segundoPasso(true);
        socket.on('fs-iniciar-consulta', function(parceiro) {
            self.segundoPasso(false);
            $('.aguardandoParceiro').modal('hide');
            self.terceiroPasso(true);
            self.app.head.nomeParceiro(parceiro.parceiroNome);
        });
        socket.on('fs-enviar-mensagem', function(mensagem) {
           self.mensagens.push({ mensagem: mensagem, server: true }); 
           self.scrollTopMensagens();
        });
        socket.on('fs-encerrar-sessao', function() {
            self.mensagemAviso(self.nomeParceiro() + " encerrou a conexão.");
            self.sessaoEncerrada(true);
            $('.conexaoEncerrada').modal('show');
        });
    };
    
    // workarounds
    setInterval(function() {
        self.identificador(socket.id);
    }, 1000);
};
