var criarSessao = new paginaGenericaViewModel();       
with(criarSessao) {
    titulo("Criar Sessão de Cartomancia");
    campo("Identifique-se...");
    placeHolder("Digite o seu nome");
    textoBotao("Criar");
    acaoCallback(function() {
        with(vm.loader()){
            titulo("Aguardando o Consulente.");
            conteudo('<span>Envie este link para seu consulente: <a href="' + vm.urlAcessoParceiro() + '" target="_blank">' + vm.urlAcessoParceiro() + '</a></span>')
            show();
        }
        vm.mesa().readonly(false);
        vm.nome(vm.paginaGenerica().valorCampo());
        socket.emit('fc-criar-sessao-espiritual', { nome: vm.nome(), roomId: socket.id });
    });
}
vm.paginaGenerica(criarSessao);