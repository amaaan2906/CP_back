const router = require("express").Router();
const db = require("./firestore");
const { loginValidation } = require("../Auth/validation");

router.post("/login", async (req, res) => {
	// Request data validation
	const validation = loginValidation(req.body);
	if (validation.error)
		return res.status(400).json(validation.error.details[0]);
	//
});
module.exports = router;
