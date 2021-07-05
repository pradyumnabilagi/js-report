"use strict";
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
        var _this = this;
        this._url = "";
        axios_1.default.get("/api/pdf", {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/pdf'
            }
        }).then(function (res) {
            _this._url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
        });
    }
    Object.defineProperty(CreateUrl.prototype, "url", {
        /**
         * This return string of url from which one can access the pdf
         */
        get: function () {
            return this._url;
        },
        enumerable: false,
        configurable: true
    });
    return CreateUrl;
}());
exports.default = CreateUrl;
//# sourceMappingURL=create-url.js.map