import { Sequelize } from "sequelize";
import db from "../../database/database_config.js";
import Images from "./imagesModel.js";

 const PasswordGroups = db.define("PasswordGroups", {
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

PasswordGroups.belongsTo(Images, { foreignKey: 'image1Id', as: 'image1' });
PasswordGroups.belongsTo(Images, { foreignKey: 'image2Id', as: 'image2' });
PasswordGroups.belongsTo(Images, { foreignKey: 'image3Id', as: 'image3' });
PasswordGroups.belongsTo(Images, { foreignKey: 'image4Id', as: 'image4' });
PasswordGroups.belongsTo(Images, { foreignKey: 'image5Id', as: 'image5' });
PasswordGroups.belongsTo(Images, { foreignKey: 'image6Id', as: 'image6' });

export default PasswordGroups;