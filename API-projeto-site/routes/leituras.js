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

// retorna um filme/serie/anime
router.get('/media/:idmedia', function(req, res, next) {
	// console.log('Recuperando medias');
	
	var idmedia = req.body.idmedia; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idmedia = req.params.idmedia;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT tb_media.*, tb_genre.name as 'genre_name' FROM tb_media INNER JOIN tb_genre ON pk_media = pk_genre WHERE pk_media = ${idmedia};`;
	} 
	else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		type: sequelize.QueryTypes.SELECT
	})
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

// retorna últimos 5 filmes/series/animes
router.get('/top5media/:idmedia', function(req, res, next) {
	// console.log('Recuperando medias');
	
	var idmedia = req.body.idmedia; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idmedia = req.params.idmedia;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT TOP 5 * FROM tb_media;`;
	} 
	else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		type: sequelize.QueryTypes.SELECT
	})
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;
