const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const mysql = require('mysql2/promise');
const db = require('../models/index')
const bluebird = require('bluebird');

const hashUserPassword = (userPassword) => {
    return hashPassword = bcrypt.hashSync(userPassword, salt)
}

const createNewUser = async (email, password, username) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    let hashPass = hashUserPassword(password)
    // connection.query(
    //     'INSERT INTO users(email, password, username) VALUES(?, ?, ?)', [email, hashPass, username],
    //     function (err, results, fields) {
    //         if (err) { console.log(err) }
    //     }
    // )
    try {
        await db.User.create({
            email: email,
            password: hashPass,
            username: username
        })
    } catch (err) {
        console.log(err)
    }
}

const getUserList = async () => {
    let users = []
    users = await db.User.findAll()
    return users
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM users');
    //     return rows
    // } catch (err) {
    //     console.log('check err: ', err)
    // }
}

const deleteUser = async (id) => {
    await db.User.destroy({
        where: { id: id }
    })
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM Users WHERE id=?', [id]);
    //     return rows
    // } catch (err) {
    //     console.log('check err: ', err)
    // }
}

const getUserById = async (id) => {
    let user = {}
    user = await db.User.findOne({
        where: { id: id }
    })
    return user.get({ plain: true })
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM Users WHERE id=?', [id]);
    //     return rows
    // } catch (err) {
    //     console.log('check err: ', err)
    // }
}

const updateUserInfo = async (email, username, id) => {
    await db.User.update({ email: email, username: username }, { where: { id: id } })
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE Users SET email=?, username=? WHERE id=?', [email, username, id]);
    //     return rows
    // } catch (err) {
    //     console.log('check err: ', err)
    // }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}