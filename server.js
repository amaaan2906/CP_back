// NPM IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
// SETUP
const app = express();
// mongoose.connect(
// 	process.env.MONGO_URI,
// 	{ useNewUrlParser: true, useUnifiedTopology: true },
// 	() => {
// 		console.log(`Database connect... ${new Date().toLocaleTimeString()}`);
// 	}
// );
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// GLOBAL VAIRABLES
global.testVar = [];

// ROUTES
const auth = require("./Route/auth");
app.use("/auth", auth);
app.get("/", (req, res) => {
	// console.log(req);
	const docLink = process.env.DOC_LINK;
	res.json({
		message: `COVID-19 Vaccine Passport API \nDocumentation at ${docLink}`,
	});
});

const PORT = process.env.PORT || 2019;
const checkInterval = process.env.RATE || 10000;
app.listen(PORT, () => {
	console.log(`Boot... (${new Date().toLocaleTimeString()})`);
	setInterval(() => {
		console.log(`-> System check @ ${new Date().toLocaleTimeString()}`);
	}, checkInterval);
});
