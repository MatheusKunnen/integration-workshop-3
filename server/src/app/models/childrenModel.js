import { Sequelize } from "sequelize";
import db from "../../database/database_config.js";
import Snacks from './snacksModel.js';

const Children = db.define("Children", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  parentId: {
    type: Sequelize.INTEGER,
    references: { model: 'Parents', key: 'id' },
    allowNull: false,
  },
  passwordImageId: {
    type: Sequelize.INTEGER,
    references: { model: 'Images', key: 'id' },
    allowNull: false,
  },
  passwordGroupId: {
    type: Sequelize.INTEGER,
    references: { model: 'PasswordGroups', key: 'id' },
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tagNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  budget: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  isBlocked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

export default Children;

Children.belongsToMany(Snacks, { through: 'ChildAllowedSnacks' });
Snacks.belongsToMany(Children, { through: 'ChildAllowedSnacks' });

const ChildSnackOrders = db.define('ChildSnackOrders', {
  Price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

Children.belongsToMany(Snacks, { through: ChildSnackOrders });
Snacks.belongsToMany(Children, { through: ChildSnackOrders });