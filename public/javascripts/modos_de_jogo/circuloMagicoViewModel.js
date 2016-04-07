function circuloMagicoViewModel() {
    var self = this;
    self.css = 'circuloMagico';
    
    self.cartas = ko.observableArray();

    for (var i = 1; i <= 6; i++) {
        var carta = new cartaLenormand();
        carta.layout('carta-' + i);
        self.cartas.push(carta);
    }

    self.definirCarta = function() {
        var cartaLenormand = _.find(baralhoLenormand.cartas, function(e) {
            return e.numero.toString() === self.numeroCarta();
        });
        if (cartaLenormand) {
            var proximaCarta = _.find(self.cartas(), function(e) {
                return e.pendente();
            });
            if (proximaCarta) {
                proximaCarta.numero(cartaLenormand.numero);
                proximaCarta.css(cartaLenormand.css);
                proximaCarta.pendente(false);
            }
        }
        self.numeroCarta('');
        self.numeroCartaFoco(true);
    };

    self.definirCartaEnter = function(d, e) {
        e.keyCode === 13 && self.definirCarta();
        return true;
    };

    self.numeroCarta = ko.observable();
    self.numeroCartaFoco = ko.observable(true);

    self.alturaLargura = ko.observable(calcularDimensao());

    $(window).resize(function() {
        self.alturaLargura(calcularDimensao());
    });
    
    function calcularDimensao() {
        return ($('#circuloMagico').parent().width() > $(window).height() ? $(window).height() : $('#circuloMagico').parent().width());
    }
};

ko.applyBindings(new circuloMagicoViewModel(), $('#circuloMagico')[0]);