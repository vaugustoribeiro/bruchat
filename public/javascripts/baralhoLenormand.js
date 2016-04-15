function cartaLenormand() {
    var self = this;
    self.numero = ko.observable();
    self.layout = ko.observable();
    self.css = ko.observable();
    self.classes = ko.computed(function() {
        return self.layout() + ' ' + self.css();
    }, self);
    self.src = ko.observable(undefined);
    self.pendente = ko.observable(true);
    self.redefinir = function() {
        self.css(undefined);
        self.pendente(true);
        self.src(undefined);
    };
};

baralhoLenormand = {
    cartas: [
        {
            numero: 1,
            nome: 'O Cavaleiro',
            css: 'lenormand cavaleiro',
            src: 'images/baralho_lenormand/1.png'
        },
        {
            numero: 2,
            nome: 'Os Obstáculos',
            css: 'lenormand obstaculos',
            src: 'images/baralho_lenormand/2.png'
        },
        {
            numero: 3,
            nome: 'O Navio',
            css: 'lenormand navio',
            src: 'images/baralho_lenormand/3.png'
        },
        {
            numero: 4,
            nome: 'A Casa',
            css: 'lenormand casa',
            src: 'images/baralho_lenormand/4.png'
        },
        {
            numero: 5,
            nome: 'A Árvore',
            css: 'lenormand arvore',
            src: 'images/baralho_lenormand/5.png'
        },
        {
            numero: 6,
            nome: 'A Nuvem',
            css: 'lenormand nuvem',
            src: 'images/baralho_lenormand/6.png'
        },
        {
            numero: 7,
            nome: 'A Cobra',
            css: 'lenormand cobra',
            src: 'images/baralho_lenormand/7.png'
        },
        {
            numero: 8,
            nome: 'O Caixão',
            css: 'lenormand caixao',
            src: 'images/baralho_lenormand/8.png'
        },
        {
            numero: 9,
            nome: 'O Buquê',
            css: 'lenormand buque',
            src: 'images/baralho_lenormand/9.png'
        },
        {
            numero: 10,
            nome: 'A Foice',
            css: 'lenormand foice',
            src: 'images/baralho_lenormand/10.png'
        },
        {
            numero: 11,
            nome: 'O Chicote',
            css: 'lenormand chicote',
            src: 'images/baralho_lenormand/11.png'
        },
        {
            numero: 12,
            nome: 'Os Pássaros',
            css: 'lenormand passaros',
            src: 'images/baralho_lenormand/12.png'
        },
        {
            numero: 13,
            nome: 'A Criança',
            css: 'lenormand crianca',
            src: 'images/baralho_lenormand/13.png'
        },
        {
            numero: 14,
            nome: 'A Raposa',
            css: 'lenormand raposa',
            src: 'images/baralho_lenormand/14.png'
        },
        {
            numero: 15,
            nome: 'O Urso',
            css: 'lenormand urso',
            src: 'images/baralho_lenormand/15.png'
        },
        {
            numero: 16,
            nome: 'A Estrela',
            css: 'lenormand estrela',
            src: 'images/baralho_lenormand/16.png'
        },
        {
            numero: 17,
            nome: 'A Cegonha',
            css: 'lenormand cegonha',
            src: 'images/baralho_lenormand/17.png'
        },
        {
            numero: 18,
            nome: 'O Cachorro',
            css: 'lenormand cachorro',
            src: 'images/baralho_lenormand/18.png'
        },
        {
            numero: 19,
            nome: 'A Torre',
            css: 'lenormand torre',
            src: 'images/baralho_lenormand/19.png'
        },
        {
            numero: 20,
            nome: 'O Jardim',
            css: 'lenormand jardim',
            src: 'images/baralho_lenormand/20.png'
        },
        {
            numero: 21,
            nome: 'A Montanha',
            css: 'lenormand montanha',
            src: 'images/baralho_lenormand/21.png'
        },
        {
            numero: 22,
            nome: 'O Caminho',
            css: 'lenormand caminho',
            src: 'images/baralho_lenormand/22.png'
        },
        {
            numero: 23,
            nome: 'O Rato',
            css: 'lenormand rato',
            src: 'images/baralho_lenormand/23.png'
        },
        {
            numero: 24,
            nome: 'O Coração',
            css: 'lenormand coracao',
            src: 'images/baralho_lenormand/24.png'
        },
        {
            numero: 25,
            nome: 'O Anel',
            css: 'lenormand anel',
            src: 'images/baralho_lenormand/25.png'
        },
        {
            numero: 26,
            nome: 'Os Livros',
            css: 'lenormand livros',
            src: 'images/baralho_lenormand/26.png'
        },
        {
            numero: 27,
            nome: 'A Carta',
            css: 'lenormand carta',
            src: 'images/baralho_lenormand/27.png'
        },
        {
            numero: 28,
            nome: 'O Cigano',
            css: 'lenormand cigano',
            src: 'images/baralho_lenormand/28.png'
        },
        {
            numero: 29,
            nome: 'A Cigana',
            css: 'lenormand cigana',
            src: 'images/baralho_lenormand/29.png'
        },
        {
            numero: 30,
            nome: 'Os Lírios',
            css: 'lenormand lirios',
            src: 'images/baralho_lenormand/30.png'
        },
        {
            numero: 31,
            nome: 'O Sol',
            css: 'lenormand sol',
            src: 'images/baralho_lenormand/31.png'
        },
        {
            numero: 32,
            nome: 'A Lua',
            css: 'lenormand lua',
            src: 'images/baralho_lenormand/32.png'
        },
        {
            numero: 33,
            nome: 'A Chave',
            css: 'lenormand chave',
            src: 'images/baralho_lenormand/33.png'
        },
        {
            numero: 34,
            nome: 'O Peixe',
            css: 'lenormand peixe',
            src: 'images/baralho_lenormand/34.png'
        },
        {
            numero: 35,
            nome: 'A Âncora',
            css: 'lenormand ancora',
            src: 'images/baralho_lenormand/35.png'
        },
        {
            numero: 36,
            nome: 'A Cruz',
            css: 'lenormand cruz',
            src: 'images/baralho_lenormand/36.png'
        }
    ]
};