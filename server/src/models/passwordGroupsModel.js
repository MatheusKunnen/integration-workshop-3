import { Sequelize } from "sequelize";
import db from "../database.js";

export default db.define("PasswordGroups", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  image1Id: {
    type: Sequelize.INTEGER,
    references: { model: 'Images', key: 'id' },
    allowNull: false,
  },
  image2Id: {
    type: Sequelize.INTEGER,
    references: { model: 'Images', key: 'id' },
    allowNull: false,
  },
  image3Id: {
    type: Sequelize.INTEGER,
    references: { model: 'Images', key: 'id' },
    allowNull: false,
  },
  image4Id: {
    type: Sequelize.INTEGER,
    references: { model: 'Images', key: 'id' },
    allowNull: false,
  },
  image5Id: {
    type: Sequelize.INTEGER,
    references: { model: 'Images', key: 'id' },
    allowNull: false,
  },
  image6Id: {
    type: Sequelize.INTEGER,
    references: { model: 'Images', key: 'id' },
    allowNull: false,
  },
});