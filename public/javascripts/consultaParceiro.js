var pagina = new paginaGenericaViewModel();
with(pagina) {
    titulo("Entrar em uma Sessão");
    campo("Identifique-se...");
    placeHolder("Digite o seu nome");
    acaoCallback(function() {
        vm.mesa().readonly(true);
        vm.nome(vm.paginaGenerica().valorCampo());
        socket.emit('fc-iniciar-consulta', { parceiroNome: vm.nome(), parceiroId: $("#parceiroId").val() });
    });
};
vm.paginaGenerica(pagina);