import { DataTypes } from "sequelize";

import DatabaseModel from "./DatabaseModel.js";

export const userModelAttributes = { name: DataTypes.STRING };

class UserModel extends DatabaseModel {
  instance;
  constructor() {
    if (UserModel.instance) return UserModel.instance;

    super("User", userModelAttributes);
    UserModel.instance = this;
  }
}

export default new UserModel();
