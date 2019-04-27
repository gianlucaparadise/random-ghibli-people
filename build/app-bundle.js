/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/index.js":
/*!**********************!*\
  !*** ./api/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const http = __webpack_require__(/*! https */ \"https\");\n\nconst httpGet = function (url) {\n\treturn new Promise((resolve, reject) => {\n\t\tconsole.log(\"request started\");\n\t\thttp.get(url, (res) => {\n\t\t\tconst { statusCode } = res;\n\t\t\tconst contentType = res.headers['content-type'];\n\t\t\tconsole.log(`status: ${statusCode}`);\n\t\t\tlet error;\n\t\t\tif (statusCode !== 200) {\n\t\t\t\terror = new Error('Request Failed.\\n' +\n\t\t\t\t\t`Status Code: ${statusCode}`);\n\t\t\t} else if (!/^application\\/json/.test(contentType)) {\n\t\t\t\terror = new Error('Invalid content-type.\\n' +\n\t\t\t\t\t`Expected application/json but received ${contentType}`);\n\t\t\t}\n\t\t\tif (error) {\n\t\t\t\tconsole.error(error.message);\n\t\t\t\t// consume response data to free up memory\n\t\t\t\tres.resume();\n\t\t\t\treject(error);\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tres.setEncoding('utf8');\n\t\t\tlet rawData = '';\n\t\t\tres.on('data', (chunk) => { rawData += chunk; });\n\t\t\tres.on('end', () => {\n\t\t\t\ttry {\n\t\t\t\t\tconst parsedData = JSON.parse(rawData);\n\t\t\t\t\tconsole.log(parsedData);\n\t\t\t\t\tresolve(parsedData);\n\t\t\t\t\treturn;\n\t\t\t\t} catch (e) {\n\t\t\t\t\terror = new Error('Error parsing.\\n' +\n\t\t\t\t\t\t`Message: ${e.message}`);\n\t\t\t\t\tconsole.error(e.message);\n\t\t\t\t\treject(error);\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t});\n\t\t}).on('error', (e) => {\n\t\t\tconsole.error(`Got error: ${e.message}`);\n\t\t\tconst error = new Error('Error generic.\\n' +\n\t\t\t\t`Message: ${e.message}`);\n\t\t\treject(error);\n\t\t\treturn;\n\t\t});\n\t});\n};\n\nconst getAllPeople = async function () {\n\tconst url = \"https://ghibliapi.herokuapp.com/people?limit=250\";\n\n\t/**\n\t * @type Array\n\t */\n\tconst result = await httpGet(url);\n\n\treturn result;\n}\n\nconst getRandomPerson = async function () {\n\tconst result = await getAllPeople();\n\n\tconst randomIndex = Math.ceil(Math.random() * result.length);\n\tconst person = result[randomIndex];\n\n\treturn person;\n}\n\n/**\n * Searches in the Ghibli wiki and returns the first result\n * @param {string} query query to search\n */\nconst searchByName = async function (query) {\n\tconst url = `https://ghibli.fandom.com/api/v1/Search/List?query=${query}&limit=1`;\n\n\tconst response = await httpGet(url);\n\n\tif (!response || !response.items || response.items.length <= 0) {\n\t\tthrow new Error(\"Error while searching for character\");\n\t}\n\n\treturn response.items[0];\n}\n\n/**\n * Gets the article by id and returns it\n * @param {string} articleId article id\n */\nconst getArticleById = async function (articleId) {\n\tconst url = `https://ghibli.fandom.com/api/v1/Articles/Details/AsSimpleJson?ids=${articleId}`\n\n\tconst response = await httpGet(url);\n\n\tif (!response || !response || !response.items || !response.items.hasOwnProperty(articleId)) {\n\t\tthrow new Error(\"Error while getting article\");\n\t}\n\n\tconst article = response.items[articleId];\n\treturn article;\n}\n\n/**\n * Return an image url of the input character\n * @param {string} name Name of the character\n * @returns {string}\n */\nconst getImageByName = async function (name) {\n\tconst searchResult = await searchByName(name);\n\tif (!searchResult) {\n\t\tthrow new Error(\"No results in search\");\n\t}\n\n\tconst article = await getArticleById(searchResult.id);\n\tif (!article) {\n\t\tthrow new Error(\"No article found\");\n\t}\n\n\tconst imageUrl = article.thumbnail;\n\n\treturn imageUrl;\n}\n\nmodule.exports = {\n\tgetRandomPerson: getRandomPerson,\n\tgetImageByName: getImageByName\n};\n\n//# sourceURL=webpack:///./api/index.js?");

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {var createError = __webpack_require__(/*! http-errors */ \"http-errors\");\nvar express = __webpack_require__(/*! express */ \"express\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\nvar logger = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar indexRouter = __webpack_require__(/*! ./routes/index */ \"./routes/index.js\");\nvar apiRouter = __webpack_require__(/*! ./routes/api */ \"./routes/api.js\");\n\nvar app = express();\n\n// view engine setup\napp.set('views', path.join(__dirname, 'views'));\napp.set('view engine', 'pug');\n\napp.use(logger('dev'));\napp.use(express.json());\napp.use(express.urlencoded({ extended: false }));\napp.use(cookieParser());\napp.use(express.static(path.join(__dirname, 'public')));\n\napp.use('/', indexRouter);\napp.use('/api', apiRouter);\n\n// catch 404 and forward to error handler\napp.use(function (req, res, next) {\n  next(createError(404));\n});\n\n// error handler\napp.use(function (err, req, res, next) {\n  // set locals, only providing error in development\n  res.locals.message = err.message;\n  res.locals.error = req.app.get('env') === 'development' ? err : {};\n\n  // render the error page\n  res.status(err.status || 500);\n  res.render('error');\n});\n\nmodule.exports = app;\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./routes/api.js":
/*!***********************!*\
  !*** ./routes/api.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\n\nconst api = __webpack_require__(/*! ./../api */ \"./api/index.js\");\n\n/* GET home page. */\nrouter.get('/person', async function (req, res, next) {\n\tlet person;\n\n\ttry {\n\t\tperson = await api.getRandomPerson();\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n\n\tlet imageUrl;\n\ttry {\n\t\timageUrl = await api.getImageByName(person.name);\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n\n\tres.json({\n\t\timage: imageUrl,\n\t\tname: person.name,\n\t\tage: person.age,\n\t\tgender: person.gender,\n\t\teye_color: person.eye_color,\n\t\thair_color: person.hair_color,\n\t});\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/api.js?");

/***/ }),

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\n\nconst api = __webpack_require__(/*! ./../api */ \"./api/index.js\");\n\n/* GET home page. */\nrouter.get('/', async function (req, res, next) {\n  let person;\n\n  try {\n    person = await api.getRandomPerson();\n  } catch (error) {\n    console.error(error);\n  }\n\n  let imageUrl;\n  try {\n    imageUrl = await api.getImageByName(person.name);\n  } catch (error) {\n    console.error(error);\n  }\n\n  res.render('index', {\n    title: 'Random Ghibli People',\n    image: imageUrl,\n    name: person.name,\n    age: person.age,\n    gender: person.gender,\n    eye_color: person.eye_color,\n    hair_color: person.hair_color,\n  });\n});\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./routes/index.js?");

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** multi ./app.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./app.js */\"./app.js\");\n\n\n//# sourceURL=webpack:///multi_./app.js?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-errors\");\n\n//# sourceURL=webpack:///external_%22http-errors%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });