"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _config = _interopRequireDefault(require("./config/config.js"));

var _cors = _interopRequireDefault(require("cors"));

var _ItemRoutes = _interopRequireDefault(require("./routes/Item-Routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('common'));
app.use((0, _helmet["default"])());
app.get('/data', function (req, res) {
  res.status(200).send('From my express server!');
});

_ItemRoutes["default"].routes(app);

_config["default"].connectToPort(app);

_config["default"].connectToDb();

var _default = app;
exports["default"] = _default;