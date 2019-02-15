const http = require("https");

const getAllPeople = function () {
	return new Promise((resolve, reject) => {
		console.log("request started");
		http.get("https://ghibliapi.herokuapp.com/people?limit=250", (res) => {
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
}

const getRandomPerson = async function () {
	/**
	 * @type Array
	 */
	const result = await getAllPeople();

	const randomIndex = Math.ceil(Math.random() * result.length);
	const person = result[randomIndex];

	return person;
}

module.exports = {
	getRandomPerson: getRandomPerson
};