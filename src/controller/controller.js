const userService = require('../service/userService')

const handleHome = (req, res) => {
    return res.render('home.ejs')
}

const handleUser = async (req, res) => {
    let userList = await userService.getUserList()
    return res.render('users.ejs', { userList })
}

const handleCreateUser = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    userService.createNewUser(email, password, username)

    return res.redirect('/users')
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect('/users')
}

const getUpdateUser = async (req, res) => {
    let userByID = await userService.getUserById(req.params.id)
    return res.render('update.ejs', { userByID })
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let id = req.body.id
    await userService.updateUserInfo(email, username, id)
    return res.redirect('/users')
}
module.exports = {
    handleHome, handleUser, handleCreateUser, handleDeleteUser, getUpdateUser, handleUpdateUser
}