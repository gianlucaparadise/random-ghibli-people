const http = require("https");

const httpGet = function (url) {
	return new Promise((resolve, reject) => {
		console.log("request started");
		http.get(url, (res) => {
			const { statusCode } = res;
			const contentType = res.headers['content-type'];
			console.log(`status: ${statusCode}`);
			let error;
			if (statusCode !== 200) {
				error = new Error('Request Failed.\n' +
					`Status Code: ${statusCode}`);
			} else if (!/^application\/json/.test(contentType)) {
				error = new Error('Invalid content-type.\n' +
					`Expected application/json but received ${contentType}`);
			}
			if (error) {
				console.error(error.message);
				// consume response data to free up memory
				res.resume();
				reject(error);
				return;
			}

			res.setEncoding('utf8');
			let rawData = '';
			res.on('data', (chunk) => { rawData += chunk; });
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData);
					console.log(parsedData);
					resolve(parsedData);
					return;
				} catch (e) {
					error = new Error('Error parsing.\n' +
						`Message: ${e.message}`);
					console.error(e.message);
					reject(error);
					return;
				}
			});
		}).on('error', (e) => {
			console.error(`Got error: ${e.message}`);
			const error = new Error('Error generic.\n' +
				`Message: ${e.message}`);
			reject(error);
			return;
		});
	});
};

const getAllPeople = async function () {
	const url = "https://ghibliapi.herokuapp.com/people?limit=250";

	/**
	 * @type Array
	 */
	const result = await httpGet(url);

	return result;
}

const getRandomPerson = async function () {
	const result = await getAllPeople();

	const randomIndex = Math.ceil(Math.random() * result.length);
	const person = result[randomIndex];

	return person;
}

/**
 * Searches in the Ghibli wiki and returns the first result
 * @param {string} query query to search
 */
const searchByName = async function (query) {
	const url = `https://ghibli.fandom.com/api/v1/Search/List?query=${query}&limit=1`;

	const response = await httpGet(url);

	if (!response || !response.items || response.items.length <= 0) {
		throw new Error("Error while searching for character");
	}

	return response.items[0];
}

/**
 * Gets the article by id and returns it
 * @param {string} articleId article id
 */
const getArticleById = async function (articleId) {
	const url = `https://ghibli.fandom.com/api/v1/Articles/Details/AsSimpleJson?ids=${articleId}`

	const response = await httpGet(url);

	if (!response || !response || !response.items || !response.items.hasOwnProperty(articleId)) {
		throw new Error("Error while getting article");
	}

	const article = response.items[articleId];
	return article;
}

/**
 * Return an image url of the input character
 * @param {string} name Name of the character
 * @returns {string}
 */
const getImageByName = async function (name) {
	const searchResult = await searchByName(name);
	if (!searchResult) {
		throw new Error("No results in search");
	}

	const article = await getArticleById(searchResult.id);
	if (!article) {
		throw new Error("No article found");
	}

	const imageUrl = article.thumbnail;

	return imageUrl;
}

module.exports = {
	getRandomPerson: getRandomPerson,
	getImageByName: getImageByName
};