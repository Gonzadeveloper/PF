import { Sequelize } from "sequelize-typescript";
import path from "path";
const { URL } = process.env;

// URL debe tener la siguiente forma: postgres://usuario:contraseña@host:puerto/nombre_base_de_datos

if (!URL) {
  throw new Error(
    "La variable de entorno URL no está definida en el archivo .env"
  );
}

const sequelize = new Sequelize(URL, {
  dialect: "postgres",
  models: [path.join(__dirname, "models")],
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
  } catch (error) {
    console.error("No se pudo conectar con la base de datos:", error);
  }
}

main();

export default sequelize;

// import { Sequelize } from 'sequelize-typescript';

// const sequelize = new Sequelize({
//   database: 'electroemporium',
//   username: 'postgresql',
//   password: '1234l',
//   dialect: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   models: [__dirname + '/models'],
// });

// export default sequelize;