var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var env = process.env.NODE_ENV || 'development';
const multer = require("multer");

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

module.exports = router;