'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let user = sequelize.define('Leitura',{	
		pk_user: {
			field: 'pk_user',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		nick: {
			field: 'nick',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		pwd: {
			field: 'pwd',
			type: DataTypes.STRING, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},
	}, 
	{
		tableName: 'tb_user', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return user;
};
