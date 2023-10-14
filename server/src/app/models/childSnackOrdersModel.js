import { Sequelize } from "sequelize";
import db from "../../database/database_config.js";
import Snacks from './snacksModel.js';
import Children from "./childrenModel.js";

const ChildSnackOrders = db.define("ChildSnackOrders", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  childId: {
    type: Sequelize.INTEGER,
    references: { model: 'Children', key: 'id' },
    allowNull: false,
  },
  snackId: {
    type: Sequelize.INTEGER,
    references: { model: 'Snacks', key: 'id' },
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

ChildSnackOrders.belongsTo(Children, { foreignKey: 'childId', as: 'child' });
ChildSnackOrders.belongsTo(Snacks, { foreignKey: 'snackId', as: 'snack' });

export default ChildSnackOrders;