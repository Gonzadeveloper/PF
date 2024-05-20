import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

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

const sequelize = new Sequelize(URL, {
  dialect: "postgres",
  models: [path.join(__dirname, "modelos")],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  },
});

// Define la función main
async function main() {
  try {
    await sequelize.authenticate();
    console.log("Conexión con la base de datos establecida exitosamente.");

    // Sincroniza los modelos con la base de datos
    await sequelize.sync();
    console.log("Modelos sincronizados con la base de datos.");

    // Accede a los modelos después de que la conexión se haya establecido
    const modelos = sequelize.models;
    Object.keys(modelos).forEach(async (modelName) => {
      const instances = await modelos[modelName].findAll();
      console.log(`Modelo: ${modelName}, Instancias: ${instances.length}`);
    });
  } catch (error) {
    console.error("No se pudo conectar con la base de datos:", error);
  }
}

// Exporta tanto la instancia de Sequelize como la función main
export { sequelize, main };



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