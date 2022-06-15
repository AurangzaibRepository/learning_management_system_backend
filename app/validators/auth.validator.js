const {body} = require('express-validator');
const db = require('../models');
const user = db.user;

exports.validateRegister = () => {
    return [
        body('first_name', 'First name is required ').notEmpty(),
        body('last_name', 'Last name is required').notEmpty(),
        body('email').isEmail().withMessage('Invalid Email')
            .custom(async (email) => {
                let recordCount = await user.count({
                    where: {email: email}
                });

                if (recordCount > 0) {
                    throw new Error('Email already exists');
                }
            }),
        body('phone_number', 'Phone number is required').notEmpty(),
        body('role', 'Invalid role').isIn(['instructor', 'learner'])
    ];
}