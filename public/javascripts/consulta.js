var criarSessao = new paginaGenericaViewModel();       
with(criarSessao) {
    titulo("Criar Sessão");
    campo("Identifique-se...");
    placeHolder("Digite o seu nome");
    acaoCallback(function() {
        with(vm.loader()){
            titulo("Aguardando Conexão...");
            conteudo('<span>Envie este link para seu parceiro: <a href="' + vm.urlAcessoParceiro() + '" target="_blank">' + vm.urlAcessoParceiro() + '</a></span>')
            show();
        }
        vm.mesa().readonly(false);
        vm.nome(vm.paginaGenerica().valorCampo());
        socket.emit('fc-criar-sessao-espiritual', { nome: vm.nome(), roomId: socket.id });
    });
}
vm.paginaGenerica(criarSessao);