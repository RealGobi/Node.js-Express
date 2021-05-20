"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ItemModel = _interopRequireDefault(require("../models/Item-Model.js"));

var _statusCode = _interopRequireDefault(require("../config/statusCode.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createItem = function createItem(req, res) {
  var item, dbResponse;
  return regeneratorRuntime.async(function createItem$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          item = new _ItemModel["default"]({
            itemName: req.body.itemName,
            itemCategory: req.body.itemCategory,
            itemPrice: req.body.itemPrice,
            itemDescription: req.body.itemDescription
          });
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(item.save());

        case 5:
          dbResponse = _context.sent;
          res.status(_statusCode["default"].CREATED).send(dbResponse);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          console.log('hiiiiiitttt');
          res.status(_statusCode["default"].INTERNAL_SERVER_ERROR).send({
            msg: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

var getAllItems = function getAllItems(req, res) {
  var databaseRes;
  return regeneratorRuntime.async(function getAllItems$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_ItemModel["default"].find());

        case 3:
          databaseRes = _context2.sent;
          res.status(_statusCode["default"].OK).send(databaseRes);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(_statusCode["default"].INTERNAL_SERVER_ERROR).send({
            msg: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getItemById = function getItemById(req, res) {
  var databaseRes;
  return regeneratorRuntime.async(function getItemById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_ItemModel["default"].findOne({
            _id: req.params.itemId
          }));

        case 3:
          databaseRes = _context3.sent;
          res.status(_statusCode["default"].OK).send(databaseRes);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(_statusCode["default"].INTERNAL_SERVER_ERROR).send({
            msg: _context3.t0.message
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var deleteItemById = function deleteItemById(req, res) {
  var databaseRes;
  return regeneratorRuntime.async(function deleteItemById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_ItemModel["default"].findByIdAndDelete(req.params.itemId));

        case 3:
          databaseRes = _context4.sent;
          res.status(_statusCode["default"].OK).send({
            msg: "Item deleted: ".concat(databaseRes.itemName)
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(_statusCode["default"].INTERNAL_SERVER_ERROR).send({
            msg: 'Error happend!'
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var updateItem = function updateItem(req, res) {
  var data, databaseRes;
  return regeneratorRuntime.async(function updateItem$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (req.body.itemName) {
            _context5.next = 2;
            break;
          }

          return _context5.abrupt("return", res.status(_statusCode["default"].BAD_REQUEST).send({
            msg: 'No input!'
          }));

        case 2:
          data = {
            itemName: req.body.itemName,
            itemCategory: req.body.itemCategory,
            itemPrice: req.body.itemPrice,
            itemDescription: req.body.itemDescription
          };
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(_ItemModel["default"].findByIdAndUpdate(req.params.itemId, data, {
            "new": true
          }));

        case 6:
          databaseRes = _context5.sent;
          res.status(_statusCode["default"].OK).send(databaseRes);
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](3);
          res.status(_statusCode["default"].INTERNAL_SERVER_ERROR).send({
            msg: _context5.t0.message
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

var getItemWithQuery = function getItemWithQuery(req, res) {
  var databaseRes;
  return regeneratorRuntime.async(function getItemWithQuery$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_ItemModel["default"].find({
            itemName: req.body.itemName
          }));

        case 3:
          databaseRes = _context6.sent;
          databaseRes.length !== 0 ? res.status(_statusCode["default"].OK).send(databaseRes) : res.status(_statusCode["default"].NOT_FOUND).send({
            msg: "No result. Search: ".concat(req.body.itemName)
          });
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(_statusCode["default"].INTERNAL_SERVER_ERROR).send({
            msg: _context6.t0.message
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var _default = {
  createItem: createItem,
  getAllItems: getAllItems,
  getItemById: getItemById,
  deleteItemById: deleteItemById,
  updateItem: updateItem,
  getItemWithQuery: getItemWithQuery
};
exports["default"] = _default;