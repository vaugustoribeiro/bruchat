function chatViewModel() {
    var self = this;
    self.focoMensagem = ko.observable(false);
    self.mensagens = ko.observableArray();
    self.mensagem = ko.observable();
    self.bloquerEnvioMensagem = ko.observable(false);
    
    // "scrollar" para a ultima mensagem enviada
    self.scrollTopMensagens = function() {
        $("#mensagens")[0].scrollTop = $("#mensagens")[0].scrollHeight;
    };
    
    // enviar mensagem pela tecla 'enter'
    self.enviarMensagemEnter = function(d, e) {
        e.keyCode === 13 && self.enviarMensagem();
        return true;
    };
    
    // enviar mensagem pelo socket
    self.enviarMensagem = function() {
        if(self.mensagem().toString().trim() !== '') {
            self.mensagens.push({ mensagem: self.mensagem(), server: false });
            socket.emit('fc-enviar-mensagem', self.mensagem());
            self.mensagem('');
            self.focoMensagem(true);
            self.scrollTopMensagens();            
        }
    };
};

socket.on('fs-enviar-mensagem', function(mensagem) {
    self.mensagens.push({ mensagem: mensagem, server: true }); 
    self.scrollTopMensagens();               
});