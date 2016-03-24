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
    
    var loginModel = {
        login: req.body.login, 
        senha: req.body.senha,
        status: ''
    }
    
    var usuarioApplication = new application.usuarioApplication();
    
    try {
        usuarioApplication.realizarLogin(loginModel.login, loginModel.senha)
        res.cookie('login', loginModel, { maxAge: 60000 });
        res.redirect('/');
    }
    catch(erro) {
        loginModel.status = erro.message;
        res.render('login', loginModel);
    }
    next();
});

module.exports = router;
