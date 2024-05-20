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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Validación de variables de entorno
function validateEnvVariables() {
    const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_NAME'];
    requiredEnvVars.forEach((varName) => {
        if (!process.env[varName]) {
            throw new Error(`Variable de entorno ${varName} no está definida.`);
        }
    });
}
validateEnvVariables();
const { URL } = process.env;
if (!URL) {
    throw new Error("La variable de entorno URL no está definida en el archivo.env");
}
const sequelize = new sequelize_typescript_1.Sequelize(URL, {
    dialect: "postgres",
    models: [path_1.default.join(__dirname, "modelos")],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
        },
    },
});
exports.sequelize = sequelize;
// Define la función main
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log("Conexión con la base de datos establecida exitosamente.");
            // Sincroniza los modelos con la base de datos
            yield sequelize.sync();
            console.log("Modelos sincronizados con la base de datos.");
            // Accede a los modelos después de que la conexión se haya establecido
            const modelos = sequelize.models;
            Object.keys(modelos).forEach((modelName) => __awaiter(this, void 0, void 0, function* () {
                const instances = yield modelos[modelName].findAll();
                console.log(`Modelo: ${modelName}, Instancias: ${instances.length}`);
            }));
        }
        catch (error) {
            console.error("No se pudo conectar con la base de datos:", error);
        }
    });
}
exports.main = main;
// require('dotenv').config();
// // Función para validar las variables de entorno
// function validateEnvVariables() {
//   const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_NAME'];
//   requiredEnvVars.forEach((varName) => {
//     if (!process.env[varName]) {
//       throw new Error(`Variable de entorno ${varName} no está definida.`);
//     }
//   });
// }
// // Llama a la función para validar las variables de entorno
// validateEnvVariables();
// // Resto de tu código...
// import { Sequelize } from "sequelize-typescript";
// const path = require("path");
// const { URL } = process.env;
// if (!URL) {
//   throw new Error(
//     "La variable de entorno URL no está definida en el archivo .env"
//   );
// }
// const sequelize = new Sequelize(URL, {
//   dialect: "postgres",
//   models: [path.join(__dirname, "modelos")],
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: true,
//     },
//   },
// });
// async function main() {
//   try {
//     await sequelize.authenticate();
//     console.log("Conexión con la base de datos establecida exitosamente.");
//     // Sincroniza los modelos con la base de datos
//     await sequelize.sync();
//     console.log("Modelos sincronizados con la base de datos.");
//     // Accede a los modelos después de que la conexión se haya establecido
//     const modelos = sequelize.models;
//     Object.keys(modelos).forEach(async (modelName) => {
//       const instances = await modelos[modelName].findAll();
//       console.log(`Modelo: ${modelName}, Instancias: ${instances.length}`);
//     });
//   } catch (error) {
//     console.error("No se pudo conectar con la base de datos:", error);
//   }
// }
// main();
// export default sequelize;
