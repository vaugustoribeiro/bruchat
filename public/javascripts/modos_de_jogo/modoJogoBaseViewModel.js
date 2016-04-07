function modoJogoBaseViewModel(titulo, quantidadeCartas, container, enabled) {
    var self = this;
    self.titulo = titulo;
    self.css = container;
    self.enabled = enabled;
    
    self.cartas = ko.observableArray();

    for (var i = 1; i <= quantidadeCartas; i++) {
        var carta = new cartaLenormand();
        carta.numero(i);
        carta.layout('carta-' + i);   
        self.cartas.push(carta);
    }
    
    socket.on('fs-exibir-carta', function(numeroCarta) {
        self.numeroCarta(numeroCarta);
        self.definirCarta(); 
    });
    
    socket.on('fs-remover-carta', function(numeroCarta) {
        var carta = _.find(self.cartas(), function(e) {
           return e.numero() === numeroCarta; 
        });
        if(carta) {
            carta.redefinir();
        }
    });
    
    self.redefinirCarta = function(carta) {
        socket.emit('fc-remover-carta', carta.numero());
        carta.redefinir();    
    }
    
    self.definirCarta = function() {
        
        var handled = false;
        
        // busca a primeira carta que possua o valor digitado no input
        var cartaLenormand = _.find(baralhoLenormand.cartas, function(e) {
            return e.numero.toString() === self.numeroCarta();
        });
        
        // caso a carta exista
        if (cartaLenormand) {
            
            // busca a primeira carta que ainda não foi escolhida
            var proximaCarta = _.find(self.cartas(), function(e) {
                return e.pendente();
            });
            
            // caso tenha carta a ser escolhida
            if (proximaCarta) {
                
                // associaremos a cartaLenormand a ela
                proximaCarta.numero(cartaLenormand.numero);
                proximaCarta.css(cartaLenormand.css);
                proximaCarta.pendente(false);
                handled = true;
            }
        }
        
        self.numeroCarta('');
        self.numeroCartaFoco(true);
        
        return handled;
    };

    self.definirCartaEnter = function(d, e) {
        var numeroCarta = self.numeroCarta();
        if(e.keyCode === 13 && self.definirCarta()) {
            socket.emit('fc-exibir-carta', numeroCarta);
        }
        return true;
    };

    self.numeroCarta = ko.observable();
    self.numeroCartaFoco = ko.observable(true);

    self.alturaLargura = ko.observable(calcularDimensao());

    $(window).resize(function() {
        self.alturaLargura(calcularDimensao());
    });
    
    function calcularDimensao() {
        return ($('#' + container).parent().width() > $(window).height() ? $(window).height() : $('#' + container).parent().width());
    }
};