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
const express = require("express");
const morgan_1 = __importDefault(require("morgan"));
const personalRoutes_1 = __importDefault(require("./routes/personalRoutes"));
const clientesRoutes_1 = __importDefault(require("./routes/clientesRoutes"));
const articulosRoutes_1 = __importDefault(require("./routes/articulosRoutes"));
const registrosRoutes_1 = __importDefault(require("./routes/registrosRoutes"));
const comprasRoutes_1 = __importDefault(require("./routes/comprasRoutes"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express.json());
app.use('/api/personal', personalRoutes_1.default);
app.use('/api/clientes', clientesRoutes_1.default);
app.use('/api/articulos', articulosRoutes_1.default);
app.use('/api/registros', registrosRoutes_1.default);
app.use('/api/compras', comprasRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT} http://localhost:${PORT}/`);
});
