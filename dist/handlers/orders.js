"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orders_1 = require("../models/orders");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cart = new orders_1.orders();
var add = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, quantity, authorize, token, verifytoken, store, id, ShowAll_1, add_1, err_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = parseInt(req.body.productId);
                quantity = parseInt(req.body.quantity);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                authorize = req.headers.authorization;
                token = authorize.split(' ')[1];
                verifytoken = jsonwebtoken_1.default.verify(token, process.env.secret);
                store = verifytoken;
                id = store.user[0].id;
                return [4 /*yield*/, cart.find(id)];
            case 2:
                ShowAll_1 = _a.sent();
                if (!ShowAll_1.length) return [3 /*break*/, 7];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, cart.addProduct(productId, ShowAll_1[0].id, quantity)];
            case 4:
                add_1 = _a.sent();
                return [2 /*return*/, res.json(add_1)];
            case 5:
                err_1 = _a.sent();
                res.status(400);
                return [2 /*return*/, res.json(err_1)];
            case 6: return [3 /*break*/, 8];
            case 7:
                console.log('createNew order list first');
                res.send('createNew order list first');
                res.status(500);
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                error_1 = _a.sent();
                res.status(401);
                res.send('invaled token');
                return [2 /*return*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
var createNew = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, authorize, token, verifytoken, store, admin, id, add_2, err_2, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = req.body.status;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                authorize = req.headers.authorization;
                token = authorize.split(' ')[1];
                verifytoken = jsonwebtoken_1.default.verify(token, process.env.secret);
                store = verifytoken;
                admin = store.user;
                id = admin[0].id;
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, cart.createNew(status, id)];
            case 3:
                add_2 = _a.sent();
                return [2 /*return*/, res.json(add_2)];
            case 4:
                err_2 = _a.sent();
                res.status(400);
                return [2 /*return*/, res.json(err_2)];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                res.status(401);
                res.send('invaled token');
                return [2 /*return*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
var ShowAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorize, token, verifytoken, store, id, ShowAlls, ShowAll_2, err_3, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                authorize = req.headers.authorization;
                token = authorize.split(' ')[1];
                verifytoken = jsonwebtoken_1.default.verify(token, process.env.secret);
                store = verifytoken;
                id = store.user[0].id;
                return [4 /*yield*/, cart.find(id)];
            case 1:
                ShowAlls = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, cart.showById(ShowAlls[0].id)];
            case 3:
                ShowAll_2 = _a.sent();
                return [2 /*return*/, res.json(ShowAll_2)];
            case 4:
                err_3 = _a.sent();
                return [2 /*return*/, res.json(err_3)];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                res.status(401);
                res.send('invaled token');
                return [2 /*return*/];
            case 7: return [2 /*return*/];
        }
    });
}); };
var ordersHandler = function (app) {
    app.post('/orders/createNew', createNew);
    app.post('/orders/add', add);
    app.get('/orders/ShowAll', ShowAll);
};
exports.default = ordersHandler;
