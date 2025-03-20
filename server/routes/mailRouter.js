const Router = require('express')
const router = new Router()
const expressValidator = require('express-validator');
const body = expressValidator.body;
const mailController = require('../controllers/mailController')


const emailValidation = [
    body('to').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('name').notEmpty().withMessage('Name is required'),
    body('message').optional().isString().withMessage('Message must be a string'),
];

router.post('/sendMail', emailValidation, mailController.sendMail)


module.exports = router


