const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { loginValidation } = require("../Auth/validation");
const User = required("../Model/User");

router.post("/login", async (req, res) => {
	// Request data validation
	const validation = loginValidation(req.body);
	if (validation.error)
		return res.status(400).json(validation.error.details[0]);
	// check if user expsts
	const exists = await User.findOne({ username: req.body.username });
	if (!exists) return res.status(400).json({ message: "invalid username" });
	// password check
	const validPwd = await bcrypt.compare(req.body.password, exists.password);
	if (!validPwd) return res.status(400).json({ message: "invalid password" });
});
module.exports = router;
