/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\n\nclass Game {\n    constructor() {\n        this.playerOne = new _player__WEBPACK_IMPORTED_MODULE_0__.Player(\"real\");\n        this.playerTwo = new _player__WEBPACK_IMPORTED_MODULE_0__.Player(\"computer\");\n\n        this.currentPlayer = this.playerOne;\n        this.playerOneTurn = true;\n    }\n\n    playerOneMove(row, column) {\n        if (this.playerOneTurn) {\n            this.playerTwo.gb.receiveAttack(row, column); \n\n            if (!this.gameOver()) {\n                this.computerMove();\n            }\n        }\n    }\n\n    // Find a random non-missed spot on \"real\" gameboard\n    computerMove() {\n        this.playerOneTurn = false;\n\n        // Get random non-missed coordinates\n        let x = 0;\n        let y = 0;\n        let found = false;\n\n        while (!found) {\n            x = Math.floor(Math.random() * 10);\n            y = Math.floor(Math.random() * 10);\n            if (!(this.playerOne.gb.board[x][y] == 0) && !(this.playerOne.gb.board[x][y] == 1)) {   // there hasn't been a missed or successful attack on the spot\n                found = true;\n            }\n        }\n\n        this.playerOne.gb.receiveAttack(x, y);\n\n        if (!this.gameOver()) {\n            this.playerOneTurn = true;\n        }\n    }\n\n    gameOver() {\n        return this.playerOne.gb.isAllSunk() || this.playerTwo.gb.isAllSunk();\n    }\n\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/game.js?\n}");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ \"./src/ships.js\");\n\n\nclass Gameboard {\n    constructor() {\n\n        // Create a 10x10 Array containing null\n        this.board = Array.from({ length: 10 }, () =>\n            Array.from({ length: 10 }, () => null)\n        );\n\n        // Create 1 ship of length 4, \n        // 2 ships of length 3, \n        // 3 ships of length 2, \n        // and 4 ships of length 1\n        const four = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(4);\n        const threeA = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(3);\n        const threeB = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(3);\n        const twoA = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(2);\n        const twoB = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(2);\n        const twoC = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(2);\n        const oneA = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(1);\n        const oneB= new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(1);\n        const oneC = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(1);\n        const oneD= new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(1);\n\n        // Store ships\n        this.ships = [four,\n            threeA, threeB,\n            twoA, twoB, twoC,\n            oneA, oneB, oneC, oneD\n        ];\n\n        // Randomly set board positions\n        this.setBoard();\n    }\n\n    setShip(ship) {\n        let found = false;\n        let horizontal = 0;\n        let vertical = 0;\n        let direction = 0;\n\n        // Find a random and valid placement for the ship\n        while (found === false) {\n\n            // Generate a random coordinate and direction\n            horizontal = Math.floor(Math.random() * 10);\n            vertical = Math.floor(Math.random() * 10);\n            direction = Math.floor(Math.random() * 2);\n\n            let conflict = false;\n\n            // Horizontal\n            if (direction === 0) { \n                // Check if the horizontal ship would go off the board\n                if (horizontal + ship.length > 10) {\n                        conflict = true;\n                } else {\n                    // Check if every spot going right is empty\n                    for (let i = 0; i < ship.length; i++) {\n                        if (this.board[horizontal + i][vertical] !== null) {\n                            conflict = true;\n                            break;\n                        }\n                    }\n                }\n\n            // Vertical\n            } else {\n                // Check if the horizontal ship would go off the board\n                if (vertical + ship.length > 10) {\n                        conflict = true;\n                } else {\n                    // Check if every spot going down is empty\n                    for (let i = 0; i < ship.length; i++) {\n                        if (this.board[horizontal][vertical + i] !== null) {\n                            conflict = true;\n                            break;\n                        }\n                    }\n                }\n            }\n\n            // Move onto next while iteration if the current coordinates and direction are not valid \n            if (conflict) continue; \n            else found = true;\n        }\n\n        // Set ship\n        if (direction === 0) {  // Horizontal ship\n            for (let i = 0; i < ship.length; i++) {\n                this.board[horizontal + i][vertical] = ship;\n            }\n        } else {       // Vertical ship\n            for (let i = 0; i < ship.length; i++) {\n                this.board[horizontal][vertical + i] = ship;  \n            }\n        }\n    } \n\n    setBoard() {\n        for (const ship of this.ships) {\n            this.setShip(ship);\n        }\n    }\n\n    receiveAttack(horizontal, vertical) {\n        // Board values:\n            // 0: missed attack\n            // 1: hit\n            // ship object: untouched with ship\n            // null: untouched without ship\n\n        if (this.board[horizontal][vertical] === null) {\n            this.board[horizontal][vertical] = 0; // missed attack\n        } else {\n            this.board[horizontal][vertical].hit();\n            const ship = this.board[horizontal][vertical];\n            this.board[horizontal][vertical] = 1;   // hit ship\n            // if (ship.isSunk()) {\n\n            // }\n            this.isAllSunk();\n        }\n    }\n\n    isAllSunk() {\n        for (const ship of this.ships) {\n            if (!ship.isSunk()) {\n                return false;\n            }\n        }\n        return true;\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?\n}");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nUISetup();\nconst game = new _game__WEBPACK_IMPORTED_MODULE_0__.Game();\n\nfunction UISetup() {\n    const gridOne = document.querySelector('.grid-one');\n    const gridOneRows = gridOne.querySelectorAll('.row');\n\n    // Add coordinate points to each cell in the grid\n    gridOneRows.forEach(row, r => {\n        const cells = row.querySelectorAll('.cell');\n        cells.forEach(cell, c => {\n            cell.dataset.row = r;\n            cell.dataset.column = c;\n        });\n    });\n\n    // Add event listeners to player one (human/\"real\") grid\n    const gridOneCells = gridOneRows.querySelectorAll('.cell');\n    gridOneCells.forEach(cell => {\n        cell.attachEventListeners('click', () => {\n            game.playerOneMove(cell.dataset.row, cell.dataset.column);\n        });\n    });\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/index.js?\n}");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n\nclass Player {\n    constructor(type) {\n        this.type = type\n        this.gb = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\n        this.gb.setBoard();\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/player.js?\n}");

/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n    constructor(length) {\n        this.length = length;\n        this.hitCount = 0;\n        this.sunk = false;\n    }\n\n    hit() {\n        this.hitCount++;\n        this.isSunk();\n    }\n\n    isSunk() {\n        if (this.hitCount === this.length) {\n            this.sunk = true;\n            return true;\n        }\n        return false;\n    }\n}\n\n\n\n//# sourceURL=webpack://battleship/./src/ships.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;