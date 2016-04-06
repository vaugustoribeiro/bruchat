function estrelaCincoPontasViewModel() {
    var self = this;

    self.cartaDaFamilia = ko.observable();
    self.cartaDasFinancas = ko.observable();
    self.cartaDaSaude = ko.observable();
    self.cartaDoAmor = ko.observable();
    self.cartaDaMensagemFinal = ko.observable();
    
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
            descricao: 'Família.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDaFamilia, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[1]);
            }
        },
        {
            etapa: 2,
            descricao: 'Finanças.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDasFinancas, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[2]);
            }
        },
        {
            etapa: 3,
            descricao: 'Saúde.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDaSaude, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[3]);
            }
        },
        {
            etapa: 4,
            descricao: 'Amor.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDoAmor, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[4]);
            }
        },
        {
            etapa: 5,
            descricao: 'Mensagem final.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDaMensagemFinal, self.etapaAtual().numeroCarta());
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
        return ($("#estrelaCincoPontas").parent().width() > $(window).height() ? $(window).height() : $("#estrelaCincoPontas").parent().width());
    }
};

ko.applyBindings(new estrelaCincoPontasViewModel(), $('#estrelaCincoPontas')[0]);