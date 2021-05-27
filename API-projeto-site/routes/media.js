var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var env = process.env.NODE_ENV || 'development';
const multer = require("multer");
express.json();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/upload/")
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({storage})

router.post('/add', upload.single("file"), (req, res, next) => {
    // res.send("/media/add funcionando!");
    console.log(req.body);
    console.log(req.file.filename);

    let title = req.body.title;
    let type = req.body.type;
    let genre = req.body.genre;
    let synopsis = req.body.synopsis;
    let year = req.body.year;
    let totalEps = req.body.totalEps;
    let userId = req.body.userId;
    let post_url = req.file.filename;

    let instrucaoSql = "";

    if (env == "dev") {
        instrucaoSql = `INSERT INTO tb_media VALUES
        (null, '${type}', '${title}', '${synopsis}', '${year}', ${totalEps}, '${post_url}', ${genre}, ${userId})`;
    }

    sequelize.query(instrucaoSql, {
        type: sequelize.QueryTypes.SELECT
    }).then(resultado => {
        // res.json({status: true})
        // res.sendFile("http://localhost:3000/index.html");
    }).catch(erro => {
        // res.json({status: false})
        res.status(500).send(erro.message);
    })
    res.redirect("/?status=aviso")
})

// retorna ultas obras adicionadas, 
// a quantidade de obras é definida por length
router.get("/last", (req, res, next) => {
    let type = req.query.type;
    let length = req.query.length;

    let instrucaoSql = "";

    if (env == "dev") {
        instrucaoSql = `SELECT * FROM tb_media WHERE type = '${type}' ORDER BY pk_media DESC LIMIT ${length};`;
    }

    sequelize.query(instrucaoSql, {
        type: sequelize.QueryTypes.SELECT
    }).then(result => {
        res.json(result)
    }).catch(err => {
        res.json({
            error: err
        })
    })
})

// retorna dados de apenas uma obra
router.get('/single', function(req, res, next) {
	// console.log('Recuperando medias');
	
	let idmedia = req.query.idmedia;
	console.log(idmedia);
	
	let instrucaoSql = "";
    // res.json({
    //     salve: "fml"
    // })
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `SELECT tb_media.*, tb_genre.name as 'genre_name' FROM tb_media INNER JOIN tb_genre ON fk_genre = pk_genre WHERE pk_media = ${idmedia};`;
	} 
	else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		type: sequelize.QueryTypes.SELECT
	})
	.then(resultado => {
		console.log(resultado);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get("/getAvaliacao", (req, res, next) => {
    let iduser = req.query.iduser;
    let idmedia = req.query.idmedia;

    // console.log(iduser)

    let sql = `SELECT tb_avaliacao.* FROM tb_avaliacao INNER JOIN tb_user ON tb_user.pk_user = tb_avaliacao.fk_user WHERE tb_user.pk_user = ${iduser} AND tb_avaliacao.fk_media = ${idmedia}
    `;

    sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(500)
    })
});

router.get("/addAvaliacao", (req, res, next) => {
    let body = req.query;

    let sql = `INSERT INTO tb_avaliacao VALUES
    (null, ${body.score}, '${body.situation}', ${body.eps_assistidos}, ${body.iduser}, ${body.idmedia})`

    sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    }).then(result => {
        res.json(result);
    })

    // res.redirect(`/title.html?idmedia=${idmedia}`);
})

router.get("/updateAvaliacao", (req, res, next) => {
    let body = req.query;

    let sql = `UPDATE tb_avaliacao SET score = ${body.score}, situation = '${body.situation}', eps_assistidos = ${body.eps_assistidos} WHERE fk_user = ${body.iduser} AND fk_media = ${body.idmedia};`;

    sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    }).then(result => {
        res.json({
            ok: true
        });
    })
})

module.exports = router;