function criarSalaViewModel() {
    var self = this;    
    
    self.primeiroPasso = ko.observable(true);
    self.segundoPasso = ko.observable(false);
    self.terceiroPasso = ko.observable(false);
    
    self.falandoCom = ko.observable();
    
    self.identificador = ko.observable('Carregando identificador...');
    
    self.nome = ko.observable();
    
    self.titulo = ko.computed(function() {
        return self.nome() ? self.nome() : "Identifique-se..."
    }, self);
    
    self.habilitarBotaoCriar = ko.computed(function() {
        return self.nome() ? true : false;
    });
    
    self.quantidadeDeCartas = ko.observable();
    
    self.criarASala = function() {
        socket.emit('fc-criar-sessao-espiritual', self.nome());
        self.primeiroPasso(false);
        self.segundoPasso(true);
        socket.on('fs-iniciar-consulta', function(paciente) {
            self.segundoPasso(false);
            $('.aguardandoPaciente').modal('hide');
            self.terceiroPasso(true);
            self.falandoCom(paciente.nome);
            self.quantidadeDeCartas(paciente.quantidadeDeCartasSelecionada);
        });
        socket.on('fs-enviar-mensagem', function(mensagem) {
           self.mensagens.push({ mensagem: mensagem, server: true }); 
        });
        socket.on('fs-encerrar-sessao', function() {
            
        });
    };
    
    // workaround
    setInterval(function() {
        self.identificador(socket.id);
    }, 1000);
        
    self.cartasSelecionadas = ko.observableArray();
    
    self.observacaoFinal = ko.observable();
    
    self.observacaoFinal.subscribe(function(novoValor) {
        socket.emit('fc-atualizar-observacao-final', novoValor); 
    });
        
    self.quantidadeDeCartasRestantes = ko.computed(function(){
        return self.quantidadeDeCartas() - self.cartasSelecionadas().length; 
    }, self);
        
    self.selecionarCarta = function(cartaSelecionada) {
        if(self.cartasSelecionadas().length < self.quantidadeDeCartas())
        {
            self.cartasSelecionadas.push(cartaSelecionada);
            socket.emit('fc-exibir-carta', cartaSelecionada);
        }   
    };
    
    self.urlAcessoPaciente = ko.computed(function() {
       return "http://" + window.location.host + "/consulta?id=" + self.identificador() ;
    });
    
    self.removerCarta = function (cartaSelecionada) {
        self.cartasSelecionadas.splice(self.cartasSelecionadas.indexOf(cartaSelecionada), 1);
        socket.emit('fc-remover-carta', cartaSelecionada);
    }
    
    self.mensagens = ko.observableArray();
    
    self.enviarMensagem = function() {
        if(self.mensagem() !== '') {
            self.mensagens.push({ mensagem: self.mensagem(), server: false });
            socket.emit('fc-enviar-mensagem', self.mensagem());
            self.mensagem('');
        }
    };
    
    
    
    self.mensagem = ko.observable();
    
    self.cartas = [
        {
            numero: 1,
            nome: 'O Cavaleiro',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-CAVALEIRO2-180x300.jpg',
            descricao: 'Representa um homem em ação e em busca de sabedoria. Capacidade de mudar o rumo das coisas.'
        },
        {
            numero: 2,
            nome: 'Os Obstáculos',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-OS-OBSTACULOS2-180x300.jpg',
            descricao: 'Significa tropeços e obstáculos em sua vida, trazendo uma total desorientação, porém, com problemas passageiros.'
        },
        {
            numero: 3,
            nome: 'O Navio',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-NAVIO2-181x300.jpg',
            descricao: 'Representa transformações em todas as direções, enfatiza a importância de ser perceptivo aos seus sentimentos e intuição.'
        },
        {
            numero: 4,
            nome: 'A Casa',            
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-CASA2-179x300.jpg',
            descricao: 'Significa o pleno equilíbrio, o amor e o apoio familiar.'
        },
        {
            numero: 5,
            nome: 'A Árvore',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-ARVORE2-181x300.jpg',
            descricao: 'Representa fertilidade, energias positivas, força e vitalidade. Representa também que a pessoa cria raízes no local onde está.'
        },
        {
            numero: 6,
            nome: 'A Nuvem',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-AS-NUVENS1-181x300.jpg',
            descricao: 'Significa instabilidade emocional, confusão e indecisão, mudanças acontecerão lentamente.'
        },
        {
            numero: 7,
            nome: 'A Cobra',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-COBRA1-184x300.jpg',
            descricao: 'Representa traição, discórdias e perdas.'
        },
        {
            numero: 8,
            nome: 'O Caixão',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-CAIXAO1-181x300.jpg',
            descricao: 'Representa o fim e o recomeço, refere-se a forças ocultas que podem levar a destruição, mas também a evolução.'
        },
        {
            numero: 9,
            nome: 'O Buquê',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-BUQUE1-180x300.jpg',
            descricao: 'Representa alegria e beleza, observe as mensagens que vem através de sonhos, pois, indicam realização de tudo o que você deseja.'
        },
        {
            numero: 10,
            nome: 'A Foice',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-FOICE1-181x300.jpg',
            descricao: 'Representa perigo, destruição, transformação e desprendimento, perda dolorosa e rompimentos bruscos.'
        },
        {
            numero: 11,
            nome: 'O Chicote',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-CHICOTE1-181x300.jpg',
            descricao: 'Representa a força, a justiça, disputas e aborrecimentos.'
        },
        {
            numero: 12,
            nome: 'Os Pássaros',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-OS-PASSAROS1-182x300.jpg',
            descricao: 'Indica que tudo que for de seu merecimento vem na hora certa, sinal de boas noticias chegando.'
        },
        {
            numero: 13,
            nome: 'A Criança',
            imagem: 'http://www.astrocentro.com.br/files_astrocentrobr/field/image/astrologia-astrocentro_184.jpg',
            descricao: 'Representa felicidade, esperança, alegria e principalmente a inocência.'
        },
        {
            numero: 14,
            nome: 'A Raposa',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-RAPOSA1-178x300.jpg',
            descricao: 'Representa as armadilhas da vida, tome cuidado com pessoas ou situações enganosas.'
        },
        {
            numero: 15,
            nome: 'O Urso',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-URSO1-181x300.jpg',
            descricao: 'Representa a falsidade e a inveja.'
        },
        {
            numero: 16,
            nome: 'A Estrela',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-SORTE-183x300.jpg',
            descricao: 'Representa sorte, força espiritual, intuição, superação de obstáculos e realização dos sonhos.'
        },
        {
            numero: 17,
            nome: 'A Cegonha',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-CEGONHA1-182x300.jpg',
            descricao: 'Representa novidades, surpresas estão por vir, período de fertilidade, renovação em todos os sentidos.'
        },
        {
            numero: 18,
            nome: 'O Cachorro',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-CACHORRO1-181x300.jpg',
            descricao: 'Representa fidelidade, lealdade e proteção. Você está rodeado de verdadeiros amigos.'
        },
        {
            numero: 19,
            nome: 'A Torre',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-TORRE1-183x300.jpg',
            descricao: 'Representa seu eu verdadeiro, a busca do autoconhecimento e da elevação espiritual.'
        },
        {
            numero: 20,
            nome: 'O Jardim',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-JARDIM1-181x300.jpg',
            descricao: 'Representa nossas colheitas e todas as sementes que plantamos colheremos em nosso futuro próximo.'
        },
        {
            numero: 21,
            nome: 'A Montanha',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-MONTANHA1-181x300.jpg',
            descricao: 'Representa a justiça, a força e principalmente a perseverança.'
        },
        {
            numero: 22,
            nome: 'O Caminho',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-CAMINHO1-181x300.jpg',
            descricao: 'Representa caminhos abertos e que existem saídas para todos os lados, use seu livre arbítrio e faça a escolha certa.'
        },
        {
            numero: 23,
            nome: 'O Rato',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-RATO1-180x300.jpg',
            descricao: 'Representa problemas de saúde, perdas, roubos, rapidez de raciocínio e conhecimento.'
        },
        {
            numero: 24,
            nome: 'O Coração',
            imagem: 'https://patriciatarologasp.files.wordpress.com/2015/05/baralho-cigano-o-corac3a7c3a3o1.jpg',
            descricao: 'Representa a paixão, emoções fortes, amor fraternal, solidariedade universal e felicidade estão presentes em sua vida.'
        },
        {
            numero: 25,
            nome: 'O Anel',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-ANEL1-182x300.jpg',
            descricao: 'Representa parceria, casamento e união duradoura, possibilidade de parceria comercial.'
        },
        {
            numero: 26,
            nome: 'Os Livros',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-OS-LIVROS1-182x300.jpg',
            descricao: 'Representa a busca de sabedoria, estudos, conhecimento e reflexão.'
        },
        {
            numero: 27,
            nome: 'A Carta',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-CARTA1-183x300.jpg',
            descricao: 'Indica seu poder de comunicação. É um aviso para guardar seus segredos, mantenha  boca fechada.'
        },
        {
            numero: 28,
            nome: 'O Cigano',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-CIGANO1-182x300.jpg',
            descricao: 'Anuncia a chegada de pai, filho, marido, namorado ou amigo, representa a figura protetora do homem.'
        },
        {
            numero: 29,
            nome: 'A Cigana',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-CIGANA1-182x300.jpg',
            descricao: 'Representa a jovialidade, os mistérios e a falsidade, confusões e fofocas entre mulheres. Representa também a aproximação da mãe, esposa, filha, namorada ou amiga.'
        },
        {
            numero: 30,
            nome: 'Os Lírios',
            imagem: 'http://3.bp.blogspot.com/-7-PFQbpJ5HY/UXZ2ltPNR2I/AAAAAAAAAwY/_7Jlj4PLjzU/s1600/30+l%C3%ADrios.jpg',
            descricao: 'Significa paz interior, tranqüilidade e felicidade plena.'
        },
        {
            numero: 31,
            nome: 'O Sol',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-O-SOL1-184x300.jpg',
            descricao: 'Representa a carta mais positiva do baralho cigano trazendo consigo a energia positiva, o crescimento e a força divina.'
        },
        {
            numero: 32,
            nome: 'A Lua',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-LUA1-179x300.jpg',
            descricao: 'Representa intuição, angústias, medos contidos, dúvidas e forças ocultas.'
        },
        {
            numero: 33,
            nome: 'A Chave',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-CHAVE1-181x300.jpg',
            descricao: 'Representa o sucesso, é a chave que abre as portas para os dias melhores que estão por vir.'
        },
        {
            numero: 34,
            nome: 'O Peixe',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-OS-PEIXES1-181x300.jpg',
            descricao: 'Representam bens materiais, negócios e multiplicação nos lucros.'
        },
        {
            numero: 35,
            nome: 'A Âncora',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-ANCORA1-180x300.jpg',
            descricao: 'Esta carta do baralho cigano representa segurança material e autoconfiança.'
        },
        {
            numero: 36,
            nome: 'A Cruz',
            imagem: 'http://baralhocigano.art.br/wp-content/uploads/2013/06/BARALHO-CIGANO-A-CRUZ1-180x300.jpg',
            descricao: 'Representa vitorias em geral com sacrifícios e obstáculos no seu caminho.'
        }
    ]
    
};

vm = new criarSalaViewModel();

ko.applyBindings(vm);