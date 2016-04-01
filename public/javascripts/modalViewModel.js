function modalViewModel() {
    var self = this;
    self.mensagem = ko.observable();
    self.exibirMensagem = function(mensagem) {
        self.mensagem(mensagem);
        $('#modal').modal('show');
    }
};