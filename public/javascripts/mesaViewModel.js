function mesaViewModel() {

    var self = this;

    self.readonly = ko.observable();

    self.online = ko.observable();

    self.modosDeJogo = [];
    
    self.modoDeJogoSelecionado = ko.observable();
    
    self.selecionarModoDeJogo = function(modoDeJogo) {
        socket.emit('fc-selecionar-modo-de-jogo', modoDeJogo.id);
        modoDeJogo.carregar(self.readonly());
    };
    
    _([
        ['circuloMagico','O Círculo Mágico (Mandala Cigana)'],
        ['estrelaCincoPontas','Estrela de Cinco Pontas (Pentagrama)'],
        ['tresCartas','3 Cartas'],
        ['mandalaAstrologica','Mandala Astrológica'],
        ['vinteUmaCartas','21 Cartas'],
        ['ferradura','Ferradura'],
        ['magiaCigana','Magia Cigana (Mesa Real)'],
        ['cruzCelta','Cruz Celta'],
        ['semana','Semana']
    ]).forEach(function(value, key) {
        var modo = new modoDeJogo();
        modo.id = key++;
        modo.nome = value[1];
        modo.view = value[0];
        self.modosDeJogo.push(modo);
    });
    
    socket.on('fs-selecionar-modo-de-jogo', function(id) {
         var modoDeJogo = _.find(self.modosDeJogo, function(e) {
            return e.id === id; 
         });
         
         if(modoDeJogo) {
             modoDeJogo.carregar(self.readonly());
         }
    });
}

function modoDeJogo() {
    var self = this;
    self.id = 0;
    self.nome = '';
    self.view = ''
    self.carregar = function(readonly) {
        $("#modoDeJogoSelecionado").load("/modosDejogo/" + self.view + '/' + readonly);
    };
}