const Joi = require("joi");

const loginValidation = (data) => {
	const validUser = Joi.object({
		username: Joi.string().min(5).max(255).required(),
		password: Joi.string().min(8).max(255).required(),
	});
	return validUser.validate(data);
};

const registerValidation = (data) => {
	const validUser = Joi.object({
		name: Joi.string().min(3).max(255).required(),
		username: Joi.string().min(5).max(255).required(),
		password: Joi.string().min(8).max(1020).required(),
		email: Joi.string().email().required(),
		phone: Joi.number().min(9).max(9),
		registerDate: Joi.date().required(),
	});
	return validUser.validate(data);
};

module.exports = {
	loginValidation,
	registerValidation,
};
