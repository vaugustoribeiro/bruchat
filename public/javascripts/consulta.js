var criarSessao = new paginaGenericaViewModel();       
with(criarSessao) {
    titulo("Criar Sessão");
    campo("Identifique-se...");
    placeHolder("Digite o seu nome");
    acaoCallback(function() {
        with(vm.loader()){
            titulo("Aguardando Conexão...");
            conteudo('<span>Envie este link para seu parceiro: </span><span style="color: #337ab7">' + vm.urlAcessoParceiro() + '</span>')
            show();
        }
        vm.adm(true);
        vm.nome(vm.paginaGenerica().valorCampo());
        socket.emit('fc-criar-sessao-espiritual', vm.nome());
    });
}
vm.paginaGenerica(criarSessao);

// socket.io config
socket.on('fs-iniciar-consulta', function(parceiro) {
    vm.loader().hide();
    vm.parceiroNome(parceiro.parceiroNome);
    vm.head().titulo("Conectado com " + parceiro.parceiroNome);
    vm.online(true);
});