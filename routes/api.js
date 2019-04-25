var express = require('express');
var router = express.Router();

const api = require("./../api");

/* GET home page. */
router.get('/person', async function (req, res, next) {
	let person;

	try {
		person = await api.getRandomPerson();
	} catch (error) {
		console.error(error);
	}

	let imageUrl;
	try {
		imageUrl = await api.getImageByName(person.name);
	} catch (error) {
		console.error(error);
	}

	res.json({
		image: imageUrl,
		name: person.name,
		age: person.age,
		gender: person.gender,
		eye_color: person.eye_color,
		hair_color: person.hair_color,
	});
});

module.exports = router;