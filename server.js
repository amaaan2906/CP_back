const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 2019;
app.listen(PORT, () => {
	console.log(`Boot... (${new Date().toLocaleTimeString()})`);
	let i = 0;
	setInterval(() => {
		console.log(`5 sec check @ ${new Date().toLocaleTimeString()}`);
	}, 5000);
});
