const Joi = require("joi");

const loginValidation = (data) => {
	const validUser = Joi.object({
		username: Joi.string().min(5).max(255).required(),
		password: Joi.string().min(8).max(255).required(),
	});
	return validUser.validate(data);
};

module.exports = {
	loginValidation,
};
