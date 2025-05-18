const auth_controller = require('../controllers/auth.controller');
const auth_middleware = require('../middlewares/auth.middleware');
const { body } = require('express-validator');
module.exports = (app)=>{
    app.post('/signup', [
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('email').isLength({ min: 8 }).withMessage('Email must be at least 8 characters long'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        body('fullname').isLength({ min: 3 }).withMessage('FullName is required with at least 3 characters long'),
        body('username').isLength({ min: 4 }).withMessage('Username is required with at least 4 characters long')
    ], auth_controller.signup);

    app.post('/login', [
        body('username').isLength({ min: 4 }).withMessage('Username is required with at least 4 characters long'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    ], auth_controller.login);

    app.get('/user', [], auth_controller.automaticlogin);

    app.get('/logout', [auth_middleware.checkauth], auth_controller.logout);
}