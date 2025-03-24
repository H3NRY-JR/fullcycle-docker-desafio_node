import { Sequelize } from "sequelize";
import {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} from "../../env.constants.js";

class DataBaseConnector {
  static instance;

  constructor() {
    if (DataBaseConnector.instance) return DataBaseConnector.instance;

    this.sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: "mysql",
    });

    DataBaseConnector.instance = this;
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Database connection established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      process.exit(1);
    }
  }

  getInstance() {
    return this.sequelize;
  }

  defineModel(modelName, attributes) {
    return this.sequelize.define(modelName, attributes);
  }
}

export default new DataBaseConnector();
