const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation, registerValidation } = require("../Auth/validation");
const User = required("../Models/User");

router.post("/login", async (req, res) => {
	// Request data validation
	const validation = loginValidation(req.body);
	if (validation.error)
		return res.status(400).json(validation.error.details[0]);
	// check if user exists
	const exists = await User.findOne({ username: req.body.username });
	if (!exists) return res.status(400).json({ message: "invalid username" });
	// password check
	const validPwd = await bcrypt.compare(req.body.password, exists.password);
	if (!validPwd) return res.status(400).json({ message: "invalid password" });
	const userInfo = JSON.parse(JSON.stringify(exists));
	delete userInfo.password;
	// create jwt token
	const accessToken = jwt.sign(
		{ token_type: "access", id: exists._id },
		process.env.ACCESS_SECRET,
		{ expiresIn: 300 } // 5 mins
	);
	const refreshToken = jwt.sign({ id: exists._id }, process.env.REFRESH_SECRET);
	return res.status(200).json({ userInfo, accessToken, refreshToken });
});

router.post("/register", async (req, res) => {
	// request data validation
	const validation = registerValidation(req.body);
	if (validation.error)
		return res.status(400).json(validation.error.details[0]);
	// check if username exists
	let exists = User.findOne({ username: req.body.username });
	if (exists) res.status(400).json({ message: "duplicate username" });
	// check if user email exists
	let exists = User.findOne({ email: req.body.email });
	if (exists) res.status(400).json({ message: "duplicate email" });
	// hash password
	const hashPwd = await bcrypt.hash(
		req.body.password,
		await bcrypt.genSalt(10)
	);
	// save new user
	const newUser = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: hashPwd,
		phone: req.body.phone,
		registerDate: req.body.registerDate,
		verified: false,
	});
	try {
		const save = await newUser.save();
		res.status(200).json({ id: save._id });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/refresh", async (req, res) => {});

module.exports = router;
