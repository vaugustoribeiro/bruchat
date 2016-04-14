function chatViewModel() {
    var self = this;
    self.focoMensagem = ko.observable(false);
    self.mensagens = ko.observableArray([]);
    self.mensagem = ko.observable('');
    self.parceiroEscrevendo = ko.observable(false);

    var emitEscrevendo = true;
    self.mensagem.subscribe(function(msg) {

        if (emitEscrevendo) {
            if (self.mensagem().trim() !== '') {
                socket.emit('fc-escrevendo', emitEscrevendo);
                emitEscrevendo = false;
            }
        }
        else {
            if (self.mensagem().trim() === '') {
                socket.emit('fc-escrevendo', emitEscrevendo);
                emitEscrevendo = true;
            }
        }

    });

    self.focoMensagem.subscribe(function(valor) {
        emitEscrevendo = self.mensagem().trim() !== '';
        socket.emit('fc-escrevendo', emitEscrevendo);

        if (!emitEscrevendo) {
            emitEscrevendo = true;
        }
    });

    self.online = ko.observable();

    // "scrollar" para a ultima mensagem enviada
    self.scrollTopMensagens = function() {
        $("#mensagens")[0].scrollTop = $("#mensagens")[0].scrollHeight;
    };

    // enviar mensagem pela tecla 'enter'
    self.enviarMensagemEnter = function(d, e) {
        var handled = true;
        if (e.keyCode === 13) {
            if (e.shiftKey) {
                handled = true;
            }
            else {
                self.enviarMensagem();
                handled = false;
            }
        }
        return handled;
    };

    // enviar mensagem pelo socket
    self.enviarMensagem = function() {
        if (self.mensagem().toString().trim() !== '') {
            var data = new Date();

            var msg = new Mensagem();
            msg.remetente = vm.nome();
            msg.mensagem = self.mensagem();
            msg.hora = obterHoraFormatada();

            self.mensagens.push(msg);
            socket.emit('fc-enviar-mensagem', msg);
            self.mensagem('');
            self.focoMensagem(true);
            self.scrollTopMensagens();
        }
    };

    socket.on('fs-enviar-mensagem', function(mensagem) {
        var data = new Date();
        mensagem.server = true;
        self.mensagens.push(mensagem);
        self.scrollTopMensagens();
    });

    socket.on('fs-escrevendo', function(escrevendo) {
        self.parceiroEscrevendo(escrevendo);
    });
    
    function obterHoraFormatada() {
        var data = new Date();
        var horas = data.getHours();
        var minutes = data.getMinutes();
        return (horas < 10 ? '0' + horas : horas) + ':' + (minutes < 10 ? '0' + minutes : minutes);
    };
};

var Mensagem = function() {
    var self = this;
    self.remetente = '';
    self.mensagem = '';
    self.hora = '';
    self.server = false;
};