import { Sequelize } from 'sequelize';
import db from '../../database/database_config.js';

export default db.define('Parents', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10000,
  },
});
