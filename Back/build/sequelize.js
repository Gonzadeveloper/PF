"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = __importDefault(require("path"));
const { URL } = process.env;
// URL debe tener la siguiente forma: postgres://usuario:contraseña@host:puerto/nombre_base_de_datos
if (!URL) {
    throw new Error("La variable de entorno URL no está definida en el archivo .env");
}
const sequelize = new sequelize_typescript_1.Sequelize(URL, {
    dialect: "postgres",
    models: [path_1.default.join(__dirname, "models")],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: true,
        },
    },
});
async function main() {
    try {
        await sequelize.authenticate();
        console.log("Conexión con la base de datos establecida exitosamente.");
        // Sincroniza los modelos con la base de datos
        await sequelize.sync();
        console.log("Modelos sincronizados con la base de datos.");
        // Accede a los modelos después de que la conexión se haya establecido
        const models = sequelize.models;
        Object.keys(models).forEach(async (modelName) => {
            const instances = await models[modelName].findAll();
            console.log(`Modelo: ${modelName}, Instancias: ${instances.length}`);
        });
    }
    catch (error) {
        console.error("No se pudo conectar con la base de datos:", error);
    }
}
main();
exports.default = sequelize;
