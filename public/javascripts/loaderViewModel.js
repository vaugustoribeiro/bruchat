function loaderViewModel() {
    var self = this;
    self.titulo = ko.observable();
    self.conteudo = ko.observable();
    self.show = function() {
        var options = {
            show: true,
            backdrop: 'static',
            keyboard: false  
        };
        $("#loader").modal(options);
    }
    self.hide = function() {
        $("#loader").modal('hide');
    }
};