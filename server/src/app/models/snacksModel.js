import { Sequelize } from "sequelize";
import db from "../../database/database_config.js";
import Images from "./imagesModel.js";

const Snacks = db.define("Snacks", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageId: {
    type: Sequelize.INTEGER,
    references: { model: 'Images', key: 'id' },
    allowNull: false,
  },
  ingredients: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

Snacks.belongsTo(Images, { foreignKey: 'imageId', as: 'image' });

export default Snacks;