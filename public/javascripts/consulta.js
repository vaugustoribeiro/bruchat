var criarSessao = new paginaGenericaViewModel();       
with(criarSessao) {
    titulo("Criar Sessão");
    campo("Identifique-se...");
    placeHolder("Digite o seu nome");
    acaoCallback(function() {
        with(vm.loader()){
            titulo("Aguardando Conexão...");
            conteudo('<span>Envie este link para seu parceiro: </span><span class="form-control" style="color: #337ab7">' + vm.urlAcessoParceiro() + '</span>')
            show();
        }
        vm.mesa().readonly(false);
        vm.nome(vm.paginaGenerica().valorCampo());
        socket.emit('fc-criar-sessao-espiritual', vm.nome());
    });
}
vm.paginaGenerica(criarSessao);