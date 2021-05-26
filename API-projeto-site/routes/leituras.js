var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var users = require('../models').users;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N leituras */
router.get('/users', function(req, res, next) {
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `
		SELECT 
		*
		FROM 
		tb_user;`;
	}
	else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		type: sequelize.QueryTypes.SELECT
	})
	.then(resultado => {
		// console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/genres', function(req, res, next) {

	let instrucaoSql = "";

	if (env == "dev") {
		instrucaoSql = "SELECT * FROM tb_genre;";
	}

	sequelize.query(instrucaoSql, {
		type: sequelize.QueryTypes.SELECT
	})
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	})
})

module.exports = router;
