import { Sequelize } from "sequelize";
import db from "../../database/database_config.js";

export default db.define("Images", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});



