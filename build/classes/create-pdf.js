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
var htmltoPdfMake = require("html-to-pdfmake");
var pdfmake_1 = __importDefault(require("pdfmake/build/pdfmake"));
var vfs_fonts_1 = __importDefault(require("pdfmake/build/vfs_fonts"));
var paperSize = require("paper-size");
var jsdom = require("jsdom");
var CreatePdf = /** @class */ (function () {
    function CreatePdf() {
        var _this = this;
        /**
         * creates the of PDF from pupp
         * @param html string
         * @param data data to handlebars
         * @returns buffer
         */
        this.create = function (html, data) { return __awaiter(_this, void 0, void 0, function () {
            var JSDOM, window, pdfmakeData, size, content, qrcode, esign, signTable, docDefinition, curPdf;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        JSDOM = jsdom.JSDOM;
                        window = new JSDOM("").window;
                        pdfmakeData = htmltoPdfMake(html, {
                            window: window,
                            tableAutoSize: true,
                        });
                        size = paperSize.getSize(data.paperSize, { unit: "pixel", dpi: 72 })[0] - 80;
                        content = [];
                        if (data.headerbase64Image) {
                            content.push({ image: data.headerbase64Image, width: size });
                        }
                        content.push(pdfmakeData);
                        qrcode = function () {
                            var _a;
                            if (data.qrcode) {
                                var l = 100;
                                if (((_a = data.qrcode) === null || _a === void 0 ? void 0 : _a.length) > 300) {
                                    l = 150;
                                }
                                else {
                                    l = 100;
                                }
                                return { qr: data.qrcode, fit: "".concat(l) };
                            }
                        };
                        esign = function () {
                            if (data.esign) {
                                return [
                                    {
                                        image: data.esign.image,
                                        width: 100,
                                        alignment: "right",
                                    },
                                    { text: data.esign.nameLine1, alignment: "right" },
                                    { text: data.esign.nameLine2 || "", alignment: "right" },
                                ];
                            }
                        };
                        signTable = [
                            {
                                layout: "noBorders",
                                table: {
                                    widths: ["50%", "50%"],
                                    body: [[qrcode(), esign()]],
                                },
                            },
                        ];
                        content.push(signTable);
                        docDefinition = {
                            pageSize: data.paperSize,
                            pageMargins: [
                                data.leftMargin || 40,
                                data.topMargin || 40,
                                data.rightMargin || 40,
                                data.bottomMargin || 40,
                            ],
                            header: function (currentPage, pageCount, pageSize) {
                                if (data.header) {
                                    return data.header({
                                        currentPage: currentPage,
                                        pageCount: pageCount,
                                        pageSize: { width: pageSize.width },
                                    });
                                }
                            },
                            footer: function (currentPage, pageCount, pageSize) {
                                if (data.footer) {
                                    return data.footer({
                                        currentPage: currentPage,
                                        pageCount: pageCount,
                                        pageSize: { width: pageSize.width },
                                    });
                                }
                            },
                            content: content,
                            defaultStyle: {
                                fontSize: 10,
                            },
                            pageBreakBefore: function (currentNode) {
                                return currentNode.style && currentNode.style.indexOf("pagebreak") > -1;
                            },
                        };
                        pdfmake_1.default.vfs = vfs_fonts_1.default.pdfMake.vfs;
                        pdfmake_1.default.fonts = {
                            Roboto: {
                                normal: "Roboto-Regular.ttf",
                                bold: "Roboto-Medium.ttf",
                                italics: "Roboto-Italic.ttf",
                                bolditalics: "Roboto-Italic.ttf",
                            },
                        };
                        curPdf = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        var curPdf = pdfmake_1.default.createPdf(docDefinition);
                                        curPdf.getBase64(function (cb) {
                                            if (data.base64) {
                                                resolve(cb);
                                            }
                                            else {
                                                var buf = Buffer.from(cb, "base64");
                                                resolve(buf);
                                            }
                                        });
                                    })];
                            });
                        }); };
                        return [4 /*yield*/, curPdf().then(function (data) { return data; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    return CreatePdf;
}());
exports.default = CreatePdf;
//# sourceMappingURL=create-pdf.js.map