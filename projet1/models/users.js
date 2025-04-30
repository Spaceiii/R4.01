const {DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        emailId: {
            type: DataTypes.STRING,
            validate: {isEmail: true}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'users',
    });
}