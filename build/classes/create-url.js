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
var axios_1 = __importDefault(require("axios"));
var CreateUrl = /** @class */ (function () {
    /**
     * This creats url from which one can access pdf
     * @param api this is api call string to backend of application
     */
    function CreateUrl(api) {
        this._url = "";
        if (!this.isString(api)) {
            this.setUrl(api);
        }
        this._api = api;
    }
    /**
   * This return string of url from which one can access the pdf
   */
    CreateUrl.prototype.geturl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var curApi;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isString(this._api)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api()];
                    case 1:
                        curApi = _a.sent();
                        this.setUrl(curApi);
                        _a.label = 2;
                    case 2: return [2 /*return*/, this._url];
                }
            });
        });
    };
    /**
     * This sends axios call to backend and sets this._api to axiosreponse then
     */
    CreateUrl.prototype.api = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("/api/pdf", {
                            responseType: 'arraybuffer',
                            headers: {
                                'Accept': 'application/pdf'
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     *
     * @param axiosResponse this sets url
     */
    CreateUrl.prototype.setUrl = function (axiosResponse) {
        this._url = window.URL.createObjectURL(new Blob([axiosResponse.data], { type: 'application/pdf' }));
    };
    /**
     * run time type checking
     * @param obj
     * @returns false in case not string else returns obj
     */
    CreateUrl.prototype.isString = function (obj) {
        if (obj) {
            return obj;
        }
        else {
            return false;
        }
    };
    return CreateUrl;
}());
exports.default = CreateUrl;
//# sourceMappingURL=create-url.js.map