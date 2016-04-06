function tresCartasViewModel() {
    var self = this;

    self.primeiraCarta = ko.observable();
    self.segundaCarta = ko.observable();
    self.terceiraCarta = ko.observable();
    
    self.redefinirCarta = function(numeroEtapa) {
        self.numeroCartaFoco(true);
        self.etapaAtual(self.etapas[numeroEtapa]);
    };

    self.definirCarta = function(carta, numeroCarta) {
        var cartaLenormand = _.find(baralhoLenormand.cartas, function(e) {
            return e.numero.toString() === numeroCarta;
        });

        if (cartaLenormand) {
            carta(cartaLenormand.css);
        }

        self.numeroCartaFoco(true);
    };

    self.etapas = [
        {
            etapa: 1,
            descricao: '1ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.primeiraCarta, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[1]);
            }
        },
        {
            etapa: 2,
            descricao: '2ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.segundaCarta, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[2]);
            }
        },
        {
            etapa: 3,
            descricao: '3ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.terceiraCarta, self.etapaAtual().numeroCarta());
            }
        }
    ];

    self.etapaAtual = ko.observable(self.etapas[0]);

    self.numeroCarta = ko.observable();
    self.numeroCartaFoco = ko.observable(false);

    self.definirCartaEnter = function(d, e) {
        e.keyCode === 13 && self.etapaAtual().definirCarta();
        return true;
    };

    self.alturaLargura = ko.observable(calcularDimensao());
    self.alturaLarguraCss = ko.computed(function() {
        
    }, self);
    
    $(window).resize(function() {
        self.alturaLargura(calcularDimensao());
    });
    
    function calcularDimensao() {
        return ($("#tresCartas").parent().width() > $(window).height() ? $(window).height() : $("#tresCartas").parent().width());
    }
};

ko.applyBindings(new tresCartasViewModel(), $('#tresCartas')[0]);