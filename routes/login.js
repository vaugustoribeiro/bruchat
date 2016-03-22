var express = require('express');
var router = express.Router();
var entidade = require('../domain/entities/usuario.js');

/* GET login page. */
router.get('/', function(req, res, next) {
  if(req.cookies.usuario) {
      res.render('index');
  }
  res.render('login', { login: '', senha: '', status:'' });
});

/* POST */
router.post('/', function(req, res, next) {
    var usuario = new entidade.Usuario();
    usuario.login = req.body.login;
    usuario.senha = req.body.senha;
    
    try {
        usuario.realizarLogin();
        res.cookie('usuario', usuario, { maxAge: 60000 });
    }
    catch(error) {
        res.render('login', { login: req.body.login, senha: req.body.senha, status:  error.message});
    }
     
    res.render('index');
});

module.exports = router;
