const MainService = require('../services/mailService');
const ApiError = require('../error/ApiError');
const { validationResult } = require('express-validator');

class MailController {
    async sendMail(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); 
        }
        try {
            console.log('SendActivationMail')
            const { to, name , message} = req.body;
            await MainService.SendActivationMail(to, name , message);
            return res.json({ message: 'Activation email sent successfully' });
        } catch (error) {
            return next(ApiError.internal(`Failed to send email: ${error.message}`));
        }
    }
    
}

module.exports = new MailController();