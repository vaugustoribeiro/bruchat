function entrarSalaViewModel() {
    var self = this;    
    
    self.primeiroPasso = ko.observable(true);
    self.segundoPasso = ko.observable(false);
    
    self.nome = ko.observable();
    
    self.titulo = ko.computed(function() {
        return self.nome() ? "Olá " + self.nome() : "Identifique-se..."
    }, self);
    
    self.idBruxo = ko.observable();
    
    self.quantidadeDeCartasSelecionada = ko.observable();
    
    self.quantidadesDeCartas = [3,7];
    
    self.cartasSelecionadas = ko.observableArray();
    
    self.quantidadeDeCartasRestantes = ko.computed(function(){
        return self.quantidadeDeCartasSelecionada() - self.cartasSelecionadas().length; 
    }, self);
    
    self.observacaoFinal = ko.observable();
    self.nomeBruxo = ko.observable();
    self.mensagemAviso = ko.observable();
    
    self.habilitarBotaoIniciar = ko.computed(function() {
        return self.nome() && self.quantidadeDeCartasSelecionada() ? true : false;
    });
    
    self.iniciarConsultaEspiritual = function () {
        
        socket.on('fs-nome-bruxo', function(nomeBruxo) {
            self.nomeBruxo(nomeBruxo);
            self.primeiroPasso(false);
            self.segundoPasso(true);
        }, self);
        
        socket.emit('fc-iniciar-consulta', { paciente: self.nome(), idBruxo: self.idBruxo(), quantidadeDeCartasSelecionada: self.quantidadeDeCartasSelecionada() });
        
        socket.on('fs-exibir-carta', function(cartaSelecionada) {
            self.cartasSelecionadas.push(cartaSelecionada);
        });
        
        socket.on('fs-atualizar-observacao-final', function(novoValor) {
           self.observacaoFinal(novoValor); 
        });
        
        socket.on('fs-remover-carta', function(cartaSelecionada) {
            var x = _.find(self.cartasSelecionadas(), function(carta) {
                return carta.numero === cartaSelecionada.numero; 
            });
            self.cartasSelecionadas.splice(self.cartasSelecionadas.indexOf(x), 1);
        });
        
        socket.on('fs-enviar-mensagem', function(mensagem) {
           self.mensagens.push({ mensagem: mensagem, server: true }); 
           self.scrollTopMensagens();               
        });
        
        socket.on('fs-encerrar-sessao', function() {
            self.mensagemAviso(self.nomeBruxo() + " encerrou a conexão.");
            self.sessaoEncerrada(true);
            $('.conexaoEncerrada').modal('show');
        });
        
        socket.on('fs-sessao-inexistente', function() {
            self.mensagemAviso("A sessão que se está tentando conectar, não existe mais.");
            $('.conexaoEncerrada').modal('show');
        });
    };
    
    self.sessaoEncerrada = ko.observable(false);
    
    self.enviarMensagemEnter = function(d, e) {
        e.keyCode === 13 && self.enviarMensagem();
        return true;
    }
    
    self.mensagens = ko.observableArray();
    
    self.enviarMensagem = function() {
        if(self.mensagem().toString().trim() !== '') {
            self.mensagens.push({ mensagem: self.mensagem(), server: false });
            socket.emit('fc-enviar-mensagem', self.mensagem());
            self.mensagem('');
            self.focoMensagem(true);
            self.scrollTopMensagens();    
        }
    };
    
    self.scrollTopMensagens = function() {
        $("#mensagens")[0].scrollTop = $("#mensagens")[0].scrollHeight;
    }
    
    self.focoMensagem = ko.observable(false);
    
    self.mensagem = ko.observable();
    
    //setTimeout(function(){
        self.idBruxo($("#idBruxo").val());
    //}, 1000);
};

vm = new entrarSalaViewModel();

ko.applyBindings(vm);