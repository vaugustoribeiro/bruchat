var express = require('express');
var router = express.Router();
var usuario = require('../domain/entities/usuario.js');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { login: '', senha: '', status:'' });
});

/* POST */
router.post('/', function(req, res, next) {
   var status = usuarioDomain.realizarLogin(req.body.login, req.body.senha);
   res.render('login', { login: req.body.login, senha: req.body.senha, status: status }); 
});

module.exports = router;
