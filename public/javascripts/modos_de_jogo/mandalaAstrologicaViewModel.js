function mandalaAstrologicaViewModel() {
    var self = this;

    self.cartaEuSou = ko.observable();
    self.cartaEuTenho = ko.observable();
    self.cartEuPenso = ko.observable();
    self.cartaEstouProtegido = ko.observable();
    self.cartaEuGostoEuBrinco = ko.observable();
    self.cartaEuTrabalho = ko.observable();
    self.cartaEuMeRelaciono = ko.observable();
    self.cartaEuRenasco = ko.observable();
    self.cartaEuCreio = ko.observable();
    self.cartaEuMeEsforco = ko.observable();
    self.cartaMeusAmigos = ko.observable();
    self.cartaEuAnseio = ko.observable();
    
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
            descricao: 'Eu sou.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaEuSou, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[1]);
            }
        },
        {
            etapa: 2,
            descricao: 'Eu tenho.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaEuTenho, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[2]);
            }
        },
        {
            etapa: 3,
            descricao: 'Eu penso.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartEuPenso, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[3]);
            }
        },
        {
            etapa: 4,
            descricao: 'Estou protejido.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaEstouProtegido, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[4]);
            }
        },
        {
            etapa: 5,
            descricao: 'Eu gosto, eu brinco.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaEuGostoEuBrinco, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[5]);
            }
        },
        {
            etapa: 6,
            descricao: 'Eu trabalho.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaEuTrabalho, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[6]);
            }
        },
        {
            etapa: 7,
            descricao: 'Eu me relaciono.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaEuMeRelaciono, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[7]);
            }
        },
        {
            etapa: 8,
            descricao: 'Eu renasço.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaEuRenasco, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[8]);
            }
        },
        {
            etapa: 9,
            descricao: 'Eu creio.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaEuCreio, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[9]);
            }
        },
        {
            etapa: 10,
            descricao: 'Eu me esforço.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaEuMeEsforco, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[10]);
            }
        },
        {
            etapa: 11,
            descricao: 'Meus amigos.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaMeusAmigos, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[11]);
            }
        },
        {
            etapa: 12,
            descricao: 'Eu anseio.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaEuAnseio, self.etapaAtual().numeroCarta());
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
        return ($("#mandalaAstrologica").parent().width() > $(window).height() ? $(window).height() : $("#mandalaAstrologica").parent().width());
    }
};

ko.applyBindings(new mandalaAstrologicaViewModel(), $('#mandalaAstrologica')[0]);