function modalViewModel() {
    var self = this;
    self.mensagemModal = ko.observable();
    
    self.exibirMensagem = function(mensagem) {
        $('.appModal').modal('show');
    }
}