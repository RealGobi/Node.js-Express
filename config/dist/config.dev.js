"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var _process$env = process.env,
    PORT = _process$env.PORT,
    DEV_DB_URL = _process$env.DEV_DB_URL,
    PROD_DB_URL = _process$env.PROD_DB_URL;

var connectToPort = function connectToPort(app) {
  return regeneratorRuntime.async(function connectToPort$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(app.listen(PORT, function () {
            console.log('✔️ Server running on Port: ' + PORT);
          }));

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message + '❌');

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

var connectToDb = function connectToDb() {
  return regeneratorRuntime.async(function connectToDb$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(PROD_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
          }));

        case 3:
          console.log('✔️ Connected to database');
          _context2.next = 10;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message + '❌');
          process.exit();

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var _default = {
  connectToPort: connectToPort,
  connectToDb: connectToDb
};
exports["default"] = _default;