function loaderViewModel() {
    var self = this;
    self.titulo = ko.observable();
    self.botaoTitulo = ko.observable();
    self.botaoHref = ko.observable();
    self.conteudo = ko.observable();
    self.show = function() {
        $(".aguardandoParceiro").modal('show');
    }
};