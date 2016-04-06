function vinteUmaCartasViewModel() {
    var self = this;

    self.primeiraCarta = ko.observable();
    self.segundaCarta = ko.observable();
    self.terceiraCarta = ko.observable();
    self.quartaCarta = ko.observable();
    self.quintaCarta = ko.observable();
    self.sextaCarta = ko.observable();
    self.setimaCarta = ko.observable();
    self.oitavaCarta = ko.observable();
    self.nonaCarta = ko.observable();
    self.decimaCarta = ko.observable();
    self.decimaPrimeiraCarta = ko.observable();
    self.decimaSegundaCarta = ko.observable();
    self.decimaTerceiraCarta = ko.observable();
    self.decimaQuartaCarta = ko.observable();
    self.decimaQuintaCarta = ko.observable();
    self.decimaSextaCarta = ko.observable();
    self.decimaSetimaCarta = ko.observable();
    self.decimaOitavaCarta = ko.observable();
    self.decimaNonaCarta = ko.observable();
    self.vigesimaCarta = ko.observable();
    self.vigesimaPrimeiraCarta = ko.observable();
    
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
        
            var proximaEtapa = _.find(self.etapas, function(e) {
                return e.etapa === (self.etapaAtual().etapa + 1);
            });
            
            if(proximaEtapa) {
                self.etapaAtual(proximaEtapa);
            }
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
            }
        },
        {
            etapa: 2,
            descricao: '2ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.segundaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 3,
            descricao: '3ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.terceiraCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 4,
            descricao: '4ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.quartaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 5,
            descricao: '5ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.quintaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 6,
            descricao: '6ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.sextaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 7,
            descricao: '7ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.setimaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 8,
            descricao: '8ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.oitavaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 9,
            descricao: '9ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.nonaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 10,
            descricao: '10ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.decimaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 11,
            descricao: '11ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.decimaPrimeiraCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 12,
            descricao: '12ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.decimaSegundaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 13,
            descricao: '13ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.decimaTerceiraCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 14,
            descricao: '14ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.decimaQuartaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 15,
            descricao: '15ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.decimaQuintaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 16,
            descricao: '16ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.decimaSextaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 17,
            descricao: '17ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.decimaSetimaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 18,
            descricao: '18ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.decimaOitavaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 19,
            descricao: '19ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.decimaNonaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 20,
            descricao: '20ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.vigesimaCarta, self.etapaAtual().numeroCarta());
            }
        },
        {
            etapa: 21,
            descricao: '21ª carta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.vigesimaPrimeiraCarta, self.etapaAtual().numeroCarta());
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
        return ($("#vinteUmaCartas").parent().width() > $(window).height() ? $(window).height() : $("#vinteUmaCartas").parent().width());
    }
};

ko.applyBindings(new vinteUmaCartasViewModel(), $('#vinteUmaCartas')[0]);