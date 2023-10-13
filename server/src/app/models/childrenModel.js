import { Sequelize } from "sequelize";
import db from "../../database/database_config.js";
import Snacks from './snacksModel.js';
import Parents from "./parentsModel.js";
import Images from "./imagesModel.js";
import PasswordGroups from "./passwordGroupsModel.js";

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

Children.belongsToMany(Snacks, {
  through: 'ChildAllowedSnacks',
  as: 'AllowedSnacks'
});
Snacks.belongsToMany(Children, {
  through: 'ChildAllowedSnacks',
  as: 'AllowedChildren'
});

const ChildSnackOrders = db.define('ChildSnackOrders', {
  Price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

Children.belongsToMany(Snacks, {
  through: ChildSnackOrders,
  as: 'OrderedSnacks'
});

Snacks.belongsToMany(Children, {
  through: ChildSnackOrders,
  as: 'OrderedChildren'
});

Children.belongsTo(Parents, { foreignKey: 'parentId', as: 'parent' });
Children.belongsTo(Images, { foreignKey: 'passwordImageId', as: 'passwordImage' });
Children.belongsTo(PasswordGroups, { foreignKey: 'passwordGroupId', as: 'passwordGroup' });

export default Children;