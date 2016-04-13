function paginaGenericaViewModel() {
    var self = this;
    self.titulo = ko.observable();
    self.campo = ko.observable();
    self.valorCampo = ko.observable();
    self.placeHolder = ko.observable();
    self.textoBotao = ko.observable();
    
    self.visivel = ko.observable(true);
    self.etapaCorrente = ko.observable(true);
    
    self.acaoBloqueada = ko.computed(function() {
        return self.valorCampo();
    }, self);
    
    self.acaoCallback = function(callback) {
        self.acao = callback;
    };
    
    self.acao = function(){};
};