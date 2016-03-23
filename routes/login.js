var express = require('express');
var router = express.Router();
var application = require('../application/usuarioApplication.js');

/* GET login page. */
router.get('/', function(req, res, next) {
  if(req.cookies.usuario) {
      res.redirect('/');
  }
  res.render('login', { login: '', senha: '', status:'' });
  next();
});

/* POST */
router.post('/', function(req, res, next) {
    
    var cookie = {
        login: req.body.login, 
        senha: req.body.senha,
        status: ''
    }
    
    var usuarioApplication = new application.usuarioApplication();
    
    try {
        usuarioApplication.realizarLogin(req.body.login, req.body.senha)
        res.cookie('usuario', cookie, { maxAge: 60000 });
        res.redirect('/');
    }
    catch(erro) {
        cookie.status = erro.message;
        res.render('login', cookie);
    }
    next();
});

module.exports = router;
