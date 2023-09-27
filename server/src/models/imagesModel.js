import { Sequelize } from "sequelize";
import db from "../database.js";

export default db.define("Images", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});



