function circuloMagicoViewModel() {
    var self = this;

    self.cartaTema = ko.observable();
    self.cartaSintese = ko.observable();
    self.cartaDasInfluenciasExternas = ko.observable();
    self.cartaDaOposicao = ko.observable();
    self.cartaDoFavorecimento = ko.observable();
    self.cartaDoResultado = ko.observable();

    self.redefinirCarta = function(numeroEtapa) {
        self.numeroCartaFoco(true);
        self.etapaAtual(self.etapas[numeroEtapa]);
    };

    self.definirCarta = function(carta, numeroCarta) {
        var cartaLenormand = _.find(baralhoLenormand.cartas, function(e) {
            return e.numero.toString() === numeroCarta;
        });
        carta(cartaLenormand.css);
        self.numeroCartaFoco(true);
    };

    self.etapas = [
        {
            etapa: 1,
            descricao: 'Defina a carta tema.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaTema, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[1]);
            }
        },
        {
            etapa: 2,
            descricao: 'Defina a carta síntese.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaSintese, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[2]);
            }
        },
        {
            etapa: 3,
            descricao: 'Defina a carta das influencias externas.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDasInfluenciasExternas, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[3]);
            }
        },
        {
            etapa: 4,
            descricao: 'Defina a carta da oposição.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDaOposicao, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[4]);
            }
        },
        {
            etapa: 5,
            descricao: 'Defina a carta do favorecimento.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDoFavorecimento, self.etapaAtual().numeroCarta());
                self.etapaAtual(self.etapas[5]);
            }
        },
        {
            etapa: 6,
            descricao: 'Defina a carta do resultado.',
            numeroCarta: ko.observable(),
            definirCarta: function() {
                self.definirCarta(self.cartaDoResultado, self.etapaAtual().numeroCarta());
                //self.etapaAtual(self.etapas[1]);
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
};

vm = new circuloMagicoViewModel();

ko.applyBindings(vm);