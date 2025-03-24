import express from "express";
import cors from "cors";

import dbConnector from "./db/DatabaseConnector.js";
import userModelInstance from "./db/models/UserModel.js";
import { NameGenerator } from "./gen/NameGenerator.js";

class Application {
  static userModel = userModelInstance;
  static app = express();

  static async startApp() {
    this.allowCors();
    await this.connectAndSyncDB();
    await this.createRoutes();
    this.listenToPorts();
  }

  static allowCors() {
    this.app.use(cors());
  }

  static async connectAndSyncDB() {
    await dbConnector.connect();
    await dbConnector.getInstance().sync({ alter: true });
  }

  static async createRoutes() {
    this.app.post("/person", async (_req, res) => {
      const { name } = await this.createRandomPerson();
      res.send(name);
    });

    this.app.get("/people", async (_req, res) => {
      const allUsers = await this.userModel.getAll();
      res.send(allUsers);
    });

    this.app.get('/health', (_req, res) => {
      res.status(200).send('OK');
    });
  }

  static async listenToPorts() {
    this.app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }

  static async createRandomPerson() {
    const name = NameGenerator.generate();
    await this.userModel.create({ name });

    return { name };
  }
}

await Application.startApp();
