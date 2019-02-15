var express = require('express');
var router = express.Router();

const api = require("./../api");

/* GET home page. */
router.get('/', async function (req, res, next) {
  let person;

  try {
    person = await api.getRandomPerson();
  } catch (error) {
    person = error;
  }

  res.render('index', {
    title: 'Random Ghibli People',
    name: person.name,
    age: person.age,
    gender: person.gender,
    eye_color: person.eye_color,
    hair_color: person.hair_color,
  });
});

module.exports = router;
