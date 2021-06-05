var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
// var users = require('../models').users;
var env = process.env.NODE_ENV || 'development';

// autenticar usuario
router.get('/autenticar', function(req, res, next) {

	// armazenando valores dos inputs
	let email = req.query.email;
	let pwd = req.query.pwd;

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT * FROM tb_user WHERE email = '${email}' AND pwd = '${pwd}';`;
	}
	else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		type: sequelize.QueryTypes.SELECT
	})
	.then(resultado => {
		// console.log("Tamanho da string: ", resultado.length);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

// cadastrar usuário
router.get('/cadastrar', function(req, res, next) {

	// armazenando valores dos inputs
	let email = req.query.email;
	let pwd = req.query.pwd;
	let nick = req.query.nick;

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `INSERT INTO tb_user(nick, email, pwd) VALUES ('${nick}', '${email}', '${pwd}');`;
	}
	
	sequelize.query(instrucaoSql, {
		type: sequelize.QueryTypes.SELECT
	})
	.then(resultado => {
		resultado.ok = true
		res.json(resultado);
		res.status(200)
		
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;