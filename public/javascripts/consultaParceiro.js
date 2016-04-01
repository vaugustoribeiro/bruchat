var pagina = new paginaGenericaViewModel();
with(pagina) {
    titulo("Entrar em uma Sessão");
    campo("Identifique-se...");
    placeHolder("Digite o seu nome");
    acaoCallback(function() {
        vm.nome(vm.paginaGenerica().valorCampo());
        socket.emit('fc-iniciar-consulta', { parceiroNome: vm.nome(), parceiroId: vm.parceiroId() });
    });
};
vm.paginaGenerica(pagina);

socket.on('fs-nome-parceiro', function(parceiroNome) {
    vm.parceiroNome(parceiroNome);
    vm.head().titulo("Conectado com " + parceiroNome);
    vm.online(true);
}, self);

socket.on('fs-sessao-inexistente', function() {
    vm.modal().exibirMensagem("A sessão que se está tentando conectar, não existe mais.");
    $('.conexaoEncerrada').modal('show');
});