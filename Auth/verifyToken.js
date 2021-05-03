const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	// get access token from request header
	const token = req.header("Authorization");
	if (!token) {
		// NO token = unauthorized access
		res.sendStatus(401);
	} else {
		try {
			const tokenData = jwt.verify(token, process.env.ACCESS_SECRET);
			// verified token is saved in request body for the server
			req.user_id = tokenData;
			next();
		} catch (error) {
			// token is not verified or expired
			res.status(401).json(error);
		}
	}
};
