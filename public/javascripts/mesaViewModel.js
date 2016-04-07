function mesaViewModel() {

    var self = this;

    self.readonly = ko.observable();

    self.numeroCarta = ko.observable();
    self.cartasSelecionadas = ko.observableArray();

    self.selecionarCarta = function(cartaSelecionada) {
        self.cartasSelecionadas.push(cartaSelecionada);
        socket.emit('fc-exibir-carta', cartaSelecionada);
    };

    self.online = ko.observable();

    self.removerCarta = function(cartaSelecionada) {
        if (self.readonly()) return;
        self.cartasSelecionadas.splice(self.cartasSelecionadas.indexOf(cartaSelecionada), 1);
        socket.emit('fc-remover-carta', cartaSelecionada);
    };

    socket.on('fs-exibir-carta', function(cartaSelecionada) {
        self.cartasSelecionadas.push(cartaSelecionada);
    });

    socket.on('fs-remover-carta', function(cartaSelecionada) {
        var x = _.find(self.cartasSelecionadas(), function(carta) {
            return carta.numero === cartaSelecionada.numero;
        });
        self.cartasSelecionadas.splice(self.cartasSelecionadas.indexOf(x), 1);
    });

    self.numeroCarta = ko.observable();
    self.numeroCartaFoco = ko.observable(false);

    self.adicionarCartaEnter = function(d, e) {
        e.keyCode === 13 && self.adicionarCarta();
        return true;
    };

    self.adicionarCarta = function() {
        var cartaSeleciona = _.find(self.cartas, function(carta) {
            return carta.numero.toString() === self.numeroCarta();
        });

        if (cartaSeleciona == null) {
            vm.modal().exibirMensagem("Não existe carta com este número.")
        }
        else {
            self.selecionarCarta(cartaSeleciona);
            self.numeroCarta('');
            self.numeroCartaFoco(true);
        }
    }

    self._esconderDescricaoCartas = ko.observable(false);
    self.esconderDescricaoCartas = ko.computed(function() {
        return self._esconderDescricaoCartas() && self.readonly();
    }, self)

    self._esconderDescricaoCartas.subscribe(function(esconderDescricaoCartas) {
        socket.emit('fc-esconder-descricao-carta', esconderDescricaoCartas);
    }, self);

    socket.on('fs-esconder-descricao-carta', function(esconderDescricaoCarta) {
        self._esconderDescricaoCartas(esconderDescricaoCarta);
    });

    self.modosDeJogo = [
        {
            nome: 'O Círculo Mágico (Mandala Cigana)',
            view: 'circuloMagico',
            selecionar: function() {
                     $("#modoDeJogoSelecionado").load('/modosDejogo/circuloMagico');
            }
        },
        {
            nome: 'Estrela de Cinco Pontas (Pentagrama)',
            view: 'estrelaCincoPontas',
            selecionar: function() {
                 $("#modoDeJogoSelecionado").load('/modosDejogo/estrelaCincoPontas');
            }
        },
        {
            nome: '3 Cartas',
            view: 'tresCartas',
            selecionar: function() {
                 $("#modoDeJogoSelecionado").load('/modosDejogo/tresCartas');
            }
        },
        {
            nome: 'Mandala Astrológica',
            view: 'mandalaAstrologica',
            selecionar: function() {
                 $("#modoDeJogoSelecionado").load('/modosDejogo/mandalaAstrologica');
            }
        },
        {
            nome: '21 Cartas',
            view: 'vinteUmaCartas',
            selecionar: function() {
                 $("#modoDeJogoSelecionado").load('/modosDejogo/vinteUmaCartas');
            }
        },
        {
            nome: 'Ferradura',
            view: 'ferradura',
            selecionar: function() {
                 $("#modoDeJogoSelecionado").load('/modosDejogo/ferradura');
            }
        },
        {
            nome: 'Magia Cigana',
            view: 'magiaCigana',
            selecionar: function() {
                 $("#modoDeJogoSelecionado").load('/modosDejogo/magiaCigana');
            }
        },
        {
            nome: 'Cruz Celta',
            view: 'cruzCelta',
            selecionar: function() {
                 $("#modoDeJogoSelecionado").load('/modosDejogo/cruzCelta');
            }
        },
        {
            nome: 'Semana',
            view: 'semana',
            selecionar: function() {
                $("#modoDeJogoSelecionado").load('/modosDejogo/semana');
            }
        }
    ];
}