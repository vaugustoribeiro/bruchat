function chatViewModel() {
    var self = this;
    self.focoMensagem = ko.observable(false);
    self.mensagens = ko.observableArray([]);
    self.mensagem = ko.observable('');
    self.parceiroEscrevendo = ko.observable(false);
    
    var emitEscrevendo = true;    
    self.mensagem.subscribe(function(msg) {
        
        if(emitEscrevendo) {
           if(self.mensagem().trim() !== '') {
               socket.emit('fc-escrevendo', emitEscrevendo);
               emitEscrevendo = false;               
           }
        } 
        else {
            if(self.mensagem().trim() === '') {
                socket.emit('fc-escrevendo', emitEscrevendo);
                emitEscrevendo = true;                
            }
        }
        
    });
    
    self.focoMensagem.subscribe(function(valor) {
        emitEscrevendo = self.mensagem().trim() !== '';
        socket.emit('fc-escrevendo', emitEscrevendo);
        
        if(!emitEscrevendo) {
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
        if(e.keyCode === 13) {
           if(e.shiftKey) {
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
        if(self.mensagem().toString().trim() !== '') {
            var data = new Date();
            self.mensagens.push({ mensagem: self.mensagem(), server: false, dataHora: data.getHours() + ':' + data.getMinutes() });
            socket.emit('fc-enviar-mensagem', self.mensagem());
            self.mensagem('');
            self.focoMensagem(true);
            self.scrollTopMensagens();            
        }
    };
    
    socket.on('fs-enviar-mensagem', function(mensagem) {
        var data = new Date();
        self.mensagens.push({ mensagem: mensagem, server: true, dataHora: data.getHours() + ':' + data.getMinutes() }); 
        self.scrollTopMensagens();
    });
    
    socket.on('fs-escrevendo', function(escrevendo) {
        self.parceiroEscrevendo(escrevendo);
    });
};