"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const winston_1 = __importDefault(require("winston"));
const mkdirp = __importStar(require("mkdirp"));
const db_1 = __importDefault(require("./db/db"));
dotenv_1.default.config();
const PORT = 3902;
const app = (0, express_1.default)();
let logger;
mkdirp.mkdirp('/logs')
    .then(() => {
    exports.logger = logger = winston_1.default.createLogger({
        transports: [
            new winston_1.default.transports.File({
                filename: 'logs/combined.log',
                level: 'info'
            }),
            new winston_1.default.transports.File({
                filename: 'logs/errors.log',
                level: 'error'
            }),
            new winston_1.default.transports.Console()
        ]
    });
    app.listen(PORT, () => {
        if (!logger) {
            console.error('Logger is not initialized!');
            return;
        }
        logger.log('info', { message: `Server Started Successfully at ${PORT} at ${new Date().toLocaleString()}` });
        (0, db_1.default)();
    });
})
    .catch((err) => {
    console.error('Error creating logs directory:', err);
    process.exit(1);
});
