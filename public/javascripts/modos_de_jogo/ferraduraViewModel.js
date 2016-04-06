function ferraduraViewModel() {
    var self = this;

    self.cartaDoPassado = ko.observable();
    self.cartaDasForcasDoPresente = ko.observable();
    self.cartaDoFuturo = ko.observable();
    self.cartaDoRumo = ko.observable();
    self.cartaDaReacaoDasPessoasProximas = ko.observable();
    self.cartaDosObstaculosASeremSuperadosOuEvitados = ko.observable();
    self.cartaDaResposta = ko.observable();

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
            descricao: 'Representa o passado.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDoPassado, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[1]);
            }
        },
        {
            etapa: 2,
            descricao: 'Representa as forças do presente.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDasForcasDoPresente, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[2]);
            }
        },
        {
            etapa: 3,
            descricao: 'Representa o futuro.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDoFuturo, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[3]);
            }
        },
        {
            etapa: 4,
            descricao: 'Rumo a tomar.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDoRumo, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[4]);
            }
        },
        {
            etapa: 5,
            descricao: 'Reação das pessoas próximas.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDaReacaoDasPessoasProximas, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[5]);
            }
        },
        {
            etapa: 6,
            descricao: 'Obstáculos a serem superados ou evitados',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDosObstaculosASeremSuperadosOuEvitados, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[6]);
            }
        },
        {
            etapa: 7,
            descricao: 'Resposta.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDaResposta, self.etapaAtual().numeroCarta());
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
        return ($("#ferradura").parent().width() > $(window).height() ? $(window).height() : $("#ferradura").parent().width());
    }
};

ko.applyBindings(new ferraduraViewModel(), $('#ferradura')[0]);