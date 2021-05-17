// autenticar usuario
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var email = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
	var pwd = req.body.pwd; // depois de .body, use o nome (name) do campo em seu formulário de login	
	
	let instrucaoSql = `SELECT * FROM tb_user WHERE email='${email}' AND pwd='${pwd}'`;

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			// sessoes.push(resultado[0].dataValues.login);
			// console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});