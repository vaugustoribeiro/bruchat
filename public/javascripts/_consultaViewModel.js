function entrarSalaViewModel() {
    var self = this;    
    
    self.app = new appViewModel();
    
    self.primeiroPasso = ko.observable(true);
    self.segundoPasso = ko.observable(false);
    
    self.nome = ko.observable();
    self.parceiroId = ko.observable();
    self.nomeParceiro = ko.observable();
        
    self.habilitarBotaoIniciar = ko.computed(function() {
        return self.nome() ? true : false;
    });
    
    self.iniciarConsultaEspiritual = function () {
        
        socket.on('fs-nome-parceiro', function(nomeParceiro) {
            self.nomeParceiro(nomeParceiro);
            self.primeiroPasso(false);
            self.segundoPasso(true);
        }, self);
        
        socket.emit('fc-iniciar-consulta', { parceiroNome: self.nome(), parceiroId: self.parceiroId() });
        
        socket.on('fs-encerrar-sessao', function() {
            self.mensagemAviso(self.nomeParceiro() + " encerrou a conexão.");
            self.sessaoEncerrada(true);
            $('.conexaoEncerrada').modal('show');
        });
        
        socket.on('fs-sessao-inexistente', function() {
            self.mensagemAviso("A sessão que se está tentando conectar, não existe mais.");
            $('.conexaoEncerrada').modal('show');
        });
    };
    
    self.sessaoEncerrada = ko.observable(false);
    
    setInterval(function(){
        self.parceiroId($("#parceiroId").val());
    }, 1000);
};
