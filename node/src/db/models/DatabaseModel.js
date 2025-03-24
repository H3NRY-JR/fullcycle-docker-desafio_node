import dbConnector from "../DatabaseConnector.js";

export default class DatabaseModel {
  constructor(modelname, userModelAttributes) {
    this.model = dbConnector.defineModel(modelname, userModelAttributes);
  }

  async create(props) {
    return this.model.create(props);
  }

  async getAll(){
    return this.model.findAll();
  }
}
