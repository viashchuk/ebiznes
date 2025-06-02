import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        googleToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        githubToken: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
        {
            tableName: 'users'
        })


export default User